<?php
require_once 'functions.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ca = $_POST['ca'];
    $password = $_POST['password']; // Recibiendo la contraseña desde el formulario

    $query = "SELECT * FROM Administrador WHERE ca = ?";
    $stmt = executeQuery($query, [$ca]);

    if ($stmt->rowCount() > 0) {
        $admin = $stmt->fetch();

        // Verificar la contraseña encriptada
        if (password_verify($password, $admin['password'])) {
            echo "Bienvenido, " . $admin['nombre'];
        } else {
            echo "Contraseña incorrecta";
        }
    } else {
        echo "No existe administrador con CA: $ca";
    }
}
?>


