// The mobile menu uses the same links as the desktop navigation.
document.addEventListener('DOMContentLoaded', function () {
  const button = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.main-nav');

  button.addEventListener('click', function () {
    const open = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!open));
    menu.classList.toggle('is-open', !open);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && menu.classList.contains('is-open')) {
      menu.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      button.focus();
    }
  });

  menu.addEventListener('click', function (event) {
    if (event.target.tagName === 'A') {
      menu.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
    }
  });
});
