// This script loads the navbar from an HTML file and inserts it into the page.
document.addEventListener("DOMContentLoaded", function () {
  fetch("/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});

