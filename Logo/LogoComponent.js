import React from "react";
import { useNavigate } from "react-router-dom";
import "./Logo.css"; //Add custom styling if needed

const Logo = ({ projectId }) => {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate(`/projects/${projectId}`); //Navigate to the project main page
    };

    return (
        <div className="logo-container" onClick={handleLogoClick} style={{ cursor: " pointer" }}>
            <img
            src= //Insert actual logo path
            alt="Logo"
            className="logo-image"
            />
        </div>
    );
};

export default Logo;