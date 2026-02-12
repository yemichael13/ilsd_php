<?php
session_start();
require __DIR__ . "/../config/db.php";

$origin = $_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:5173';
header("Access-Control-Allow-Origin: $origin");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$authenticated = false;

if (isset($_SESSION['admin'])) {
    // OPTIONAL but STRONGLY recommended: verify user still exists
    $stmt = $pdo->prepare("SELECT id FROM users WHERE id = ?");
    $stmt->execute([$_SESSION['admin']]);
    $authenticated = (bool) $stmt->fetch();
}

echo json_encode(["authenticated" => $authenticated]);