/* ===================================
   PORTFOLIO WEBSITE - JAVASCRIPT
   Smooth animations, scroll effects, and interactions
   =================================== */

// ===================================
// GLOBAL VARIABLES
// ===================================

let isScrolling = false;
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');
const themeToggle = document.getElementById('themeToggle');
const scrollProgress = document.getElementById('scrollProgress');

// ===================================
// EMAILJS INITIALIZATION
// ===================================

(function(){
    emailjs.init("EnUmfKds-GN0axFXJ"); // Sostituisci con la tua Public Key da emailjs.com
})();

// ===================================
// INITIALIZATION
// ===================================

document.addEventListener('DOMContentLoaded', function() {
    initParticleBackground();
    initSmoothScroll();
    initScrollAnimations();
    initNavbar();
    initThemeToggle();
    initProjectFilters();
    initSkillBars();
    initContactForm();
    initScrollProgress();
    initLazyLoading();
    initScrollToTop();
    initSkipLink();
    initCustomCursor();
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }
});

// ===================================
// INTERACTIVE PARTICLE BACKGROUND
// ===================================

function initParticleBackground() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null, radius: 150 };
    
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    window.addEventListener('resize', () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        initParticles();
    });
    
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    
    canvas.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.baseX = this.x;
            this.baseY = this.y;
            this.density = (Math.random() * 30) + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
        }
        
        draw() {
            const isDark = document.body.classList.contains('dark-mode');
            ctx.fillStyle = isDark ? 'rgb(195, 66, 19)' : 'rgba(235, 37, 37, 0.6)';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
        
        update() {
            if (mouse.x != null && mouse.y != null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < mouse.radius) {
                    const forceX = dx / distance;
                    const forceY = dy / distance;
                    const force = (mouse.radius - distance) / mouse.radius;
                    this.x -= forceX * force * this.density * 0.6;
                    this.y -= forceY * force * this.density * 0.6;
                }
            }
            
            this.x += (this.baseX - this.x) * 0.05;
            this.y += (this.baseY - this.y) * 0.05;
            
            this.baseX += this.speedX;
            this.baseY += this.speedY;
            
            if (this.baseX < 0 || this.baseX > canvas.width) this.speedX *= -1;
            if (this.baseY < 0 || this.baseY > canvas.height) this.speedY *= -1;
        }
    }
    
    function initParticles() {
        particles = [];
        const num = Math.min(100, Math.floor((canvas.width * canvas.height) / 15000));
        for (let i = 0; i < num; i++) particles.push(new Particle());
    }
    
    function connectParticles() {
        const isDark = document.body.classList.contains('dark-mode');
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    const opacity = 1 - (distance / 120);
                    ctx.strokeStyle = isDark 
                        ? `rgba(100, 150, 255, ${opacity * 0.2})` 
                        : `rgba(37, 99, 235, ${opacity * 0.2})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        connectParticles();
        requestAnimationFrame(animate);
    }
    
    initParticles();
    animate();
}

// ===================================
// SMOOTH SCROLL
// ===================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            }
        });
    });
}

// ===================================
// SCROLL PROGRESS INDICATOR
// ===================================

function initScrollProgress() {
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================

function initNavbar() {
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
    
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
}

// ===================================
// DARK MODE TOGGLE
// ===================================

function initThemeToggle() {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
        } else {
            localStorage.setItem('theme', 'light');
        }
    });
}

// ===================================
// SCROLL REVEAL ANIMATIONS
// ===================================

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const revealElements = document.querySelectorAll(
        '.reveal-fade, .reveal-left, .reveal-right, .reveal-scale'
    );
    
    revealElements.forEach(el => observer.observe(el));
}

// ===================================
// SKILL BARS ANIMATION
// ===================================

function initSkillBars() {
    const skillBars = document.querySelectorAll('.skill-fill');
    
    const observerOptions = {
        threshold: 0.5
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillLevel = skillBar.getAttribute('data-skill');
                
                setTimeout(() => {
                    skillBar.style.width = skillLevel + '%';
                    skillBar.classList.add('animate');
                }, 200);
                
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);
    
    skillBars.forEach(bar => {
        const skillLevel = bar.getAttribute('data-skill');
        bar.style.setProperty('--skill-width', skillLevel + '%');
        observer.observe(bar);
    });
}

// ===================================
// PROJECT FILTERS
// ===================================

function initProjectFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category.includes(filterValue)) {
                    setTimeout(() => {
                        card.classList.remove('hide');
                        card.style.animation = 'fadeIn 0.5s ease forwards';
                    }, index * 50);
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });
}

// ===================================
// MODAL FUNCTIONALITY
// ===================================

function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modalId);
            }
        });
    }
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeModal = document.querySelector('.modal.active');
        if (activeModal) {
            activeModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    }
});

// ===================================
// CONTACT FORM WITH EMAILJS
// ===================================

function initContactForm() {
    const form = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');
    
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            if (!formData.name || !formData.email || !formData.message) {
                showFormStatus('⚠️ Compila tutti i campi', 'error');
                return;
            }
            
            if (!isValidEmail(formData.email)) {
                showFormStatus('⚠️ Inserisci un\'email valida', 'error');
                return;
            }
            
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Invio in corso...';
            submitButton.disabled = true;
            
            // Parametri per EmailJS (devono corrispondere al template)
            const templateParams = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_name: 'Samuele'
            };
            
            // Invia email tramite EmailJS
            emailjs.send('service_yriiog3', 'template_jfl2evl', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showFormStatus('✅ Messaggio inviato con successo! Ti risponderò presto.', 'success');
                    form.reset();
                    
                    setTimeout(() => {
                        formStatus.style.display = 'none';
                    }, 5000);
                }, function(error) {
                    console.log('FAILED...', error);
                    showFormStatus('❌ Errore nell\'invio. Riprova più tardi o contattami via email.', 'error');
                })
                .finally(() => {
                    submitButton.textContent = originalText;
                    submitButton.disabled = false;
                });
        });
    }
}

function showFormStatus(message, type) {
    const formStatus = document.getElementById('formStatus');
    formStatus.textContent = message;
    formStatus.className = `form-status ${type}`;
    formStatus.style.display = 'block';
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const optimizedScroll = debounce(() => {
    // Scroll-heavy operations
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// LAZY LOADING IMAGES
// ===================================

function initLazyLoading() {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

function initScrollToTop() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '↑';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollBtn);
    
    const style = document.createElement('style');
    style.textContent = `
        .scroll-to-top {
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            background: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.5rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 999;
            box-shadow: var(--shadow-lg);
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: var(--shadow-xl);
        }
    `;
    document.head.appendChild(style);
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });
    
    scrollBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===================================
// ACCESSIBILITY IMPROVEMENTS
// ===================================

function initSkipLink() {
    const skipLink = document.createElement('a');
    skipLink.href = '#home';
    skipLink.textContent = 'Salta al contenuto principale';
    skipLink.className = 'skip-link';
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    const style = document.createElement('style');
    style.textContent = `
        .skip-link {
            position: absolute;
            top: -100px;
            left: 0;
            background: var(--primary-color);
            color: white;
            padding: 10px 20px;
            z-index: 10001;
            transition: top 0.3s;
        }
        
        .skip-link:focus {
            top: 0;
        }
    `;
    document.head.appendChild(style);
}

// ===================================
// CURSORE PERSONALIZZATO
// ===================================

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.classList.add('custom-cursor');
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    const clickables = document.querySelectorAll('a, button, .project-card, input, textarea');
    
    clickables.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.classList.add('hover');
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.classList.remove('hover');
        });
    });
    
    document.addEventListener('mouseleave', function() {
        cursor.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', function() {
        cursor.style.opacity = '1';
    });
}

// ===================================
// CONSOLE EASTER EGG
// ===================================

console.log('%c👋 Ciao Developer!', 'font-size: 20px; font-weight: bold; color: #2563eb;');
console.log('%c🚀 Questo portfolio è stato creato con passione', 'font-size: 14px; color: #475569;');
console.log('%c💻 Se sei interessato al codice, contattami!', 'font-size: 14px; color: #475569;');

// ===================================
// ANALYTICS
// ===================================

function trackEvent(category, action, label) {
    console.log('Event tracked:', category, action, label);
}

document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('Button', 'Click', e.target.textContent);
    });
});

document.querySelectorAll('.project-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        const projectTitle = e.target.closest('.project-card').querySelector('.project-title').textContent;
        trackEvent('Project', 'View', projectTitle);
    });
});

// ===================================
// EXPORT FUNCTIONS
// ===================================

window.portfolioFunctions = {
    openModal,
    closeModal,
    trackEvent
};
