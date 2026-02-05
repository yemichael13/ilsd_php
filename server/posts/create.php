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

// Allow development bypass when called with ?dev=1 to help local testing
$devBypass = ($_GET['dev'] ?? null) === '1';
if (!$devBypass && !isset($_SESSION['admin'])) {
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
try {
    $stmt->execute([$title, $slug, $content, $excerpt]);
    $postId = $pdo->lastInsertId();

    echo json_encode([
        "success" => true,
        "post_id" => $postId
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "success" => false,
        "error" => "DB error",
        "details" => $e->getMessage()
    ]);
}
