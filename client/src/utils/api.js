import { API } from "../api.js";

export const getFileUrl = (path) => {
  if (!path) return null;
  const normalizedPath = String(path).replace(/^\/+/, "");
  const listUrl = new URL(API.listPosts, window.location.origin);
  const apiPath = listUrl.pathname.replace(/\/posts\/list\.php$/, "");
  return new URL(`${apiPath}/${normalizedPath}`, listUrl.origin).toString();
};

export const postsAPI = {
  async getAll() {
    const res = await fetch(API.listPosts);
    if (!res.ok) throw new Error('Failed to load posts');
    return await res.json();
  },

  async getBySlug(slug) {
    const res = await fetch(`${API.getPost}?slug=${encodeURIComponent(slug)}`);
    if (!res.ok) throw new Error('Failed to load post');
    return await res.json();
  },

  async getLatest(limit = 3) {
    const data = await postsAPI.getAll();
    return data.slice(0, limit);
  }
};

export default postsAPI;
