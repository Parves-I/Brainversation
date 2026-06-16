import anime from 'animejs';
import { inView, animate, scroll } from 'motion';
import VanillaTilt from 'vanilla-tilt';

// Custom cursor
export function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  let mx = 0, my = 0, dx = 0, dy = 0, rx = 0, ry = 0;

  document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });

  function update() {
    dx += (mx - dx) * 0.2;
    dy += (my - dy) * 0.2;
    rx += (mx - rx) * 0.08;
    ry += (my - ry) * 0.08;
    dot.style.transform = `translate(${dx}px, ${dy}px) translate(-50%, -50%)`;
    ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
    requestAnimationFrame(update);
  }
  update();

  // Rebind cursor hover targets after dynamic content renders
  setTimeout(() => bindCursorHovers(), 600);
}

function bindCursorHovers() {
  const ring = document.getElementById('cursorRing');
  if (!ring) return;
  document.querySelectorAll('a, button, .magnetic-btn, .faq-question, .cred-pill').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hover'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
  });
}

// Hero load animation timeline (Anime.js)
export function heroEntrance() {
  const tl = anime.timeline({ easing: 'easeOutExpo' });

  tl.add({
    targets: '#navLogo',
    opacity: [0, 1],
    translateY: [-20, 0],
    duration: 800,
  })
  .add({
    targets: '.nav-link',
    opacity: [0, 1],
    translateY: [-15, 0],
    delay: anime.stagger(60),
    duration: 600,
  }, '-=500')
  .add({
    targets: '.hero-eyebrow',
    opacity: [0, 1],
    translateY: [20, 0],
    duration: 800,
  }, '-=400')
  .add({
    targets: '.hero-title',
    opacity: [0, 1],
    translateY: [40, 0],
    duration: 1000,
  }, '-=500')
  .add({
    targets: '.hero-subtitle',
    opacity: [0, 1],
    translateY: [30, 0],
    duration: 800,
  }, '-=600')
  .add({
    targets: '.hero-cta .btn',
    opacity: [0, 1],
    scale: [0.8, 1],
    delay: anime.stagger(120),
    duration: 700,
    easing: 'spring(1, 80, 10, 0)',
  }, '-=500')
  .add({
    targets: '.trust-item',
    opacity: [0, 1],
    translateY: [20, 0],
    delay: anime.stagger(80),
    duration: 600,
  }, '-=400')
  .add({
    targets: '#scrollIndicator',
    opacity: [0, 1],
    duration: 800,
  }, '-=300');
}

// Motion (Framer Motion Vanilla) Scroll Animations
export function initMotionScroll() {
  inView('[data-motion="fade-up"]', (el) => {
    animate(el, { opacity: [0, 1], y: [50, 0] }, { duration: 0.9, delay: parseFloat(el.dataset.delay) || 0, easing: [0.16, 1, 0.3, 1] });
  });

  inView('[data-motion="fade-left"]', (el) => {
    animate(el, { opacity: [0, 1], x: [60, 0] }, { duration: 0.9, delay: parseFloat(el.dataset.delay) || 0, easing: [0.16, 1, 0.3, 1] });
  });

  inView('[data-motion="fade-right"]', (el) => {
    animate(el, { opacity: [0, 1], x: [-60, 0] }, { duration: 0.9, delay: parseFloat(el.dataset.delay) || 0, easing: [0.16, 1, 0.3, 1] });
  });

  // Parallax Images
  document.querySelectorAll('[data-motion="parallax"]').forEach(el => {
    const img = el.querySelector('img');
    if(img) {
      scroll(animate(img, { y: ["-10%", "10%"] }), {
        target: el,
        offset: ["start end", "end start"]
      });
    }
  });

  // Background Parallax
  document.querySelectorAll('[data-motion="bg-parallax"]').forEach(el => {
    scroll(animate(el, { y: ["0%", "20%"] }), {
      target: document.body,
      offset: ["start start", "end end"]
    });
  });

  // Psychologist photo frame animation
  const photoFrame = document.querySelector('.psych-photo-frame');
  if (photoFrame) {
    inView('.psych-photo-wrapper', () => {
      anime({
        targets: photoFrame,
        opacity: [0, 1],
        scale: [0.9, 1],
        duration: 1000,
        delay: 300,
        easing: 'easeOutExpo',
      });
    });
  }
}

// Service cards stagger entrance (Motion)
export function animateServiceCards() {
  inView('.services-grid', (el) => {
    const cards = el.querySelectorAll('.service-card');
    animate(cards, 
      { opacity: [0, 1], y: [60, 0], scale: [0.92, 1] }, 
      { duration: 0.9, delay: (i) => i * 0.08, easing: [0.16, 1, 0.3, 1] }
    );
  });
}

// Feature cards stagger (Motion)
export function animateFeatureCards() {
  inView('.features-grid', (el) => {
    const cards = el.querySelectorAll('.feature-card');
    animate(cards, 
      { opacity: [0, 1], y: [40, 0] }, 
      { duration: 0.8, delay: (i) => i * 0.1, easing: [0.16, 1, 0.3, 1] }
    );
  });
}

// Steps timeline animation (Scroll-driven Scrollytelling)
export function animateSteps() {
  const scrollContainer = document.getElementById('approachScroll');
  if (!scrollContainer) return;
  
  const line = document.querySelector('.step-line-progress');
  const cards = document.querySelectorAll('.step-card');
  const numbers = document.querySelectorAll('.step-number');

  if (line) {
    scroll(
      animate(line, { scaleX: [0, 1] }),
      {
        target: scrollContainer,
        offset: ["start center", "end center"]
      }
    );
  }

  cards.forEach((card, i) => {
    const startProgress = i * 20; 
    const endProgress = startProgress + 20; 
    
    const startStr = `${startProgress}% center`;
    const endStr = `${endProgress}% center`;
    
    scroll(
      animate(card, { opacity: [0.1, 1], y: [40, 0] }),
      {
        target: scrollContainer,
        offset: [startStr, endStr]
      }
    );
    
    const num = numbers[i];
    if (num) {
      scroll(
        animate(num, { 
          scale: [0.5, 1], 
          rotate: ['-180deg', '0deg'], 
          backgroundColor: ['#465B54', '#6A9B8D'],
          color: ['#F5F2EB', '#ffffff']
        }),
        {
          target: scrollContainer,
          offset: [startStr, endStr]
        }
      );
    }
  });
}

// Checklist items stagger (Motion)
export function animateChecklist() {
  inView('#checklist', (el) => {
    const items = el.querySelectorAll('.checklist-item');
    animate(items, { opacity: [0, 1], x: [-30, 0] }, { duration: 0.7, delay: (i) => i * 0.1 });
  });
}

// Stats counter animation
export function animateStats() {
  inView('#statsBar', () => {
    document.querySelectorAll('.stat-number').forEach(el => {
      const target = parseInt(el.dataset.target);
      anime({
        targets: el,
        innerText: [0, target],
        round: 1,
        duration: 2000,
        easing: 'easeOutExpo',
        update: function() {
          el.textContent = Math.round(parseFloat(el.innerText || 0));
        }
      });
    });
  });
}

// Credential pill animations
export function animateCredentials() {
  inView('.credentials-layout', () => {
    const pills = document.querySelectorAll('.cred-pill');
    anime({
      targets: pills,
      opacity: [0, 1],
      translateY: [20, 0],
      scale: [0.85, 1],
      delay: anime.stagger(60, { start: 200 }),
      duration: 600,
      easing: 'spring(1, 80, 12, 0)',
    });

    // Animate the counters
    const eduCount = document.getElementById('eduCount');
    const memCount = document.getElementById('memCount');
    if (eduCount) {
      anime({ targets: { val: 0 }, val: parseInt(eduCount.dataset.target || 9), round: 1, duration: 1500, easing: 'easeOutExpo', update: (anim) => { eduCount.textContent = Math.round(anim.animations[0].currentValue); } });
    }
    if (memCount) {
      anime({ targets: { val: 0 }, val: parseInt(memCount.dataset.target || 4), round: 1, duration: 1500, easing: 'easeOutExpo', update: (anim) => { memCount.textContent = Math.round(anim.animations[0].currentValue); } });
    }
  });
}

// FAQ accordion
export function initFaqAccordion() {
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.parentElement;
      const wasOpen = item.classList.contains('open');

      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));

      if (!wasOpen) {
        item.classList.add('open');
        // Animate the answer appearing
        const answer = item.querySelector('.faq-answer');
        if (answer) {
          anime({
            targets: answer.querySelector('p'),
            opacity: [0, 1],
            translateY: [-10, 0],
            duration: 400,
            easing: 'easeOutExpo',
          });
        }
      }
    });
  });
}

// Navbar scroll behavior
export function initNavbar() {
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile toggle
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => links.classList.toggle('open'));
    links.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => links.classList.remove('open'));
    });
  }
}

// Magnetic button effect (Anime.js)
export function initMagneticButtons() {
  document.querySelectorAll('.magnetic-btn').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      anime({
        targets: btn,
        translateX: 0,
        translateY: 0,
        duration: 600,
        easing: 'spring(1, 80, 10, 0)',
      });
    });
  });
}

// 3D Tilt Effect
export function initTiltCards() {
  VanillaTilt.init(document.querySelectorAll(".service-card, .feature-card, .psych-photo-wrapper, .glass-card, .cred-card"), {
    max: 6,
    speed: 400,
    glare: true,
    "max-glare": 0.12,
    perspective: 1200,
  });
}

// Floating decorators parallax on scroll
export function initFloatingDecorators() {
  const shapes = document.querySelectorAll('.float-shape');
  if (!shapes.length) return;
  
  shapes.forEach((shape, i) => {
    const speed = 0.02 + (i * 0.008);
    const direction = i % 2 === 0 ? 1 : -1;
    
    scroll(animate(shape, {
      y: [`${direction * -30}px`, `${direction * 30}px`],
      rotate: [`${direction * -10}deg`, `${direction * 10}deg`],
    }), {
      offset: ["start start", "end end"]
    });
  });
}
