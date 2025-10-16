// Hero Slider
let slideIndex = 0;
const showSlides = () => {
  const slides = document.querySelectorAll(".slides");
  slides.forEach(s => s.style.display = "none");
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex-1].style.display = "block";
  setTimeout(showSlides, 4000);
};
showSlides();

// Scroll Animations
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
});
document.querySelectorAll(".fade-in, .slide-up").forEach(el => observer.observe(el));

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById("mobileMenuToggle");
const mobileMenu = document.getElementById("mobileMenu");

mobileMenuToggle.addEventListener("click", () => {
  mobileMenuToggle.classList.toggle("active");
  mobileMenu.classList.toggle("active");
});

// Mobile Dropdown Toggle
document.querySelectorAll(".mobile-dropdown-toggle").forEach(toggle => {
  toggle.addEventListener("click", (e) => {
    e.preventDefault();
    const dropdown = toggle.nextElementSibling;
    dropdown.classList.toggle("active");
  });
});

// Modal
const modal = document.getElementById("appointmentModal");
const btn = document.getElementById("bookBtn");
const mobileBtn = document.querySelector(".mobile-book-btn");
const closeBtn = document.querySelector(".close");

const openModal = () => {
  modal.style.display = "flex";
  // Close mobile menu if open
  mobileMenu.classList.remove("active");
  mobileMenuToggle.classList.remove("active");
};

const scrollToContactForm = () => {
  // Close mobile menu if open
  mobileMenu.classList.remove("active");
  mobileMenuToggle.classList.remove("active");
  
  // Scroll to contact section
  const contactSection = document.getElementById('contact');
  if (contactSection) {
    contactSection.scrollIntoView({ 
      behavior: 'smooth', 
      block: 'start' 
    });
    
    // Focus on the first form input after scrolling
    setTimeout(() => {
      const firstInput = document.getElementById('contactFirstName');
      if (firstInput) {
        firstInput.focus();
        firstInput.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'center' 
        });
      }
    }, 800);
  }
};

// Update button click handlers
btn.onclick = scrollToContactForm;
if (mobileBtn) mobileBtn.onclick = scrollToContactForm;
closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => { if (e.target == modal) modal.style.display = "none"; };

// Testimonial Slider
let currentTestimonialSlide = 0;
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const testimonialDots = document.querySelectorAll(".dot");

const showTestimonialSlide = (index) => {
  // Hide all slides
  testimonialSlides.forEach(slide => slide.classList.remove("active"));
  testimonialDots.forEach(dot => dot.classList.remove("active"));
  
  // Show current slide
  testimonialSlides[index].classList.add("active");
  testimonialDots[index].classList.add("active");
};

const nextTestimonialSlide = () => {
  currentTestimonialSlide++;
  if (currentTestimonialSlide >= testimonialSlides.length) {
    currentTestimonialSlide = 0;
  }
  showTestimonialSlide(currentTestimonialSlide);
};

// Auto-scroll every 6 seconds
let testimonialInterval = setInterval(nextTestimonialSlide, 6000);

// Dot navigation
testimonialDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentTestimonialSlide = index;
    showTestimonialSlide(currentTestimonialSlide);
    // Reset interval
    clearInterval(testimonialInterval);
    testimonialInterval = setInterval(nextTestimonialSlide, 6000);
  });
});

// Initialize first slide
showTestimonialSlide(0);

// Client Slider
let currentClientSlide = 0;
const clientSlides = document.querySelectorAll(".clients-slide");
const clientDots = document.querySelectorAll(".client-dot");

const showClientSlide = (index) => {
  // Hide all slides
  clientSlides.forEach(slide => slide.classList.remove("active"));
  clientDots.forEach(dot => dot.classList.remove("active"));
  
  // Show current slide
  clientSlides[index].classList.add("active");
  clientDots[index].classList.add("active");
};

const nextClientSlide = () => {
  currentClientSlide++;
  if (currentClientSlide >= clientSlides.length) {
    currentClientSlide = 0;
  }
  showClientSlide(currentClientSlide);
};

// Auto-scroll every 6 seconds
let clientInterval = setInterval(nextClientSlide, 6000);

// Dot navigation for clients
clientDots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    currentClientSlide = index;
    showClientSlide(currentClientSlide);
    // Reset interval
    clearInterval(clientInterval);
    clientInterval = setInterval(nextClientSlide, 6000);
  });
});

// Initialize first client slide
showClientSlide(0);

// Contact Form Functionality
const contactForm = document.getElementById('contactForm');
const serviceSelect = document.getElementById('contactService');
const customServiceGroup = document.getElementById('customServiceGroup');

// Show/hide custom service input based on dropdown selection
if (serviceSelect && customServiceGroup) {
  serviceSelect.addEventListener('change', function() {
    if (this.value === 'Other') {
      customServiceGroup.style.display = 'block';
      customServiceGroup.style.animation = 'fadeInUp 0.3s ease-out';
      const customServiceInput = document.getElementById('customService');
      if (customServiceInput) {
        customServiceInput.setAttribute('required', '');
      }
    } else {
      customServiceGroup.style.display = 'none';
      const customServiceInput = document.getElementById('customService');
      if (customServiceInput) {
        customServiceInput.removeAttribute('required');
      }
    }
  });
}

// Form validation and submission
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    // Clear previous errors
    clearErrors();
    // Get form data
    const formData = new FormData(this);
    const name = formData.get('name')?.trim() || '';
    const phone = formData.get('phone')?.trim() || '';
    const email = formData.get('email')?.trim() || '';
    const service = formData.get('service');
    const customService = formData.get('custom_service');
    let isValid = true;
    // Validate name
    if (!name) {
      showError('nameError', 'Name is required');
      isValid = false;
    }
    // Validate phone
    if (!phone) {
      showError('phoneError', 'Phone number is required');
      isValid = false;
    } else if (!/^[\+]?[\d\s\-\(\)]{10,}$/.test(phone)) {
      showError('phoneError', 'Please enter a valid phone number');
      isValid = false;
    }
    // Validate email
    if (!email) {
      showError('emailError', 'Email is required');
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('emailError', 'Please enter a valid email address');
      isValid = false;
    }
    if (isValid) {
      // Prepare service details for submission
      let serviceDetails = service;
      if (service === 'Other' && customService) {
        serviceDetails = `Other: ${customService.trim()}`;
      }
      const serviceInfoField = document.getElementById('serviceInfo');
      if (serviceInfoField) {
        serviceInfoField.value = serviceDetails;
      }
      // Show loading state
      const submitBtn = this.querySelector('.contact-submit-btn');
      const btnText = submitBtn.querySelector('span');
      const btnLoader = submitBtn.querySelector('.btn-loader');
      btnText.style.display = 'none';
      btnLoader.style.display = 'block';
      submitBtn.disabled = true;
      // Submit to Web3Forms
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: new FormData(this)
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          alert('Thank you for your message! We will get back to you soon.');
          // Reset form
          contactForm.reset();
          customServiceGroup.style.display = 'none';
          document.getElementById('customService').removeAttribute('required');
        } else {
          alert('There was an error sending your message. Please try again.');
        }
      })
      .catch(error => {
        console.error('Error:', error);
        alert('There was an error sending your message. Please try again.');
      })
      .finally(() => {
        // Reset button state
        btnText.style.display = 'block';
        btnLoader.style.display = 'none';
        submitBtn.disabled = false;
      });
    }
  });
}

function showError(elementId, message) {
  const errorElement = document.getElementById(elementId);
  const inputElement = errorElement.parentElement.querySelector('input, select');
  
  errorElement.textContent = message;
  errorElement.classList.add('show');
  inputElement.classList.add('error');
}

function clearErrors() {
  const errorMessages = document.querySelectorAll('.error-message');
  const errorInputs = document.querySelectorAll('.error');
  
  errorMessages.forEach(error => {
    error.classList.remove('show');
    error.textContent = '';
  });
  
  errorInputs.forEach(input => {
    input.classList.remove('error');
  });
}

// Counter Animation
const counters = document.querySelectorAll(".count");
const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = +el.getAttribute("data-target");
      let count = 0;
      const increment = target / 100;
      const speed = 30;
      
      // Add animation class for visual effect
      el.style.animation = 'countUp 0.6s ease-out';
      
      const update = () => {
        count += increment;
        if (count >= target) {
          el.innerText = target;
          // Add pulse effect when animation completes
          el.parentElement.style.transform = 'scale(1.1)';
          setTimeout(() => {
            el.parentElement.style.transform = 'scale(1)';
          }, 200);
        } else {
          el.innerText = Math.floor(count);
          setTimeout(update, speed);
        }
      };
      
      // Start animation after a small delay for better visual effect
      setTimeout(update, 300);
      counterObserver.unobserve(el);
    }
  });
});
counters.forEach(c => counterObserver.observe(c));
