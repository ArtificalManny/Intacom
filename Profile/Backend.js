const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true},
    profilePicture: { type: String}, //Profile picture filename
    bannerImage: { type: String }, //Banner image filename
    workExperience: [
        {
            company: String,
            position: String,
            startDate: Date,
            endDate: Date,
        },
    ]
    education: [
        {
            institution: String,
            degree: String, 
            startDate: Date,
            endDate: Date,
        },
    ],
    personalLife: { type: String },
    currentProjects: [
        {
            title: String,
            description: String,
            image: String, //Project image filename
            document: String, //Project document filename
        },
    ],
    pastProjects: [
        {
            title: String,
            description: String,
            image: String, //Project image filename
            document: String, //Project document filename
        },
    ],
});

module.exports = mongoose.model("User", UserSchema);