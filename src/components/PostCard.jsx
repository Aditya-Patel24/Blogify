import React from 'react';
import appwriteService from "../appwrite/config";
import { useNavigate } from 'react-router-dom';

function PostCard({ slug, title, feturedImage, handleImageError }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/post/${slug}`);  // Navigate using the slug
    };

    const imageUrl = feturedImage ? appwriteService.getFilePreview(feturedImage) : '';

    return (
        <div className='border rounded-lg p-4' onClick={handleClick} style={{ cursor: 'pointer' }}>
            <h2 className='text-xl font-bold mb-2'>{title}</h2>
            <img
                src={imageUrl}
                alt={title}
                className="rounded-lg max-w-full h-auto"
                onError={(e) => {
                    console.error("Image failed to load:", e.target.src);
                    handleImageError(e);
                }}
            />
        </div>
    );
}

export default PostCard;
