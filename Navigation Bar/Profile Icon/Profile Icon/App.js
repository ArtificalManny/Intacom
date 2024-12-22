// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProfileIcon from './components/ProfileIcon';
import ProfilePage from './pages/ProfilePage';

function App() {
    return (
        <Router>
            <div>
                <ProfileIcon />
                <Routes>
                    {/* Other routes */}
                    <Route path="/profile" element={<ProfilePage />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
