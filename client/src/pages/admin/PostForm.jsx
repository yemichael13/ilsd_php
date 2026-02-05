import { useState } from "react";
import { API } from "../../api.js";

export default function PostForm({ onCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [files, setFiles] = useState(null);

  const submit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("title", title);
    fd.append("content", content);
    fd.append("excerpt", excerpt);

    const res = await fetch(API.createPost, {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    const data = await res.json();

    if (data.success) {
      setTitle("");
      setContent("");
      setExcerpt("");
      // If there are files selected, upload them
      if (files && files.length) {
        for (let i = 0; i < files.length; i++) {
          const f = files[i];
          // client-side size limit check (50MB)
          if (f.size > 50 * 1024 * 1024) {
            alert(`File ${f.name} is larger than 50MB and was skipped.`);
            continue;
          }

          const fd2 = new FormData();
          fd2.append('post_id', data.post_id);
          fd2.append('file', f);

          await fetch(API.uploadFile, {
            method: 'POST',
            body: fd2,
            credentials: 'include'
          });
        }
      }

      setFiles(null);
      onCreated();
    }
  };

  return (
    <form onSubmit={submit}>
      <h3>Create Post</h3>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        required
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />

      <textarea
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        placeholder="Excerpt"
      />

      <input
        type="file"
        multiple
        onChange={(e) => setFiles(e.target.files)}
        accept="image/*,video/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      />

      <button>Create</button>
    </form>
  );
}
