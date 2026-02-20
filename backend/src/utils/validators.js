// validators.js

/**
 * Function to validate phone numbers
 * @param {string} phoneNumber - The phone number to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validatePhoneNumber(phoneNumber) {
    const phoneRegex = /^(\+\d{1,3}[- ]?)?\d{10}$/;
    return phoneRegex.test(phoneNumber);
}

/**
 * Function to validate message length
 * @param {string} message - The message to validate
 * @param {number} maxLength - The maximum allowed length of the message
 * @returns {boolean} - True if valid, false otherwise
 */
function validateMessageLength(message, maxLength) {
    if (typeof message !== 'string') return false;
    return message.length <= maxLength;
}

/**
 * Function to validate sender ID
 * @param {string} senderId - The sender ID to validate
 * @returns {boolean} - True if valid, false otherwise
 */
function validateSenderId(senderId) {
    return typeof senderId === 'string' && senderId.length > 0;
}

module.exports = { validatePhoneNumber, validateMessageLength, validateSenderId };