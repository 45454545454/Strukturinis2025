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
