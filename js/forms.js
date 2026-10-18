document.querySelectorAll('[data-demo-form]').forEach((form) => {
  const fields = Array.from(form.querySelectorAll('[required]'));
  const status = document.getElementById(form.dataset.status);
  const errors = document.getElementById(form.dataset.errors);
  let submitted = false;

  function validateField(field) {
    field.setCustomValidity('');
    const value = field.type === 'password' ? field.value : field.value.trim();
    let message = '';

    if (!value) {
      message = field.tagName === 'SELECT' ? 'Please select a country.' : 'Please complete this field.';
    } else if (field.validity.typeMismatch) {
      message = 'Enter a valid email address, such as fan@example.com.';
    } else if (field.minLength > 0 && value.length < field.minLength) {
      message = `Enter at least ${field.minLength} characters.`;
    } else if (field.maxLength > 0 && value.length > field.maxLength) {
      message = `Enter no more than ${field.maxLength} characters.`;
    } else if (field.dataset.match && field.value !== form.elements.namedItem(field.dataset.match).value) {
      message = 'Passwords must match.';
    }

    field.setCustomValidity(message);
    const valid = field.validity.valid;
    field.classList.toggle('is-valid', valid);
    field.classList.toggle('is-invalid', !valid);
    field.setAttribute('aria-invalid', String(!valid));
    document.getElementById(`${field.id}-error`).textContent = message || field.validationMessage;
    return valid;
  }

  function validateForm() {
    // Validate every field, including Confirm Password when Password changes.
    fields.forEach(validateField);
    const invalidFields = fields.filter((field) => !field.validity.valid);
    errors.textContent = invalidFields.length
      ? `Please correct ${invalidFields.length} highlighted field${invalidFields.length === 1 ? '' : 's'} before submitting.`
      : '';
    return invalidFields;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitted = true;
    status.textContent = '';
    const invalidFields = validateForm();

    if (!form.checkValidity()) {
      invalidFields[0].focus();
      return;
    }

    status.textContent = form.dataset.success;
    status.focus();
  });

  function handleEdit() {
    status.textContent = '';
    if (submitted) validateForm();
  }

  form.addEventListener('input', handleEdit);
  form.addEventListener('change', handleEdit);
  form.addEventListener('reset', () => {
    submitted = false;
    status.textContent = '';
    errors.textContent = '';
    fields.forEach((field) => {
      field.setCustomValidity('');
      field.classList.remove('is-valid', 'is-invalid');
      field.removeAttribute('aria-invalid');
      document.getElementById(`${field.id}-error`).textContent = '';
    });
  });
  form.noValidate = true;
  form.querySelector('[type="submit"]').disabled = false;
});
