document.addEventListener("DOMContentLoaded", function () {
  fetch("/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});

let token = ''; // Initialize token variable

const requestBody = {
  email: 'admin@example.com',
  password: '#123#AndresHinojosa#123'
};

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
  // Extract token from the JSON response data
  token = data['token'];
  console.log(token);

  // Send GET request with the obtained token
  return fetch('http://127.0.0.1:8000/api/user/list/', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'accept': 'application/json',
      'Authorization': 'Token ' + token, // Concatenate token with 'Token ' string
    },
  });
})
.then(response => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json(); // Parse response body as JSON
})
.then(data => {
  console.log(data); // Log JSON response data
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
});
