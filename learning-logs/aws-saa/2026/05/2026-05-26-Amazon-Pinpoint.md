
# 2026-05-26

# Amazon Pinpoint

---

# What is Amazon Pinpoint?

Amazon Pinpoint is a:

```text
Customer Engagement Service
```

for communicating with users at scale.

---

Think:

```text
Marketing, Notifications, & Customer Outreach
```

---

Pinpoint can send:

```text
Email, SMS, Push Notifications, Voice Messages, & In-App Messages
```

---

# Core Idea

SNS can send messages.

SES can send emails.

---

Pinpoint does:

```text
Campaign Management
```

---

Meaning:

```text
Who, What, When, & How Often
```

are all managed.

---

# Supported Channels

## Email

```text
Marketing Campaigns, Newsletters, & Promotions
```

---

## SMS

```text
OTP, Order Updates, Promotions, & Reminders
```

---

## Push Notifications

```text
Mobile Apps, Android, & iOS
```

---

## Voice Messages

```text
Automated Calls & Voice Alerts
```

---

## In-App Messaging

```text
Messages inside mobile applications
```

---

# Architecture

```text
Customer Data → Amazon Pinpoint → Campaign → Email / SMS / Push → Customer
```

---

# Segmentation

One of Pinpoint's biggest features.

---

Instead of sending to:

```text
Everyone
```

---

Send to:

```text
Customers in Seoul, Customers over 50, Premium Users, Inactive Users
```

---

Example:

```text
All users who purchased products in the last 30 days
```

---

Pinpoint creates:

```text
Segments
```

---

# Personalization

Messages can be customized.

---

Example:

```text
Hello Sang Bong,

Your order has shipped.
```

---

Instead of:

```text
Hello Customer
```

---

Pinpoint inserts:

```text
Dynamic Variables
```

---

# Campaigns

A campaign is:

```text
Audience + Message + Schedule
```

---

Example:

```text
Audience: Premium Customers → Message: 20% Discount → Schedule: Friday 9 AM
```

---

Pinpoint handles delivery automatically.

---

# Journeys

Advanced marketing workflow.

---

Example:

```text
Customer Registers → Welcome Email → Wait 3 Days → SMS Promotion → Wait 7 Days → Push Notification
```

---

Entire flow automated.

---

# Event Tracking

Pinpoint tracks:

```text
Delivered

Opened

Clicked

Bounced

Unsubscribed
```

---

Useful for analytics.

---

# Event Destinations

Pinpoint events can be sent to:

```text
Amazon SNS, Amazon Kinesis Firehose, & CloudWatch Logs
```

---

Architecture:

```text
Pinpoint Event → Firehose → S3 → Analytics
```

---

# Massive Scale

Pinpoint can process:

```text
Billions of Messages
```

---

Designed for:

```text
Enterprise Marketing
```

---

# Example Use Cases

---

## E-Commerce

```text
Order Confirmation, Shipping Updates, & Promotions
```

---

## Banking

```text
OTP, Fraud Alerts, & Account Notifications
```

---

## Healthcare

```text
Appointment Reminders & Patient Notifications
```

---

## Mobile Apps

```text
Push Notifications & Engagement Campaigns
```

---

# Two-Way Communication

Many AWS services are:

```text
Outbound Only
```

---

Pinpoint supports:

```text
Outbound + Inbound
```

---

Example:

```text
SMS Sent → Customer Replies → Application Processes Reply
```

---

# Pinpoint vs SNS

Very common exam comparison.

---

# SNS

Purpose:

```text
Publish / Subscribe
```

---

Architecture:

```text
Application → SNS Topic → Subscribers
```

---

SNS focuses on:

```text
Message Delivery
```

---

# Pinpoint

Purpose:

```text
Customer Engagement
```

---

Pinpoint focuses on:

```text
Audience, Campaigns, Personalization, & Analytics
```

---

# Comparison

| Feature | SNS | Pinpoint |
|----------|----------|----------|
| Publish/Subscribe | ✅ | ❌ |
| SMS | ✅ | ✅ |
| Email | Limited | ✅ |
| Segmentation | ❌ | ✅ |
| Personalization | ❌ | ✅ |
| Campaigns | ❌ | ✅ |
| Analytics | Basic | Advanced |
| Marketing Use Cases | ❌ | ✅ |

---

# Pinpoint vs SES

---

# SES

Purpose:

```text
Send Emails
```

---

Examples:

```text
Password Reset, Receipt, & Invoice
```

---

SES handles:

```text
Email Infrastructure
```

---

# Pinpoint

Uses:

```text
SES behind the scenes
```

for many email workloads.

---

Adds:

```text
Campaigns, Segmentation, Analytics, & Scheduling
```

---

# Exam Trick

Question:

```text
Need to send marketing campaigns to targeted audiences.
```

Answer:

```text
Amazon Pinpoint
```

---

Question:

```text
Need to send password reset emails.
```

Answer:

```text
Amazon SES
```

---

Question:

```text
Need pub/sub messaging.
```

Answer:

```text
Amazon SNS
```

---

# Integration Architecture

```text
Application → Pinpoint → SMS Campaign → Customer
```

---

Tracking:

```text
Delivered → Opened → Clicked
```

---

Events:

```text
SNS, Firehose, & CloudWatch
```

---

# Real Business Example

Amazon Shopping App

---

User:

```text
Viewed Gardening Tools
```

---

Pinpoint Segment:

```text
Garden Enthusiasts
```

---

Campaign:

```text
20% Discount on Gardening Products
```

---

Delivery:

```text
SMS, Email, & Push Notification
```

---

All automated.

---

# Typical Exam Question

Question:

```text
A company wants to send personalized SMS campaigns to millions of customers based on customer behavior.
```

Answer:

```text
Amazon Pinpoint
```

---

Question:

```text
A company wants delivery metrics, user segmentation, and campaign scheduling.
```

Answer:

```text
Amazon Pinpoint
```

---

Question:

```text
A company only needs email delivery for password resets.
```

Answer:

```text
Amazon SES
```

---

# Memory Anchors

```text
SNS = Notifications
```

---

```text
SES = Email Delivery
```

---

```text
Pinpoint = Marketing Campaigns
```

---

```text
Pinpoint = Customers
```

---

```text
Pinpoint = Segmentation + Personalization + Analytics
```

---

# DevOps Interview Insight

If asked:

"Why choose Amazon Pinpoint instead of SNS?"

Strong answer:

1. SNS focuses on message distribution.
2. Pinpoint focuses on customer engagement.
3. Pinpoint supports audience segmentation.
4. Pinpoint supports personalized content.
5. Pinpoint provides campaign scheduling.
6. Pinpoint provides delivery and engagement analytics.
7. Pinpoint supports large-scale marketing communications.