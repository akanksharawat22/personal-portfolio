// ============================================================
// CONTACT FORM — Formspree
// ============================================================
function sendEmail(e) {
  e.preventDefault();

  const name    = document.getElementById('from_name');
  const email   = document.getElementById('reply_to');
  const subject = document.getElementById('subject');
  const message = document.getElementById('message');

  // Clear previous errors
  [name, email, subject, message].forEach(el => el.classList.remove('error'));
  document.querySelectorAll('.form-error-msg').forEach(el => el.classList.remove('show'));

  // Validate
  let valid = true;
  if (!name.value.trim())         { name.classList.add('error');    document.getElementById('err-name').classList.add('show');    valid = false; }
  if (!email.value.includes('@')) { email.classList.add('error');   document.getElementById('err-email').classList.add('show');   valid = false; }
  if (!subject.value.trim())      { subject.classList.add('error'); document.getElementById('err-subject').classList.add('show'); valid = false; }
  if (!message.value.trim())      { message.classList.add('error'); document.getElementById('err-msg').classList.add('show');     valid = false; }
  if (!valid) return;

  const btn = document.getElementById('send-btn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
  btn.disabled = true;

  fetch("https://formspree.io/f/xvzneoak", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name:    name.value,
      email:   email.value,
      subject: subject.value,
      message: message.value
    })
  })
  .then(res => res.json())
  .then(data => {
    if (data.ok) {
      document.getElementById('form-status').className = 'success';
      document.getElementById('form-status').textContent = '✓ Message sent! I\'ll get back to you soon.';
      [name, email, subject, message].forEach(el => el.value = '');
    } else {
      throw new Error('Failed');
    }
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
  })
  .catch(() => {
    document.getElementById('form-status').className = 'error';
    document.getElementById('form-status').textContent = '✗ Something went wrong. Email me directly at akankshar173@gmail.com';
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.disabled = false;
  });
}

// ============================================================
// AOS — Animate On Scroll
// ============================================================
AOS.init({ duration: 600, easing: 'ease-out', once: true, offset: 60 });

// ============================================================
// LOADER
// ============================================================
window.addEventListener('load', () => {
  setTimeout(() => {
    const loader = document.getElementById('loader');
    loader.classList.add('hide');
    setTimeout(() => loader.remove(), 600);
  }, 1500);
});

// ============================================================
// NAVBAR — Scroll effect
// ============================================================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  document.getElementById('back-top').classList.toggle('show', window.scrollY > 400);
});

// ============================================================
// HAMBURGER MENU
// ============================================================
const ham       = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

ham.addEventListener('click', () => {
  ham.classList.toggle('open');
  mobileNav.classList.toggle('open');
});

document.querySelectorAll('.mobile-nav-link').forEach(link => {
  link.addEventListener('click', () => {
    ham.classList.remove('open');
    mobileNav.classList.remove('open');
  });
});

// ============================================================
// DARK / LIGHT THEME TOGGLE
// ============================================================
const themeBtn   = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme');

if (savedTheme === 'light') {
  document.body.classList.add('light');
  themeBtn.innerHTML = '<i class="fas fa-sun"></i>';
}

themeBtn.addEventListener('click', () => {
  document.body.classList.toggle('light');
  const isLight = document.body.classList.contains('light');
  themeBtn.innerHTML = isLight ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// ============================================================
// BACK TO TOP
// ============================================================
document.getElementById('back-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ============================================================
// SKILL BARS — Animate on scroll
// ============================================================
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.width + '%';
      skillObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach(bar => skillObserver.observe(bar));