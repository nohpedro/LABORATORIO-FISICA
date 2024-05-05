<?php
session_start(); 
require_once 'functions.php';

$maxIntentosFallidos = 3;
$tiempoBloqueo = 15; 

if ($_SERVER["REQUEST_METHOD"] == "POST") 
{
    if (isset($_SESSION['intentos_fallidos']) && $_SESSION['intentos_fallidos'] >= $maxIntentosFallidos) 
    {
        if (isset($_SESSION['ultimo_intento']) && time() - $_SESSION['ultimo_intento'] < $tiempoBloqueo) 
        {
            echo "Demasiados intentos fallidos. Inténtalo de nuevo más tarde.";
            exit;
        } 
        else 
        {
            //Restablece conteo
            $_SESSION['intentos_fallidos'] = 0;
        }
    }

    $ca = $_POST['ca'];
    $password = $_POST['password']; 

    $query = "SELECT * FROM Administrador WHERE ca = ?";
    $stmt = executeQuery($query, [$ca]);

    if ($stmt->rowCount() > 0) 
    {
        $admin = $stmt->fetch();

        // Verificar la contraseña encriptada
        if (password_verify($password, $admin['password'])) 
        {
            $_SESSION['loggedin'] = true;
            $_SESSION['ca'] = $admin['ca'];
            $_SESSION['nombre'] = $admin['nombre'];
            $_SESSION['rol'] = $admin['rol'];

            $hora_inicio_sesion = date('Y-m-d H:i:s');
            $usuario_id = $admin['ca']; 

            $query_update = "UPDATE Administrador SET hora_inicio_sesion = NOW() WHERE ca = ?";
            $stmt_update = executeQuery($query_update, [$usuario_id]);
            if ($stmt_update) 
            {
                echo "Hora de inicio de sesión actualizada correctamente en la base de datos.";
            } 
            else 
            {
                echo "Error al actualizar la hora de inicio de sesión en la base de datos.";
            }
            
            $_SESSION['intentos_fallidos'] = 0;

            echo "Bienvenido, " . $admin['nombre'];
        } 
        else 
        {
            if (!isset($_SESSION['intentos_fallidos'])) 
            {
                $_SESSION['intentos_fallidos'] = 1;
            } 
            else 
            {
                $_SESSION['intentos_fallidos']++;
            }

            $_SESSION['ultimo_intento'] = time();
            echo "Contraseña incorrecta";
        }
    } 
    else 
    {
        echo "No existe administrador con CA: $ca";
    }
}
?>
