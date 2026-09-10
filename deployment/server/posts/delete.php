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
$filesStmt->execute([$id]);
$uploadRoot = realpath(__DIR__ . '/../uploads');
foreach ($filesStmt->fetchAll() as $file) {
    $path = realpath(__DIR__ . '/../' . ltrim($file['file_path'], '/\\'));
    if ($uploadRoot && $path && str_starts_with($path, $uploadRoot . DIRECTORY_SEPARATOR) && is_file($path)) {
        unlink($path);
    }
}

$stmt = $pdo->prepare("DELETE FROM posts WHERE id = ?");
$stmt->execute([$id]);

echo json_encode(["success" => true]);
