// src/components/ProfileLogo.js
import React, { useEffect, useState } from "react";
import { firebaseApp } from "../firebase"; // Firebase setup
import axios from "axios";
import { useNavigate } from "react-router-dom"; // React Router for navigation

const ProfileLogo = () => {
    const [profilePictureUrl, setProfilePictureUrl] = useState("");
    const navigate = useNavigate();
    const uid = firebaseApp.auth().currentUser?.uid;

    useEffect(() => {
        const fetchProfileData = async () => {
            if (!uid) return;

            try {
                const response = await axios.get(`YOUR_FUNCTIONS_URL/getUserProfileData?uid=${uid}`);
                const { profilePictureUrl } = response.data;
                setProfilePictureUrl(profilePictureUrl);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        fetchProfileData();
    }, [uid]);

    const handleProfileClick = () => {
        navigate("/profile"); // Redirect to the profile page
    };

    return (
        <div 
            style={{
                position: "fixed",
                top: "15px",
                right: "15px",
                cursor: "pointer",
                width: "50px",
                height: "50px",
                borderRadius: "50%",
                overflow: "hidden",
                border: "2px solid #ccc",
            }}
            onClick={handleProfileClick}
        >
            <img 
                src={profilePictureUrl || "default_profile_picture.png"} // Fallback to default image
                alt="Profile Logo" 
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        </div>
    );
};

export default ProfileLogo;
