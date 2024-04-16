document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('registerForm');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const formData = new FormData(form);

        fetch('../php/register.php', {
            
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(data => {
            alert(data);  // Muestra un mensaje con la respuesta del servidor
            form.reset(); // Reinicia el formulario después del registro
        })
        .catch(error => console.error('Error:', error));
    });
});
