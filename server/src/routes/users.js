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
  console.log(userObj._id.toString());
  const tasksArray = await doomTasks
    .find({ userId: { $in: [userObj._id.toString(), userObj._id] } })
    .toArray();
  console.log("getting tasks");
  console.log(tasksArray);
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

  const totalTasks = await doomTasks.find({ userId: userId }).toArray();
  console.log(totalTasks);
  const numTotal = totalTasks.length;
  if (numTotal === 0) {
    return res.send({ doomFactor: 0 });
  }
  const completedTasks = await doomTasks
    .find({ userId: userId, completed: true })
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
// doomRating object: rating, dateSelected and daySelected fields
// Brian Wang
router.put("/setDoomRating", async (req, res, next) => {
  let userId = req.authUser._id.toString();
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array()[0].msg });
  }

  // 1. Valid body
  console.log(req.body);
  // let rating = parseInt(req.body.rating);
  // let dateSelected = parseInt(req.body.dateSelected);
  // let daySelected = parseInt(req.body.daySelected);
  const { rating, dateSelected, daySelected } = req.body;
  if (!rating || !dateSelected || !daySelected) {
    // a field is missing handle error accordingly
    return res.status(400).send({ error: "missing property" });
  }

  // if (!Object.hasOwn(req.body, "rating")) {
  //   return res.status(400).send({ error: "missing rating property" });
  // }
  // if (!Object.hasOwn(req.body, "dateSelected")) {
  //   return res.status(400).send({ error: "missing dateSelected property" });
  // }
  // if (!Object.hasOwn(req.body, "daySelected")) {
  //   return res.status(400).send({ error: "missing daySelected property" });
  // }

  if (req.body.rating !== undefined && typeof req.body.rating !== "number") {
    return res.status(400).send({ error: "doomFactor not number" });
  }
  if (
    req.body.dateSelected !== undefined &&
    typeof req.body.dateSelected !== "number"
  ) {
    return res.status(400).send({ error: "dateSelected not number" });
  }
  if (
    req.body.daySelected !== undefined &&
    typeof req.body.daySelected !== "number"
  ) {
    return res.status(400).send({ error: "daySelected not number" });
  }

  // 2. Update the data
  let userObj = req.authUser;

  console.log(userId);
  await doomUsers.updateOne(
    { _id: ObjectId(req.authUser._id) },
    {
      $set: {
        doomRating: {
          rating: rating,
          dateSelected: dateSelected,
          daySelected: daySelected,
        },
      },
    }
  );
  return res.send("User doomRating Edited");
});

// GET - /users/getDoomRating
// gets the daily doom
// for non-logged in users, need to concat to fetch url "?urlId={id}"
// (ik, it's kinda scuffed)
router.get("/getDoomRating", async (req, res, next) => {
  let userId = req.query.userId;
  if (userId === undefined) {
    userId = req.authUser._id.toString();
    const profileDocument = await doomUsers.findOne({ _id: ObjectId(userId) });
    if (
      profileDocument.doomRating === undefined ||
      profileDocument.doomRating === null
    ) {
      return res.send({
        doomRating: { rating: 0, dateSelected: 0, daySelected: 0 },
      });
    }
    return res.send({ doomRating: profileDocument.doomRating });
  } else {
    const profileDocument = await doomUsers.findOne({ _id: ObjectId(userId) });
    if (profileDocument === undefined) {
      return res.status(400).send({ error: "Task not found. Invalid task id" });
    }
    if (
      profileDocument.doomRating === undefined ||
      profileDocument.doomRating === null
    ) {
      return res.send({
        doomRating: { rating: 0, dateSelected: 0, daySelected: 0 },
      });
    }
    return res.send({ doomRating: profileDocument.doomRating });
  }
});

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
