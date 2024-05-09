// Datos que quieres enviar a la API
const userData = {
    email: "emaildeprueba@example.com",
    password: "admin",
    name: "admin"
  };

// URL del endpoint de la API donde enviarás los datos
const apiUrl = 'http://127.0.0.1:8000/api/user/create/';

// Función para enviar datos
async function sendData(data) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST', // Método HTTP para la solicitud
            headers: {
                'Content-Type': 'application/json', 
                
                
                // Tipo de contenido de la solicitud
                // Incluye aquí otros headers como tokens de autenticación si son necesarios
            },
            body: JSON.stringify(data) // Convertir los datos del objeto JavaScript a JSON
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json(); // Leer la respuesta JSON
        console.log('Response from server:', result);
        return result;
    } catch (error) {
        console.error('Error sending data:', error);
    }
}

// Llamar a la función con los datos del usuario
sendData(userData);
