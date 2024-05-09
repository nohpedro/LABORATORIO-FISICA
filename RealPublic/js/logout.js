function logout() {
  fetch("../php/logout.php", { method: "POST" })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === "success") {
        alert("Sesión terminada exitosamente.");
        window.location.href = "login.html"; // Redirigir al login o página de inicio
      }
    })
    .catch((error) => console.error("Error al cerrar sesión:", error));
}
