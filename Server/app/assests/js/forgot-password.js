document.querySelector('.login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevenir el envío inmediato del formulario
    const emailInput = this.querySelector('input[type="email"]');
    const icon = document.querySelector('.login-icon');
    const form = this;

    function handleFormSubmission() {
        setTimeout(() => {
            console.log('Correo de recuperación enviado a: ' + emailInput.value);
        }, 2000); 
    }

    icon.classList.add('rotate-animation');
    icon.addEventListener('animationend', function() {
        icon.classList.remove('rotate-animation');
        handleFormSubmission();
    });
});
