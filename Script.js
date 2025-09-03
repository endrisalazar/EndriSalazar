const form = document.getElementById('loginForm');
const message = document.getElementById('message');
const spinner = document.getElementById('spinner');
const loginButton = document.getElementById('loginButton');

const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const emailIcon = document.getElementById('emailIcon');
const passwordIcon = document.getElementById('passwordIcon');

// Validación en tiempo real
emailInput.addEventListener('input', () => {
  emailInput.classList.remove('error', 'success');
  emailIcon.textContent = '';
});
passwordInput.addEventListener('input', () => {
  passwordInput.classList.remove('error', 'success');
  passwordIcon.textContent = '';
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let hasError = false;

  // Validación
  if (!email || !email.includes('@')) {
    emailInput.classList.add('error');
    emailIcon.textContent = '❌';
    hasError = true;
  } else {
    emailInput.classList.add('success');
    emailIcon.textContent = '✔️';
  }

  if (!password) {
    passwordInput.classList.add('error');
    passwordIcon.textContent = '❌';
    hasError = true;
  } else {
    passwordInput.classList.add('success');
    passwordIcon.textContent = '✔️';
  }

  if (hasError) return;

  // Spinner y botón deshabilitado
  spinner.classList.remove('hidden');
  loginButton.disabled = true;
  message.classList.remove('show');
  message.textContent = '';

  try {
    const response = await fetch('https://reqres.in/api/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json', "x-api-key": "reqres-free-v1" },
  body: JSON.stringify({ email, password })
});
    const data = await response.json();
    spinner.classList.add('hidden');
    loginButton.disabled = false;

    if (response.ok) {
      message.style.color = 'green';
      message.textContent = 'Login exitoso! Redirigiendo...';
      message.classList.add('show');

      // Redirigir a página simulada después de 2s
      setTimeout(() => {
        window.location.href = 'dashboard.html'; // página simulada
      }, 2000);

    } else {
      message.style.color = 'red';
      message.textContent = 'Error: ' + data.error;
      message.classList.add('show');
      setTimeout(() => message.classList.remove('show'), 3000);
    }

  } catch (error) {
    spinner.classList.add('hidden');
    loginButton.disabled = false;
    message.style.color = 'red';
    message.textContent = 'Error de conexión';
    message.classList.add('show');
    setTimeout(() => message.classList.remove('show'), 3000);
  }
});
