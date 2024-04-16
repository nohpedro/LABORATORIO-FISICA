// Este script carga el navbar de un archivo HTML y lo inserta en la página.
document.addEventListener("DOMContentLoaded", function() {
    fetch('../includes/navbar.html')  // Asegúrate de que la ruta es correcta según la estructura del proyecto
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
        })
        .catch(error => console.error('Error loading the navbar:', error));
});
