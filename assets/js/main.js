/* ==========================================================================
   PEST CONTROL & FUMIGATION COMPANY - CORE JAVASCRIPT CONTROLLER
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // 1. INITIALIZE LUCIDE ICONS
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 2. THEME SWITCHER CONTROLLER
  const themeToggleBtns = document.querySelectorAll('.theme-toggle');
  
  // Set initial icon states & DOM class based on localStorage
  const currentTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', currentTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = activeTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  });

  // 3. RESPONSIVE MOBILE NAVIGATION DRAWER
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const body = document.body;

  // Create overlay if not exists
  let overlay = document.querySelector('.menu-overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'menu-overlay';
    body.appendChild(overlay);
  }

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isActive = navMenu.classList.toggle('active');
      overlay.classList.toggle('active', isActive);
      menuToggle.setAttribute('aria-expanded', isActive);
      
      // Toggle menu icon between burger and close
      const icon = menuToggle.querySelector('i');
      if (icon) {
        if (isActive) {
          icon.setAttribute('data-lucide', 'x');
        } else {
          icon.setAttribute('data-lucide', 'menu');
        }
        lucide.createIcons();
      }
    });

    overlay.addEventListener('click', () => {
      navMenu.classList.remove('active');
      overlay.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      }
    });
  }

  // 4. MOBILE SUB-MENU DROPDOWNS
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    const dropdown = item.querySelector('.nav-dropdown');
    
    if (dropdown && link) {
      link.addEventListener('click', (e) => {
        if (window.innerWidth <= 991) {
          e.preventDefault();
          item.classList.toggle('dropdown-active');
        }
      });
    }
  });

  // 5. ACCORDION (FAQ) HANDLER
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const content = item.querySelector('.faq-content');

    if (header && content) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');
        
        // Close other open FAQ items
        faqItems.forEach(otherItem => {
          if (otherItem !== item) {
            otherItem.classList.remove('active');
            const otherContent = otherItem.querySelector('.faq-content');
            if (otherContent) otherContent.style.maxHeight = null;
          }
        });

        // Toggle current item
        if (isOpen) {
          item.classList.remove('active');
          content.style.maxHeight = null;
        } else {
          item.classList.add('active');
          content.style.maxHeight = content.scrollHeight + 'px';
        }
      });
    }
  });

  // 6. PLAN TABS SYSTEM (RESIDENTIAL / COMMERCIAL SECTIONS)
  const tabButtons = document.querySelectorAll('.plan-tab-btn');
  const tabPanels = document.querySelectorAll('.tab-content');

  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetTab = btn.getAttribute('data-tab');

      tabButtons.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(panel => panel.classList.remove('active'));

      btn.classList.add('active');
      const targetPanel = document.getElementById(targetTab);
      if (targetPanel) {
        targetPanel.classList.add('active');
      }
    });
  });

  // 7. MOCK FORM VALIDATION & INTERACTIVE STATE FEEDBACK
  const mockForms = document.querySelectorAll('form.interactive-form');
  mockForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Simple validation check
      let isValid = true;
      const requiredInputs = form.querySelectorAll('[required]');
      
      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          isValid = false;
          input.style.borderColor = 'red';
        } else {
          input.style.borderColor = '';
        }
      });

      if (isValid) {
        const submitBtn = form.querySelector('[type="submit"]');
        const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.innerHTML = 'Sending...';
        }

        setTimeout(() => {
          // Display success state
          const successDiv = document.createElement('div');
          successDiv.className = 'form-success-message';
          successDiv.style.backgroundColor = 'rgba(22, 163, 74, 0.1)';
          successDiv.style.color = 'var(--color-accent)';
          successDiv.style.padding = '15px';
          successDiv.style.borderRadius = 'var(--radius-md)';
          successDiv.style.marginTop = '15px';
          successDiv.style.fontWeight = '600';
          successDiv.style.border = '1px solid var(--color-accent)';
          successDiv.innerHTML = '<span style="display:inline-flex; align-items:center; gap:8px;"><i data-lucide="check-circle" style="width:20px;height:20px;"></i> Form submitted successfully! Our expert technicians will contact you shortly.</span>';
          
          form.appendChild(successDiv);
          lucide.createIcons();
          form.reset();

          if (submitBtn) {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
          }

          // Remove alert after 5 seconds
          setTimeout(() => {
            successDiv.remove();
          }, 5000);
        }, 1500);
      }
    });
  });

  // 8. SAFE GSAP ANIMATIONS (FADE-UP & REVEAL EFFECTS)
  if (typeof gsap !== 'undefined') {
    // Reveal main hero visuals
    const heroReveals = document.querySelectorAll('.gsap-hero-reveal');
    if (heroReveals.length > 0) {
      gsap.to(heroReveals, {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
        delay: 0.2
      });
    }

    // Scroll-triggered or automatic staggered fade-up for list elements
    const fadeUps = document.querySelectorAll('.gsap-fade-up');
    if (fadeUps.length > 0) {
      // If ScrollTrigger is not loaded, we do a simple load-in
      gsap.to(fadeUps, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        delay: 0.4
      });
    }
  }

  // 9. RTL DIRECTION SWITCHER CONTROLLER
  const dirToggleBtns = document.querySelectorAll('.dir-toggle');
  
  // Update button texts/icons
  function updateDirToggleUI(dir) {
    dirToggleBtns.forEach(btn => {
      const textSpan = btn.querySelector('.dir-text');
      if (textSpan) {
        textSpan.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
    });
  }

  // Set initial text direction state based on localStorage or document attribute
  const currentDir = localStorage.getItem('dir') || document.documentElement.getAttribute('dir') || 'ltr';
  document.documentElement.setAttribute('dir', currentDir);
  updateDirToggleUI(currentDir);

  dirToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const activeDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = activeDir === 'rtl' ? 'ltr' : 'rtl';
      
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      updateDirToggleUI(newDir);
    });
  });
});
