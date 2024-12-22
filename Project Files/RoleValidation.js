const Project = require("./models/Project");

const checkPermissions = async (req, res, next) = {
    const { userId, projectId } = req.body;

    try {
        const project = await Project.findById(projectId).populate("members");
        const member = project.member.find((m) => m.user.toString() === userId);

        if (!member) {
            return res.status(403).json({ message: "You are not a member of this project" });
        }

        req.userRole = member.role; //e.g. "Owner", "Editor", "Viewer"
        next();
    } catch (error) {
        console.error("Error checking permissions:", error);
        res.status(500).json({ message: "Internal server error"})
    }
};