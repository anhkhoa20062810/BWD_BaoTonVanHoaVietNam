// Main JavaScript file

// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('nav');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            nav.classList.toggle('active');
            
            // Change icon
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (nav && nav.classList.contains('active') && !nav.contains(event.target) && !mobileMenuBtn.contains(event.target)) {
            nav.classList.remove('active');
            
            // Reset icon
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Add animations to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.section-header, .collection-card, .feature-card, .map-info, .map-image');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                if (element.classList.contains('section-header')) {
                    element.classList.add('fade-in');
                } else if (element.classList.contains('collection-card') || element.classList.contains('feature-card')) {
                    element.classList.add('slide-up');
                } else if (element.classList.contains('map-info')) {
                    element.classList.add('slide-in-left');
                } else if (element.classList.contains('map-image')) {
                    element.classList.add('slide-in-right');
                }
            }
        });
    };
    
    // Run animation check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Run once on page load
    animateOnScroll();
    
    // Set current year in footer
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});