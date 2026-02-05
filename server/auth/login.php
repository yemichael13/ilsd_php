<?php
session_start();
require __DIR__ . "/../config/db.php";

header("Content-Type: application/json");

$email    = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (!$email || !$password) {
    http_response_code(400);
    echo json_encode(["success" => false, "message" => "Missing fields"]);
    exit;
}

$stmt = $pdo->prepare("SELECT id, password FROM users WHERE email = ?");
$stmt->execute([$email]);
$user = $stmt->fetch();

if ($user && password_verify($password, $user['password'])) {
    $_SESSION['admin'] = $user['id'];
    echo json_encode(["success" => true]);
} else {
    http_response_code(401);
    echo json_encode(["success" => false, "message" => "Invalid credentials"]);
}
