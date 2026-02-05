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
    $path = __DIR__ . "/../" . $row['file_path'];
    if (file_exists($path)) unlink($path);
}

$dstmt = $pdo->prepare("DELETE FROM post_files WHERE id = ?");
$dstmt->execute([$id]);

echo json_encode(["success" => true]);
