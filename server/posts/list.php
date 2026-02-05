<?php
require __DIR__ . "/../config/db.php";
header("Content-Type: application/json");

$stmt = $pdo->query("
    SELECT id, title, slug, excerpt, content, created_at
    FROM posts
    WHERE is_published = 1
    ORDER BY created_at DESC
");

echo json_encode($stmt->fetchAll());
