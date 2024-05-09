<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    echo "Acceso denegado. Necesitas iniciar sesión para acceder a esta página.";
    exit;
}


echo "Bienvenido a tu Dashboard, " . $_SESSION['nombre'];
?>
