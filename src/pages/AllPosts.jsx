import React, { useState, useEffect } from 'react';
import { Container, PostCard } from '../components';
import appwriteService from "../appwrite/config";

function AllPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsResponse = await appwriteService.getPosts([]);
                if (postsResponse) {
                    setPosts(postsResponse.documents);
                }
            } catch (error) {
                console.error("Failed to fetch posts", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <div className='w-full py-8'>
            <Container>
                {loading ? (
                    <div className="text-center">Loading...</div>
                ) : (
                    <div className='flex flex-wrap'>
                        {posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.$id} className='p-2 w-1/4'>
                                    <PostCard 
                                        slug={post.slug}  // Pass the slug here
                                        title={post.title}
                                        feturedImage={post.feturedImage}
                                        handleImageError={(e) => {
                                            e.target.src = '/fallback-image.jpg';
                                            console.error("Image failed to load:", e);
                                        }}
                                    />
                                </div>
                            ))
                        ) : (
                            <div className="text-center w-full">No posts found</div>
                        )}
                    </div>
                )}
            </Container>
        </div>
    );
}

export default AllPosts;
