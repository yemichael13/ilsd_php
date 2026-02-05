<?php
require __DIR__ . "/../config/db.php";
header("Content-Type: application/json");

$email = $_POST['email'] ?? '';

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid email"]);
    exit;
}

$stmt = $pdo->prepare("
    INSERT INTO newsletter (email, created_at)
    VALUES (?, NOW())
");

$stmt->execute([$email]);

echo json_encode(["success" => true]);
