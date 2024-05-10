document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  
  // Retrieve email and password values
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  // Create JSON object
  var data = {
      email: email,
      password: password
  };

  // Convert JSON object to string
  var jsonData = JSON.stringify(data);

  // Log JSON data (for demonstration)
  console.log(jsonData);

  // Send HTTP request with JSON data to your API endpoint
  // Replace 'your-api-endpoint' with the actual URL of your API endpoint
  fetch('http://127.0.0.1:8000/api/user/token/', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: jsonData
  })
  .then(response => response.json())
  .then(data => {
      // Handle API response
      console.log(data);
  })
  .catch(error => {
      // Handle errors
      console.error('Error:', error);
  });
});