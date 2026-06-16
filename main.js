import { services, features, steps, checklistItems, faqs, education, memberships, supportOptions } from './js/data.js';
import { initSplineScene } from './js/spline-scene.js';
import {
  initCursor, heroEntrance, initMotionScroll, animateServiceCards,
  animateFeatureCards, animateSteps, animateChecklist, animateStats,
  animateCredentials, initFaqAccordion, initNavbar, initMagneticButtons,
  initTiltCards, initFloatingDecorators
} from './js/animations.js';

// ===== RENDER DYNAMIC CONTENT =====

function renderServices() {
  const grid = document.getElementById('servicesGrid');
  if (!grid) return;
  grid.innerHTML = services.map(s => `
    <div class="service-card">
      <div class="service-icon">${s.icon}</div>
      <h3>${s.title}</h3>
      <p>${s.desc}</p>
      <div class="service-tags">${s.tags.map(t => `<span class="service-tag">${t}</span>`).join('')}</div>
      <a href="#contact" class="btn btn-outline magnetic-btn">${s.cta}</a>
    </div>
  `).join('');
}

function renderFeatures() {
  const grid = document.getElementById('featuresGrid');
  if (!grid) return;
  grid.innerHTML = features.map(f => `
    <div class="feature-card">
      <div class="feature-icon">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join('');
}

function renderSteps() {
  const container = document.getElementById('stepsTimeline');
  if (!container) return;
  container.innerHTML = `
    <div class="step-line-bg"></div>
    <div class="step-line-progress"></div>
    ${steps.map(s => `
      <div class="step-card">
        <div class="step-number">${s.num}</div>
        <h3>${s.title}</h3>
        <p>${s.desc}</p>
      </div>
    `).join('')}
  `;
}

function renderChecklist() {
  const container = document.getElementById('checklist');
  if (!container) return;
  container.innerHTML = checklistItems.map(item => `
    <div class="checklist-item">
      <span class="checklist-icon">✦</span>
      <span>${item}</span>
    </div>
  `).join('');
}

function renderFaqs() {
  const list = document.getElementById('faqList');
  if (!list) return;
  list.innerHTML = faqs.map(f => `
    <div class="faq-item">
      <button class="faq-question">
        <span>${f.q}</span>
        <span class="faq-chevron">▾</span>
      </button>
      <div class="faq-answer"><p>${f.a}</p></div>
    </div>
  `).join('');
}

function renderQualifications() {
  const eduContainer = document.getElementById('qualEducation');
  const memContainer = document.getElementById('qualMemberships');
  const eduCount = document.getElementById('eduCount');
  const memCount = document.getElementById('memCount');

  if (eduContainer) {
    eduContainer.innerHTML = education.map(e => `
      <div class="cred-pill"><span class="cred-pill-icon">◆</span>${e}</div>
    `).join('');
  }

  if (memContainer) {
    memContainer.innerHTML = memberships.map(m => `
      <div class="cred-pill"><span class="cred-pill-icon">◆</span>${m}</div>
    `).join('');
  }

  // Set counter targets for animation
  if (eduCount) eduCount.dataset.target = education.length;
  if (memCount) memCount.dataset.target = memberships.length;
}

function renderSupportCheckboxes() {
  const container = document.getElementById('supportCheckboxes');
  if (!container) return;
  container.innerHTML = supportOptions.map(opt => `
    <label class="checkbox-label"><input type="checkbox" name="support" value="${opt}" /> ${opt}</label>
  `).join('');
}

// ===== FORM HANDLER =====
function initForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Submitted!';
    btn.style.background = 'var(--primary-brand)';
    setTimeout(() => {
      btn.textContent = 'Book My Consultation';
      btn.style.background = '';
      form.reset();
    }, 3000);
  });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', () => {
  // Render content first
  renderServices();
  renderFeatures();
  renderSteps();
  renderChecklist();
  renderFaqs();
  renderQualifications();
  renderSupportCheckboxes();

  // Init core interactions
  initSplineScene();
  initCursor();
  initNavbar();
  initSmoothScroll();
  initForm();
  initFaqAccordion();
  initMagneticButtons();
  initTiltCards();
  initFloatingDecorators();

  // Hero entrance (slightly delayed for fonts/spline)
  setTimeout(() => heroEntrance(), 500);

  // Scroll-triggered animations
  initMotionScroll();
  animateServiceCards();
  animateFeatureCards();
  animateSteps();
  animateChecklist();
  animateStats();
  animateCredentials();
});
