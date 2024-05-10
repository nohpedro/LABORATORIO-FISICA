// This script loads the navbar from an HTML file and inserts it into the page.
document.addEventListener("DOMContentLoaded", function () {
  fetch("/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});



// declarar TOKEN, Respuesta y Request Json
var token = ''
var res = ''
const requestBody = {
    email: 'admin@example.com',
    password: '#123#AndresHinojosa#123'
  };


// Funcion Fetch para validar datos
fetch('http://127.0.0.1:8000/api/user/token/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(requestBody),
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Parse response body as JSON
})
.then(data => {
  // Do something with the JSON response data
   token = data['token'];
   console.log(token);
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
}).then(



  res = "",

  fetch('http://127.0.0.1:8000/api/user/list/', {
  method: 'GET',
  headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization' : 'Token ' + token,
  },
  })
  .then(response => {
  if (!response.ok) {
      throw new Error('Network response was not ok');
  }
  return response.json(); // Parse response body as JSON
  })
  .then(data => {
  // Do something with the JSON response data
  console.log(data.stringify());
  })
  .catch(error => {
  console.error('There was a problem with the fetch operation:', error);
  }),



)

