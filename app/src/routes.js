// API routes for the application
const express = require('express');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Sample API endpoint
router.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the DevOps demo API!' });
});

module.exports = router;