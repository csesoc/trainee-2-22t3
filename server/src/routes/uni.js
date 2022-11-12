import express from "express";
import { check, validationResult } from "express-validator";
import { doomCourses, doomUni } from "../database.js";
import { ObjectId } from "mongodb";

const router = express.Router();
// GET - /uni/get
// Returns an array of all unis
router.get("/get", async (req, res) => {
  const uniArray = await doomUni.find().toArray();
  res.send(uniArray);
});

// POST - /uni/post
// Adds a given uni to the database
// Body must contain all the required fields
// Must have a unique uni name.
router.post(
  "/post",
  [
    check("name")
      .exists()
      .withMessage("name not inputted")
      .isString()
      .withMessage("name is invalid"),
    check("terms").exists().withMessage("terms not inputted"),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send({
        error:
          "Uni can not be added due to the following issues: " +
          errors.array()[0].msg,
      });
    }
    // Check that uni is unique
    const findUni = await doomUni.findOne({
      name: req.body.name,
    });
    if (findUni !== null) {
      return res.status(400).send({ error: "Uni name already exists!" });
    }

    // Check terms are valid
    let termsStatus = checkTerms(req.body.terms);
    if (termsStatus.success !== "success") {
      res.status(400).send(termsStatus);
    }

    // Insert uni to database.
    await doomUni.insertOne(req.body);
    res.send("Uni Added");
  }
);

// PUT - /uni/put
// Edits a specific uni
// uni id + edits
// assumes keys are valid - form for user to fill
router.put("/put", async (req, res) => {
  // Remove _id so it doesn't get updated.
  delete req.body._id;
  await doomUni.updateOne({ _id: ObjectId(req.body._id) }, { $set: req.body });
  return res.send("uni updated");
});

// POST - /uni/post
// Adds a term to the uni
// uni id +
// term : {
//  term: Number,
//  startDate: Number,
//  endDate: Number
//}
// assumes keys are valid - form for user to fill
router.post("/addTerm", async (req, res, next) => {
  try {
    // Error checking
    if (req.body._id == undefined) {
      return res.status(400).send({ error: "missing uni id" });
    }

    if (req.body.term === undefined) {
      return res.status(400).send({ error: "missing term" });
    }

    let foundUni = await doomUni.findOne({ _id: ObjectId(req.body._id) });
    if (foundUni === null) {
      return res.status(400).send({ error: "uni not found" });
    }

    let termStatus = checkTerms([req.body.term]);
    if (termStatus.success !== "success") {
      res.status(400).send(termStatus);
    }
    // Add term
    foundUni.terms.push(req.body.term);
    await doomUni.updateOne(
      { _id: ObjectId(req.body._id) },
      { $set: foundUni }
    );
    return res.send("term added to " + foundUni.name);
  } catch (err) {
    next(err);
  }
});

// DELETE - /uni/delete
// Removes a specified uni from the database
// uni id
router.delete("/delete", async (req, res) => {
  if (doomUni.findOne({ _id: ObjectId(req.query._id) })) {
    return res.status(400).send("uni could not be found");
  }
  await doomUni.deleteOne({ _id: ObjectId(req.query._id) });
  return res.send("uni deleted");
});

function checkTerms(terms) {
  // Check terms are valid
  for (let term of terms) {
    if (
      term.term === undefined ||
      typeof term.term !== "number" ||
      term.term > 3 ||
      term.term < 1
    ) {
      return { error: "Invalid term number: " + term.term };
    }
    if (term.startDate === undefined || typeof term.startDate !== "number") {
      return { error: "Invalid startDate: " + term.startDate };
    }
    if (term.endDate === undefined || typeof term.endDate !== "number") {
      return { error: "Invalid endDate: " + term.endDate };
    }
  }
  return { success: "success" };
}

export { router as default };
