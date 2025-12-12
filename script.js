document.addEventListener('DOMContentLoaded', () => {
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
      const targetId = link.getAttribute('href');
      const targetEl = document.querySelector(targetId);
      if (targetId !== '#' && targetEl) {
        event.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Tooltip hydration
  document.querySelectorAll('.tooltip').forEach(el => {
    const tip = el.getAttribute('data-tip');
    if (tip) {
      const bubble = document.createElement('span');
      bubble.textContent = tip;
      el.appendChild(bubble);
    }
  });

  // Mobile nav toggle
  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('is-open');
    });
  }

  // Interactive cards - expand/collapse
  document.querySelectorAll('.interactive-card').forEach(card => {
    const toggleBtn = card.querySelector('.card-toggle');
    if (toggleBtn) {
      toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        card.classList.toggle('expanded');
        const isExpanded = card.classList.contains('expanded');
        toggleBtn.textContent = isExpanded ? 'Show less ↑' : 'Learn more ↓';
      });
    }
  });

  // Checklist progress tracking
  const checkboxes = document.querySelectorAll('.tip-checkbox');
  const progressCount = document.getElementById('progress-count');
  let hasTriggeredCelebration = false;
  
  function updateProgress() {
    const checked = document.querySelectorAll('.tip-checkbox:checked').length;
    if (progressCount) {
      progressCount.textContent = checked;
    }
    
    // Trigger party popper effect when all checkboxes are checked
    if (checked === checkboxes.length && !hasTriggeredCelebration) {
      hasTriggeredCelebration = true;
      triggerPartyPopper();
    } else if (checked < checkboxes.length) {
      hasTriggeredCelebration = false;
    }
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });

  // Party popper effect
  function triggerPartyPopper() {
    const colors = ['#0ea5e9', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#06b6d4', '#f97316'];
    const particleCount = 100;
    
    for (let i = 0; i < particleCount; i++) {
      createParticle(colors);
    }
  }

  function createParticle(colors) {
    const particle = document.createElement('div');
    particle.className = 'party-particle';
    
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 8 + 4;
    const startX = Math.random() * window.innerWidth;
    const startY = -10;
    const endX = (Math.random() - 0.5) * 400;
    const rotation = Math.random() * 720 + 360;
    const duration = Math.random() * 2 + 2;
    const delay = Math.random() * 0.5;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor = color;
    particle.style.left = `${startX}px`;
    particle.style.top = `${startY}px`;
    particle.style.setProperty('--end-x', `${endX}px`);
    particle.style.setProperty('--rotation', `${rotation}deg`);
    particle.style.animationDuration = `${duration}s`;
    particle.style.animationDelay = `${delay}s`;
    
    // Random shape (circle or square)
    if (Math.random() > 0.5) {
      particle.style.borderRadius = '50%';
    }
    
    document.body.appendChild(particle);
    
    // Remove particle after animation
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
      }
    }, (duration + delay) * 1000);
  }

  // Scroll animations - enter and exit
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, observerOptions);

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

  // Observe all sections
  document.querySelectorAll('.section').forEach(section => {
    sectionObserver.observe(section);
  });

  // Observe all cards
  document.querySelectorAll('.card').forEach(card => {
    cardObserver.observe(card);
  });

  // Initial visibility for hero section
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.opacity = '1';
    hero.style.transform = 'translateY(0)';
  }
});

