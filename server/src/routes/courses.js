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
    const findCourse = await doomCourses.findOne({
      courseName: req.body.courseName,
    });
    console.log(findCourse);
    if (findCourse !== null) {
      return res.status(400).send({ error: "Course name already exists!" });
    }

    // Check that uni exists
    const uni = await doomUni.findOne({ name: req.body.uni });
    if (uni === null) {
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

// PUT - /courses/put
// Edits a specific course
// course id + edits
// assumes keys are valid - form for user to fill
router.put("/put", async (req, res) => {
  // Remove _id so it doesn't get updated.
  delete req.body._id;
  await doomCourses.updateOne(
    { _id: ObjectId(req.body._id) },
    { $set: req.body }
  );
  return res.send("course updated");
});

// DELETE - /courses/delete
// Removes a specified course from the database
// course id
router.delete("/delete", async (req, res) => {
  if (doomCourses.findOne({ _id: ObjectId(req.query._id) })) {
    return res.status(400).send("course could not be found");
  }
  await doomCourses.deleteOne({ _id: ObjectId(req.query._id) });
  return res.send("course deleted");
});

export { router as default };
