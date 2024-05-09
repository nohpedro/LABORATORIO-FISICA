document.addEventListener("DOMContentLoaded", function () {
  fetch("../php/check_session.php")
    .then((response) => response.json())
    .then((data) => {
      if (!data.loggedin) {
        alert("No estás en sesión iniciada.");
        window.location.href = "login.html";
      } else {
        document.getElementById("userName").textContent = data.nombre;
      }
    })
    .catch((error) => console.error("Error:", error));
});
