<?php
require_once 'functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ca = $_POST['ca'];
    $password = $_POST['password'];
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $carnet = $_POST['carnet'];
    $rol = $_POST['rol'];

   
    $checkQuery = "SELECT ca FROM Administrador WHERE ca = ?";
    $stmt = executeQuery($checkQuery, [$ca]);

    if ($stmt->rowCount() > 0) {
        echo "El CA ya está registrado.";
    } else {
        
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);
        $query = "INSERT INTO Administrador (ca, password, nombre, apellido, carnet, rol) VALUES (?, ?, ?, ?, ?, ?)";
        executeQuery($query, [$ca, $hashed_password, $nombre, $apellido, $carnet, $rol]);
        echo "Registro con éxito.";
    }
}
?>

