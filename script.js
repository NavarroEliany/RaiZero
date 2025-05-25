// Modal de login
document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const loginOverlay = document.getElementById("login-overlay");
  const loginSection = document.querySelector(".login-section");
  const registerSection = document.getElementById("register-section");
  const loginBtn = document.getElementById("loginBtn");
  const showRegisterBtn = document.getElementById("show-register-btn");

  // Mostrar u ocultar login y overlay al presionar el botón del nav
  loginBtn.addEventListener("click", () => {
    if (loginContainer.style.display === "none" || loginContainer.style.display === "") {
      loginContainer.style.display = "block";
      loginOverlay.style.display = "block";
    } else {
      loginContainer.style.display = "none";
      loginOverlay.style.display = "none";
      // Resetear vista a login
      registerSection.classList.add("hidden");
      loginSection.classList.remove("hidden");
    }
  });

  // Cerrar modal si se clickea en el overlay
  loginOverlay.addEventListener("click", () => {
    loginContainer.style.display = "none";
    loginOverlay.style.display = "none";
    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  });

  // Cambiar a sección registro
  showRegisterBtn.addEventListener("click", () => {
    loginSection.classList.add("hidden");
    registerSection.classList.remove("hidden");
  });

  // Agregar botón para volver a login desde registro si no existe
  if (!document.getElementById("back-to-login-btn")) {
    const backBtn = document.createElement("button");
    backBtn.textContent = "Volver a Iniciar Sesión";
    backBtn.id = "back-to-login-btn";
    backBtn.style.marginTop = "10px";
    registerSection.appendChild(backBtn);

    backBtn.addEventListener("click", () => {
      registerSection.classList.add("hidden");
      loginSection.classList.remove("hidden");
    });
  }

  // Manejo formulario login
  const loginForm = document.getElementById("login-form");
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
      alert("Por favor completa ambos campos para iniciar sesión.");
      return;
    }

    alert(`¡Bienvenido de nuevo!\nCorreo: ${email}`);
    loginContainer.style.display = "none";
    loginOverlay.style.display = "none";
    loginForm.reset();
  });

  // Manejo formulario registro
  const registerForm = document.getElementById("register-form");
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = registerForm.querySelector('input[type="text"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = registerForm.querySelector('input[type="password"]').value.trim();

    if (!username || !email || !password) {
      alert("Por favor completa todos los campos para registrarte.");
      return;
    }

    alert(`Cuenta creada:\nUsuario: ${username}\nCorreo: ${email}`);
    registerForm.reset();

    registerSection.classList.add("hidden");
    loginSection.classList.remove("hidden");
  });
});



//CALCULADORA

document.getElementById("carbonForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const energia = parseFloat(document.getElementById("energia").value);
  const transporte = document.getElementById("transporte").value;
  const alimentacion = document.getElementById("alimentacion").value;
  const consumo = parseFloat(document.getElementById("consumo").value);

  let factorTransporte = 0;
  let factorAlimentacion = 0;

  // Transporte: kg CO2 / km promedio en Colombia (Fuente: IDEAM, 2021)
  switch (transporte) {
    case "automovil":
      factorTransporte = 0.19; // Auto gasolina promedio
      break;
    case "motocicleta":
      factorTransporte = 0.09; // Promedio
      break;
    case "transporte_publico":
      factorTransporte = 0.07; // Bus urbano promedio
      break;
    case "bicicleta":
    case "a_pie":
      factorTransporte = 0.0;
      break;
  }

  // Alimentación: kg CO2 por día (ajustado para hábitos colombianos)
  switch (alimentacion) {
    case "omnivora":
      factorAlimentacion = 4.0;
      break;
    case "vegetariana":
      factorAlimentacion = 2.5;
      break;
    case "vegana":
      factorAlimentacion = 1.8;
      break;
  }

  // Cálculos anuales aproximados
  const huellaEnergia = energia * 0.189; // Colombia ~0.189 kg CO2/kWh
  const huellaTransporte = factorTransporte * 10 * 365; // 10 km diarios
  const huellaAlimentacion = factorAlimentacion * 365;
  const huellaConsumo = consumo * 12 * 0.20; // kg CO2/mes. Ajustado a consumo colombiano

  const total = huellaEnergia + huellaTransporte + huellaAlimentacion + huellaConsumo;

  // Comparación con datos colombianos (IDEAM, UPME)
  const metaSostenible = 2000;
  const promedioColombia = 2700; // kg CO2/año per cápita aproximado

  let comparacion = "";
  if (total <= metaSostenible) {
    comparacion = "¡Excelente! Estás dentro del objetivo sostenible mundial (< 2,000 kg CO₂/año).";
  } else if (total <= promedioColombia) {
    comparacion = "Estás dentro del promedio colombiano (~2,700 kg CO₂/año).";
  } else {
    comparacion = "Tu huella está por encima del promedio colombiano. Se recomienda tomar acción.";
  }

  // Mostrar resultado en pantalla
  const resultadoHTML = `
    <h3>Resultado de tu Huella de Carbono Anual (Colombia)</h3>
    <ul>
      <li><strong>Energía:</strong> ${huellaEnergia.toFixed(2)} kg CO₂</li>
      <li><strong>Transporte:</strong> ${huellaTransporte.toFixed(2)} kg CO₂</li>
      <li><strong>Alimentación:</strong> ${huellaAlimentacion.toFixed(2)} kg CO₂</li>
      <li><strong>Consumo:</strong> ${huellaConsumo.toFixed(2)} kg CO₂</li>
    </ul>
    <p><strong>Total:</strong> ${total.toFixed(2)} kg CO₂/año</p>
    <p>${comparacion}</p>
  `;

  document.getElementById("resultado").innerHTML = resultadoHTML;
});
