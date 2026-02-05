import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { adminPostsAPI, getFileUrl } from "../../utils/adminApi";
import PageMotion from "../../components/motion/PageMotion";
import Reveal from "../../components/motion/Reveal";
import { FaPlus, FaEdit, FaTrash, FaEye, FaEyeSlash } from "react-icons/fa";

const AdminDashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await adminPostsAPI.getAll();
      setPosts(data);
      setError("");
    } catch (err) {
      setError(err.message || "Failed to load posts");
      if (err.message && err.message.includes("Unauthorized")) {
        logout();
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await adminPostsAPI.delete(id);
      setPosts(posts.filter((post) => post.id !== id));
      setDeleteConfirm(null);
    } catch (err) {
      alert(err.message || "Failed to delete post");
      if (err.message && err.message.includes("Unauthorized")) {
        logout();
        navigate("/admin/login");
      }
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFirstImage = (files) => {
    if (!files || files.length === 0) return null;
    const imageFile = files.find((f) => f.file_type === "image" || f.mime_type?.startsWith("image/"));
    return imageFile ? getFileUrl(imageFile.file_path) : null;
  };

  return (
    <PageMotion>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-green-800">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">Manage posts and content</p>
              </div>
              <div className="flex gap-4 items-center">
                <Link
                  to="/admin/posts/create"
                  className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors"
                >
                  <FaPlus /> New Post
                </Link>
                <button
                  onClick={() => {
                    logout();
                    navigate("/admin/login");
                  }}
                  className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {loading ? (
            <div className="text-center py-12 text-gray-600">Loading posts...</div>
          ) : posts.length === 0 ? (
            <Reveal>
              <div className="text-center py-12">
                <p className="text-gray-600 mb-6">No posts found.</p>
                <Link
                  to="/admin/posts/create"
                  className="inline-block bg-green-700 text-white px-6 py-3 rounded-lg hover:bg-green-800 transition-colors"
                >
                  Create Your First Post
                </Link>
              </div>
            </Reveal>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => {
                const imageUrl = getFirstImage(post.files);
                return (
                  <Reveal key={post.id} delay={0.05 * posts.indexOf(post)}>
                    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      {imageUrl && (
                        <img src={imageUrl} alt={post.title} className="w-full h-48 object-cover" />
                      )}
                      <div className="p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-lg font-bold text-green-800 line-clamp-2 flex-1">{post.title}</h3>
                          <span
                            className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                              post.is_published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {post.is_published ? <FaEye className="inline" /> : <FaEyeSlash className="inline" />}
                          </span>
                        </div>
                        {post.excerpt && <p className="text-sm text-gray-600 mb-4 line-clamp-2">{post.excerpt}</p>}
                        <div className="text-xs text-gray-500 mb-4">{formatDate(post.created_at)}</div>
                        <div className="flex gap-2">
                          <Link
                            to={`/admin/posts/edit/${post.id}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                          >
                            <FaEdit /> Edit
                          </Link>
                          <button
                            onClick={() => setDeleteConfirm(post.id)}
                            className="flex-1 flex items-center justify-center gap-2 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm"
                          >
                            <FaTrash /> Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          )}
        </div>

        {/* Delete Confirmation Modal */}
        {deleteConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md mx-4">
              <h3 className="text-lg font-bold mb-4">Confirm Delete</h3>
              <p className="text-gray-600 mb-6">Are you sure you want to delete this post? This action cannot be undone.</p>
              <div className="flex gap-4">
                <button onClick={() => handleDelete(deleteConfirm)} className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">Delete</button>
                <button onClick={() => setDeleteConfirm(null)} className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageMotion>
  );
};

export default AdminDashboard;
