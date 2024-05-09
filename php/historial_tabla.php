<?php
// URL de la API en Docker
$api_url = 'http://127.0.0.1:8000/api/user/list/';

// Realizar una solicitud HTTP a la API
$response = file_get_contents($api_url);

// Comprobar el estado de la solicitud
if ($response === FALSE) {
    die('Error al hacer la solicitud a la API.');
}

// Decodificar la respuesta JSON
$data = json_decode($response, TRUE);

// Comprobar si la respuesta es válida
if ($data === NULL) {
    die('Error al decodificar la respuesta JSON.');
}

// Verificar si la respuesta contiene resultados
if (empty($data['results'])) {
    echo 'No se encontraron usuarios en la API.';
} else {
    // Mostrar los resultados obtenidos
    echo 'Usuarios encontrados en la API:<br>';
    foreach ($data['results'] as $user) {
        echo "Email: " . $user['email'] . ", Nombre: " . $user['name'] . "<br>";
    }
}
?>
