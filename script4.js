// Sticky navbar effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

mobileMenuBtn.addEventListener('click', function() {
  navLinks.classList.toggle('active');
  const icon = mobileMenuBtn.querySelector('i');
  if (navLinks.classList.contains('active')) {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  } else {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  }
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    const icon = mobileMenuBtn.querySelector('i');
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  });
});

// Smooth scroll for anchor links
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

// Countdown Timer
(function() {
  const now = new Date();
  const target = new Date(now);
  target.setDate(target.getDate() + 12);
  target.setHours(target.getHours() + 17);
  target.setMinutes(target.getMinutes() + 45);
  target.setSeconds(target.getSeconds() + 3);

  function updateTimer() {
    const current = new Date();
    const diff = target - current;
    
    if (diff <= 0) {
      document.getElementById('comingSoonTimer').innerText = "00 : 00 : 00 : 00";
      return;
    }
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    
    const format = (n) => n.toString().padStart(2, '0');
    document.getElementById('comingSoonTimer').innerText = 
      `${format(days)} : ${format(hours)} : ${format(minutes)} : ${format(seconds)}`;
  }
  
  updateTimer();
  setInterval(updateTimer, 1000);
})();