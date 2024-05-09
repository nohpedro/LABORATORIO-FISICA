<?php
session_start();
header('Content-Type: application/json');

$response = ['loggedin' => false];

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    $response['loggedin'] = true;
    $response['nombre'] = $_SESSION['nombre'];  
}

echo json_encode($response);
