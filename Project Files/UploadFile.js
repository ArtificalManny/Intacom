router.post("/api/files/upload", upload.single("file"), checkPermissions, async (req, res) => {
    if (!["Owner", "Editor"].includes(req.userRole)) {
        return res.status(403).json({ message: "You don't have permission to upload files" });
    }

    const { projectId, uploadedBy } = req.body;
    const newFIle = new File ({
        filename: req.file.filename,
        originalname: req.file.originalname,
        projectId,
        uploadedBy,
    });

    try {
        await newFIle.save();
        res.status(200).json({ message: "File uploaded successfully", file: newFile });
    } catch (error) {
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file" });
    }
});