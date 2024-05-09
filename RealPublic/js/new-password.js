document.querySelector('.password-reset-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const newPassword = document.querySelector('input[placeholder="Nueva Contraseña"]').value;
    const confirmPassword = document.querySelector('input[placeholder="Confirmar Nueva Contraseña"]').value;

    if (newPassword === confirmPassword) {
        
        console.log('Contraseña restablecida correctamente.');
        alert('Tu contraseña ha sido restablecida correctamente.');
    } else {
        alert('Las contraseñas no coinciden. Inténtalo de nuevo.');
    }
});
