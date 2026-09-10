<?php
require __DIR__ . "/../config/cors.php";
require __DIR__ . "/../config/session.php";
require __DIR__ . "/../config/db.php";

$isAdmin = isset($_SESSION['admin']);

// optionally filter by id or slug
$id = $_GET['id'] ?? null;
$slug = $_GET['slug'] ?? null;

if ($id || $slug) {
    if ($id) {
        $visibility = $isAdmin ? '' : ' AND is_published = 1';
        $stmt = $pdo->prepare("SELECT id, title, slug, excerpt, content, created_at, is_published FROM posts WHERE id = ?$visibility LIMIT 1");
        $stmt->execute([$id]);
    } else {
        $visibility = $isAdmin ? '' : ' AND is_published = 1';
        $stmt = $pdo->prepare("SELECT id, title, slug, excerpt, content, created_at, is_published FROM posts WHERE slug = ?$visibility LIMIT 1");
        $stmt->execute([$slug]);
    }

    $post = $stmt->fetch();
    if (!$post) {
        echo json_encode(null);
        exit;
    }

    // fetch files
    $fstmt = $pdo->prepare("SELECT id, post_id, file_name, file_path, file_type, mime_type FROM post_files WHERE post_id = ? ORDER BY id ASC");
    $fstmt->execute([$post['id']]);
    $files = $fstmt->fetchAll();
    $post['files'] = $files;

    echo json_encode($post);
    exit;
}

$where = $isAdmin ? '' : ' WHERE is_published = 1';
$stmt = $pdo->query(
    "SELECT id, title, slug, excerpt, content, created_at, is_published
    FROM posts$where
    ORDER BY created_at DESC"
);

$posts = $stmt->fetchAll();

if (count($posts) === 0) {
    echo json_encode([]);
    exit;
}

$ids = array_column($posts, 'id');
$placeholders = implode(',', array_fill(0, count($ids), '?'));

$fstmt = $pdo->prepare("SELECT id, post_id, file_name, file_path, file_type, mime_type FROM post_files WHERE post_id IN ($placeholders) ORDER BY id ASC");
$fstmt->execute($ids);
$files = $fstmt->fetchAll();

$grouped = [];
foreach ($files as $f) {
    $grouped[$f['post_id']][] = $f;
}

foreach ($posts as &$p) {
    $p['files'] = $grouped[$p['id']] ?? [];
}

echo json_encode($posts);
