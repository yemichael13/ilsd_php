<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/session.php";
require __DIR__ . "/../config/db.php";

$visibility = isset($_SESSION['admin']) ? '' : ' AND is_published = 1';

$id = $_GET['id'] ?? null;
$slug = $_GET['slug'] ?? null;

if (!$id && !$slug) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id or slug"]);
    exit;
}

if ($id) {
    $stmt = $pdo->prepare("SELECT id, title, slug, excerpt, content, created_at, is_published FROM posts WHERE id = ?$visibility LIMIT 1");
    $stmt->execute([$id]);
} else {
    $stmt = $pdo->prepare("SELECT id, title, slug, excerpt, content, created_at, is_published FROM posts WHERE slug = ?$visibility LIMIT 1");
    $stmt->execute([$slug]);
}

$post = $stmt->fetch();
if (!$post) {
    echo json_encode(null);
    exit;
}

$fstmt = $pdo->prepare("SELECT id, post_id, file_name, file_path, file_type, mime_type FROM post_files WHERE post_id = ? ORDER BY id ASC");
$fstmt->execute([$post['id']]);
$post['files'] = $fstmt->fetchAll();

echo json_encode($post);
