<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/session.php";
require __DIR__ . "/../config/db.php";

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

$filesStmt = $pdo->prepare("SELECT file_path FROM post_files WHERE post_id = ?");
$filesStmt->execute([(int)$id]);
$files = $filesStmt->fetchAll();

$stmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
$stmt->execute([(int)$id]);

if ($stmt->rowCount() === 0) {
    http_response_code(404);
    echo json_encode(["error" => "Post not found"]);
    exit;
}

// Database deletion is authoritative. Clean up attachment files afterward so
// a missing upload directory cannot prevent the post from being deleted.
$uploadRoot = realpath(__DIR__ . '/../uploads');
if ($uploadRoot) {
    foreach ($files as $file) {
        $path = realpath(__DIR__ . '/../' . ltrim($file['file_path'], '/\\'));
        $insideUploads = $path && strpos($path, $uploadRoot . DIRECTORY_SEPARATOR) === 0;
        if ($insideUploads && is_file($path)) {
            @unlink($path);
        }
    }
}

echo json_encode(["success" => true]);
