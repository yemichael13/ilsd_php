import { API } from "../api.js";

export const getFileUrl = (path) => {
  if (!path) return null;
  const normalizedPath = String(path).replace(/^\/+/, "");
  const listUrl = new URL(API.listPosts, window.location.origin);
  const apiPath = listUrl.pathname.replace(/\/posts\/list\.php$/, "");
  return new URL(`${apiPath}/${normalizedPath}`, listUrl.origin).toString();
};

export const adminPostsAPI = {
  async getAll() {
    const res = await fetch(API.listPosts, { credentials: "include" });
    if (!res.ok) throw new Error("Failed to load posts");
    return await res.json();
  },

  async get(idOrSlug) {
    const str = String(idOrSlug);
    const isNumeric = /^\d+$/.test(str);
    const qs = isNumeric ? `?id=${str}` : `?slug=${encodeURIComponent(str)}`;
    const res = await fetch(`${API.getPost}${qs}`, { credentials: 'include' });
    if (!res.ok) throw new Error('Failed to fetch post');
    const data = await res.json();
    if (data === null) throw new Error('Post not found');
    return data;
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

    const res = await fetch(API.createPost, {
      method: "POST",
      body: fd,
      credentials: "include",
    });

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
      await fetch(API.uploadFile, { method: "POST", body: fd2, credentials: "include" });
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
      await fetch(API.uploadFile, { method: 'POST', body: fd2, credentials: 'include' });
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
