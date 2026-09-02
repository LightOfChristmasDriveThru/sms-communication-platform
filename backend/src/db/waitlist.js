const fs = require('fs');
const path = require('path');

const WAITLIST_FILE = path.join(__dirname, '../../data/waitlist.json');

// Ensure data directory exists
const dataDir = path.dirname(WAITLIST_FILE);
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// Initialize file if it doesn't exist
if (!fs.existsSync(WAITLIST_FILE)) {
    fs.writeFileSync(WAITLIST_FILE, JSON.stringify([], null, 2));
}

/**
 * Add a signup to the waitlist
 * @param {object} signup - { email, leadsPerWeek, platform }
 * @returns {object} - The signup with timestamp
 */
function addSignup(signup) {
    try {
        const data = fs.readFileSync(WAITLIST_FILE, 'utf8');
        const waitlist = JSON.parse(data);

        const newSignup = {
            id: Date.now().toString(),
            email: signup.email,
            leadsPerWeek: signup.leadsPerWeek || null,
            platform: signup.platform || null,
            createdAt: new Date().toISOString()
        };

        waitlist.push(newSignup);
        fs.writeFileSync(WAITLIST_FILE, JSON.stringify(waitlist, null, 2));

        return newSignup;
    } catch (error) {
        throw new Error(`Failed to add signup: ${error.message}`);
    }
}

/**
 * Get all signups
 * @returns {array} - Array of all signups
 */
function getAllSignups() {
    try {
        const data = fs.readFileSync(WAITLIST_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        throw new Error(`Failed to read waitlist: ${error.message}`);
    }
}

module.exports = { addSignup, getAllSignups };
