const path = require("path");
const express = require("express");
const applySecurity = require("./middleware/securityMiddleware");
const routes = require("./routes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const app = express();

applySecurity(app);

app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use("/uploads", express.static(path.join(__dirname, "..", "..", "uploads")));

app.get("/health", (req, res) => {
  res.json({ success: true, service: "wolvix-mern-api", uptime: process.uptime() });
});

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

module.exports = app;
