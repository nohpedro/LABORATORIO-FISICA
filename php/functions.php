<?php
require_once  'db.php';

function executeQuery($query, $params = []) {
    $pdo = getDB(); // Obtiene la conexión a la base de datos
    try {
        $stmt = $pdo->prepare($query);
        $stmt->execute($params);
        return $stmt;
    } catch (PDOException $e) {
        die("ERROR: No se pudo ejecutar $query. " . $e->getMessage());
    }
}
?>

