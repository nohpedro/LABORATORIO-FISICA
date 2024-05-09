document.querySelector('.login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevenir el envío inmediato 
  const passwordInput = this.querySelector('input[type="password"]');
  const password = passwordInput.value;
  const icon = document.querySelector('.login-icon');
  const form = this;

  // Función para manejar el final de cualquier animación y enviar el formulario
  function handleFormSubmission() {
      form.removeEventListener('animationend', handleFormSubmission);
      setTimeout(() => { // Retrasar el envío del formulario
          
          console.log('Formulario enviado'); 
      }, 2000); 
  }

  if (password === "correctPassword") {
      icon.classList.add('rotate-animation');
      icon.addEventListener('animationend', function() {
          icon.classList.remove('rotate-animation');
          handleFormSubmission(); // Esperar rotación para enviar
      });
  } else {
      icon.classList.add('login-icon-error');
      setTimeout(() => {
          icon.classList.remove('login-icon-error');
          handleFormSubmission(); // Esperar después del error para enviar
      }, 500); 
  }
});
