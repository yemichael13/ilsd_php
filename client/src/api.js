const API_BASE = "http://localhost:8000";

export const api = {
  login: `${API_BASE}/auth/login.php`,
  logout: `${API_BASE}/auth/logout.php`,

  listPosts: `${API_BASE}/posts/list.php`,
  createPost: `${API_BASE}/posts/create.php`,
  deletePost: `${API_BASE}/posts/delete.php`,
  uploadFile: `${API_BASE}/posts/upload.php`,
  checkAuth: `${API_BASE}/auth/check.php`
};
api.getPost = `${API_BASE}/posts/get.php`;
api.updatePost = `${API_BASE}/posts/update.php`;
api.deleteFile = `${API_BASE}/posts/delete_file.php`;

// Backwards-compatible export (some components import `API`)
export const API = api;
