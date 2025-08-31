document.addEventListener('DOMContentLoaded', function() {
    const footerHTML = `
        <footer>
            <div class="footer-content">
                <div class="footer-section">
                    <h3>Quick Links</h3>
                    <ul class="footer-links">
                        <li><a href="index.html"><i class="fas fa-home"></i> Home</a></li>
                        <li><a href="publications.html"><i class="fas fa-book"></i> Publications</a></li>
                        <li><a href="experience.html"><i class="fas fa-briefcase"></i> Experience</a></li>
                        <li><a href="contact.html"><i class="fas fa-envelope"></i> Contact</a></li>
                        <li><a href="./assets/docs/Resume - Alexander Nemecek.pdf" download="Alexander_Nemecek_Resume.pdf"><i class="fas fa-file-alt"></i> Resume</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Research Areas</h3>
                    <ul class="footer-links">
                        <li><a href="#"><i class="fas fa-shield-alt"></i> AI Security & Forensics</a></li>
                        <li><a href="#"><i class="fas fa-balance-scale"></i> AI Governance</a></li>
                        <li><a href="#"><i class="fas fa-search"></i> Trustworthy AI</a></li>
                        <li><a href="#"><i class="fas fa-water"></i> Watermarking</a></li>
                        <li><a href="#"><i class="fas fa-fingerprint"></i> Digital Forensics</a></li>
                    </ul>
                </div>
                
                <div class="footer-section">
                    <h3>Connect With Me</h3>
                    <div class="social-links">
                        <a href="https://www.linkedin.com/in/alexander-nemecek/" class="social-link linkedin">
                            <i class="fab fa-linkedin"></i>
                            <span>LinkedIn</span>
                        </a>
                        <a href="https://github.com/ANCP2021" class="social-link github">
                            <i class="fab fa-github"></i>
                            <span>GitHub</span>
                        </a>
                        <a href="https://scholar.google.com/citations?user=Vg3MJLUAAAAJ&hl=en&authuser=4" class="social-link google-scholar">
                            <i class="fas fa-graduation-cap"></i>
                            <span>Google Scholar</span>
                        </a>
                        <a href="mailto:ajn98@case.edu" class="social-link email">
                            <i class="fas fa-envelope"></i>
                            <span>Email</span>
                        </a>
                    </div>
                </div>
            </div>
            
            <div class="footer-bottom">
                <div class="footer-bottom-content">
                    <div class="copyright">
                        <p>&copy; ${new Date().getFullYear()} Alexander Nemecek. All rights reserved.</p>
                        <p>PhD Candidate in Computer Science | Case Western Reserve University</p>
                    </div>
                    <div class="footer-actions">
                        <a href="mailto:ajn98@case.edu" class="footer-action-btn">
                            <i class="fas fa-paper-plane"></i>
                            Get In Touch
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    `;
    
    // Insert the footer at the end of the body
    document.body.insertAdjacentHTML('beforeend', footerHTML);
});