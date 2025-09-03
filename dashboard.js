const logoutButton = document.getElementById('logoutButton');
const userName = document.getElementById('userName');
const cardsContainer = document.getElementById('cardsContainer');

// Simular datos de usuario y cuentas (en vez de Reqres reales)
const userData = {
  name: "Eve Holt",
  accounts: [
    { name: "Cuenta Corriente", balance: "$1,200,000" },
    { name: "Ahorros", balance: "$850,500" },
    { name: "Inversiones", balance: "$2,500,000" }
  ]
};

// Mostrar nombre del usuario
userName.textContent = userData.name;

// Crear cards dinámicamente
userData.accounts.forEach(acc => {
  const card = document.createElement('div');
  card.classList.add('card');
  card.innerHTML = `
    <h3>${acc.name}</h3>
    <p>Saldo: ${acc.balance}</p>
  `;
  cardsContainer.appendChild(card);
});

// Cerrar sesión
logoutButton.addEventListener('click', () => {
  alert('Sesión cerrada. Redirigiendo al login...');
  window.location.href = 'index.html';
});
