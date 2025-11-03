// Mobile Menu Toggle
const menuBtn = document.getElementById('menu-btn');
const menu = document.getElementById('menu');

menuBtn.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Close menu when clicking a link
document.querySelectorAll('#menu a').forEach(link => {
  link.addEventListener('click', () => {
    menu.classList.remove('show');
  });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;

    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Header Scroll Effect
const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 100) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }

  lastScroll = currentScroll;
});

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  const updateCounter = () => {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  };

  updateCounter();
}

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.2,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('aos-animate');

      // Trigger counter animation for stats
      if (entry.target.classList.contains('stat-number')) {
        const target = parseInt(entry.target.dataset.target);
        animateCounter(entry.target, target);
      }

      // Don't observe again after animation
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all elements with data-aos attribute
document.querySelectorAll('[data-aos]').forEach(element => {
  observer.observe(element);
});

// Observe stat numbers
document.querySelectorAll('.stat-number').forEach(element => {
  observer.observe(element);
});

// Testimonial Slider
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');

function showTestimonial(index) {
  testimonials.forEach((testimonial, i) => {
    testimonial.classList.remove('active');
    if (i === index) {
      testimonial.classList.add('active');
    }
  });

  dots.forEach((dot, i) => {
    dot.classList.remove('active');
    if (i === index) {
      dot.classList.add('active');
    }
  });

  currentTestimonial = index;
}

// Auto-rotate testimonials
let testimonialInterval = setInterval(() => {
  currentTestimonial = (currentTestimonial + 1) % testimonials.length;
  showTestimonial(currentTestimonial);
}, 5000);

// Dot navigation
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    showTestimonial(index);
    // Reset auto-rotate timer
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(() => {
      currentTestimonial = (currentTestimonial + 1) % testimonials.length;
      showTestimonial(currentTestimonial);
    }, 5000);
  });
});

// Contact Form Validation and Handling
const contactForm = document.getElementById('contact-form');
const formSuccess = document.querySelector('.form-success');

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[\d\s\-\+\(\)]+$/;

function validateField(input, regex = null) {
  const value = input.value.trim();
  const formGroup = input.closest('.form-group');
  const errorSpan = formGroup.querySelector('.form-error');

  let isValid = true;
  let errorMessage = '';

  if (!value) {
    isValid = false;
    errorMessage = 'This field is required';
  } else if (input.type === 'email' && !emailRegex.test(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid email address';
  } else if (input.id === 'phone' && !phoneRegex.test(value)) {
    isValid = false;
    errorMessage = 'Please enter a valid phone number';
  } else if (input.id === 'name' && value.length < 2) {
    isValid = false;
    errorMessage = 'Name must be at least 2 characters';
  } else if (input.id === 'message' && value.length < 10) {
    isValid = false;
    errorMessage = 'Message must be at least 10 characters';
  }

  if (!isValid) {
    formGroup.classList.add('error');
    errorSpan.textContent = errorMessage;
  } else {
    formGroup.classList.remove('error');
    errorSpan.textContent = '';
  }

  return isValid;
}

// Real-time validation
contactForm.querySelectorAll('input, textarea').forEach(input => {
  input.addEventListener('blur', () => {
    validateField(input);
  });

  input.addEventListener('input', () => {
    // Remove error state while typing
    const formGroup = input.closest('.form-group');
    if (formGroup.classList.contains('error') && input.value.trim()) {
      validateField(input);
    }
  });
});

// Form submission
contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Validate all fields
  const inputs = contactForm.querySelectorAll('input, textarea');
  let isFormValid = true;

  inputs.forEach(input => {
    if (!validateField(input)) {
      isFormValid = false;
    }
  });

  if (!isFormValid) {
    return;
  }

  // Show loading state
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  // Simulate form submission (replace with actual API call)
  await new Promise(resolve => setTimeout(resolve, 1500));

  // Show success message
  formSuccess.classList.add('show');
  submitBtn.classList.remove('loading');
  submitBtn.disabled = false;

  // Reset form
  contactForm.reset();

  // Hide success message after 5 seconds
  setTimeout(() => {
    formSuccess.classList.remove('show');
  }, 5000);
});

// Scroll to Top Button
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 500) {
    scrollTopBtn.classList.add('visible');
  } else {
    scrollTopBtn.classList.remove('visible');
  }
});

scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Update copyright year
document.getElementById('year').textContent = new Date().getFullYear();

// Add fade-in class to initial visible elements
window.addEventListener('load', () => {
  const fadeElements = document.querySelectorAll('.fade-in');
  fadeElements.forEach((element, index) => {
    setTimeout(() => {
      element.style.opacity = '1';
    }, index * 100);
  });
});

// Parallax effect for hero section
let ticking = false;

window.addEventListener('scroll', () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      const scrolled = window.pageYOffset;
      const heroSection = document.querySelector('.hero');

      if (heroSection && scrolled < heroSection.offsetHeight) {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
          heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
          heroContent.style.opacity = 1 - (scrolled / heroSection.offsetHeight);
        }
      }

      ticking = false;
    });

    ticking = true;
  }
});

// Add hover effect to cards
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', function () {
    this.style.transition = 'all 0.3s ease';
  });
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  // Escape key closes mobile menu
  if (e.key === 'Escape' && menu.classList.contains('show')) {
    menu.classList.remove('show');
  }
});

// Prevent default form submission on Enter key in inputs (except textarea)
contactForm.querySelectorAll('input').forEach(input => {
  input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const nextInput = input.closest('.form-group').nextElementSibling?.querySelector('input, textarea');
      if (nextInput) {
        nextInput.focus();
      }
    }
  });
});

console.log('🎉 RPS Attorneys website loaded successfully!');
console.log('💼 Professional legal services at your fingertips');