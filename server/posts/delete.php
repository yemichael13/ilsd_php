<?php
session_start();
require __DIR__ . "/../config/db.php";

// CORS: reflect origin to support requests with credentials
$origin = $_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:5173';
header("Access-Control-Allow-Origin: $origin");
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$id = $_POST['id'] ?? '';

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Missing ID"]);
    exit;
}

$stmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(["success" => true]);
