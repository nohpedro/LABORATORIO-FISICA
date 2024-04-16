document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('loginForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);
        
        fetch('../php/login.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);  // Muestra un mensaje de bienvenida o error
        })
        .catch(error => console.error('Error:', error));
    });
});
