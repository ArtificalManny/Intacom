const express = require("express");
const multer = require("multer");
const File = require("./models/File");

const router = express.Router();

// Configure Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

//Upload a file
router.post("/api/files/upload", upload.single("file"), async (req, res) => {
    const { projectId, uploadedBy } = req.body;

    try { 
        const newFile = new File ({
            filename: req.file.filename,
            originalname: req.file.originalname,
            projectId,
            uploadedBy,
        });
        await newFile.save();

        res.status(200).json({ message: "File uploaded successfully", file: newFile });
    } catch (error){
        console.error("Error uploading file:", error);
        res.status(500).json({ message: "Error uploading file" });
    }
});

//Download a file
router.get("/api/files/downloads/:filename", (req, res) => {
    const filePath =  `upload/${req.params.filename}`;
    res.download(filePath, (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Error downloaing file");
        }
    });
});

module.exports = router;