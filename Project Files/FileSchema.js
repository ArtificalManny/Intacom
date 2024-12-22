import { permission } from "process";

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    originalname: { type: String, required: true },
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    uploadedBy: { type: mongoose.Schema.Type.ObjectId, ref: "User", required: true},
    uploadedAt: { type: Data, default: Date.now},
    permission: { type: String, enum: ["Owner", "Editor", "Viewer"], default: "Viewer"}, //Role-based permissions
});

module.exports = mongoose.model("File", FileSchema);