// A native dialog keeps keyboard focus inside the message and supports Escape.
document.addEventListener('DOMContentLoaded', function () {
  const dialog = document.querySelector('#feedback-dialog');
  let returnFocus;

  window.showFeedback = function (title, message, trigger) {
    returnFocus = trigger || document.activeElement;
    dialog.querySelector('#feedback-title').textContent = title;
    dialog.querySelector('#feedback-message').textContent = message;
    if (!dialog.open) dialog.showModal();
  };

  dialog.querySelectorAll('[data-close-dialog]').forEach(function (button) {
    button.addEventListener('click', function () {
      dialog.close();
    });
  });
  dialog.addEventListener('keydown', function (event) {
    if (event.key !== 'Tab') return;
    const buttons = dialog.querySelectorAll('button');
    const first = buttons[0];
    const last = buttons[buttons.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  });
  dialog.addEventListener('click', function (event) {
    const bounds = dialog.getBoundingClientRect();
    if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right ||
        event.clientY < bounds.top || event.clientY > bounds.bottom)) {
      dialog.close();
    }
  });
  dialog.addEventListener('close', function () {
    if (returnFocus && returnFocus.isConnected) returnFocus.focus({ preventScroll: true });
  });
});
