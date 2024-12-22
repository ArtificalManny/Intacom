// src/components/SettingsIcon.js

import React from 'react';
import { useNavigate } from 'react-router-dom'; // Assumes use of React Router for navigation
import { BsFillGearFill } from 'react-icons/bs';
import './SettingsIcon.css'; // We'll style it in CSS for the hover effect

const SettingsIcon = () => {
    const navigate = useNavigate();

    // Function to redirect to the settings page
    const goToSettings = () => {
        navigate('/settings');
    };

    return (
        <div className="settings-icon" onClick={goToSettings} title="Settings">
            <BsFillGearFill size={24} />
        </div>
    );
};

export default SettingsIcon;
