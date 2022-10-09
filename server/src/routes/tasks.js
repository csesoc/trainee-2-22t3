import express from "express";
import { doomUsers, doomCourses, doomTasks } from "../database.js";
import { ObjectId } from "mongodb";
const router = express.Router();

export { router as default };
