import { API } from "../../api.js";

export default function PostList({ posts, onDelete }) {
  const remove = async (id) => {
    const fd = new FormData();
    fd.append("id", id);

    await fetch(API.deletePost, {
      method: "POST",
      body: fd,
      credentials: "include",
    });

    onDelete();
  };

  return (
    <>
      <h3>Posts</h3>
      <ul>
        {posts.map((p) => (
          <li key={p.id}>
            <strong>{p.title}</strong>
            <button onClick={() => remove(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  );
}
