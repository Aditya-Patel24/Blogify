import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import { Query } from "appwrite";
import spinner from '../assets/spinner1.gif';

export default function Post() {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchPost = async () => {
            if (slug) {
                try {
                    const queries = [Query.equal('slug', slug)];
                    const response = await appwriteService.getPosts(queries);
                    if (response.documents.length > 0) {
                        setPost(response.documents[0]);
                    } else {
                        navigate("/");
                    }
                } catch (error) {
                    console.error("Failed to fetch post:", error);
                    navigate("/");
                } finally {
                    setLoading(false);
                }
            } else {
                navigate("/");
            }
        };

        fetchPost();
    }, [slug, navigate]);

    const deletePost = async () => {
        if (post) {
            try {
                const status = await appwriteService.deletePost(post.$id);
                if (status) {
                    if (post.feturedImage) {
                        await appwriteService.deleteFile(post.feturedImage);
                    }
                    navigate("/");
                } else {
                    console.error("Failed to delete post");
                }
            } catch (error) {
                console.error("Error deleting post:", error);
            }
        }
    };

    const handleImageError = (e) => {
        e.target.src = '/fallback-image.jpg'; // Ensure this path is correct for your fallback image
        console.error("Failed to load image:", e);
    };

    if (loading) {
        return (   <div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900'>
            <img src={spinner} alt="Loading..." className="w-64 h-64" />
            </div>)
    }

    if (!post) {
        return <div className="py-8 text-center">Post not found</div>;
    }

    return (
        <div className="py-8">
            <Container>
                <div className="relative w-full flex justify-center mb-4 border rounded-xl p-4">
                    {post.feturedImage ? (
                        <img
                            src={appwriteService.getFilePreview(post.feturedImage)}
                            alt={post.title}
                            className="rounded-xl max-w-full h-auto"
                            onError={handleImageError}
                        />
                    ) : (
                        <img
                            src='/fallback-image.jpg'
                            alt="Fallback"
                            className="rounded-xl max-w-full h-auto"
                        />
                    )}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-[#5ce1e6]" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-[#fd8320]" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                </div>
            </Container>
        </div>
    );
}
