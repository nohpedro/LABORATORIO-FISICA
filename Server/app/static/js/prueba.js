
var token = ''

var res = ''
const requestBody = {
    email: 'admin@example.com',
    password: '#123#AndresHinojosa#123'
  };

fetch('http://127.0.0.1:8000/api/user/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
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
   token = data['token'];
})
.catch(error => {
  console.error('There was a problem with the fetch operation:', error);
}).then(

    console.log(token),

    res = "",

    fetch('http://127.0.0.1:8000/api/user/list', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'X-CSRFToken' : '456MeQwJrWiCd2KR7Prl72BEiorQ4D97jkEQYG8KeATjexDIMw1uG0jE1Z1Fzzqv',
        'accept': 'application/json',
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

