<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/session.php";
require __DIR__ . "/../config/db.php";

if (!isset($_SESSION['admin'])) {
    http_response_code(401);
    echo json_encode(["error" => "Unauthorized"]);
    exit;
}

// Validate input
if (!isset($_FILES['file'], $_POST['post_id'])) {
    http_response_code(400);
    echo json_encode(["error" => "Missing file or post_id"]);
    exit;
}

$postId = (int)$_POST['post_id'];
$file   = $_FILES['file'];

$postCheck = $pdo->prepare('SELECT id FROM posts WHERE id = ? LIMIT 1');
$postCheck->execute([$postId]);
if (!$postCheck->fetch()) {
    http_response_code(404);
    echo json_encode(["error" => "Post not found"]);
    exit;
}

// File size limit (50 MB)
$maxBytes = 50 * 1024 * 1024;
if ($file['error'] !== UPLOAD_ERR_OK) {
    http_response_code(400);
    echo json_encode(["error" => "Upload error", "code" => $file['error']]);
    exit;
}
if (!is_uploaded_file($file['tmp_name'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid upload"]);
    exit;
}
if ($file['size'] > $maxBytes) {
    http_response_code(413);
    echo json_encode(["error" => "File too large", "max_bytes" => $maxBytes]);
    exit;
}

// Allowed MIME types
$allowedMime = [
    'image/jpeg','image/png','image/gif','image/webp','image/avif',
    'video/mp4','video/webm','video/ogg','video/quicktime',
    'application/pdf','application/msword','application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','text/plain'
];
$extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$blockedExtensions = ['php', 'php3', 'php4', 'php5', 'php7', 'php8', 'phtml', 'phar', 'cgi', 'pl', 'py', 'sh'];
if ($extension === '' || in_array($extension, $blockedExtensions, true)) {
    http_response_code(415);
    echo json_encode(["error" => "Unsupported file extension"]);
    exit;
}

// detect mime type (fallback if fileinfo extension not available)
if (function_exists('finfo_open')) {
    $finfo = finfo_open(FILEINFO_MIME_TYPE);
    $detected = finfo_file($finfo, $file['tmp_name']);
    finfo_close($finfo);
} elseif (function_exists('mime_content_type')) {
    $detected = mime_content_type($file['tmp_name']);
} else {
    $detected = $file['type'] ?? 'application/octet-stream';
}

if (!in_array($detected, $allowedMime)) {
    http_response_code(415);
    echo json_encode(["error" => "Unsupported media type", "detected" => $detected]);
    exit;
}

// Ensure upload directory exists
$uploadDir = __DIR__ . "/../uploads/";
if (!is_dir($uploadDir)) {
    mkdir($uploadDir, 0755, true);
}

// Sanitize filename
$basename = preg_replace('/[^A-Za-z0-9._-]/', '_', basename($file['name']));
$filename = time() . '_' . bin2hex(random_bytes(6)) . '_' . $basename;
$destPath = $uploadDir . $filename;

// Move file
if (!move_uploaded_file($file['tmp_name'], $destPath)) {
    http_response_code(500);
    echo json_encode(["error" => "Failed to move uploaded file"]);
    exit;
}

$relativePath = 'uploads/' . $filename;

// Insert into database
$stmt = $pdo->prepare(
    "INSERT INTO post_files (post_id, file_name, file_path, file_type, mime_type) 
     VALUES (:post_id, :file_name, :file_path, :file_type, :mime_type)"
);

$stmt->execute([
    ':post_id'   => $postId,
    ':file_name' => $file['name'],
    ':file_path' => $relativePath,
    ':file_type' => pathinfo($file['name'], PATHINFO_EXTENSION),
    ':mime_type' => $detected
]);

echo json_encode(["success" => true, "file" => $relativePath]);
