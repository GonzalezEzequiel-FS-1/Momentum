
const dotenv = require('dotenv');
dotenv.config();

// -------------------------
// Core Imports
// -------------------------
const express = require('express');
const path = require('path');
const compression = require('compression');
const cors = require('cors');
const morgan = require('morgan');

// -------------------------
// App + Logger Setup
// -------------------------
const app = express();


app.use(cors({
  origin: '*', // Adjust for stricter CORS in production
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


const logger = require('./logger');

// -------------------------
// Connect to MongoDB
// -------------------------
const connectDB = require('./src/db/db');
connectDB();

// -------------------------
// Middleware
// -------------------------

app.use(compression({
  threshold: 1024,
  filter: (req, res) => req.headers['accept']?.includes('application/json')
}));



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Morgan logging (with winston logger)
const stream = { write: (message) => logger.info(message.trim()) };
app.use(morgan('combined', { stream }));

// -------------------------
// API Routes
// -------------------------
const routes = require('./src/routes');
app.use("/api", routes);

// -------------------------
// Serve Frontend
// -------------------------
const frontendDistPath = path.join(__dirname, '../FrontEnd/dist');
app.use(express.static(frontendDistPath));

// React fallback (only for non-API routes)
app.get('*', (req, res) => {
  res.sendFile(path.join(frontendDistPath, 'index.html'));
});

// -------------------------
// Error Handling Middleware
// -------------------------
app.use((err, req, res, next) => {
  logger.error(`${req.method} ${req.originalUrl} - ${err.message}`, { stack: err.stack });
  res.status(err.status || 500).json({
    success: false,
    error: err.message || "Internal Server Error"
  });
});

// -------------------------
// Start Server
// -------------------------
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => {
  logger.info(`Server Running on port ${PORT}`);
});

// Graceful Shutdown
process.on("SIGINT", () => {
  logger.info("Server shutting down");
  process.exit(0);
});
