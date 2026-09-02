document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('waitlistForm');
    const submitBtn = document.getElementById('submitBtn');
    const emailInput = document.getElementById('email');
    const formSuccess = document.getElementById('formSuccess');
    const formError = document.getElementById('formError');
    const formErrorText = document.getElementById('formErrorText');
    const emailError = document.getElementById('emailError');

    // Email validation
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    // Clear email error on input
    emailInput.addEventListener('input', function() {
        emailError.textContent = '';
    });

    // Form submission
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Reset error messages
        emailError.textContent = '';
        formError.style.display = 'none';
        formErrorText.textContent = '';

        // Validate email
        const email = emailInput.value.trim();
        if (!email) {
            emailError.textContent = 'Email is required';
            emailInput.focus();
            return;
        }

        if (!validateEmail(email)) {
            emailError.textContent = 'Please enter a valid email address';
            emailInput.focus();
            return;
        }

        // Get optional fields
        const leadsPerWeek = document.getElementById('leadsPerWeek').value.trim();
        const platform = document.getElementById('platform').value;

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        submitBtn.textContent = 'Joining...';

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    leadsPerWeek: leadsPerWeek || null,
                    platform: platform || null
                })
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Show success message
                form.style.display = 'none';
                formSuccess.style.display = 'block';

                // Scroll to success message
                formSuccess.scrollIntoView({ behavior: 'smooth' });
            } else {
                // Show error message
                formErrorText.textContent = data.message || 'Something went wrong. Please try again.';
                formError.style.display = 'block';
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formErrorText.textContent = 'Connection error. Please check your internet and try again.';
            formError.style.display = 'block';
        } finally {
            // Reset button state
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
            submitBtn.textContent = 'Join Waitlist';
        }
    });
});
