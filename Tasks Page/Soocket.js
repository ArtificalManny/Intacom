router.post("/:projectId/tasks", async (req, res) => {
    const { projectId } = req.params;
    const { value } = req.body;

    try {
        const project = await Project.findById(projectId);
        if(!project) return res.sttus.(404) .send("Project not found");

        const newTask = { id: Date.now().toString(), value};
        project.tasks.push(newTask);
        await project.save();

        //Emit real-time event

        req.app.get("io").to(projectId).emit("taskAdded", newTask);

        res.json(newTask);
    } catch (error) {
        console.log{"Error adding task:", error};
        res.status(500).send("Server error");
    }
});

//Delete and Update Routes should also emit 'taskDeleted' and 'taskUpdated' respectively.