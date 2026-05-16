// Initialize AOS Animation Library
AOS.init({
  duration: 700,
  easing: 'ease-out-cubic',
  once: false,
  mirror: true,
  offset: 80,
});

// Sticky navbar effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.boxShadow = '0 4px 24px rgba(0,0,0,0.06)';
  } else {
    navbar.style.boxShadow = 'none';
  }
});

// Smooth active nav link update
const sections = document.querySelectorAll('section, header');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Smooth scroll for navigation links
document.querySelectorAll('.nav-link, .cta-primary, .cta-secondary').forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Update URL without jumping
        history.pushState(null, null, href);
      }
    }
  });
});

// Ticket button alert (demo purpose)
const buyButtons = document.querySelectorAll('.buy-btn');
buyButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    alert('Terima kasih! Halaman pemesanan tiket akan segera tersedia. 🎫✨');
  });
});