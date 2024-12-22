// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./user');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// MongoDB connection
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Routes
app.use('/api/user', userRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
