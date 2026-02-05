import { API } from "../api.js";

const API_BASE = "http://localhost:8000";

export const getFileUrl = (path) => {
  if (!path) return null;
  return `${API_BASE}/${path}`;
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
