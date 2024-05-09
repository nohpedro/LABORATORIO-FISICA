document.addEventListener('DOMContentLoaded', function() {
    var historialTablaBody = document.getElementById('historialTablaBody');

    // Realizar una solicitud AJAX para obtener los datos del historial de inicio de sesión desde la API
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'http://127.0.0.1:8000/api/user/list/', true); // Cambia la URL según la ubicación de tu API
    xhr.setRequestHeader('accept', 'application/json');
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText); // Imprimir la respuesta en la consola
            try {
                // Convertir la respuesta JSON en un objeto JavaScript
                var response = JSON.parse(xhr.responseText);
                console.log(response); // Imprimir la respuesta en la consola

                // Verificar si la respuesta contiene resultados
                if (response.results.length > 0) {
                    // Iterar sobre los resultados y agregarlos a la tabla
                    response.results.forEach(function(user) {
                        var fila = document.createElement('tr');

                        var emailCell = document.createElement('td');
                        emailCell.textContent = user.email;
                        fila.appendChild(emailCell);

                        var nameCell = document.createElement('td');
                        nameCell.textContent = user.name;
                        fila.appendChild(nameCell);

                        // Agregar la fila creada al cuerpo de la tabla
                        historialTablaBody.appendChild(fila);
                    });
                } else {
                    console.log('No se encontraron usuarios en la API.');
                }
            } catch (e) {
                // Manejar errores al analizar la respuesta JSON
                console.log('Respuesta completa: ', xhr.responseText);
                console.error('Error al analizar el JSON: ', e);
            }
        } else {
            // Manejar errores en la solicitud AJAX
            console.error('Error al obtener el historial: ' + xhr.statusText);
        }
    };
    xhr.send();
});
