<?php
session_start(); 
require_once 'functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ca = $_POST['ca'];
    $password = $_POST['password']; 

    $query = "SELECT * FROM Administrador WHERE ca = ?";
    $stmt = executeQuery($query, [$ca]);

    if ($stmt->rowCount() > 0) {
        $admin = $stmt->fetch();

        // Verificar la contraseña encriptada
        if (password_verify($password, $admin['password'])) {
            // Establecer variables de sesión
            $_SESSION['loggedin'] = true;
            $_SESSION['ca'] = $admin['ca'];
            $_SESSION['nombre'] = $admin['nombre'];
            $_SESSION['rol'] = $admin['rol'];

            echo "Bienvenido ," . $admin['nombre'];
        } else {
            echo "Contraseña incorrecta";
        }
    } else {
        echo "No existe administrador con CA: $ca";
    }
}
?>
