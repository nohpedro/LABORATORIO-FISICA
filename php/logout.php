<?php
session_start();
session_unset();  // Remover todas las variables de sesión
session_destroy(); // Destruir la sesión activa

// Puedes optar por enviar una respuesta que JavaScript pueda leer o simplemente redirigir
echo json_encode(['status' => 'success', 'message' => 'Session ended']);

