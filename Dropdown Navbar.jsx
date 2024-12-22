import React from 'react';
import './Sidebar.css'; // Add styles here

const Sidebar = () => {
  return (
    <div className="sidebar">
      {/* Profile Section */}
      <div className="profile">
        <img src="https://via.placeholder.com/50" alt="Profile" className="profile-pic" />
        <h3 className="profile-name">User Name</h3>
      </div>

      {/* Navigation Links */}
      <nav className="nav">
        <ul>
          <li className="nav-item">
            <a href="#add-project">Add New Project</a>
          </li>
          <li className="nav-item">
            <a href="#settings">Settings</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
