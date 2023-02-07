import express from "express";
import { check, validationResult } from "express-validator";
import { doomCourses, doomUni, doomTasks, doomUsers } from "../database.js";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { calculateTaskDate } from "./tasks.js";
import { startOfWeek, endOfWeek } from "date-fns";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
router.use(verifyJWT);

// GET - /users/getAuthUserId
// Returns the authenticated user's Id
router.get("/getAuthUserId", async (req, res) => {
  const authUserId = req.authUser._id.toString();
  return res.send({ authUserId: authUserId });
});

// GET - /users/getUsers
// Returns an array of all users
router.get("/getUsers", async (req, res) => {
  // See verifyJWT for where authUser comes from
  // userObj = {_id: '63606ef4340d06fc62246242', username: 'Andrew2', email: 'test2@gmail.com', salt: ...
  let userObj = req.authUser;
  const userArray = await doomUsers.find({}, { username: 1, _id: 0 }).toArray();
  res.send(userArray);
});

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

// GET - /users/weeklyDoomFactor
// Calculates the doom factor for the current week, previous week and the week after given a date.
// query: {
//  date: integer
//}
router.get("/weeklyDoomFactor", async (req, res) => {
  let userId = req.authUser._id.toString();
  let dateObj = new Date(req.query.date * 1000);
  let startDay = startOfWeek(dateObj);
  let endDay = endOfWeek(dateObj);
  console.log(startDay, endDay);
  let currStartTime = startDay.getTime() / 1000;
  let currEndTime = endDay.getTime() / 1000;
  let weekSeconds = 3600 * 24 * 7;
  let times = [
    ["curr", currStartTime, currEndTime],
    ["prev", currStartTime - weekSeconds, currEndTime - weekSeconds],
    ["next", currStartTime + weekSeconds, currEndTime + weekSeconds],
  ];
  let doomFactor = {};
  for (let time of times) {
    console.log(time[1], req.query.date, time[2]);
    const totalTasks = await doomTasks
      .find({
        date: {
          $gt: time[1],
          $lt: time[2],
        },
        userId: userId,
      })
      .toArray();
    const numTotal = totalTasks.length;
    if (numTotal === 0) {
      doomFactor[time[0]] = 0;
    } else {
      console.log(userId);
      const completedTasks = await doomTasks
        .find({
          userId: userId,
          completed: true,
          date: { $gt: time[1], $lt: time[2] },
        })
        .toArray();
      console.log(completedTasks);
      const numCompleted = completedTasks.length;
      doomFactor[time[0]] = Math.floor(100 - (numCompleted / numTotal) * 100);
    }
  }
  return res.send(doomFactor);
});

// GET - /users/doomFactor
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
      console.log(req.body);
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
          userId: userObj._id.toString(),
        };
        tasks.push(task);
      }
    }
    console.log("hi");
    // Add course to user
    userObj.courses.push(foundCourse._id.toString());
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
          profileImg: `${process.env.BE_URL}/${req.authUser.username}.png`,
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
  let userId = req.authUser._id;
  if (userId === undefined) {
    return res.status(400).send({ error: "Task not found. Invalid task id" });
  } else {
    const profileDocument = await doomUsers.findOne({ _id: ObjectId(userId) });
    if (profileDocument === undefined) {
      return res.status(400).send({ error: "Task not found. Invalid task id" });
    }
    console.log("Hello");
    if (profileDocument.doomRating == undefined) {
      profileDocument.doomRating = 0;
    }
    console.log(profileDocument.doomRating.rating);
    console.log("yo");
    return res.send({
      doomRating: {
        rating: profileDocument.doomRating.rating,
        dateSelected: profileDocument.doomRating.dateSelected,
        daySelected: profileDocument.doomRating.dateSelected,
      },
    });
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
// objects with id, username and pfp
router.get("/friends/get", async (req, res, next) => {
  const userObj = req.authUser;

  if (userObj.friends === undefined) {
    userObj.friends = [];
  }

  const friendsList = [];
  let friendObj = {};
  for (let i = 0; i < userObj.friends.length; i++) {
    let friend = await doomUsers.findOne({ _id: ObjectId(userObj.friends[i]) });
    if (friend !== null) {
      friendObj = {
        _id: ObjectId(friend._id),
        username: friend.username,
        profileImg: friend.profileImg,
      };
    }
    friendsList.push(friendObj);
  }
  return res.send(friendsList);
});

// GET - /users/notFriends/get
// given user, gets an array of users
// objects with id, username and pfp
// that are NOT friends
router.get("/notFriends/get", async (req, res, next) => {
  const userObj = req.authUser;

  if (userObj.friends === undefined) {
    userObj.friends = [];
  }

  const friendsList = userObj.friends;
  friendsList.push(userObj._id.toString());

  const usersArray = await doomUsers.find().toArray();

  for (const friend of friendsList) {
    if (usersArray.find((e) => e._id.toString() === friend) !== undefined) {
      const friendIndex = usersArray.findIndex(
        (e) => e._id.toString() === friend
      );
      usersArray.splice(friendIndex, 1);
    }
  }

  return res.send(usersArray);
});

// POST - /users/friends/post
// given user and friend id,
// adds friend to user
router.post("/friends/post", async (req, res, next) => {
  try {
    const userObj = req.authUser;
    const friendId = ObjectId(req.body._id);

    if (friendId === undefined) {
      return res.status(400).send({ error: "friendId not given" });
    }

    let foundFriend = await doomUsers.findOne({ _id: ObjectId(friendId) });

    if (
      foundFriend === null ||
      foundFriend._id.toString() === userObj._id.toString()
    ) {
      return res.status(400).send({ error: "friendId is invalid" });
    }

    if (userObj.friends === undefined) {
      userObj.friends = [];
    }

    for (let friend of userObj.friends) {
      if (friend === foundFriend._id.toString()) {
        return res.status(400).send({ error: "user already a friend" });
      }
    }

    userObj.friends.push(foundFriend._id.toString());
    await doomUsers.updateOne(
      { _id: ObjectId(userObj._id) },
      { $set: { friends: userObj.friends } }
    );
    return res.send(userObj.friends);
  } catch (error) {
    next(error);
  }
});

// DELETE - /users/friends/delete
// given user and friend id,
// deletes friend from user
router.delete("/friends/delete", async (req, res, next) => {
  try {
    const userObj = req.authUser;
    const friendId = ObjectId(req.body._id);

    if (friendId === undefined) {
      return res.status(400).send({ error: "friendId not given" });
    }

    let foundFriend = await doomUsers.findOne({ _id: ObjectId(friendId) });

    if (
      foundFriend === null ||
      foundFriend._id.toString() === userObj._id.toString()
    ) {
      return res.status(400).send({ error: "friendId is invalid" });
    }
    if (userObj.friends === undefined) {
      userObj.friends = [];
    }

    let flag = false;
    for (let friend of userObj.friends) {
      if (friend === foundFriend._id.toString()) {
        flag = true;
        break;
      }
    }

    if (flag === false) {
      return res.status(400).send({ error: "user isn't a friend" });
    }

    const friendIndex = userObj.friends.indexOf(foundFriend._id.toString());
    userObj.friends.splice(friendIndex, 1);
    await doomUsers.updateOne(
      { _id: ObjectId(userObj._id) },
      { $set: { friends: userObj.friends } }
    );
    return res.send(userObj.friends);
  } catch (error) {
    next(error);
  }
});

export { router as default };
