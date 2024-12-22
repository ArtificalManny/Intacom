const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const io = new Server(server);

const Activity = require("./models/Activity");
const { timeStamp } = require("console");

//Socket.IO connection
io.on("connection", (socket) => {
    console.log("A user connected");

    //Disconnect event
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

//Log a new activity and broadcast it
app.post("/api/activities", async (req, res) => {
    const { type, details, projectId, userId } = req.body;

    try {
        const newActivity = new Activity ({ type, details, projectId, userId });
        await newActivity.save();

        //Broadcast new activity to all connected clients
        io.emit("new-activity", newActivity);

        res.json(newActivity);
    } catch (error) {
        console.error("Error logging activity:", error);
        res.status(500).send("Server error");
    }
});

//Fetch all activities
app.get("/api/activities", async (req, res) => {
    try {
        const activities = await
        Activity.find().sort({ timestamp: -1 });
        res.json(activities);
    } catch (error) {
        console.error("Error fetching activites:", error);
        res.status(500).send("Server error");
    }
});

server.listen(5000, () => {
    console.log("Server running on port 5000")
});