/* ============================================
   TSURAGI — Brand Website JavaScript
   Forged by Precision. Driven by Spirit.
   GSAP + Advanced Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // ===================
    // PRELOADER
    // ===================
    const preloader = document.getElementById('preloader');
    const preloaderPercent = document.querySelector('.preloader-percent');
    let progress = 0;

    const updatePreloader = () => {
        if (progress < 100) {
            progress += Math.random() * 15;
            if (progress > 100) progress = 100;
            preloaderPercent.textContent = Math.floor(progress);
            requestAnimationFrame(updatePreloader);
        } else {
            setTimeout(() => {
                preloader.classList.add('hidden');
                initAnimations();
            }, 500);
        }
    };
    updatePreloader();

    // ===================
    // CUSTOM CURSOR
    // ===================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursor-follower');
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    const animateCursor = () => {
        // Main cursor - instant
        cursorX += (mouseX - cursorX) * 0.5;
        cursorY += (mouseY - cursorY) * 0.5;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Follower - delayed
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    };
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .model-card, .philosophy-card, .tech-feature');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorFollower.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursorFollower.classList.remove('hovering'));
    });

    // ===================
    // NAVIGATION
    // ===================
    const nav = document.getElementById('nav');
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ===================
    // SMOOTH SCROLL
    // ===================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                gsap.to(window, {
                    duration: 1,
                    scrollTo: { y: target, offsetY: navHeight },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // ===================
    // INIT ANIMATIONS
    // ===================
    function initAnimations() {
        // Hero Title Animation
        const titleLines = document.querySelectorAll('.title-line');
        titleLines.forEach((line, i) => {
            gsap.to(line, {
                opacity: 1,
                y: 0,
                duration: 1,
                delay: 0.3 + (i * 0.15),
                ease: 'power3.out'
            });
        });

        // Hero Car Parallax
        gsap.to('.hero-car-image', {
            y: 100,
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: 1
            }
        });

        // Hero Stats Counter
        document.querySelectorAll('.stat-value').forEach(stat => {
            const target = parseFloat(stat.dataset.count);
            const decimal = parseInt(stat.dataset.decimal) || 0;
            
            gsap.from(stat, {
                textContent: 0,
                duration: 2,
                delay: 1.5,
                ease: 'power2.out',
                snap: { textContent: decimal > 0 ? 0.1 : 1 },
                onUpdate: function() {
                    if (decimal > 0) {
                        stat.textContent = parseFloat(stat.textContent).toFixed(decimal);
                    }
                },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 80%'
                }
            });
        });

        // ===================
        // MODEL CARDS
        // ===================
        document.querySelectorAll('.model-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 100,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });

            // Image reveal on hover
            const image = card.querySelector('.model-image');
            card.addEventListener('mouseenter', () => {
                gsap.to(image, {
                    scale: 1.05,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
            card.addEventListener('mouseleave', () => {
                gsap.to(image, {
                    scale: 1,
                    duration: 0.8,
                    ease: 'power2.out'
                });
            });
        });

        // ===================
        // PHILOSOPHY CARDS
        // ===================
        document.querySelectorAll('.philosophy-card').forEach((card, i) => {
            gsap.from(card, {
                opacity: 0,
                y: 80,
                duration: 0.8,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // ===================
        // TECHNOLOGY FEATURES
        // ===================
        document.querySelectorAll('.tech-feature').forEach((feature, i) => {
            gsap.from(feature, {
                opacity: 0,
                x: -50,
                duration: 0.6,
                delay: i * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: feature,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Tech Image Parallax
        gsap.to('.tech-photo', {
            y: 50,
            scale: 1.1,
            scrollTrigger: {
                trigger: '.tech-image',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            }
        });

        // ===================
        // ATELIER SECTION
        // ===================
        document.querySelectorAll('.principle').forEach((principle, i) => {
            gsap.from(principle, {
                opacity: 0,
                x: -30,
                duration: 0.5,
                delay: i * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: principle,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // Production Cap Counter
        const capNumber = document.querySelector('.cap-number');
        if (capNumber) {
            gsap.from(capNumber, {
                textContent: 0,
                duration: 2,
                ease: 'power2.out',
                snap: { textContent: 1 },
                scrollTrigger: {
                    trigger: capNumber,
                    start: 'top 80%'
                }
            });
        }

        // ===================
        // SECTION HEADERS
        // ===================
        document.querySelectorAll('.section-header').forEach(header => {
            gsap.from(header, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });
        });

        // ===================
        // PARTICLES
        // ===================
        createParticles();
    }

    // ===================
    // CREATE PARTICLES
    // ===================
    function createParticles() {
        const container = document.getElementById('particles');
        if (!container) return;

        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: ${Math.random() * 2 + 1}px;
                height: ${Math.random() * 2 + 1}px;
                background: rgba(201, 169, 98, ${Math.random() * 0.5 + 0.2});
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                pointer-events: none;
            `;
            container.appendChild(particle);

            gsap.to(particle, {
                y: -window.innerHeight,
                x: (Math.random() - 0.5) * 200,
                opacity: 0,
                duration: Math.random() * 10 + 10,
                repeat: -1,
                ease: 'none',
                delay: Math.random() * 10
            });
        }
    }

    // ===================
    // FORM HANDLING
    // ===================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent ✓</span>';
                submitBtn.style.background = '#4CAF50';

                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.style.background = '';
                    submitBtn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    console.log('TSURAGI — Forged by Precision. Driven by Spirit.');
});
