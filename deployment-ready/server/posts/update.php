<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/session.php";
require __DIR__ . "/../config/db.php";

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
