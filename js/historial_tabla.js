document.addEventListener('DOMContentLoaded', function() {
    var historialTablaBody = document.getElementById('historialTablaBody');

    // Realizar una solicitud AJAX para obtener los datos del historial de inicio de sesión
    var xhr = new XMLHttpRequest();
    xhr.open('GET', '../php/historial_tabla.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText); // Imprimir la respuesta en la consola
            try {
                // Convertir la respuesta JSON en un objeto JavaScript
                var historial = JSON.parse(xhr.responseText);

                historial.forEach(function(registro) {
                    var fila = document.createElement('tr');

                    var caCell = document.createElement('td');
                    caCell.textContent = registro.ca;
                    fila.appendChild(caCell);

                    var nombreCell = document.createElement('td');
                    nombreCell.textContent = registro.nombre;
                    fila.appendChild(nombreCell);

                    var carnetCell = document.createElement('td');
                    carnetCell.textContent = registro.carnet;
                    fila.appendChild(carnetCell);

                    var horaInicioCell = document.createElement('td');
                    horaInicioCell.textContent = registro.hora_inicio_sesion;
                    fila.appendChild(horaInicioCell);

                    // Agregar la fila creada al cuerpo de la tabla
                    historialTablaBody.appendChild(fila);
                });
            } catch (e) {
                // Manejar errores al analizar la respuesta JSON
                console.error('Error al analizar el JSON: ', e);
            }
        } else {
            // Manejar errores en la solicitud AJAX
            console.error('Error al obtener el historial: ' + xhr.statusText);
        }
    };
    // Enviar la solicitud AJAX
    xhr.send();
});
