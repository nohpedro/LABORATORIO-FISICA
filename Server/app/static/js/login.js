



document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(form);

    var res = "";
    var token ="";
    const apiToken = 'http://127.0.0.1:8000/api/user/token/';
    var requestBody = {
      email: 'admin@example.com',
      password: '#123#AndresHinojosa#123'
    }



    fetch(apiToken, {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        const cleanData = data.trim(); // Elimina espacios en blanco al inicio y al final
        console.log(cleanData); // Verifica los datos limpios
        if (cleanData.includes("Bienvenido")) {
          window.location.href = "dashboard.html";
        } else {
          alert(cleanData);
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});
