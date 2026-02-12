import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import PageMotion from "../components/motion/PageMotion";
import Reveal from "../components/motion/Reveal";
import Stagger from "../components/motion/Stagger";
import { postsAPI, getFileUrl } from "../utils/api";
import { useTranslation } from 'react-i18next';

const News = () => {
    const { t } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const data = await postsAPI.getAll();
                setPosts(data);
                setError(null);
            } catch (err) {
                setError(t('news.failed'));
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const getFirstImage = (files) => {
        if (!files || files.length === 0) return null;
        const imageFile = files.find((f) => f.mime_type && f.mime_type.startsWith("image/"));
        return imageFile ? getFileUrl(imageFile.file_path) : null;
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    return (
        <div>
            <Navbar />
            <PageMotion>
                <div className="min-h-screen bg-gray-50 pt-24 pb-16">
                    <Reveal className="px-6 md:px-20 mb-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-center text-green-800 mb-4">{t('news.title')}</h1>
                        <p className="text-center text-gray-600 max-w-2xl mx-auto">{t('news.description')}</p>
                    </Reveal>

                    {loading && (
                        <div className="text-center text-gray-600 text-xl py-20">{t('news.loading')}</div>
                    )}

                    {error && (
                        <div className="text-center text-red-600 text-xl py-20">{t('news.failed')}</div>
                    )}

                    {!loading && !error && posts.length === 0 && (
                        <div className="text-center text-gray-600 text-xl py-20">{t('news.noNews')}</div>
                    )}

                    {!loading && !error && posts.length > 0 && (
                        <Stagger className="max-w-7xl mx-auto px-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {posts.map((post) => {
                                    const imageUrl = getFirstImage(post.files);
                                    return (
                                        <Stagger.Item key={post.id}>
                                            <Link to={`/news/${post.slug}`} className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 block h-full transform hover:-translate-y-2">
                                                {imageUrl && <img src={imageUrl} alt={post.title} className="w-full h-56 object-cover" />}
                                                <div className="p-6">
                                                    <h3 className="text-xl font-bold text-green-700 mb-2 line-clamp-2">{post.title}</h3>
                                                    {post.excerpt && <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.excerpt}</p>}
                                                    <div className="flex justify-between items-center text-xs text-gray-500">
                                                        <span>{formatDate(post.created_at)}</span>
                                                        <span className="text-green-700 font-semibold">{t('news.readMore')}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </Stagger.Item>
                                    );
                                })}
                            </div>
                        </Stagger>
                    )}
                </div>
                <Footer />
            </PageMotion>
        </div>
    );
};

export default News;