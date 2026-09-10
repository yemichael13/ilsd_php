<?php
ini_set('display_errors', '0');
ini_set('display_startup_errors', '0');
error_reporting(E_ALL);

$localConfig = __DIR__ . '/db.local.php';
if (is_file($localConfig)) {
    require $localConfig;
}

$host = trim((string) ($DB_HOST ?? getenv('DB_HOST') ?: 'localhost'));
$port = trim((string) ($DB_PORT ?? getenv('DB_PORT') ?: '3306'));
$db = trim((string) ($DB_NAME ?? getenv('DB_NAME') ?: ''));
$user = (string) ($DB_USER ?? getenv('DB_USER') ?: '');
$pass = (string) ($DB_PASS ?? getenv('DB_PASS') ?: getenv('DB_PASSWORD') ?: '');

if ($db === '' || $user === '') {
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Database is not configured']);
    exit;
}

try {
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$db;charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );
} catch (PDOException $e) {
    error_log('Database connection failed: ' . $e->getMessage());
    http_response_code(500);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode(['error' => 'Database connection failed']);
    exit;
}
