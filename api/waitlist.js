const { addSignup, getAllSignups } = require('../backend/src/db/waitlist');

const rateLimitMap = new Map();

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const getRateLimitKey = (req) => {
    return req.headers['x-forwarded-for'] || req.connection.remoteAddress || 'unknown';
};

const checkRateLimit = (ip) => {
    const now = Date.now();
    const limit = 1; // 1 request per 10 seconds
    const window = 10000; // 10 seconds

    if (!rateLimitMap.has(ip)) {
        rateLimitMap.set(ip, []);
    }

    const timestamps = rateLimitMap.get(ip);
    const recentTimestamps = timestamps.filter(ts => now - ts < window);

    if (recentTimestamps.length >= limit) {
        return false;
    }

    recentTimestamps.push(now);
    rateLimitMap.set(ip, recentTimestamps);
    return true;
};

module.exports = async function handler(req, res) {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method === 'GET') {
        try {
            const signups = getAllSignups();
            res.status(200).json({ success: true, data: signups });
        } catch (error) {
            console.error('Error fetching signups:', error);
            res.status(500).json({ success: false, message: 'Error fetching signups' });
        }
        return;
    }

    if (req.method === 'POST') {
        const ip = getRateLimitKey(req);

        if (!checkRateLimit(ip)) {
            return res.status(429).json({
                success: false,
                message: 'Too many requests. Please wait before trying again.'
            });
        }

        const { email, leadsPerWeek, platform } = req.body;

        // Validate email
        if (!email || !email.trim()) {
            return res.status(400).json({
                success: false,
                message: 'Email is required'
            });
        }

        if (!validateEmail(email.trim())) {
            return res.status(400).json({
                success: false,
                message: 'Please enter a valid email address'
            });
        }

        try {
            const signup = addSignup({
                email: email.trim(),
                leadsPerWeek: leadsPerWeek || null,
                platform: platform || null
            });

            res.status(200).json({
                success: true,
                message: 'Successfully joined the waitlist',
                data: signup
            });
        } catch (error) {
            console.error('Error saving signup:', error);
            res.status(500).json({
                success: false,
                message: 'Error saving signup. Please try again.'
            });
        }
        return;
    }

    res.status(405).json({ success: false, message: 'Method not allowed' });
};
