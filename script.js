const form = document.querySelector("#contactForm");
const statusMessage = document.querySelector("#formStatus");

const validators = {
  name: (value) => value.trim().length >= 2,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
  subject: (value) => value.trim().length > 0,
  message: (value) => value.trim().length >= 10,
};

function setFieldState(field, isValid) {
  field.classList.toggle("is-invalid", !isValid);
  field.classList.toggle("is-valid", isValid);
}

function validateField(field) {
  const validator = validators[field.name];

  if (!validator) {
    return true;
  }

  const isValid = validator(field.value);
  setFieldState(field, isValid);
  return isValid;
}

function resetFormState() {
  form.querySelectorAll(".form-control").forEach((field) => {
    field.classList.remove("is-valid", "is-invalid");
  });
}

if (window.lucide) {
  window.lucide.createIcons();
}

form.addEventListener("input", (event) => {
  if (event.target.matches(".form-control")) {
    validateField(event.target);
    statusMessage.textContent = "";
  }
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const fields = [...form.querySelectorAll(".form-control")];
  const results = fields.map(validateField);
  const isFormValid = results.every(Boolean);

  if (!isFormValid) {
    statusMessage.textContent = "Please fix the highlighted fields.";
    statusMessage.style.color = "#cc4633";
    return;
  }

  statusMessage.textContent = "Thanks! Your message is ready to send.";
  statusMessage.style.color = "#0b4f4c";
  form.reset();
  resetFormState();
});