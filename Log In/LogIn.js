import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {
        setError("");
        try {
            const response = await axios.post("/api/auth", { email, password });
            localStorage.setItem("token", response.data.token);
            navigate(`/profile`);
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong");
        }
    };

    return (
        <div className="login-container">
            <div className="login-banner">TeamProjects</div>
            <div className="login-form">
                <h2>Log Into TeamProjects</h2>
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                {error && <div className="error">{error}</div>}
                <button onClick={handleLogin}>Log In</button>
                <div className="login-links">
                    <span onClick={() => navigate("/forgot-password")}>Forgot Password?</span>
                    <span onClick={() => navigate("/register")}>Create an Account</span>
                </div>
            </div>
        </div>
    );
};

export default Login;
