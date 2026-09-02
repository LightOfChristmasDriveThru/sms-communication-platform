const express = require('express');
const router = express.Router();
const { validateEmail } = require('../utils/validators');
const { addSignup, getAllSignups } = require('../db/waitlist');

// Simple rate limiting: IP -> last submission time
const rateLimitMap = {};

/**
 * Check rate limit for an IP (1 submission per 10 seconds)
 */
function checkRateLimit(ip) {
    const now = Date.now();
    const lastSubmission = rateLimitMap[ip];

    if (lastSubmission && now - lastSubmission < 10000) {
        return false; // Rate limited
    }

    rateLimitMap[ip] = now;
    return true; // Allowed
}

// POST endpoint to add email to waitlist
router.post('/', (req, res) => {
    try {
        const ip = req.ip || req.connection.remoteAddress;

        // Check rate limit
        if (!checkRateLimit(ip)) {
            return res.status(429).json({
                success: false,
                message: 'Please wait before submitting again'
            });
        }

        const { email, leadsPerWeek, platform } = req.body;

        // Validate email
        if (!email || !validateEmail(email)) {
            return res.status(400).json({
                success: false,
                message: 'Please provide a valid email address'
            });
        }

        // Add to waitlist
        const signup = addSignup({
            email: email.toLowerCase(),
            leadsPerWeek: leadsPerWeek || null,
            platform: platform || null
        });

        res.status(200).json({
            success: true,
            message: 'Thanks! We\'ll send you the demo this week.',
            data: signup
        });
    } catch (error) {
        console.error('Waitlist submission error:', error);
        res.status(500).json({
            success: false,
            message: 'Something went wrong. Please try again.'
        });
    }
});

// GET endpoint to retrieve all signups (for admin use only)
router.get('/admin/all', (req, res) => {
    try {
        const signups = getAllSignups();
        res.status(200).json({
            success: true,
            count: signups.length,
            data: signups
        });
    } catch (error) {
        console.error('Waitlist retrieval error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to retrieve waitlist'
        });
    }
});

module.exports = router;
