<?php
session_start();
require __DIR__ . "/../config/db.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$title   = $_POST['title'] ?? '';
$content = $_POST['content'] ?? '';
$excerpt = $_POST['excerpt'] ?? '';

if (!$title || !$content) {
    http_response_code(400);
    echo json_encode(["error" => "Missing required fields"]);
    exit;
}

/* Create slug */
$slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title)));

$stmt = $pdo->prepare("
    INSERT INTO posts (title, slug, content, excerpt)
    VALUES (?, ?, ?, ?)
");

$stmt->execute([$title, $slug, $content, $excerpt]);

$postId = $pdo->lastInsertId();

echo json_encode([
    "success" => true,
    "post_id" => $postId
]);
