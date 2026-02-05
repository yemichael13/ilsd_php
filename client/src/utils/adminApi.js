import { API } from "../api.js";

const API_BASE = "http://localhost:8000";

export const getFileUrl = (path) => {
  if (!path) return null;
  // path may be 'uploads/filename'
  return `${API_BASE}/${path}`;
};

export const adminPostsAPI = {
  async getAll() {
    const res = await fetch(API.listPosts, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to load posts");
    return await res.json();
  },

  async get(idOrSlug) {
    const qs = typeof idOrSlug === 'number' ? `?id=${idOrSlug}` : `?slug=${encodeURIComponent(idOrSlug)}`;
    let res = await fetch(`${API.getPost}${qs}`, { credentials: 'include' });
    if (res.status === 401 && window.location.hostname === 'localhost') {
      // retry with dev bypass
      res = await fetch(`${API.getPost}${qs}&dev=1`);
    }
    if (!res.ok) throw new Error('Failed to fetch post');
    return await res.json();
  },

  async getById(id) {
    return await adminPostsAPI.get(id);
  },

  async getBySlug(slug) {
    return await adminPostsAPI.get(slug);
  },

  async create(postData, files = []) {
    const fd = new FormData();
    fd.append("title", postData.title || "");
    fd.append("content", postData.content || "");
    fd.append("excerpt", postData.excerpt || "");
    fd.append("is_published", postData.is_published ? 1 : 0);

    let res = await fetch(API.createPost, {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    if (res.status === 401 && window.location.hostname === 'localhost') {
      // retry with dev bypass
      res = await fetch(API.createPost + '?dev=1', { method: 'POST', body: fd });
    }

    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to create post");

    const postId = data.post_id;

    // upload files sequentially
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.size > 50 * 1024 * 1024) continue;
      const fd2 = new FormData();
      fd2.append("post_id", postId);
      fd2.append("file", f);
      let upRes = await fetch(API.uploadFile, { method: "POST", body: fd2, credentials: "include" });
      if (upRes.status === 401 && window.location.hostname === 'localhost') {
        await fetch(API.uploadFile + '?dev=1', { method: 'POST', body: fd2 });
      }
    }

    return data;
  },

  async uploadFiles(postId, files = []) {
    for (let i = 0; i < files.length; i++) {
      const f = files[i];
      if (f.size > 50 * 1024 * 1024) continue;
      const fd2 = new FormData();
      fd2.append('post_id', postId);
      fd2.append('file', f);
      let upRes = await fetch(API.uploadFile, { method: 'POST', body: fd2, credentials: 'include' });
      if (upRes.status === 401 && window.location.hostname === 'localhost') {
        await fetch(API.uploadFile + '?dev=1', { method: 'POST', body: fd2 });
      }
    }
  },

  async update(id, postData) {
    const fd = new FormData();
    fd.append('id', id);
    fd.append('title', postData.title || '');
    fd.append('content', postData.content || '');
    fd.append('excerpt', postData.excerpt || '');
    fd.append('is_published', postData.is_published ? 1 : 0);

    const res = await fetch(API.updatePost, { method: 'POST', body: fd, credentials: 'include' });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to update post');
    return data;
  },

  async deleteFile(fileId) {
    const fd = new FormData();
    fd.append('id', fileId);
    const res = await fetch(API.deleteFile, { method: 'POST', body: fd, credentials: 'include' });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || 'Failed to delete file');
    return data;
  },

  async delete(id) {
    const fd = new FormData();
    fd.append("id", id);
    const res = await fetch(API.deletePost, {
      method: "POST",
      body: fd,
      credentials: "include",
    });
    const data = await res.json();
    if (!data.success) throw new Error(data.error || "Failed to delete");
    return data;
  },
};

export default adminPostsAPI;
