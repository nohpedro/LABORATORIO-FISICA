// This script loads the navbar from an HTML file and inserts it into the page.
document.addEventListener("DOMContentLoaded", function () {
  fetch("navbary.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});


const requestBody = {
  email: 'admin@example.com',
  password: '#123#AndresHinojosa#123'
};

// Make the POST request
fetch('http://127.0.0.1:8000/api/user/token/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(requestBody)
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Parse response body as JSON
})
.then(data => {
  // Do something with the JSON response data
  console.log(data);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});