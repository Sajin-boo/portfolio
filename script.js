const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const contactForm = document.getElementById('contactForm');

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
}

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    menuToggle.classList.remove('active');
    navMenu.classList.remove('active');
    navLinks.forEach(item => item.classList.remove('active'));
    link.classList.add('active');
  });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

function highlightNavOnScroll() {
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= (sectionTop - 150)) {
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
}
highlightNavOnScroll();

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    if (name === '' || email === '' || subject === '' || message === '') {
      alert('Please fill in all fields');
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert('Please enter a valid email address');
      return;
    }
    alert('Your message has been sent successfully!');
    contactForm.reset();
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const animateElements = document.querySelectorAll('.service-item, .resume-item, .skill-category');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, { threshold: 0.1 });
  animateElements.forEach(element => {
    observer.observe(element);
    element.classList.add('fadeInUp');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .fadeInUp {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    .service-item:nth-child(2),
    .resume-item:nth-child(2),
    .skill-category:nth-child(2) {
      transition-delay: 0.2s;
    }
    .service-item:nth-child(3),
    .resume-item:nth-child(3),
    .skill-category:nth-child(3) {
      transition-delay: 0.4s;
    }
  `;
  document.head.appendChild(style);
});

document.addEventListener('DOMContentLoaded', () => {
  const yearElements = document.querySelectorAll('.footer-content p');
  yearElements.forEach(element => {
    const content = element.textContent;
    if (content.includes('©')) {
      element.textContent = content.replace(/\d{4}/, new Date().getFullYear());
    }
  });
});