document.addEventListener("DOMContentLoaded", () => {
  const loginContainer = document.getElementById("login-container");
  const loginSection = document.querySelector(".login-section");
  const registerSection = document.getElementById("register-section");
  const showRegisterBtn = document.getElementById("show-register-btn");
  const loginForm = document.getElementById("login-form");
  const registerForm = document.getElementById("register-form");

  // Crear overlay si no existe
  let loginOverlay = document.getElementById("login-overlay");
  if (!loginOverlay) {
    loginOverlay = document.createElement("div");
    loginOverlay.id = "login-overlay";
    Object.assign(loginOverlay.style, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "none",
      zIndex: 999,
    });
    document.body.appendChild(loginOverlay);
  }

  // Crear botón login si no existe
  let loginBtn = document.getElementById("loginBtn");
  if (!loginBtn) {
    loginBtn = document.createElement("button");
    loginBtn.id = "loginBtn";
    loginBtn.textContent = "Login";
    document.body.insertBefore(loginBtn, document.body.firstChild);
  }

  // Función para mostrar modal login
  function openLoginModal() {
    loginContainer.style.display = "block";
    loginOverlay.style.display = "block";
    registerSection.style.display = "none";
    loginSection.style.display = "block";
    loginForm.reset();
    registerForm.reset();
  }

  // Función para cerrar modal
  function closeLoginModal() {
    loginContainer.style.display = "none";
    loginOverlay.style.display = "none";
  }

  // Toggle modal login
  loginBtn.addEventListener("click", () => {
    const isHidden = window.getComputedStyle(loginContainer).display === "none";
    if (isHidden) {
      openLoginModal();
    } else {
      closeLoginModal();
    }
  });

  // Cerrar modal clic en overlay
  loginOverlay.addEventListener("click", closeLoginModal);

  // Mostrar formulario registro
  showRegisterBtn.addEventListener("click", () => {
    loginSection.style.display = "none";
    registerSection.style.display = "block";
    registerForm.reset();
  });

  // Crear botón volver a login si no existe
  if (!document.getElementById("back-to-login-btn")) {
    const backBtn = document.createElement("button");
    backBtn.id = "back-to-login-btn";
    backBtn.textContent = "Volver a Iniciar Sesión";
    backBtn.style.marginTop = "10px";
    registerSection.appendChild(backBtn);

    backBtn.addEventListener("click", () => {
      registerSection.style.display = "none";
      loginSection.style.display = "block";
      loginForm.reset();
    });
  }

  // Manejar submit login con SweetAlert2
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm.querySelector('input[type="email"]').value.trim();
    const password = loginForm.querySelector('input[type="password"]').value.trim();

    if (!email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa ambos campos para iniciar sesión.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Inicio de sesión exitosa",
      text: `¡Bienvenido de nuevo!\nCorreo: ${email}`,
      confirmButtonText: "Aceptar",
    }).then(() => {
      closeLoginModal();
    });
  });

  // Manejar submit registro con SweetAlert2
  registerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = registerForm.querySelector('input[type="text"]').value.trim();
    const email = registerForm.querySelector('input[type="email"]').value.trim();
    const password = registerForm.querySelector('input[type="password"]').value.trim();

    if (!username || !email || !password) {
      Swal.fire({
        icon: "warning",
        title: "Campos incompletos",
        text: "Por favor completa todos los campos para registrarte.",
      });
      return;
    }
    Swal.fire({
      icon: "success",
      title: "Registro exitoso",
      html: `Cuenta creada:<br><b>Usuario:</b> ${username}<br><b>Correo:</b> ${email}`,
      confirmButtonText: "Aceptar",
    }).then(() => {
      registerForm.reset();
      registerSection.style.display = "none";
      loginSection.style.display = "block";
    });
  });
});


// Mostrar calculadora
document.querySelector('.cta').addEventListener('click', () => {
    const calculadora = document.getElementById('calculadora');
    calculadora.scrollIntoView({ behavior: 'smooth' });
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
      factorTransporte = 0.19;
      break;
    case "motocicleta":
      factorTransporte = 0.09;
      break;
    case "transporte_publico":
      factorTransporte = 0.07;
      break;
    case "bicicleta":
    case "a_pie":
      factorTransporte = 0.0;
      break;
  }

  // Alimentación: kg CO2 por día
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

  const huellaEnergia = energia * 0.189;
  const huellaTransporte = factorTransporte * 10 * 365;
  const huellaAlimentacion = factorAlimentacion * 365;
  const huellaConsumo = consumo * 12 * 0.20;

  const total = huellaEnergia + huellaTransporte + huellaAlimentacion + huellaConsumo;

  const metaSostenible = 2000;
  const promedioColombia = 2700;

  let comparacion = "";
  if (total <= metaSostenible) {
    comparacion = "¡Excelente! Estás dentro del objetivo sostenible mundial (< 2,000 kg CO₂/año).";
  } else if (total <= promedioColombia) {
    comparacion = "Estás dentro del promedio colombiano (~2,700 kg CO₂/año).";
  } else {
    comparacion = "Tu huella está por encima del promedio colombiano. Se recomienda tomar acción.";
  }

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



// Comentarios
document.getElementById('comentarBtn').addEventListener('click', function () {
    const comentario = document.querySelector('#comunidad textarea').value.trim();

    if (comentario) {
        Swal.fire({
            title: '¡Éxito!',
            text: '¡Comentario publicado!',
            icon: 'success',
            confirmButtonText: 'Ok'
        });
        document.querySelector('#comunidad textarea').value = "";
    } else {
        Swal.fire({
            title: 'Oops...',
            text: 'Por favor, escribe un comentario antes de publicar.',
            icon: 'warning',
            confirmButtonText: 'Entendido'
        });
    }
});


