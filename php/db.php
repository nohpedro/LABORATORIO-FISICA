<?php
function getDB() {
    $host = 'localhost';
<<<<<<< HEAD
    $dbName = 'laboratorio_fisica'; // Aqui va el nombre de la bd
=======
    $dbName = 'prestamo_lab_pru';
>>>>>>> pedro_jr
    $user = 'root';
    $password = ''; 

    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbName", $user, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        return $pdo;
    } catch (PDOException $e) {
        die("ERROR: No se pudo conectar a la base de datos. " . $e->getMessage());
    }
}
?>