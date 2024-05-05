<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    echo "Acceso denegado. Necesitas iniciar sesión para acceder a esta página.";
    exit;
}

require_once 'functions.php'; // Incluir el archivo de funciones para ejecutar consultas SQL

// Realizar la consulta SELECT para obtener los últimos 5 inicios de sesión de cuentas diferentes
$query = "SELECT ca, nombre, carnet, hora_inicio_sesion FROM Administrador ORDER BY hora_inicio_sesion DESC LIMIT 5";
$stmt = executeQuery($query);

// Comprobar si se encontraron resultados
if ($stmt->rowCount() > 0) {
    // Iniciar la tabla HTML
    echo "<table border='1'>";
    echo "<tr><th>CA</th><th>Nombre</th><th>Carnet</th><th>Hora de inicio de sesión</th></tr>";
    // Iterar sobre los resultados y mostrar los datos en la tabla
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        echo "<tr>";
        echo "<td>" . $row['ca'] . "</td>";
        echo "<td>" . $row['nombre'] . "</td>";
        echo "<td>" . $row['carnet'] . "</td>";
        echo "<td>" . $row['hora_inicio_sesion'] . "</td>";
        echo "</tr>";
    }
    // Cerrar la tabla HTML
    echo "</table>";
} else {
    echo "No se encontraron datos de administrador.";
}
?>

<!DOCTYPE html>
<html>
<head>
    <title>Dashboard</title>
</head>
<body>
    <h1>Hola</h1>
</body>
</html>
