// ============================================
// PORTFOLIO - QA ENGINEER
// Interactive JavaScript
// ============================================

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
const navLinks = document.getElementById('nav-links');
const hamburger = document.getElementById('hamburger');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ---- Hamburger menu ----
hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen.toString());

  // Animate hamburger lines
  const spans = hamburger.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close menu when clicking a link
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ---- Active nav link on scroll ----
function updateActiveNav() {
  const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
  const scrollPos = window.scrollY + 100;

  sections.forEach(id => {
    const section = document.getElementById(id);
    const navLink = document.querySelector(`a[href="#${id}"]`);
    if (!section || !navLink) return;

    const top = section.offsetTop;
    const bottom = top + section.offsetHeight;

    if (scrollPos >= top && scrollPos < bottom) {
      document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
      navLink.classList.add('active');
    }
  });
}

// ---- Scroll Reveal Animation ----
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// ---- Skill tag hover ripple effect ----
document.querySelectorAll('.skill-tag').forEach(tag => {
  tag.addEventListener('mouseenter', function (e) {
    const rect = this.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(108, 99, 255, 0.2);
      width: 4px;
      height: 4px;
      transform: scale(0);
      animation: rippleEffect 0.5s ease;
      left: ${e.clientX - rect.left}px;
      top: ${e.clientY - rect.top}px;
      pointer-events: none;
    `;
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// Add ripple keyframe
const style = document.createElement('style');
style.textContent = `
  @keyframes rippleEffect {
    to { transform: scale(30); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ---- Smooth number counter animation ----
function animateCounter(el, target, duration = 1500) {
  const start = performance.now();
  const suffix = el.textContent.replace(/[0-9]/g, '');

  function update(time) {
    const elapsed = time - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease out cubic
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }
  requestAnimationFrame(update);
}

// Trigger counters when hero stats come into view
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const statNumbers = entry.target.querySelectorAll('.stat-number');
      const targets = [4, 3, 8, 7];
      statNumbers.forEach((el, i) => {
        animateCounter(el, targets[i]);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ---- Tilt effect on project cards ----
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;

    card.style.transform = `translateY(-6px) perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  card.addEventListener('mouseenter', () => {
    card.style.transition = 'box-shadow 0.3s ease, border-color 0.3s ease';
  });
});

// ---- Timeline card stagger animation ----
const timelineItems = document.querySelectorAll('.timeline-item');
const timelineObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, index) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 100);
      timelineObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

timelineItems.forEach(item => timelineObserver.observe(item));

// ---- Particle / floating dots in background ----
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  for (let i = 0; i < 20; i++) {
    const particle = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const delay = Math.random() * 6;
    const duration = Math.random() * 10 + 8;
    const opacity = Math.random() * 0.3 + 0.05;

    particle.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background: ${Math.random() > 0.5 ? '#6c63ff' : '#00d4aa'};
      left: ${x}%;
      top: ${y}%;
      opacity: ${opacity};
      pointer-events: none;
      animation: particleFloat ${duration}s ease-in-out ${delay}s infinite;
    `;
    hero.appendChild(particle);
  }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes particleFloat {
    0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.1; }
    25% { transform: translateY(-20px) translateX(10px); opacity: 0.3; }
    50% { transform: translateY(-10px) translateX(-15px); opacity: 0.2; }
    75% { transform: translateY(-30px) translateX(5px); opacity: 0.15; }
  }
`;
document.head.appendChild(particleStyle);
createParticles();

// ---- Copy email to clipboard on click ----
const emailLink = document.getElementById('contact-email');
if (emailLink) {
  emailLink.addEventListener('click', (e) => {
    const email = emailLink.href.replace('mailto:', '');
    if (navigator.clipboard && email !== 'your.email@example.com') {
      // Only intercept if it's been updated from placeholder
    }
  });
}

// ---- Smooth scroll with offset for fixed navbar ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();

    const navHeight = navbar.offsetHeight;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});

// ---- Typewriter Effect ----
const typewriterEl = document.getElementById('typewriter-text');
const typewriterPhrases = [
  'Senior QA Engineer',
  'Test Automation Expert',
  'Quality Strategist',
  'CI/CD Integration Specialist',
  'Performance Testing Engineer'
];

let twPhrase = 0;
let twChar = 0;
let twDeleting = false;
let twPause = false;

function typewriterTick() {
  if (!typewriterEl) return;

  const current = typewriterPhrases[twPhrase];

  if (twPause) {
    setTimeout(typewriterTick, 1200);
    twPause = false;
    return;
  }

  if (!twDeleting) {
    typewriterEl.textContent = current.substring(0, twChar + 1);
    twChar++;
    if (twChar === current.length) {
      twDeleting = true;
      twPause = true;
    }
    setTimeout(typewriterTick, 80);
  } else {
    typewriterEl.textContent = current.substring(0, twChar - 1);
    twChar--;
    if (twChar === 0) {
      twDeleting = false;
      twPhrase = (twPhrase + 1) % typewriterPhrases.length;
    }
    setTimeout(typewriterTick, 40);
  }
}

// Start typewriter after hero intro animation
setTimeout(typewriterTick, 800);

// ---- Cursor Spotlight on Hero ----
const heroSection = document.querySelector('.hero');
if (heroSection) {
  // Create spotlight element
  const spotlight = document.createElement('div');
  spotlight.className = 'hero-spotlight';
  spotlight.setAttribute('aria-hidden', 'true');
  heroSection.appendChild(spotlight);

  heroSection.addEventListener('mousemove', (e) => {
    const rect = heroSection.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    spotlight.style.left = x + 'px';
    spotlight.style.top = y + 'px';
  });
}

// ---- Download button pulse on first load ----
const downloadBtn = document.getElementById('hero-download-cv');
if (downloadBtn) {
  setTimeout(() => {
    downloadBtn.style.transition = 'box-shadow 0.4s ease, transform 0.4s ease, border-color 0.4s ease';
    downloadBtn.style.boxShadow = '0 0 0 4px rgba(0, 212, 170, 0.15)';
    setTimeout(() => {
      downloadBtn.style.boxShadow = '';
    }, 700);
  }, 2500);
}

// ---- Page load fade in ----
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
window.addEventListener('load', () => {
  document.body.style.opacity = '1';
});

console.log(
  '%c Hi Fazle! Your portfolio is live ',
  'background: linear-gradient(135deg, #6c63ff, #00d4aa); color: white; padding: 10px 20px; border-radius: 8px; font-size: 14px; font-weight: bold;'
);
console.log(
  '%c Built with pure HTML, CSS & JS — no frameworks needed! ',
  'color: #6c63ff; font-size: 12px;'
);
