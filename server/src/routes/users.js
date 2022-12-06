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
  const tasksArray = await doomTasks
    .find({ userId: userObj._id.toString() })
    .toArray();
  res.send(tasksArray);
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

// GET - /users/friends/get
// given user, gets an array of friend
// objects with username and pfp
router.get("/friends/get", async (req,res,next) => {
  const friends = req.authUser.friends;
  const friendsList = [];
  const usersData = await doomUsers.find().toArray();
  let friendObj = {};
  for (let i = 0; i < friends.length; i++) {
    friend = usersData.find(e => e._id === friends[i]);
    friendObj = { 
      _id: friend._id,
      username: friend.username, 
      profileImgUrl: friend.profileImgUrl,
    };
    friendsList.push(friendObj);
  }
  return res.send(friendsList);
});


// POST - /users/friends/post
// given user and friend id, 
// adds friend to user
router.post("/friends/post", async (req,res,next) => {
  try {
    const userObj = req.authUser;
    const friendId = ObjectId(req.body._id);

    if (friendId === undefined) {
      return res.status(400).send({ error: "friendId not given" });
    }

    let foundFriend = await doomUsers.findOne({
      _id: ObjectId(friendId),
    });

    if (foundFriend === null) {
      return res.status(400).send({ error: "friendId is invalid" });
    }
    
    for (let friend of userObj.friends) {
      if (friend === foundFriend._id.toString()) {
        return res
          .status(400)
          .send({ error: "user already a friend" });
      }
    }

    userObj.friends.push(foundFriend._id.toString());
    return res.send({ success: "friend has been added" });
  } catch (error) {
    next(err);
  }
});

// DELETE - /users/friends/delete
// given user and friend id, 
// deletes friend from user
router.delete("/friends/delete", async (req,res,next) => {
  try {
    const userObj = req.authUser;
    const friendId = ObjectId(req.body._id);

    if (friendId === undefined) {
      return res.status(400).send({ error: "friendId not given" });
    }

    let foundFriend = await doomUsers.findOne({
      _id: ObjectId(friendId),
    });

    if (foundFriend === null) {
      return res.status(400).send({ error: "friendId is invalid" });
    }
    
    let flag = false;
    for (let friend of userObj.friends) {
      if (friend === foundFriend._id.toString()) {
        flag = true;
        break;
      }
    }

    if (flag === false) {
      return res
      .status(400)
      .send({ error: "user isn't a friend" });
    }

    const friendIndex = authUser.friends.indexOf(foundFriend._id);
    userObj.friends.splice(friendIndex, 1);
    return res.send({ success: "friend has been removed" });
  } catch (error) {
    next (error);
  }
});

export { router as default };
