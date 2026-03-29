const navToggle = document.querySelector('#navToggle');
const mainNav = document.querySelector('#mainNav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((button) => button.classList.remove('is-active'));
    chip.classList.add('is-active');

    const selected = chip.dataset.filter;
    projects.forEach((project) => {
      const category = project.dataset.category;
      const shouldShow = selected === 'all' || category === selected;
      project.classList.toggle('is-hidden', !shouldShow);
    });
  });
});

const testimonials = [
  '“Nova Studio transformed our old website into a growth engine. We saw better leads within the first month.”',
  '“Our ecommerce conversion rate increased by 41% after launch. The process was smooth and transparent.”',
  '“From strategy to deployment, the team moved fast and delivered exactly what we needed.”',
];

let quoteIndex = 0;
const testimonialText = document.querySelector('#testimonialText');
const prevQuote = document.querySelector('#prevQuote');
const nextQuote = document.querySelector('#nextQuote');

function renderQuote() {
  if (testimonialText) {
    testimonialText.textContent = testimonials[quoteIndex];
  }
}

if (prevQuote && nextQuote) {
  prevQuote.addEventListener('click', () => {
    quoteIndex = (quoteIndex - 1 + testimonials.length) % testimonials.length;
    renderQuote();
  });

  nextQuote.addEventListener('click', () => {
    quoteIndex = (quoteIndex + 1) % testimonials.length;
    renderQuote();
  });
}

const form = document.querySelector('#contactForm');
const formStatus = document.querySelector('#formStatus');

function setStatus(message, type) {
  if (!formStatus) return;
  formStatus.textContent = message;
  formStatus.classList.remove('error', 'success');
  if (type) formStatus.classList.add(type);
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (name.length < 2) {
      setStatus('Please enter a valid name (at least 2 characters).', 'error');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus('Please enter a valid email address.', 'error');
      return;
    }

    if (message.length < 20) {
      setStatus('Please provide at least 20 characters about your project.', 'error');
      return;
    }

    const inquiries = JSON.parse(localStorage.getItem('novaStudioInquiries') || '[]');
    inquiries.push({ name, email, message, date: new Date().toISOString() });
    localStorage.setItem('novaStudioInquiries', JSON.stringify(inquiries));

    form.reset();
    setStatus('Thanks! Your message has been saved. We will reach out soon.', 'success');
  });
}

const yearTarget = document.querySelector('#year');
if (yearTarget) {
  yearTarget.textContent = String(new Date().getFullYear());
}
