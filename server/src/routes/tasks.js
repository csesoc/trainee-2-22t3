import express from "express";
import { check, validationResult } from "express-validator";
import { doomTasks } from "../database.js";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../middleware/verifyJWT.js";
const router = express.Router();

// GET - /tasks/get
// Returns an array of all tasks
router.get("/get", async (req, res) => {
  const tasksArray = await doomTasks.find().toArray();
  res.send(tasksArray);
});

// GET - /tasks/doomFactor
// Calculates the doom factor (a numerical representation of how behind the user is on work)
// Requires in query:
// {
//    userId: string
// }
//
router.get("/doomFactor", async (req, res) => {
  //// calculation....
  let userId = req.query.userId;
  console.log(userId);
  console.log(req.query.userId);
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

router.use(verifyJWT);

// POST - /tasks/post
// Adds a given task to database
// and task requires all fields
router.post(
  "/post",
  [
    check("taskType")
      .exists()
      .withMessage("Task type not inputted")
      .isString()
      .withMessage("Task type is invalid"),
    check("duration")
      .exists()
      .withMessage("Duration not inputted")
      .isNumeric()
      .withMessage("Duration is invalid"),
    check("completed")
      .exists()
      .withMessage("Completion status not inputted")
      .isBoolean()
      .withMessage("Completion status is invalid"),
    check("name")
      .exists()
      .withMessage("Name of task not inputted")
      .isString()
      .withMessage("Name of task is invalid"),
    check("course")
      .exists()
      .withMessage("Course id not inputted")
      .isString()
      .withMessage("Course id is invalid"),
    check("week")
      .exists()
      .withMessage("Week not inputted")
      .isNumeric({ min: 1, max: 10 })
      .withMessage("Week is invalid"),
    check("term")
      .exists()
      .withMessage("Term not inputted")
      .isNumeric({ min: 1, max: 3 })
      .withMessage("Term is invalid"),
    check("year")
      .exists()
      .withMessage("Year not inputted")
      .isNumeric({ min: 2022 })
      .withMessage("Year is invalid"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res
        .status(422)
        .send(
          "Task can not be added due to the following issues: " +
            errors.array()[0].msg
        );
    }
    req.body.userId = req.authUser._id.toString();
    doomTasks.insertOne(req.body);
    res.send("Task Added");
  }
);

// PUT - /tasks/put
// Edits a specific task
// task id + edits
// assumes keys are valid - form for user to fill
router.put(
  "/put",
  check("_id").exists().withMessage("Task id not provided"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array()[0].msg });
    }

    // 1. find inside database for matching id - if none return error message
    const id = req.body._id;
    const foundTask = await doomTasks.findOne({ _id: ObjectId(id) });
    if (foundTask === undefined) {
      return res.status(400).send({ error: "Task not found. Invalid task id" });
    }
    if (foundTask.userId.toString() !== req.authUser._id.toString()) {
      return res.status(403).send({
        error: "Logged in person does not have permission to edit task",
      });
    }

    // 2. Valid date body
    const updates = {};
    if (
      req.body.taskType !== undefined &&
      typeof req.body.taskType !== "string"
    ) {
      return res.status(400).send({ error: "taskType not string" });
    }
    if (
      req.body.duration !== undefined &&
      typeof req.body.duration !== "number"
    ) {
      return res.status(400).send({ error: "duration not number" });
    }
    if (
      req.body.completed !== undefined &&
      typeof req.body.completed !== "boolean"
    ) {
      return res.status(400).send({ error: "completed not boolean" });
    }
    if (req.body.name !== undefined && typeof req.body.name !== "string") {
      return res.status(400).send({ error: "name not string" });
    }
    if (req.body.course !== undefined && typeof req.body.course !== "number") {
      return res.status(400).send({ error: "course not number" });
    }
    if (req.body.week !== undefined && typeof req.body.week !== "number") {
      return res.status(400).send({ error: "week not number" });
    }
    if (req.body.term !== undefined && typeof req.body.term !== "number") {
      return res.status(400).send({ error: "term not number" });
    }
    if (req.body.year !== undefined && typeof req.body.year !== "number") {
      return res.status(400).send({ error: "year not number" });
    }
    if (req.body.userId !== undefined && typeof req.body.userId !== "string") {
      return res.status(400).send({ error: "userId not string" });
    }
    // Remove _id so it doesn't get updated.
    delete req.body._id;
    // 3. Update the data
    await doomTasks.updateOne({ _id: ObjectId(id) }, { $set: req.body });
    return res.send("Task Edited");
  }
);

// DELETE - /tasks/delete
// Removes a task from the database
// argument = task id
router.delete(
  "/delete",
  check("_id").exists().withMessage("Task id not provided"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }
    const foundTask = await doomTasks.findOne({ _id: ObjectId(req.query._id) });
    if (foundTask === undefined) {
      return res.status(400).send({ error: "Task not found. Invalid task id" });
    }
    if (foundTask.userId.toString() !== req.authUser._id.toString()) {
      return res
        .status(403)
        .send({ error: "Logged in person does not have permission to delete" });
    }
    await doomTasks.deleteOne({ _id: ObjectId(req.query._id) });
    return res.send("Task Removed");
  }
);

// given uni, term, year and week calculate the unix time of the monday at 00:00 (in seconds)
// uni is an object
export function calculateTaskDate(week, term, year, uni) {
  let foundTerm;
  let newTime;

  for (let uniTerm of uni.terms) {
    // Find the correct term
    console.log(uniTerm.term, term, uniTerm.startDate);
    if (uniTerm.term === term) {
      let startDate = new Date(uniTerm.startDate * 1000);
      console.log(startDate.getFullYear(), year);
      if (startDate.getFullYear() === year) {
        foundTerm = term;
        newTime = uniTerm.startDate;
      }
      break;
    }
  }
  if (foundTerm === undefined) {
    return { error: "uni does not have required term" };
  }
  if (newTime === undefined) {
    return { error: "startDate not in uni" };
  }
  // Calculate date
  let date = newTime + (week - 1) * 7 * 24 * 60 * 60;
  return { date: date };
}

export { router as default };
