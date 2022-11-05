import express from "express";
import { check, validationResult } from "express-validator";
import { doomCourses, doomUni } from "../database.js";
import { ObjectId } from "mongodb";

const router = express.Router();
// GET - /courses/get
// Returns an array of all courses
router.get("/get", async (req, res) => {
  const coursesArray = await doomCourses.find().toArray();
  res.send(coursesArray);
});

// POST - /courses/post
// Adds a given course to the database
// Body must contain all the required fields
// Also adds all the tasks given by taskTemplates to the database
// Must have a unique course name.
router.post(
  "/post",
  [
    check("courseName")
      .exists()
      .withMessage("courseName not inputted")
      .isString()
      .withMessage("courseName is invalid"),
    check("taskTemplates").exists().withMessage("taskTemplates not inputted"),
    check("uni")
      .exists()
      .withMessage("uni is missing")
      .isString()
      .withMessage("uni is not string"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        error:
          "Task can not be added due to the following issues: " +
          errors.array()[0].msg,
      });
    }
    // Check that coursename is unique
    const findCourse = await doomCourses.find({
      courseName: req.body.courseName,
    });
    if (findCourse !== undefined) {
      return res.status(400).send({ error: "Course name already exists!" });
    }

    // Check that uni exists
    const uni = doomUni.findOne({ name: req.body.uni });
    if (uni === undefined) {
      return res.status(400).send({ error: "Given uni does not exist" });
    }

    // Validate the task template
    for (const taskTemplate of req.body.taskTemplates) {
      if (
        taskTemplate.name === undefined ||
        typeof taskTemplate.name !== "string"
      ) {
        return res
          .status(400)
          .send({ error: "taskTemplate has incorrect/missing name" });
      }
      if (
        taskTemplate.taskType === undefined ||
        typeof taskTemplate.taskType !== "string"
      ) {
        return res.status(400).send({
          error: taskTemplate.name + " has incorrect/missing taskType",
        });
      }
      if (
        taskTemplate.duration === undefined ||
        typeof taskTemplate.duration !== "number"
      ) {
        return res.status(400).send({
          error: taskTemplate.name + " has incorrect/missing duration",
        });
      }

      if (
        taskTemplate.term === undefined ||
        typeof taskTemplate.term !== "number"
      ) {
        return res.status(400).send({
          error: taskTemplate.name + " has incorrect/missing term",
        });
      }
      if (
        taskTemplate.year === undefined ||
        typeof taskTemplate.year !== "number"
      ) {
        return res.status(400).send({
          error: taskTemplate.name + " has incorrect/missing year",
        });
      }

      if (taskTemplate.weeks === undefined) {
        return res.status(400).send({
          error: taskTemplate.name + " is missing weeks",
        });
      }
    }

    // Insert course to database.
    await doomCourses.insertOne(req.body);
    res.send("Task Added");
  }
);

router.put("/put", async (req, res) => {
  // Remove _id so it doesn't get updated.
  delete req.body._id;
  await doomCourses.updateOne(
    { _id: ObjectId(req.body._id) },
    { $set: req.body }
  );
  return res.send("course updated");
});

router.delete("/delete", async (req, res) => {
  await doomCourses.deleteOne({ _id: ObjectId(req.query._id) });
  return res.send("course deleted");
});

// task is the task object from the database
// uni is the uni object from the database
// Given a task and the uni it's from,
function calculateTaskDate(task, uni) {
  let foundTerm;
  for (term of uni.terms) {
    // Find the correct term
    if (term.term === task.term) {
      let endDate = new Date(term.endDate);
      if (endDate.getFullYear() === task.year) {
        foundTerm = term;
      }
      break;
    }
  }
  if (foundTerm === undefined) {
    return { error: "uni does not have required term" };
  }
  // Calculate date
  return "TODO";
}

export { router as default };
