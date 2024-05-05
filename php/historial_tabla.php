<?php
require_once 'functions.php';
// Mostrar el historial de inicio de sesión de los últimos usuarios
$query = "SELECT ca, nombre, carnet, hora_inicio_sesion FROM Administrador WHERE hora_inicio_sesion IS NOT NULL ORDER BY hora_inicio_sesion DESC LIMIT 5";
$stmt = executeQuery($query);

$historial = []; // Array para almacenar los datos del historial

if ($stmt->rowCount() > 0) {
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $historial[] = $row; // Agregar cada fila del historial al array
    }
}

// Convertir el array a formato JSON
$json_response = json_encode($historial);

// Devolver la respuesta JSON
header('Content-Type: application/json');
echo $json_response;
?>





