<?php
session_start();
require_once 'functions.php';

header('Content-Type: application/json'); 

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $ca = $_POST['ca'];
    $query = "SELECT correo FROM Administrador WHERE ca = ?";
    $stmt = executeQuery($query, [$ca]);

    if ($stmt->rowCount() > 0) {
        $admin = $stmt->fetch();
        $correo = $admin['correo'];

        // Simula el envío de correo
        $to = $correo;
        $subject = "Recuperación de contraseña";
        $message = "Aquí va el enlace para restablecer tu contraseña.";
        $headers = "From: noreply@tuempresa.com";
        
       
        echo json_encode(['status' => 'success', 'message' => "Correo de recuperación enviado a: " . $correo]);
    } else {
        echo json_encode(['status' => 'error', 'message' => "No existe un administrador con ese CA."]);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => "Método de solicitud no válido."]);
}
?>

