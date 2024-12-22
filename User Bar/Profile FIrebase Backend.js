// In functions/index.js

const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

// Function to get user profile data
exports.getUserProfileData = functions.https.onRequest(async (req, res) => {
    const { uid } = req.query;
    
    if (!uid) {
        return res.status(400).send("User ID is required");
    }
    
    try {
        const userDoc = await db.collection("users").doc(uid).get();
        if (!userDoc.exists) {
            return res.status(404).send("User profile not found");
        }
        return res.status(200).json(userDoc.data());
    } catch (error) {
        console.error("Error retrieving user profile data:", error);
        return res.status(500).send("Error retrieving user profile data");
    }
});
