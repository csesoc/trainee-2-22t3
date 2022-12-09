import express from "express";
import { check, validationResult } from "express-validator";
import { doomCourses, doomUni, doomTasks, doomUsers } from "../database.js";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { calculateTaskDate } from "./tasks.js";

const router = express.Router();
router.use(verifyJWT);

// GET - /users/getTasks
// Returns an array of all courses
router.get("/getTasks", async (req, res) => {
  let userObj = req.authUser;
  const tasksArray = await doomTasks.find({ userId: userObj._id }).toArray();
  res.send(tasksArray);
});

// GET - /tasks/doomFactor
// Calculates the doom factor (a numerical representation of how behind the user is on work)
// of the logged in user.
//
router.get("/doomFactor", async (req, res) => {
  //// calculation....
  let userId = req.authUser._id.toString();
  console.log(userId);

  const totalTasks = await doomTasks
    .find({ userId: ObjectId(userId) })
    .toArray();
  console.log(totalTasks);
  const numTotal = totalTasks.length;
  if (numTotal === 0) {
    return res.send({ doomFactor: 0 });
  }
  const completedTasks = await doomTasks
    .find({ userId: ObjectId(userId), completed: true })
    .toArray();
  const numCompleted = completedTasks.length;
  return res.send({
    doomFactor: Math.floor(100 - (numCompleted / numTotal) * 100),
  });
});

// POST - /users/addCourse
// Adds a course to a user
// Also adds all the tasks from that course
// Requires:
// courseId: string
// User must be logged in
router.post("/addCourse", async (req, res, next) => {
  try {
    let userObj = req.authUser;
    let courseId = req.body.courseId;
    // Error Checking
    if (courseId === undefined) {
      return res.status(400).send({ error: "courseId not given" });
    }
    let foundCourse = await doomCourses.findOne({
      _id: ObjectId(courseId),
    });
    if (foundCourse === null) {
      return res.status(400).send({ error: "course not found" });
    }
    let uniObj = await doomUni.findOne({ name: foundCourse.uni });
    if (uniObj === null) {
      return res.status(400).send({ error: "course does not have valid uni" });
    }
    for (let course of userObj.courses) {
      if (course === foundCourse._id.toString()) {
        return res
          .status(400)
          .send({ error: "user already enrolled in course" });
      }
    }
    // Add tasks
    let tasks = [];
    for (let taskTemplate of foundCourse.taskTemplates) {
      for (let week of taskTemplate.weeks) {
        // Calculate date
        let date = calculateTaskDate(
          week,
          taskTemplate.term,
          taskTemplate.year,
          uniObj
        );
        // Check if date could be calculated
        if (date.date === undefined) {
          return res.status(400).send(date);
        }
        // Create task
        let task = {
          taskType: taskTemplate.taskType,
          name: taskTemplate.name,
          duration: taskTemplate.duration,
          completed: false,
          course: courseId,
          week: week,
          term: taskTemplate.term,
          year: taskTemplate.year,
          date: date.date,
          userId: userObj._id,
        };
        tasks.push(task);
      }
    }
    // Add course to user
    userObj.courses.push(foundCourse._id.toString());
    console.log(userObj.courses);
    await doomUsers.updateOne(
      { _id: ObjectId(userObj._id) },
      { $set: { courses: userObj.courses } }
    );
    await doomTasks.insertMany(tasks);
    return res.send({ success: "course and tasks successfully added" });
  } catch (err) {
    next(err);
  }
});

// POST - /users/uploadProfileImg
router.post("/uploadProfileImg", async (req, res, next) => {
  try {
    console.log(req.files);

    if (!req.files) {
      return res.status(400).send({ error: "No files given" });
    }
    console.log(req.files);
    let avatar = req.files.avatar;
    avatar.mv("./profile-imgs/" + req.authUser.username + ".png");
    await doomUsers.updateOne(
      { _id: req.authUser._id },
      {
        $set: {
          profileImg: `http://localhost:5000/${req.authUser.username}.png`,
        },
      }
    );
    res.send({
      message: "File uploaded",
      data: { name: avatar.name, mimetype: avatar.mimetype, size: avatar.size },
    });
  } catch (err) {
    next(err);
  }
});

// GET - /users/getProfileImg
// gets profile image of logged in user
// Brian Wang
router.get("/getProfileImg", async (req, res, next) => {
  let userObj = req.authUser;
  const profileDocument = await doomUsers.findOne({ _id: userObj._id });
  res.send({ profileImgUrl: profileDocument.profileImg });
});

// GET - /users/getUsername
// gets username of logged in user
// Brian Wang
router.get("/getUsername", async (req, res, next) => {
  let userObj = req.authUser;
  const profileDocument = await doomUsers.findOne({ _id: userObj._id });
  res.send({ username: profileDocument.username });
});

// PUT - /users/setDoomRating
// sets the daily doom rating of logged in user
// Brian Wang
router.put("/setDoomRating", async (req, res, next) => {});

// DEL - /users/dropCourse
// Drops course from user
// Also deletes all tasks assigned to that user from the course.
router.delete("/dropCourse", async (req, res, next) => {
  try {
    return res.send("unfinished");
  } catch (err) {
    next(err);
  }
});

export { router as default };
