let form = document.getElementById('login-form')
let icon = document.querySelector('.login-icon');


let token = null
form.addEventListener('submit', function(event) {
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
  .then(response => {

    if (response.status >= 200 && response.status < 300) {
      // La solicitud fue exitosa (código de estado en el rango 200-299)
      console.log('Solicitud exitosa');
    } else if(response.status == 429) {
      // La solicitud falló con un código de estado diferente
      alert('Muchos intentos intente de nuevo en un minuto');
    }
    else{
      alert('Contraseña incorrecta');
    }

    return response.json()
  })
  .then(data => {
      // Handle API response
      console.log(data);

      if('token' in data){
        token = data['token']

        window.location.replace("http://127.0.0.1:8000/page/public/index.html");

        
      alert("Login Existoso")
      } 



  })
  .catch(error => {
      // Handle errors
      console.error('Error:', error);
  });
});

