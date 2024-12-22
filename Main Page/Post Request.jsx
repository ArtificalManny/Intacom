// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
    const [postText, setPostText] = useState('');
    const [posts, setPosts] = useState([]);

    // Handle the submission of a new post
    const handlePostSubmit = () => {
        if (postText.trim() === '') return; // Prevent empty posts

        const newPost = {
            id: posts.length + 1,
            text: postText,
            timestamp: new Date().toLocaleString(),
            likes: 0,
        };

        setPosts([newPost, ...posts]); // Add new post at the top
        setPostText(''); // Clear input field
    };

    // Handle like button click
    const handleLike = (postId) => {
        setPosts(
            posts.map((post) =>
                post.id === postId ? { ...post, likes: post.likes + 1 } : post
            )
        );
    };

    return (
        <div className="app-container">
            <div className="post-creator">
                <textarea
                    placeholder="What's on your mind?"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                ></textarea>
                <button onClick={handlePostSubmit}>Post</button>
            </div>

            <div className="post-list">
                {posts.map((post) => (
                    <div key={post.id} className="post">
                        <p className="post-text">{post.text}</p>
                        <p className="post-timestamp">{post.timestamp}</p>
                        <button onClick={() => handleLike(post.id)} className="like-button">
                            👍 Like {post.likes}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default App;
