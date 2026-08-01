# Incident Report: Data Integrity Regression After Oracle-to-API Synchronization Migration

## Incident Classification

| Item | Description |
|---|---|
| Incident type | Production data integrity regression |
| Affected component | Member synchronization and safety education target management |
| Primary impact | Inactive members remained assigned to safety education schedules |
| Detection method | Administrator report and education statistics comparison |
| Root cause | Missing downstream cleanup workflow in the REST API synchronization implementation |
| Remediation status | Permanent preventive logic deployed |
| Historical data | Preserved; no bulk restoration or destructive correction performed |

---

## Executive Summary

A university safety education platform migrated its member synchronization process from a direct Oracle database connection to a REST API-based integration as part of a security enhancement.

The new integration successfully retrieved and updated member records. However, it did not preserve one downstream business rule implemented by the legacy Oracle synchronization workflow.

The legacy process performed two related actions:

1. Update the member's active or inactive state.
2. Remove newly inactive and incomplete members from currently active safety education schedules.

The REST API implementation performed the first action but omitted the second.

This created records with the following inconsistent state:

```text
MemberInfo.IsDelete         = 1
ScheduleMemberInfo.IsDelete = 0
```

The member was no longer active, but the corresponding education-target record remained active.

The stale education-target records accumulated over subsequent synchronization runs and affected the target population used by the education statistics.

The issue was investigated using historical database backups, SQL comparison, legacy code analysis, API workflow tracing, and production logs. The missing cleanup workflow was added to the API synchronization process, together with result-count logging for operational validation.

---

## Background

### Legacy synchronization architecture

The original integration accessed the university's Oracle-based academic information system directly.

```text
Safety education platform
        |
        v
Direct Oracle connection
        |
        v
University academic database
```

In addition to updating member information, the legacy workflow executed downstream cleanup logic for education and laboratory assignments.

Conceptually:

```text
Oracle member synchronization
        |
        v
Update MemberInfo
        |
        v
Identify newly inactive members
        |
        v
Remove incomplete targets from active education schedules
        |
        v
Consistent member and education-target state
```

### Security-driven migration

Direct database access was replaced with a REST API integration as part of a broader security hardening effort.

The new architecture reduced direct exposure of the academic database.

```text
Safety education platform
        |
        v
Authenticated REST API
        |
        v
University integration layer
        |
        v
Internal academic database
```

The architectural change improved security isolation, but the migration validation focused on member-data synchronization. The downstream education-target cleanup responsibility was not transferred to the new implementation.

---

## Customer Impact

Administrators observed that safety education statistics no longer matched their expected values.

Two different results could be reproduced depending on whether currently inactive members were filtered at query time.

### Result with stale education targets included

```text
Education targets : 6,898
Completed members : 6,378
Completion rate   : 92.5%
```

### Result with inactive members hidden by a query filter

```text
Education targets : 6,659
Completed members : 6,347
Completion rate   : 95.3%
```

The visible percentage changed, but the underlying `ScheduleMemberInfo` inconsistency remained.

The incident did not remove education completion records. Instead, it allowed inactive members to remain active within the education-target dataset.

---

## Detection

The incident was first reported after an administrator noticed an unexpected difference in education statistics.

An initial mitigation applied a member-status filter:

```csharp
list = list.Where(member => member.IsDelete == 0);
```

This restored the expected visible completion rate by excluding inactive members from the query result.

However, the mitigation had two limitations:

1. It hid inconsistent education-target records instead of correcting their source.
2. It applied current member status to historical education records, which could alter the statistics of completed schedules.

This indicated that the problem was deeper than a display or reporting defect.

---

## Investigation

### Investigation goals

The investigation focused on five questions:

1. Did the REST API return incorrect member data?
2. Did member synchronization fail during insertion or update?
3. Were education completion records deleted?
4. Did the legacy Oracle workflow contain additional downstream processing?
5. Why did the inconsistency increase after subsequent synchronizations?

### Evidence sources

The following evidence was used:

- Historical production database backups
- Current production database dumps
- SQL comparison of `MemberInfo` and `ScheduleMemberInfo`
- Legacy Oracle synchronization code
- REST API synchronization code
- Member synchronization logs
- Local reproduction using restored databases
- Education statistics screens

---

## Database Evidence

The key diagnostic query searched for members marked inactive while their education-target record remained active.

```sql
SELECT
    SM.ScheduleNo,
    SM.UserNo,
    MI.IsDelete AS MemberIsDelete,
    SM.IsDelete AS TargetIsDelete,
    SM.IsComplete
FROM ScheduleMemberInfo SM
INNER JOIN MemberInfo MI
    ON MI.UserNo = SM.UserNo
WHERE SM.ScheduleNo = @ScheduleNo
  AND MI.IsDelete = 1
  AND SM.IsDelete = 0;
```

The query revealed the inconsistent state:

```text
MemberInfo.IsDelete         = 1
ScheduleMemberInfo.IsDelete = 0
```

An earlier database snapshot contained approximately 239 such records.

A later synchronization increased the count to approximately 312 records.

This established that the problem was cumulative and directly related to repeated synchronization activity.

---

## Historical Database Reproduction

A historical database backup was restored locally.

The same completed education schedule was tested using two query policies.

### Current active members only

```csharp
list = list.Where(member => member.IsDelete == 0);
```

Result:

```text
Completion rate: approximately 95.3%
```

### Schedule-aware member filtering

```csharp
bool isActiveSchedule = db.scheduleinfo.Any(schedule =>
    schedule.ScheduleNo == search.ScheduleNo
    && schedule.StartDate <= DateTime.Now
    && schedule.EndDate >= DateTime.Now
    && schedule.EduType == 1
);

if (isActiveSchedule)
{
    list = list.Where(member => member.IsDelete == 0);
}
```

For a completed schedule, inactive members were no longer hidden.

Result:

```text
Completion rate: approximately 92.5%
```

This reproduction proved that the 95.3% result was produced by a query-level workaround. The underlying stale education-target records already existed in the database.

---

## Legacy Workflow Analysis

The legacy Oracle synchronization controller called a member synchronization method and then executed education and laboratory cleanup logic.

Conceptually:

```csharp
bool synchronizationSucceeded =
    memberService.SynchronizeFromOracle(...);

if (synchronizationSucceeded)
{
    memberService.DeleteInactiveAssignments();
}
```

The downstream logic performed actions such as:

```text
Remove inactive members from laboratory assignments
Mark incomplete active education targets as deleted
Preserve completed education history
Avoid changing completed schedules
```

This business behavior was separate from the Oracle data transport itself.

---

## REST API Workflow Analysis

The REST API synchronization implementation successfully:

- Retrieved employee data
- Retrieved student data
- Retried transient API failures
- Inserted new members
- Updated existing members
- Marked missing members as inactive
- Logged synchronization progress

However, after updating `MemberInfo`, it did not execute the legacy education-target cleanup workflow.

The implementation therefore produced the following sequence:

```text
API synchronization
        |
        v
MemberInfo updated
        |
        v
Member becomes inactive
        |
        v
No ScheduleMemberInfo cleanup
        |
        v
Stale active education-target record remains
```

---

## Root Cause

### Primary root cause

The REST API migration did not preserve functional parity with the legacy Oracle synchronization workflow.

The migration successfully replaced the member-data transport mechanism, but it omitted a downstream business rule:

> Newly inactive members who had not completed a currently active safety education schedule had to be excluded from that schedule.

### Contributing factors

#### 1. Hidden responsibility in legacy code

The cleanup logic was not part of the Oracle query itself. It existed as a downstream application-side operation.

This made it easy to overlook during migration.

#### 2. Validation focused on transport success

The migration verified:

```text
API request success
Member insert count
Member update count
Synchronization completion
```

It did not verify:

```text
Education-target deletion count
Laboratory-assignment cleanup
Member-to-schedule consistency
Statistics before and after synchronization
```

#### 3. Query-level workaround masked the defect

Filtering with:

```csharp
member.IsDelete == 0
```

made the statistics appear correct while stale records continued to accumulate.

#### 4. Insufficient business-result observability

Logs described API and member-sync success but did not expose the number of affected education-target records.

---

## Five Whys

### Why did the education statistics change?

Inactive members remained in the education-target population.

### Why did inactive members remain education targets?

Their `MemberInfo.IsDelete` value changed, but their `ScheduleMemberInfo.IsDelete` value did not.

### Why was `ScheduleMemberInfo.IsDelete` not updated?

The REST API synchronization workflow did not call the legacy downstream cleanup logic.

### Why was the cleanup logic omitted?

The migration treated the task primarily as a data-source replacement rather than a full business-workflow migration.

### Why was the omission not detected earlier?

Testing and logging validated member synchronization but did not validate downstream side effects or functional parity.

---

## Remediation

A dedicated cleanup method was added to the REST API synchronization workflow.

Conceptually:

```csharp
if (rowsAffectedUpdate > 0)
{
    int deletedEducationMemberCount =
        DeleteActiveSafetyEducationMembers(DbConnectionString);

    LogWrite(
        "API synchronization active safety education exclusions: "
        + deletedEducationMemberCount
    );

    UpdateMemberInfo();
}
```

The cleanup method updates only records meeting all required conditions.

```sql
UPDATE ScheduleMemberInfo SM
INNER JOIN MemberInfo M
    ON M.UserNo = SM.UserNo
INNER JOIN ScheduleInfo S
    ON S.ScheduleNo = SM.ScheduleNo
SET SM.IsDelete = 1
WHERE SM.IsDelete = 0
  AND M.IsDelete = 1
  AND SM.IsComplete = 0
  AND S.EduType = 1
  AND S.StartDate <= NOW()
  AND S.EndDate >= NOW();
```

### Safety conditions

The remediation intentionally limits its scope.

It affects only:

- Inactive members
- Safety education schedules
- Currently active schedules
- Incomplete education targets
- Targets not already deleted

It does not affect:

- Active members
- Completed education records
- Historical completed schedules
- Other education types
- Already deleted targets

---

## Deployment Validation

The remediation was deployed to production and member synchronization was executed.

The resulting log showed:

```text
API synchronization active safety education exclusions: 0
```

This result was expected because the relevant safety education schedule had already ended.

The zero count still provided useful validation:

- The new method was invoked.
- The SQL executed without error.
- No completed historical schedule was modified.
- No completed education record was deleted.
- Future active schedules are now protected from the same inconsistency.

---

## Why Historical Records Were Not Bulk-Updated

The investigation found that many affected historical education records already had:

```text
ScheduleMemberInfo.IsDelete = 0
```

Changing `MemberInfo.IsDelete` back to zero would have incorrectly reactivated members who were legitimately inactive in the source system.

Changing historical `ScheduleMemberInfo` records without reliable deletion timestamps could also distort education history.

For those reasons, the remediation strategy separated two concerns:

```text
Future prevention
    -> Correct the API synchronization workflow.

Historical interpretation
    -> Preserve records and apply an agreed reporting policy.
```

No destructive bulk correction was performed solely to force a target percentage.

---

## Correctness Model

The intended responsibilities are now separated.

### `MemberInfo`

Represents the member's current institutional status.

```text
IsDelete = 0 -> currently active
IsDelete = 1 -> currently inactive
```

### `ScheduleMemberInfo`

Represents the member's status within a specific education schedule.

```text
IsDelete = 0 -> valid education target
IsDelete = 1 -> excluded from that education schedule
```

### Synchronization policy

```text
Member becomes inactive
        |
        +-- Active schedule and incomplete
        |       -> ScheduleMemberInfo.IsDelete = 1
        |
        +-- Completed education
        |       -> Preserve completion history
        |
        +-- Completed schedule
                -> Preserve historical schedule records
```

---

## Preventive Actions

### Completed

- Added active-schedule cleanup to REST API synchronization.
- Restricted cleanup to inactive, incomplete education targets.
- Protected completed and historical schedules.
- Added business-result logging.
- Reproduced the issue using historical database backups.
- Documented the functional parity gap.

### Recommended follow-up

- Add an automated integration test for inactive-member cleanup.
- Add a synchronization summary containing insert, update, inactive, and education-exclusion counts.
- Alert on unexpected growth in inconsistent member-target records.
- Document all downstream synchronization side effects.
- Add a migration checklist for functional parity.
- Define an explicit historical-statistics policy.
- Consider storing a schedule-close statistics snapshot.
- Add database constraints or scheduled integrity checks where practical.

---

## Regression Test Scenarios

### Scenario 1: Inactive and incomplete member in an active schedule

Expected result:

```text
MemberInfo.IsDelete         = 1
ScheduleMemberInfo.IsDelete = 1
```

### Scenario 2: Inactive but completed member in an active schedule

Expected result:

```text
MemberInfo.IsDelete         = 1
ScheduleMemberInfo.IsDelete = 0
Completion history preserved
```

### Scenario 3: Inactive and incomplete member in a completed schedule

Expected result:

```text
Historical ScheduleMemberInfo remains unchanged
```

### Scenario 4: Active member in an active schedule

Expected result:

```text
MemberInfo.IsDelete         = 0
ScheduleMemberInfo.IsDelete = 0
```

### Scenario 5: Repeated synchronization

Expected result:

```text
No duplicate side effects
Already deleted targets remain deleted
Cleanup operation remains idempotent
```

---

## Monitoring Queries

### Detect inactive members with active education targets

```sql
SELECT
    SM.ScheduleNo,
    COUNT(*) AS InconsistentTargetCount
FROM ScheduleMemberInfo SM
INNER JOIN MemberInfo M
    ON M.UserNo = SM.UserNo
INNER JOIN ScheduleInfo S
    ON S.ScheduleNo = SM.ScheduleNo
WHERE M.IsDelete = 1
  AND SM.IsDelete = 0
  AND SM.IsComplete = 0
  AND S.EduType = 1
  AND S.StartDate <= NOW()
  AND S.EndDate >= NOW()
GROUP BY SM.ScheduleNo;
```

### Summarize synchronization side effects

```text
Inserted members
Updated members
Newly inactive members
Excluded active-schedule targets
Failed API pages
Retry count
Total synchronization duration
```

---

## Timeline

| Phase | Event |
|---|---|
| Security hardening | Direct Oracle access replaced with REST API synchronization |
| Migration | Member insert and update behavior migrated |
| Functional gap introduced | Education-target cleanup not migrated |
| Early symptom | Education statistics differed from administrator expectations |
| Temporary mitigation | Query filtered all inactive members |
| Investigation | Historical backups and SQL comparison exposed stale target records |
| Root cause confirmed | Legacy downstream workflow missing from API path |
| Permanent remediation | Active incomplete education-target cleanup added |
| Observability improvement | Exclusion count added to synchronization logs |
| Production validation | Remediation invoked safely; completed schedules unchanged |

---

## Lessons Learned

### 1. Interface migration is also workflow migration

Replacing a database connection with an API is not merely a transport-layer change.

All downstream effects must be inventoried and migrated.

### 2. Functional parity requires explicit verification

A migration checklist should compare:

```text
Create behavior
Update behavior
Delete behavior
Downstream cleanup
Audit logging
Error handling
Retry behavior
Statistics impact
```

### 3. Successful synchronization does not guarantee consistency

The API calls and member updates succeeded while related business records became inconsistent.

Technical success and business correctness are different signals.

### 4. Historical backups are powerful incident-analysis tools

Restoring database snapshots made it possible to reproduce the statistics difference and separate code behavior from data changes.

### 5. Temporary filters can conceal data debt

The query-level workaround improved the visible result but allowed inconsistent records to remain and accumulate.

### 6. Business metrics belong in operational logs

The most useful verification was not merely:

```text
Synchronization succeeded
```

but:

```text
Inactive education targets excluded: N
```

---

## Skills Demonstrated

- Production incident response
- Root cause analysis
- Data integrity investigation
- REST API migration troubleshooting
- Legacy workflow analysis
- Functional parity validation
- Historical database comparison
- SQL troubleshooting
- Defensive remediation
- Idempotent synchronization design
- Operational logging
- ASP.NET MVC
- C#
- MySQL

---

## Final Outcome

The immediate production risk was addressed by restoring the missing education-target cleanup workflow in the REST API synchronization process.

The remediation preserves completed education history, avoids modifying completed schedules, and prevents future active schedules from accumulating inactive and incomplete targets.

The incident established a broader engineering principle:

> A secure integration migration is complete only when both the data transfer and every downstream business effect remain functionally equivalent.