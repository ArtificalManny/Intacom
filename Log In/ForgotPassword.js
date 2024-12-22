import React, { useState } from "react";
import axios from "axios";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const handleForgotPassword = async () => {
        try {
            const response = await axios.post("/api/forgot-password", { email });
            setMessage(response.data.message);
        } catch (err) {
            setMessage("Error sending reset link");
        }
    };

    return (
        <div className="forgot-password-container">
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                />
            <button onClick={handleForgotPassword}>Submit</button>
            {message && <div>{message}</div>}
        </div>
    );
};

export default ForgotPassword;