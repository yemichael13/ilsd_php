<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/db.php";

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

try {
    $stmt->execute([$email]);
} catch (PDOException $e) {
    if ((int)$e->errorInfo[1] === 1062) {
        echo json_encode(["success" => true]);
        exit;
    }
    http_response_code(500);
    echo json_encode(["error" => "Internal server error"]);
    exit;
}

echo json_encode(["success" => true]);
