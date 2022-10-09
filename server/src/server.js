import express, { application } from "express";
import { doomUsers, doomCourses, doomTasks } from "./database.js";
import { ObjectId } from "mongodb";
import tasksRoutes from "./routes/tasks.js";
// Setup app
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  console.log("hello");
  res.send("hi!!!!");
});

app.use("/tasks", tasksRoutes);

app.listen(5000, async () => {
  console.log("Doom Tracker API started!");
  console.log("listening on port 5000");
});
