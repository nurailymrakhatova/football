const form = document.querySelector('.needs-validation');
const success = document.querySelector('.form-status');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');

function checkPasswords() {
  if (password.value !== confirmPassword.value) {
    confirmPassword.setCustomValidity('Passwords must match.');
  } else {
    confirmPassword.setCustomValidity('');
  }
}

if (password) {
  password.addEventListener('input', checkPasswords);
  confirmPassword.addEventListener('input', checkPasswords);
}

form.addEventListener('submit', function (event) {
  event.preventDefault();
  success.textContent = '';
  if (password) {
    checkPasswords();
  }
  form.classList.add('was-validated');
  if (form.checkValidity()) {
    success.textContent = 'Demo successful! No information was sent or stored.';
  }
});

form.addEventListener('input', function () {
  success.textContent = '';
});

form.addEventListener('reset', function () {
  form.classList.remove('was-validated');
  success.textContent = '';
  if (confirmPassword) {
    confirmPassword.setCustomValidity('');
  }
});
