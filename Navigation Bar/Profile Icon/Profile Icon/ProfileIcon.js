// src/components/ProfileIcon.js

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProfileIcon.css';

const ProfileIcon = () => {
    const [user, setUser] = useState({ name: '', profilePicture: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await axios.get('/api/user/profile');
                setUser(response.data);
            } catch (error) {
                console.error("Error fetching user profile:", error);
            }
        };

        fetchUserProfile();
    }, []);

    // Function to navigate to the profile page
    const goToProfilePage = () => {
        navigate('/profile');
    };

    return (
        <div className="profile-icon" onClick={goToProfilePage} title="Go to Profile">
            <img src={user.profilePicture} alt="Profile" className="profile-picture" />
            <span className="profile-name">{user.name}</span>
        </div>
    );
};

export default ProfileIcon;
