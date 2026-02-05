import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageMotion from "../components/motion/PageMotion";
import { postsAPI, getFileUrl } from "../utils/api";

const NewsDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await postsAPI.getBySlug(slug);
        setPost(data);
      } catch (err) {
        setError("Failed to load news");
      } finally {
        setLoading(false);
      }
    };

    if (slug) fetchPost();
  }, [slug]);

  if (loading) return <div className="pt-32 text-center">Loading...</div>;
  if (error) return <div className="pt-32 text-center text-red-600">{error}</div>;
  if (!post) return null;

  const heroImage = post.files?.[0];
  const galleryImages = post.files?.slice(1) || [];

  return (
    <div>
      <Navbar />

      <PageMotion>
  <div className="min-h-screen bg-gray-50 pt-28 pb-20 px-6 md:px-20">
    <div className="max-w-4xl mx-auto bg-white rounded-xl shadow overflow-hidden">

      {/* HERO IMAGE */}
      {heroImage && (
        <img
          src={getFileUrl(heroImage.file_path)}
          alt={heroImage.file_name}
          className="w-full h-[95] object-cover"
        />
      )}

      {/* CONTENT CONTAINER */}
      <div className="p-8">

        {/* TITLE */}
        <h1 className="text-3xl md:text-5xl font-bold text-green-700 mb-3">
          {post.title}
        </h1>

        {/* META */}
        <div className="text-sm text-gray-500 mb-4 space-y-1">
          <p>
            Published on{" "}
            {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className="italic text-gray-400">
            {post.slug}
          </p>
        </div>

        {/* DESCRIPTION / MAIN CONTENT */}
        <div
          className="prose max-w-none mb-10"
          dangerouslySetInnerHTML={{ __html: post.content || "" }}
        />

        {/* REMAINING FILES */}
        {galleryImages.length > 0 && (
          <>
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Attachments
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {galleryImages.map((f) => {
                const url = getFileUrl(f.file_path);

                if (f.mime_type?.startsWith("image/")) {
                  return (
                    <img
                      key={f.id}
                      src={url}
                      alt={f.file_name}
                      className="rounded-lg w-full h-64 object-cover"
                    />
                  );
                }

                if (f.mime_type?.startsWith("video/")) {
                  return (
                    <video
                      key={f.id}
                      controls
                      className="rounded-lg w-full"
                    >
                      <source src={url} type={f.mime_type} />
                    </video>
                  );
                }

                return (
                  <a
                    key={f.id}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-green-700 underline font-medium"
                  >
                    {f.file_name}
                  </a>
                );
              })}
            </div>
          </>
        )}

        {/* BACK LINK */}
        <div className="mt-10">
          <Link to="/news" className="text-green-700 font-semibold">
            ← Back to News
          </Link>
        </div>

      </div>
    </div>
  </div>
</PageMotion>

      <Footer />
    </div>
  );
};

export default NewsDetail;