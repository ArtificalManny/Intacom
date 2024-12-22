import React from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './appReact.css'; // Ensure the file path and name are correct
import { Nav } from './Nav'; // Assuming Nav is a named export

function ReactExecutorHome() {
    return (
        <div className="WebsiteLogo">
            <h1>Executor's Cut</h1>
        </div>
    );
}

function Header() {
    const renderHeader = () => {
        // If logged in, show the logged-in header
        return (
            <div className="LoginContainer">
                <div className="Login">
                    Login
                </div>   
            </div>
        );
    };

    return (
        <Nav>
            <Logo src="" alt="Website Logo" />
            {/* Add logo above */}
            {renderHeader()}
        </Nav>
    );
}

export { Header }; // Named export for Header
export default ReactExecutorHome; // Default export for ReactExecutorHome