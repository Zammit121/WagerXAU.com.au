/* ============================================
   WagerX - JavaScript
   ============================================ */

// ============================================
// DOM Elements
// ============================================
const header = document.getElementById('header');
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav__link');

// ============================================
// Stripe Configuration (Placeholder)
// Replace with your actual Stripe publishable key
// ============================================
const STRIPE_PUBLIC_KEY = 'pk_test_YOUR_STRIPE_PUBLISHABLE_KEY';
const stripe = typeof Stripe !== 'undefined' ? Stripe(STRIPE_PUBLIC_KEY) : null;

// Price IDs for Stripe (replace with your actual price IDs)
const PRICE_IDS = {
    weekly: 'price_weekly_placeholder',
    monthly: 'price_monthly_placeholder'
};

// ============================================
// Header Scroll Effect
// ============================================
function handleScroll() {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleScroll);

// ============================================
// Mobile Navigation
// ============================================
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    const icon = navToggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
        navMenu.classList.remove('active');
        const icon = navToggle.querySelector('i');
        icon.classList.add('fa-bars');
        icon.classList.remove('fa-times');
    }
});

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// Fade-in Animation on Scroll
// ============================================
function initScrollAnimations() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
}

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', initScrollAnimations);

// ============================================
// Payment Modal
// ============================================
const modal = document.getElementById('paymentModal');
const modalPlanTitle = document.getElementById('modalPlanTitle');
const modalPrice = document.getElementById('modalPrice');
let currentPlan = 'weekly';

function handlePayment(plan) {
    currentPlan = plan;
    
    if (plan === 'weekly') {
        modalPlanTitle.textContent = 'Weekly Plan';
        modalPrice.textContent = '$25 AUD/week';
    } else {
        modalPlanTitle.textContent = 'Monthly Plan';
        modalPrice.textContent = '$100 AUD/month';
    }
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Close modal on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

// Process payment and redirect to Discord
function processPayment(event) {
    event.preventDefault();
    
    const payBtn = document.getElementById('payBtn');
    payBtn.classList.add('loading');
    payBtn.innerHTML = 'Processing... <i class="fas fa-spinner"></i>';
    
    // Simulate payment processing then redirect to Discord
    setTimeout(() => {
        window.location.href = 'https://discord.gg/XKvyHPbJ';
    }, 2000);
}

// Make functions available globally
window.handlePayment = handlePayment;
window.closeModal = closeModal;
window.processPayment = processPayment;

// ============================================
// Active Navigation Highlight
// ============================================
function highlightActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// ============================================
// Console Easter Egg
// ============================================
console.log(`
%c⚡ WagerX
%cSmart betting, mate. No BS.

Looking to join the team? Hit us up at info@wagerx.com.au
`, 
'font-size: 24px; font-weight: bold; color: #4CAF50;',
'font-size: 14px; color: #666;'
);

