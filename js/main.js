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
            'bibtex4': `@inproceedings{nemecek2025feasibility,
  title={The Feasibility of Topic-Based Watermarking on Academic Peer Reviews},
  author={Nemecek, Alexander and Jiang, Yuzhou and Ayday, Erman},
  booktitle={Proceedings of the 14th International Joint Conference on Natural Language Processing and the 4th Conference of the Asia-Pacific Chapter of the Association for Computational Linguistics},
  year={2025}
}`,
            'bibtex5': `@article{nemecek2025cluster,
title={Cluster-Aware Attacks on Graph Watermarks},
author={Nemecek, Alexander and Yilmaz, Emre and Ayday, Erman},
journal={arXiv preprint arXiv:2504.17971},
year={2025}
}`,
        'bibtex6': `@article{he2025optimal,
  title={Optimal Watermark Generation under Type I and Type II Errors},
  author={He, Hengzhi and Xu, Shirong and Nemecek, Alexander and Li, Jiping and Ayday, Erman and Cheng, Guang},
  journal={arXiv preprint arXiv:2512.05333},
  year={2025}
}`,
        'bibtex7': `@article{nemecek2025exploring,
  title={Exploring Membership Inference Vulnerabilities in Clinical Large Language Models},
  author={Nemecek, Alexander and Yun, Zebin and Rahmani, Zahra and Harel, Yaniv and Chaudhary, Vipin and Sharif, Mahmood and Ayday, Erman},
  journal={arXiv preprint arXiv:2510.18674},
  year={2025}
}`,
        'bibtex8': `@techreport{garasi2024can,
  title={Can Smaller Expert Modules Enhance RAG Performance?},
  author={Nemecek, Alexander J and Garasi, Christopher J and Abbott, Robert G},
  year={2024},
  institution={Sandia National Laboratories (SNL-NM), Albuquerque, NM (United States)}
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
                copyBtn.style.background = '#16a34a';
                
                setTimeout(() => {
                    copyBtn.innerHTML = originalText;
                    copyBtn.style.background = '';
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
});