document.getElementById('forgotPasswordLink').addEventListener('click', function() {
    // Mostrar el modal
    document.getElementById('forgotPasswordModal').style.display = 'block';
    // Asegurar que el campo CA en el modal no es requerido
    document.getElementById('ca').required = false;
    document.getElementById('password').required = false;
});

function sendRecoveryEmail() {
    const ca = document.getElementById('caRecovery').value;
    fetch("../php/sendRecoveryEmail.php", {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: "ca=" + encodeURIComponent(ca)
    })
    .then(response => response.json())
    .then(data => alert(data.message))
    .catch(error => console.error('Error:', error));
}
