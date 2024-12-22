import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        educationalInstitution: "",
        job: "",
        description: "",
        profilePicture: null,
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, profilePicture: e.target.files[0] });
    };

    const handleSubmit = async () => {
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        try {
            await axios.post("/api/register", data);
            navigate("/login");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="register-container">
            <h2>Create an Account</h2>
            <input type="text" name="name" placeholder="Name" onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" onChange={handleChange} />
            <input type="password" name="password" placeholder="Password" onChange={handleChange} />
            <input
                type="text"
                name="educationalInstitution"
                placeholder="Educational Institution"
                onChange={handleChange}
            />
            <input type="text" name="job" placeholder="Job" onChange={handleChange} />
            <textarea
                name="description"
                placeholder="Describe yourself"
                onChange={handleChange}
            ></textarea>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleSubmit}>Register</button>
        </div>
    );
};

export default Register;
