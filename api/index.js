const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const waitlistRoutes = require('../backend/src/routes/waitlistRoutes');
const authRoutes = require('../backend/src/routes/authRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/waitlist', waitlistRoutes);
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok' });
});

// Serve landing page for root path
app.get('/', (req, res) => {
    const indexPath = path.join(__dirname, '../frontend/index.html');
    if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
    } else {
        res.status(404).json({ error: 'Landing page not found' });
    }
});

// Serve static files (CSS, JS, etc)
app.get('/:filename', (req, res, next) => {
    if (req.params.filename.includes('/')) {
        return next();
    }

    const filePath = path.join(__dirname, '../frontend', req.params.filename);

    // Security: prevent directory traversal
    if (!filePath.startsWith(path.join(__dirname, '../frontend'))) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        next();
    }
});

// Error handling
app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

module.exports = app;
