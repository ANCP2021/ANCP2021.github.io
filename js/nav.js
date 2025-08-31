document.addEventListener('DOMContentLoaded', function() {
    const navHTML = `
        <nav>
            <div class="nav-container">
                <a href="index.html" class="logo">Alexander Nemecek</a>
                <ul class="nav-links">
                    <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                    <li><a href="publications.html"><i class="fas fa-book"></i> Publications</a></li>
                    <li><a href="experience.html"><i class="fas fa-briefcase"></i> Experience</a></li>
                    <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                </ul>
                <div class="nav-controls">
                    <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode">
                        <i class="fas fa-moon"></i>
                    </button>
                    <div class="menu-toggle">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </nav>
    `;
    
    // Insert the navigation at the beginning of the body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Set active class based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });
});