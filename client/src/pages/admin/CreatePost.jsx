import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { adminPostsAPI } from "../../utils/adminApi";
import PageMotion from "../../components/motion/PageMotion";
import Reveal from "../../components/motion/Reveal";
import { FaArrowLeft, FaTrash, FaUpload } from "react-icons/fa";

const CreatePost = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    is_published: true,
  });
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await adminPostsAPI.create(formData, files);
      navigate("/admin");
    } catch (err) {
      setError(err.message || "Failed to create post");
      if (err.message && err.message.includes("Unauthorized")) {
        logout();
        navigate("/admin/login");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <PageMotion>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="mb-6">
              <button onClick={() => navigate("/admin")} className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"><FaArrowLeft /> Back to Dashboard</button>
              <h1 className="text-3xl font-bold text-green-800">Create New Post</h1>
            </div>
          </Reveal>

          {error && (
            <Reveal>
              <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">{error}</div>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 md:p-8 space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                <input id="title" name="title" type="text" value={formData.title} onChange={handleChange} required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Enter post title" />
              </div>

              <div>
                <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-2">Excerpt</label>
                <textarea id="excerpt" name="excerpt" value={formData.excerpt} onChange={handleChange} rows="2" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Brief description (optional)" />
              </div>

              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Content *</label>
                <textarea id="content" name="content" value={formData.content} onChange={handleChange} required rows="12" className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none" placeholder="Write your post content here..." />
              </div>

              <div className="flex items-center">
                <input id="is_published" name="is_published" type="checkbox" checked={formData.is_published} onChange={handleChange} className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded" />
                <label htmlFor="is_published" className="ml-2 block text-sm text-gray-700">Publish immediately</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Files (Images, Videos, Documents)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                  <input type="file" multiple onChange={handleFileChange} accept="image/*,video/*,.pdf,.docx,.xml" className="hidden" id="file-upload" />
                  <label htmlFor="file-upload" className="flex flex-col items-center justify-center cursor-pointer">
                    <FaUpload className="text-4xl text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600">Click to upload or drag and drop</span>
                    <span className="text-xs text-gray-500 mt-1">Max 10 files, 20MB each</span>
                  </label>
                </div>

                {files.length > 0 && (
                  <div className="mt-4 space-y-2">
                    {files.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-100 p-3 rounded-lg">
                        <span className="text-sm text-gray-700 truncate flex-1">{file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                        <button type="button" onClick={() => removeFile(index)} className="ml-2 text-red-600 hover:text-red-800"><FaTrash /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-4 pt-4">
                <button type="submit" disabled={loading} className="flex-1 bg-green-700 text-white font-semibold py-3 rounded-lg hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">{loading ? "Creating..." : "Create Post"}</button>
                <button type="button" onClick={() => navigate("/admin")} className="px-6 bg-gray-200 text-gray-800 font-semibold py-3 rounded-lg hover:bg-gray-300 transition-colors">Cancel</button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>
    </PageMotion>
  );
};

export default CreatePost;
