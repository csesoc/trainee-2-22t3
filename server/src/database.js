// Setup database
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.DATABASE_URL;
let client = new MongoClient(url);
let doomDb = client.db("doomDb");
let doomUsers = doomDb.collection("doomUsers");
let doomTasks = doomDb.collection("doomTasks");
let doomCourses = doomDb.collection("doomCourses");

export { doomUsers, doomTasks, doomCourses, client, doomDb };
