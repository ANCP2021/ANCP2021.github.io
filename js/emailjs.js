(function() {
    emailjs.init("EMAILJS_PUBLIC_KEY_PLACEHOLDER");
    
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const formStatus = document.getElementById('formStatus');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        formStatus.style.display = 'none';
        
        const templateParams = {
            from_name: document.getElementById('from_name').value,
            from_email: document.getElementById('from_email').value,
            subject: document.getElementById('subject').value || 'Contact Form Submission',
            message: document.getElementById('message').value
        };
        
        emailjs.send(
            'EMAILJS_SERVICE_ID_PLACEHOLDER', 
            'EMAILJS_TEMPLATE_ID_PLACEHOLDER', 
            templateParams
        )
        .then(function(response) {
            showStatus('success', 'Message sent successfully! I\'ll get back to you soon.');
            form.reset();
        }, function(error) {
            showStatus('error', 'Sorry, there was an error sending your message. Please try again or email me directly.');
        })
        .finally(function() {
            submitBtn.disabled = false;
            submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
        });
    });
    
    function showStatus(type, message) {
        formStatus.className = `form-status ${type}`;
        formStatus.textContent = message;
        formStatus.style.display = 'block';
        
        setTimeout(() => {
            formStatus.style.display = 'none';
        }, 5000);
    }
})();
