router.get("/api/files/:projectId", checkPermissions, async (req, res) => {
    try {
        const files = await File.find({ projectId: req.params.projectId }).populate("uploadedBy", "name");
        res.status(200).json(files);
    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({ message: "Error fetching files" });
    }
});