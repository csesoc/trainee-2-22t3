import express, { application } from "express";
import { doomUsers, doomCourses, doomTasks } from "./database.js";
import { ObjectId } from "mongodb";
import tasksRoutes from "./routes/tasks.js";
import authRoutes from "./routes/auth.js";
import courseRoutes from "./routes/courses.js";
import userRoutes from "./routes/users.js";
import uniRoutes from "./routes/uni.js";
import { verifyJWT } from "./middleware/verifyJWT.js";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cors from "cors";
// Setup app
const app = express();

app.use(express.json());

// NOTE: origin url needs to change if frontend url changes.
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(
  fileUpload({
    createParentPath: true,
  })
);
app.use(express.static("./profile-imgs"));
app.get("/", (req, res) => {
  console.log("hello");
  res.send("hi!!!!");
});

app.use("/auth", authRoutes);

app.use("/tasks", tasksRoutes);

app.use("/courses", courseRoutes);

app.use("/users", userRoutes);

app.use("/uni", uniRoutes);

app.listen(5000, async () => {
  console.log("Doom Tracker API started!");
  console.log("listening on port 5000");
});
