// ===== THEME TOGGLE =====
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');

// Load saved preference
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light');
  themeIcon.classList.replace('fa-sun', 'fa-moon');
}

themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeIcon.classList.replace(isLight ? 'fa-sun' : 'fa-moon', isLight ? 'fa-moon' : 'fa-sun');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});


const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

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

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinksList = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinksList.classList.toggle('open');

  // Animate hamburger lines
  const spans = hamburger.querySelectorAll('span');
  if (navLinksList.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
navLinksList.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksList.classList.remove('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===== SCROLL REVEAL =====
const reveals = document.querySelectorAll('.section-header, .about-content, .skill-card, .project-card, .contact-form, .footer-left, .footer-right');
reveals.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger delay for cards
      const cards = document.querySelectorAll('.skill-card, .project-card');
      if (Array.from(cards).includes(entry.target)) {
        const siblings = entry.target.parentElement.children;
        const idx = Array.from(siblings).indexOf(entry.target);
        entry.target.style.transitionDelay = `${idx * 80}ms`;
      }
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

// ===== SKILL BAR ANIMATION =====
const skillFills = document.querySelectorAll('.skill-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const fill = entry.target;
      const targetWidth = fill.getAttribute('data-width');
      setTimeout(() => {
        fill.style.width = targetWidth + '%';
      }, 200);
      skillObserver.unobserve(fill);
    }
  });
}, { threshold: 0.5 });

skillFills.forEach(fill => skillObserver.observe(fill));

// ===== CONTACT FORM SUBMIT =====
const submitBtn = document.getElementById('submitBtn');
submitBtn.addEventListener('click', () => {
  const inputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');
  let allFilled = true;

  inputs.forEach(input => {
    if (!input.value.trim()) {
      allFilled = false;
      input.style.borderColor = '#c0392b';
      setTimeout(() => {
        input.style.borderColor = '';
      }, 1500);
    }
  });

  if (allFilled) {
    submitBtn.textContent = 'Message Sent ✓';
    submitBtn.style.background = '#27ae60';
    submitBtn.style.color = '#fff';
    setTimeout(() => {
      submitBtn.textContent = 'Get In Touch';
      submitBtn.style.background = '';
      submitBtn.style.color = '';
      inputs.forEach(input => input.value = '');
    }, 2500);
  }
});

// ===== SMOOTH SCROLL OFFSET (for fixed navbar) =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
