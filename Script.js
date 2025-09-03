const form = document.getElementById('loginForm');
const message = document.getElementById('message');

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value.trim();
  const password = document.getElementById('password').value.trim();

  try {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();

    if (response.ok) {
      message.style.color = 'green';
      message.textContent = '✅ Login exitoso. Redirigiendo...';

      localStorage.setItem('token', data.token);

      setTimeout(() => {
        window.location.href = 'dashboard.html';
      }, 1500);
    } else {
      message.style.color = 'red';
      message.textContent = '❌ Error: ' + data.error;
    }
  } catch (err) {
    message.style.color = 'red';
    message.textContent = '❌ Error de conexión';
  }
});


