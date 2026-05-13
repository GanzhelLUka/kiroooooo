/* ============================================
   TSURAGI — Brand Website JavaScript
   Forged by Precision. Driven by Spirit.
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.getElementById('nav');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    const menuBtn = document.getElementById('menuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

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

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navHeight = nav.offsetHeight;
                const targetPosition = target.offsetTop - navHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.philosophy-card, .model-card, .principle, .location').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    // Hero car animation
    const carBody = document.querySelector('.car-body');
    const carLights = document.querySelector('.car-lights');
    
    if (carBody && carLights) {
        // Subtle floating animation
        let floatY = 0;
        let floatDirection = 1;
        
        function animateCar() {
            floatY += 0.02 * floatDirection;
            
            if (floatY > 1 || floatY < -1) {
                floatDirection *= -1;
            }
            
            carBody.style.transform = `translateY(${floatY}px)`;
            requestAnimationFrame(animateCar);
        }
        
        animateCar();
        
        // Light pulse effect
        function pulseLights() {
            carLights.style.opacity = 0.6 + Math.random() * 0.4;
            setTimeout(pulseLights, 100 + Math.random() * 200);
        }
        
        pulseLights();
    }

    // Technology diagram hover effect
    const diagramNodes = document.querySelectorAll('.diagram-node');
    const diagramRings = document.querySelectorAll('.diagram-ring');
    
    diagramNodes.forEach(node => {
        node.addEventListener('mouseenter', () => {
            diagramRings.forEach(ring => {
                ring.style.borderColor = 'var(--color-accent)';
                ring.style.opacity = '0.3';
            });
        });
        
        node.addEventListener('mouseleave', () => {
            diagramRings.forEach(ring => {
                ring.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                ring.style.opacity = '1';
            });
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Simulate form submission
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtn.innerHTML = '<span>Message Sent</span> ✓';
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

    // Model cards hover effect - enhanced
    const modelCards = document.querySelectorAll('.model-card');
    
    modelCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const silhouette = card.querySelector('.model-silhouette');
            if (silhouette) {
                silhouette.style.opacity = '0.7';
                silhouette.style.transform = 'translateX(-50%) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', () => {
            const silhouette = card.querySelector('.model-silhouette');
            if (silhouette) {
                silhouette.style.opacity = '0.5';
                silhouette.style.transform = 'translateX(-50%) scale(1)';
            }
        });
    });

    // Production cap number animation
    const capNumber = document.querySelector('.cap-number');
    
    if (capNumber) {
        const capObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    let count = 0;
                    const target = 88;
                    const duration = 1500;
                    const increment = target / (duration / 16);
                    
                    function updateCount() {
                        count += increment;
                        if (count < target) {
                            capNumber.textContent = Math.floor(count);
                            requestAnimationFrame(updateCount);
                        } else {
                            capNumber.textContent = target;
                        }
                    }
                    
                    updateCount();
                    capObserver.unobserve(capNumber);
                }
            });
        }, { threshold: 0.5 });
        
        capObserver.observe(capNumber);
    }

    // Parallax effect for hero section
    const heroContent = document.querySelector('.hero-content');
    const heroCar = document.querySelector('.hero-car');
    
    if (heroContent && heroCar) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const heroHeight = document.querySelector('.hero').offsetHeight;
            
            if (scrollY < heroHeight) {
                const parallaxValue = scrollY * 0.3;
                heroContent.style.transform = `translateY(${parallaxValue}px)`;
                heroContent.style.opacity = 1 - (scrollY / heroHeight) * 0.5;
                
                if (window.innerWidth > 1024) {
                    heroCar.style.transform = `translateY(-50%) translateX(${parallaxValue * 0.5}px)`;
                }
            }
        });
    }

    console.log('TSURAGI — Forged by Precision. Driven by Spirit.');
});
