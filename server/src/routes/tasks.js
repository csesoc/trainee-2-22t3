import express from "express";
import { check, validationResult } from "express-validator";
import { doomTasks } from "../database.js";
import { ObjectId } from "mongodb";

const router = express.Router();

// GET - /tasks/get
// Returns an array of all tasks
router.get('/get', async (req, res) => {
  const tasksArray = await doomTasks.find().toArray();
  res.send(tasksArray);
});

// POST - /tasks/post
// Adds a given task to database
// and task requires all fields 
router.post(
'/post', 
  [
    check('taskType').exists().withMessage('Task type not inputted').isString().withMessage('Task type is invalid'),
    check('duration').exists().withMessage('Duration not inputted').isNumeric().withMessage('Duration is invalid'),
    check('completed').exists().withMessage('Completion status not inputted').isBoolean().withMessage('Completion status is invalid'),
    check('name').exists().withMessage('Name of task not inputted').isString().withMessage('Name of task is invalid'),
    check('course').exists().withMessage('Course id not inputted').isString().withMessage('Course id is invalid'),
    check('week').exists().withMessage('Week not inputted').isNumeric({ min: 1, max: 10}).withMessage('Week is invalid'),
    check('term').exists().withMessage('Term not inputted').isNumeric({ min: 1, max: 3}).withMessage('Term is invalid'),
    check('year').exists().withMessage('Year not inputted').isNumeric({ min: 2022 }).withMessage('Year is invalid'),
  ],
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).send('Task can not be added due to the following issues: ' + errors.array()[0].msg);
    } 
    doomTasks.insertOne(req.body);
    res.send('Task Added');
  }
);

// PUT - /tasks/put
// Edits a specific task 
// task id + edits 
// assumes keys are valid - form for user to fill
router.put(
  '/put',
  check('_id').exists().withMessage('Task id not provided'),
  async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).send({ errors: errors.array()[0].msg });
  }

  // 1. find inside database for matching id - if none return error message
  const id = req.body._id;
  if(doomTasks.find(check => check.id === id) === undefined) {
    return res.send('Task id is invalid and task can not be editted');
  }

  // 2. check which keys are valid + which are empty 
  const updates = [];
  if (req.body.taskType !== undefined && typeof req.body.taskType === 'string') {
    updates.push(req.body.taskType);
  }
  if (req.body.duration !== undefined && typeof req.body.duration === 'number') {
    updates.push(req.body.duration);
  }
  if (req.body.completed !== undefined && typeof req.body.completed === 'boolean') {
    updates.push(req.body.completed);
  }
  if (req.body.name !== undefined && typeof req.body.name === 'string') {
    updates.push(req.body.name);
  }
  if (req.body.course !== undefined && typeof req.body.course === 'number') {
    updates.push(req.body.course);
  }
  if (req.body.week !== undefined && typeof req.body.week === 'number') {
    updates.push(req.body.week);
  }
  if (req.body.term !== undefined && typeof req.body.term === 'number') {
    updates.push(req.body.term);
  }
  if (req.body.year !== undefined && typeof req.body.year === 'number') {
    updates.push(req.body.year);
  }

  await doomTasks.updateOne(
    { _id: id }, 
    { $set: { updates }},
  );
  return res.send('Task Edited');
});

// DELETE - /tasks/delete
// Removes a task from the database
// argument = task id
router.delete(
  '/delete', 
  check('_id').exists().withMessage('Task id not provided'),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send(errors.array()[0].msg);
    }
    await doomTasks.deleteOne({_id: ObjectId(req.query._id)});
    res.send('Task Removed');
  }
);

// GET - /tasks/doomFactor
// Calculates the doom factor (a numerical representation of how behind the user is on work)
router.get('/doomFactor', async (req, res) => {
  //// calculation....
  return res.send(doomFactor);
});

export { router as default };
