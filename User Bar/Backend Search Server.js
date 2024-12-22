// server/index.js

const express = require('express');
const mongoose = require('mongoose');
const searchRoutes = require('./routes/search');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB Connection
mongoose.connect('YOUR_MONGODB_CONNECTION_STRING', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("MongoDB connection error:", error));

// Middleware and Routes
app.use(express.json());
app.use('/api', searchRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
