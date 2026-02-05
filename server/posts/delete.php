<?php
session_start();
require __DIR__ . "/../config/db.php";
header("Content-Type: application/json");

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

$stmt = $pdo->prepare("DELETE FROM news WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(["success" => true]);
