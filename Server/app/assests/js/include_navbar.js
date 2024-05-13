// This script loads the navbar from an HTML file and inserts it into the page.
document.addEventListener("DOMContentLoaded", function () {
  fetch("../includes/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.body.insertAdjacentHTML("afterbegin", data);
    })
    .catch((error) => console.error("Error loading the navbar:", error));
});



function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          const cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          //console.log(cookie)
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}



function getHeaders(){
  const csrftoken = getCookie('csrftoken')
  let headers = {'Content-Type': 'application/json'}
  if(csrftoken){
    console.log('csrf found');
    headers = {
      'Content-Type': 'application/json',
       'X-CSRFToken' : csrftoken,
    }
  }
  else{
    console.log('csrf not found')
  }
  return headers;
}


let data = {
  email : "admin@example.com",
  password : "#123#AndresHinojosa#123",
}


fetch('http://127.0.0.1:8000/api/user/token/', {
  method : "POST",
  headers: getHeaders(),
  body : JSON.stringify(data),

})
   .then(response1 => {
       // Process response1
       return response1.json(); // Parse JSON if needed
   })
   .then(data1 => {

      console.log(data1);
      return fetch('http://127.0.0.1:8000/api/user/list/', {
        method : 'GET',
        headers : getHeaders(),
      });
   }).then(response2 => {
      return response2.json();
   }).then(data =>
      console.log(data)
   ).catch(
      console.log("Error")
   )



