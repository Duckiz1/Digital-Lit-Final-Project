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
  
  function updateProgress() {
    const checked = document.querySelectorAll('.tip-checkbox:checked').length;
    if (progressCount) {
      progressCount.textContent = checked;
    }
  }

  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateProgress);
  });

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

