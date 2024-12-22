router.delete("/api/files/:fileId", checkPermissions, async (req.res) => {
    if (req.userRole !== "Owner") {
        return res.status(403).json({ message: "You don't have permission to delete files"});
    }

    try {
        await.File.findByIdAndDelete(req.params.fileId);
        res.status(200.json({ message: "File deleted successfully" }));
    } catch (error) {
        console.error("Error deleting file:", error);
        res.status(500).json({ message: "Error deleting file"});
    }
});