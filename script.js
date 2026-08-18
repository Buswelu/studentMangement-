// Smooth scroll kwa navigation links
document.querySelectorAll('nav ul li a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Hero button functionality
document.querySelector('header button').addEventListener('click', () => {
    window.location.href = "portal.html";
});


// Simple animation effect on sections
const sections = document.querySelectorAll('main section');
window.addEventListener('scroll', () => {
    sections.forEach(section => {
        const position = section.getBoundingClientRect().top;
        if (position < window.innerHeight - 100) {
            section.style.opacity = 1;
            section.style.transform = "translateY(0)";
            section.style.transition = "all 0.6s ease-in-out";
        }
    });
});