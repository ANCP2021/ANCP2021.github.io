document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle?.querySelector('i');

    // Dark Mode Functionality
    function initTheme() {
        // Check for saved theme preference or default to 'light'
        const savedTheme = localStorage.getItem('theme') || 'light';
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        // Set theme based on saved preference or system preference
        const theme = savedTheme === 'auto' ? (prefersDark ? 'dark' : 'light') : savedTheme;
        setTheme(theme);
        
        // Update icon
        updateThemeIcon(theme);
    }

    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icon
        updateThemeIcon(theme);
        
        // Add transition class for smooth theme switching
        document.body.classList.add('theme-transitioning');
        setTimeout(() => {
            document.body.classList.remove('theme-transitioning');
        }, 300);
    }

    function updateThemeIcon(theme) {
        if (themeIcon) {
            if (theme === 'dark') {
                themeIcon.className = 'fas fa-sun';
                themeToggle.setAttribute('aria-label', 'Switch to light mode');
            } else {
                themeIcon.className = 'fas fa-moon';
                themeToggle.setAttribute('aria-label', 'Switch to dark mode');
            }
        }
    }

    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    }

    // Initialize theme
    initTheme();

    // Theme toggle event listener
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'auto') {
            const newTheme = e.matches ? 'dark' : 'light';
            setTheme(newTheme);
        }
    });

    // Mobile menu toggle
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Animate hamburger menu
            const spans = this.querySelectorAll('span');
            spans.forEach((span, index) => {
                if (navLinks.classList.contains('active')) {
                    if (index === 0) span.style.transform = 'rotate(45deg) translate(5px, 5px)';
                    if (index === 1) span.style.opacity = '0';
                    if (index === 2) span.style.transform = 'rotate(-45deg) translate(7px, -6px)';
                } else {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                }
            });
        });
    }

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('nav')) {
            navLinks.classList.remove('active');
            // Reset hamburger menu
            const spans = menuToggle?.querySelectorAll('span');
            if (spans) {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all content sections for animation
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });

    // Typing effect for page title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect to page title if it exists
    const pageTitle = document.querySelector('.page-title');
    if (pageTitle) {
        const originalText = pageTitle.textContent;
        typeWriter(pageTitle, originalText, 80);
    }

    // Parallax effect for background elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.content-section::before');
        
        parallaxElements.forEach(element => {
            const speed = 0.5;
            element.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Enhanced hover effects for interactive elements
    document.querySelectorAll('.publication-item, .update-item, .research-area, .event-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('translateY(-4px)', 'translateY(-8px)');
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('translateY(-8px)', 'translateY(-4px)');
        });
    });

    // Counter animation for statistics
    function animateCounter(element, target, duration = 2000) {
        let start = 0;
        const increment = target / (duration / 16);
        
        function updateCounter() {
            start += increment;
            if (start < target) {
                element.textContent = Math.floor(start);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        }
        updateCounter();
    }

    // Animate statistics when they come into view
    const statNumbers = document.querySelectorAll('.stat-number');
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.textContent);
                animateCounter(entry.target, target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => statsObserver.observe(stat));

    // Smooth reveal for publication items
    document.querySelectorAll('.publication-item').forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, 100 + (index * 100));
    });

    // Add loading animation for images
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1)';
        });
        
        img.style.opacity = '0';
        img.style.transform = 'scale(0.9)';
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Enhanced focus management for accessibility
    document.querySelectorAll('a, button, input, textarea').forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary-color)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            navLinks.classList.remove('active');
            const spans = menuToggle?.querySelectorAll('span');
            if (spans) {
                spans.forEach(span => {
                    span.style.transform = 'none';
                    span.style.opacity = '1';
                });
            }
        }
        
        // Theme toggle with keyboard shortcut (Ctrl/Cmd + T)
        if ((e.ctrlKey || e.metaKey) && e.key === 't') {
            e.preventDefault();
            toggleTheme();
        }
    });

    // Performance optimization: Debounce scroll events
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(() => {
            // Handle scroll-based animations here
        }, 16); // 60fps
    });

    // BibTeX Modal Functionality
    const bibtexData = {
        'bibtex1': `@article{nemecek2024topic,
title={Topic-Based Watermarks for Large Language Models},
author={Nemecek, Alexander and Jiang, Yuzhou and Ayday, Erman},
journal={arXiv preprint arXiv:2404.02138},
year={2024}
}`,
        'bibtex2': `@article{nemecek2025watermarking,
title={Watermarking Without Standards Is Not AI Governance},
author={Nemecek, Alexander and Jiang, Yuzhou and Ayday, Erman},
journal={arXiv preprint arXiv:2505.23814},
year={2025}
}`,
'bibtex3': `@article{namazi2025zkprov,
title={ZKPROV: A Zero-Knowledge Approach to Dataset Provenance for Large Language Models},
author={Namazi, Mina and Nemecek, Alexander and Ayday, Erman},
journal={arXiv preprint arXiv:2506.20915},
year={2025}
}`,
            'bibtex4': `@article{nemecek2025feasibility,
title={The Feasibility of Topic-Based Watermarking on Academic Peer Reviews},
author={Nemecek, Alexander and Jiang, Yuzhou and Ayday, Erman},
journal={arXiv preprint arXiv:2505.21636},
year={2025}
}`,
            'bibtex5': `@article{nemecek2025cluster,
title={Cluster-Aware Attacks on Graph Watermarks},
author={Nemecek, Alexander and Yilmaz, Emre and Ayday, Erman},
journal={arXiv preprint arXiv:2504.17971},
year={2025}
}`
    };

    function showBibtex(bibtexId) {
        const modal = document.getElementById('bibtexModal');
        const content = document.getElementById('bibtexContent');
        
        if (modal && content && bibtexData[bibtexId]) {
            content.textContent = bibtexData[bibtexId];
            modal.style.display = 'block';
            
            // Focus management for accessibility
            const closeBtn = modal.querySelector('.close');
            if (closeBtn) {
                closeBtn.focus();
            }
        }
    }

    function closeBibtex() {
        const modal = document.getElementById('bibtexModal');
        if (modal) {
            modal.style.display = 'none';
        }
    }

    function copyBibtex() {
        const content = document.getElementById('bibtexContent');
        if (content) {
            navigator.clipboard.writeText(content.textContent).then(() => {
                // Show success feedback
                const copyBtn = document.querySelector('.modal-footer .btn');
                const originalText = copyBtn.innerHTML;
                copyBtn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                copyBtn.style.background = 'var(--accent-color)';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = 'var(--primary-color)';
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = content.textContent;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
            });
        }
    }

    // Close modal when clicking outside
    window.addEventListener('click', function(e) {
        const modal = document.getElementById('bibtexModal');
        if (e.target === modal) {
            closeBibtex();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const modal = document.getElementById('bibtexModal');
            if (modal && modal.style.display === 'block') {
                closeBibtex();
            }
        }
    });

    // Make functions globally available
    window.showBibtex = showBibtex;
    window.closeBibtex = closeBibtex;
    window.copyBibtex = copyBibtex;

    // Enhanced Hero Section Animations
    function initHeroAnimations() {
        const heroSection = document.querySelector('.hero-section');
        const heroName = document.querySelector('.hero-name');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroSocialLinks = document.querySelector('.hero-social-links');
        
        if (!heroSection) return;

        // Add entrance animation class
        heroSection.classList.add('hero-entering');

        // Staggered text reveal with enhanced timing
        const textElements = [heroName, heroTitle, heroSubtitle];
        textElements.forEach((element, index) => {
            if (element) {
                element.style.opacity = '0';
                element.style.transform = 'translateY(40px)';
                
                setTimeout(() => {
                    element.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
                    element.style.opacity = '1';
                    element.style.transform = 'translateY(0)';
                }, 200 + (index * 200));
            }
        });

        // Animate social links with bounce effect
        const socialLinks = heroSocialLinks?.querySelectorAll('.hero-social-link');
        if (socialLinks) {
            socialLinks.forEach((link, index) => {
                link.style.opacity = '0';
                link.style.transform = 'translateY(30px) scale(0.8)';
                
                setTimeout(() => {
                    link.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    link.style.opacity = '1';
                    link.style.transform = 'translateY(0) scale(1)';
                }, 800 + (index * 150));
            });
        }

        // Add floating animation to hero section
        setTimeout(() => {
            heroSection.style.animation = 'heroFloat 6s ease-in-out infinite';
        }, 2000);
    }

    // Floating animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes heroFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .hero-entering {
            animation: heroEntrance 1.5s ease-out forwards;
        }
        
        @keyframes heroEntrance {
            0% {
                opacity: 0;
                transform: scale(0.95) translateY(20px);
            }
            100% {
                opacity: 1;
                transform: scale(1) translateY(0);
            }
        }
    `;
    document.head.appendChild(style);

    // Interactive hover effects for hero elements
    function initHeroInteractions() {
        const heroName = document.querySelector('.hero-name');
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        
        // Add subtle hover effects to text elements
        [heroName, heroTitle, heroSubtitle].forEach(element => {
            if (element) {
                element.addEventListener('mouseenter', function() {
                    this.style.transform = 'translateY(-2px) scale(1.02)';
                    this.style.textShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
                });
                
                element.addEventListener('mouseleave', function() {
                    this.style.transform = 'translateY(0) scale(1)';
                    this.style.textShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
                });
            }
        });
    }

    // Initialize hero animations after a short delay
    setTimeout(() => {
        initHeroAnimations();
        initHeroInteractions();
    }, 100);

    // Add scroll-triggered animations for hero section
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            } else {
                entry.target.style.animationPlayState = 'paused';
            }
        });
    }, { threshold: 0.1 });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroObserver.observe(heroSection);
    }
});