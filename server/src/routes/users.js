import express from "express";
import { check, validationResult } from "express-validator";
import { doomCourses, doomUni, doomTasks } from "../database.js";
import { ObjectId } from "mongodb";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = express.Router();
// GET - /users/getTasks
// Returns an array of all courses

router.use(verifyJWT);

router.get("/getTasks", async (req, res) => {
  let userObj = req.authUser;
  const tasksArray = await doomTasks
    .find({ userId: userObj._id.toString() })
    .toArray();
  res.send(tasksArray);
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
