(() => {
  const mobileMenu = document.getElementById('mobileMenu');
  const burger = document.getElementById('burgerToggle');
  const menuItems = document.querySelectorAll('#mobileMenu .m-item, #mobileMenu .settings');

  if (!mobileMenu || !burger) {
    return;
  }

  const closeMenu = () => {
    mobileMenu.classList.remove('show');
    mobileMenu.setAttribute('aria-hidden', 'true');
    burger.setAttribute('aria-expanded', 'false');
  };

  const toggleMenu = () => {
    const isOpen = mobileMenu.classList.toggle('show');
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    burger.setAttribute('aria-expanded', String(isOpen));
  };

  burger.addEventListener('click', toggleMenu);
  menuItems.forEach((item) => item.addEventListener('click', closeMenu));
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1220) {
      closeMenu();
    }
  });
})();

document.addEventListener('DOMContentLoaded', () => {
  const tabTriggers = document.querySelectorAll('[data-bs-toggle="pill"]');
  const tabButtons = document.querySelectorAll('[data-tab-target]');

  const syncActive = (targetId) => {
    tabButtons.forEach(btn => {
      const isActive = btn.getAttribute('data-tab-target') === targetId;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
    });
  };

  tabButtons.forEach(btn => {
    btn.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = btn.getAttribute('data-tab-target');
      const trigger = document.querySelector(`[data-bs-target="#${targetId}"]`);
      if (trigger) {
        const tab = bootstrap.Tab.getOrCreateInstance(trigger);
        tab.show();
      }
    });
  });

  tabTriggers.forEach(trigger => {
    trigger.addEventListener('shown.bs.tab', (event) => {
      const targetSelector = event.target.getAttribute('data-bs-target');
      if (targetSelector && targetSelector.startsWith('#')) {
        syncActive(targetSelector.slice(1));
      }
    });
  });

  const initial = document.querySelector('.nav-pills .nav-link.active');
  if (initial) {
    const target = initial.getAttribute('data-bs-target');
    if (target && target.startsWith('#')) {
      syncActive(target.slice(1));
    }
  }
});
