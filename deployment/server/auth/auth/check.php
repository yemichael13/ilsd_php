<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/session.php";
require __DIR__ . "/../config/db.php";

$authenticated = false;

if (isset($_SESSION['admin'])) {
    // OPTIONAL but STRONGLY recommended: verify user still exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['admin']]);
    $authenticated = (bool) $stmt->fetch();
}

echo json_encode(["authenticated" => $authenticated]);