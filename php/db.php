<?php
function getDB() {
    $host = 'localhost';
    $dbName = 'laboratorio_fisica';
    $user = 'root';
    $password = ''; // Asegúrate de usar la contraseña correcta para tu entorno de desarrollo

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("ERROR: No se pudo conectar a la base de datos. " . $e->getMessage());
    }
}
?>