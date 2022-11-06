import express from "express";
import { check, validationResult } from "express-validator";
import { doomCourses, doomUni, doomCourses } from "../database.js";
import { ObjectId } from "mongodb";

const router = express.Router();
// GET - /users/getTasks
// Returns an array of all courses
router.get("/get", async (req, res) => {
  const coursesArray = await doomCourses.find().toArray();
  res.send(coursesArray);
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
