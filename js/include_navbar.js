// Este script carga el navbar de un archivo HTML y lo inserta en la página.
document.addEventListener("DOMContentLoaded", function () {
  fetch("../includes/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});
