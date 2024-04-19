document.addEventListener("DOMContentLoaded", function () {
  const dashboardLink = document.getElementById("dashboardLink");

  dashboardLink.addEventListener("click", function (e) {
    e.preventDefault();

    fetch("../php/sessionCheck.php")
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "loggedin") {
          window.location.href = "../public/dashboard.html";
        } else {
          alert(
            "No estás logueado. Por favor inicia sesión para acceder al dashboard."
          );
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  fetch("../includes/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});
