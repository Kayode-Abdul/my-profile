// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Enhanced splash screen handler
window.addEventListener('load', () => {
    const splash = document.getElementById('splash');
    if (!splash) return;
    
    // Prevent scrolling while splash is visible
    document.body.style.overflow = 'hidden';
    
    // Wait for animations to complete
    setTimeout(() => {
        splash.style.opacity = '0';
        
        splash.addEventListener('transitionend', () => {
            document.body.style.overflow = '';
            splash.style.display = 'none';
        }, { once: true });
    }, 2000); // Give enough time for the loading animation to complete
});

// Navigation background on scroll
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (!nav) return;
    nav.style.background = window.scrollY > 100 ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)';
});

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-item, .project-card, .experience-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Mobile menu toggle (if needed)
const createMobileMenu = () => {
    const nav = document.querySelector('nav .max-w-7xl');
    const navLinks = document.querySelector('nav .hidden.md\\:flex');
    if (!nav || !navLinks) return;

    if (window.innerWidth <= 768 && !nav.querySelector('button[data-mobile-menu]')) {
        const menuButton = document.createElement('button');
        menuButton.innerHTML = '☰';
        menuButton.className = 'text-2xl md:hidden';
        menuButton.setAttribute('data-mobile-menu', '');
        menuButton.onclick = () => {
            navLinks.classList.toggle('hidden');
            navLinks.classList.toggle('flex');
            navLinks.classList.toggle('flex-col');
            navLinks.classList.toggle('absolute');
            navLinks.classList.toggle('top-full');
            navLinks.classList.toggle('left-0');
            navLinks.classList.toggle('w-full');
            navLinks.classList.toggle('bg-black');
            navLinks.classList.toggle('p-4');
        };
        const flex = nav.querySelector('.flex');
        if (flex) flex.appendChild(menuButton);
    }
};

// Initialize mobile menu on load and resize
window.addEventListener('load', createMobileMenu);
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        const navLinks = document.querySelector('nav .space-x-8');
        if (navLinks) {
            navLinks.className = 'hidden md:flex space-x-8';
        }
    }
});

// Rotating title animation
const initRotatingTitle = () => {
    const titleElement = document.getElementById('rotating-title');
    if (!titleElement) return;

    const titles = ['Software Engineer', 'Full Stack Developer', 'Mobile App Developer'];
    let currentIndex = 0;

    const updateTitle = () => {
        titleElement.style.opacity = '0';
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % titles.length;
            titleElement.textContent = titles[currentIndex];
            titleElement.style.opacity = '1';
        }, 500);
    };

    titleElement.style.transition = 'opacity 0.5s ease';
    setInterval(updateTitle, 3000);
};

window.addEventListener('load', initRotatingTitle);

// Typing effect for hero text (optional enhancement)
const typeWriter = (element, text, speed = 100) => {
    let i = 0;
    if (!element) return;
    element.innerHTML = '';
    const timer = setInterval(() => {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// Enhanced project card interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-8px) scale(1.02)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('#home .relative.z-10');
    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Spline 3D Scene Integration (ESM static import)
import { Application } from 'https://unpkg.com/@splinetool/runtime@latest/build/runtime.js';

const initSpline = async () => {
    try {
        const canvas = document.getElementById('canvas3d');
        if (!canvas) return;

        // Capability check: ensure WebGL is available
        const gl2 = canvas.getContext('webgl2');
        const gl = gl2 || canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
        if (!gl) {
            console.warn('WebGL not available, falling back to iframe.');
            fallbackToIframe(canvas);
            return;
        }

        // Ensure canvas has explicit size to avoid context creation issues
        const resize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect();
            if (rect) {
                canvas.width = Math.max(1, Math.floor(rect.width * window.devicePixelRatio));
                canvas.height = Math.max(1, Math.floor(rect.height * window.devicePixelRatio));
                canvas.style.width = rect.width + 'px';
                canvas.style.height = rect.height + 'px';
            }
        };
        resize();

        const app = new Application(canvas);
        await app.load('https://prod.spline.design/A5Av15Krcvd0Lw8l/scene.splinecode');
        console.log('Spline scene loaded successfully');

        window.addEventListener('resize', () => {
            resize();
            app.resize();
        });
    } catch (error) {
        console.error('Error loading Spline scene:', error);
        const canvas = document.getElementById('canvas3d');
        if (canvas) fallbackToIframe(canvas);
    }
};

// Fallback: replace canvas with an iframe embed to guarantee rendering
const fallbackToIframe = (canvas) => {
    const parent = canvas.parentElement || document.getElementById('home');
    if (!parent) return;
    const iframe = document.createElement('iframe');
    iframe.src = 'https://prod.spline.design/A5Av15Krcvd0Lw8l/scene.splinecode';
    iframe.frameBorder = '0';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    iframe.className = 'w-full h-full';
    canvas.remove();
    parent.appendChild(iframe);
};

// Run after DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSpline);
} else {
    initSpline();
}
