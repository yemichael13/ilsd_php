<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/session.php";
require __DIR__ . "/../config/db.php";

if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

$id = $_POST['id'] ?? null; // file id

if (!$id) {
    http_response_code(400);
    echo json_encode(["error" => "Missing id"]);
    exit;
}

$stmt = $pdo->prepare("SELECT file_path FROM post_files WHERE id = ? LIMIT 1");
$stmt->execute([$id]);
$row = $stmt->fetch();
if ($row) {
    $uploadRoot = realpath(__DIR__ . '/../uploads');
    $path = realpath(__DIR__ . '/../' . ltrim($row['file_path'], '/\\'));
    if ($uploadRoot && $path && str_starts_with($path, $uploadRoot . DIRECTORY_SEPARATOR) && is_file($path)) {
        unlink($path);
    }
}

$dstmt = $pdo->prepare("DELETE FROM post_files WHERE id = ?");
$dstmt->execute([$id]);

echo json_encode(["success" => true]);
