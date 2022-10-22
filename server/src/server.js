import express, { application } from "express";
import { doomUsers, doomCourses, doomTasks } from "./database.js";
import { ObjectId } from "mongodb";
import tasksRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import cors from "cors";
// Setup app
const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());
app.get("/", (req, res) => {
  console.log("hello");
  res.send("hi!!!!");
});

app.use("/auth", authRoutes);

app.use("/tasks", tasksRoutes);
// Routes above do not require authentication
app.use(verifyJWT);
// Routes below do require authentication

app.listen(5000, async () => {
  console.log("Doom Tracker API started!");
  console.log("listening on port 5000");
});
