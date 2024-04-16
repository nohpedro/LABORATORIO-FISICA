<?php
require_once 'functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ca = $_POST['ca'];
    $password = $_POST['password']; // Recibiendo la contraseña desde el formulario
    $nombre = $_POST['nombre'];
    $apellido = $_POST['apellido'];
    $carnet = $_POST['carnet'];
    $rol = $_POST['rol'];

    // Encriptar la contraseña antes de almacenarla en la base de datos
    $hashed_password = password_hash($password, PASSWORD_DEFAULT);

    $query = "INSERT INTO Administrador (ca, password, nombre, apellido, carnet, rol) VALUES (?, ?, ?, ?, ?, ?)";
    executeQuery($query, [$ca, $hashed_password, $nombre, $apellido, $carnet, $rol]);
    echo "Administrador registrado con éxito.";
}
?>
