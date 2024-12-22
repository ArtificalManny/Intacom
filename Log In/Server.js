const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

//MongoDB connection
mongoose.connect("mongodb://localhost:27017/teamprojects", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

//User Schema
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String,
    educationalInstitution: String,
    job: String,
    description: String,
    profilePicture: String, //Path to upload file
    projects: [String], //Array of project IDs
});

const User = mongoose.model("User", userSchema);

//Middleware for file upload
const upload = multer({ dest: "uploads/" });

//Authentication
const JWT_SECRET = "your_secret_key";

//Routes

//Register new user
app.post("api/register", upload.single("profilePicture"), async (req, res) => {
    const { name, email, password, educationalInstitution, job, description} = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const profilePicture = req.file ? req.file.path : null;

    try {
        const user = new User({
            name,
            email,
            password: hashedPassword,
            educationalInstitution,
            job,
            description,
            profilePicture,
        });
        await user.save();
        res.status(201).json({ message: "Account created successfully" });
    } catch (err) {
        res.status(400).json({ error: "User already exists"});
    }
});

//Login user
app.post("/api/auth", async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: "1h" });
    res.status(200).json({ message: "Logged in successfully", token });
});

//Forgot password
app.post("/api/forgot-password", async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message:"User not found"});

    //Normally, send an email with a reset token
    res.status(200).json({ message: "Password reset link sent to your email" });
});

//Verify JWT token
app.post(/"api/verify", (req, res) => {
    const token = req.headers["jwt-token"];
    if (!token) return res.status(401).json({ message: "No token provided" });
    
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: "Invalid token" });
        res.status(200).json({ message: "success", userId: decoded.id});
    });
});

const PORT = 3080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
