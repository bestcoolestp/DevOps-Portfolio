const http = require("http");
const client = require("prom-client");

const port = process.env.PORT || 3000;

// Create a Prometheus registry
const register = new client.Registry();

// Add default Node.js metrics (CPU, memory, event loop, etc.)
client.collectDefaultMetrics({ register });

// Custom metric: total HTTP requests
const httpRequestsTotal = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status_code"]
});

// Custom metric: request duration
const httpRequestDurationSeconds = new client.Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route", "status_code"],
  buckets: [0.005, 0.01, 0.05, 0.1, 0.3, 0.5, 1, 2, 5]
});

// Register custom metrics
register.registerMetric(httpRequestsTotal);
register.registerMetric(httpRequestDurationSeconds);

const server = http.createServer(async (req, res) => {
  const start = process.hrtime();
  let route = req.url;
  let statusCode = 200;

  try {
    if (req.url === "/metrics") {
      const metrics = await register.metrics();
      res.writeHead(200, { "Content-Type": register.contentType });
      res.end(metrics);
      return;
    }

    if (req.url === "/health") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "healthy"
        })
      );
      return;
    }

    if (req.url === "/") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          status: "ok",
          message: "Hello from Kubernetes!",
          version: "2.0.0",
          timestamp: new Date().toISOString()
        })
      );
      return;
    }

    statusCode = 404;
    route = "not_found";
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "error",
        message: "Not Found"
      })
    );
  } catch (err) {
    statusCode = 500;
    route = "internal_error";
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "error",
        message: "Internal Server Error"
      })
    );
  } finally {
    const diff = process.hrtime(start);
    const durationInSeconds = diff[0] + diff[1] / 1e9;

    httpRequestsTotal.inc({
      method: req.method,
      route: route,
      status_code: String(statusCode)
    });

    httpRequestDurationSeconds.observe(
      {
        method: req.method,
        route: route,
        status_code: String(statusCode)
      },
      durationInSeconds
    );
  }
});

server.listen(port, () => {
  console.log(`Node.js Server running on port ${port}`);
});