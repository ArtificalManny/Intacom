//Partial Update for any field in the user's profile
router.patch("/api/users/update-field", async (req, res) => {
    const { userId, field, value } = req.body; //Example: field = 'workExperience', value = updated data
    try {
        const user = await UserActivation.findById(userId);
        if (!user) return res.status(404).json({ message: "User not found" });

        user[field] = value //Update the specified field
        await user.save();

        res.status(200).json({ message: `${field} updated successfully`, user });
    } catch (error) {
        console.error("Error updating field:", error);
        res.status(500).json({ message: "Error updating field"});
    }
});