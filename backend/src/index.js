const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// GET /api/health — liveness check used by CI pipeline tests
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// GET /api/message — returns a sample message for the frontend
app.get('/api/message', (req, res) => {
  res.status(200).json({
    message: 'Hello from the Express backend!',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
  });
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Only start the server when this file is run directly (not during tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`[Backend] Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
