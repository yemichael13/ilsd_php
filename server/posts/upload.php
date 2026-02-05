<?php
session_start();
require __DIR__ . "/../config/db.php";
header("Content-Type: application/json");

if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    exit;
}

if (!isset($_FILES['file'], $_POST['post_id'])) {
    http_response_code(400);
    exit;
}

$postId = $_POST['post_id'];
$file   = $_FILES['file'];

$uploadDir = "../uploads/";
$filename  = time() . "_" . basename($file['name']);
$path      = $uploadDir . $filename;

move_uploaded_file($file['tmp_name'], $path);

$stmt = $pdo->prepare("
    INSERT INTO post_files
    (post_id, file_name, file_path, file_type, mime_type)
    VALUES (?, ?, ?, ?, ?)
");

$stmt->execute([
    $postId,
    $file['name'],
    $path,
    pathinfo($file['name'], PATHINFO_EXTENSION),
    $file['type']
]);

echo json_encode(["success" => true]);
