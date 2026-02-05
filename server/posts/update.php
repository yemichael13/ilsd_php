<?php
session_start();
require __DIR__ . "/../config/db.php";

header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? 'http://localhost:5173'));
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') exit;

if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$id = $_POST['id'] ?? null;
$title = $_POST['title'] ?? '';
$content = $_POST['content'] ?? '';
$excerpt = $_POST['excerpt'] ?? '';
$is_published = isset($_POST['is_published']) ? (int)$_POST['is_published'] : 0;

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
}

$stmt = $pdo->prepare("UPDATE posts SET title = ?, content = ?, excerpt = ?, is_published = ? WHERE id = ?");
$stmt->execute([$title, $content, $excerpt, $is_published, $id]);

echo json_encode(["success" => true]);
