import express from "express";
import { doomUsers, doomCourses, doomTasks } from "../database.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { ObjectId } from "mongodb";
const router = express.Router();
import dotenv from "dotenv";
dotenv.config();
/*
Registers the user and adds them to the database
params: 
{
  username: String,
  password: String,
  email: String
}
*/
router.post("/register", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let email = req.body.email;
  if (!username || !password || !email) {
    res.status(400).send({ error: "username/password/email is missing!" });
  }

  // Check if this user already exists
  let exists = await doomUsers.findOne({ username: username });
  if (exists) {
    res.status(400).send({ error: "username is taken!" });
  }
  // Check if this email is already used
  exists = await doomUsers.findOne({ email: email });
  if (exists) {
    res.status(400).send({ error: "email is taken!" });
  }

  // Get salt
  let salt = crypto.randomBytes(16).toString("hex");

  // Initialise hash object
  let hash = crypto.createHmac("sha512", salt);

  // Combine password into hash
  hash.update(password);

  // Convert hash object to string
  let hashed = hash.digest("hex");

  const token = createToken(username);

  let user = {
    username: username,
    email: email,
    salt: salt,
    password: hashed,
    token: token,
    profileImg: "",
    tasks: [],
    courses: [],
  };

  await doomUsers.insertOne(user);

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });

  res.status(200).send({
    message: `${username} has been successfully added!`,
  });
});

/*
Given user login details, sends a cookie with token
params: 
{
  username: String,
  password: String
}
*/
router.post("/login", async (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  // Check for missing parameters
  if (!username || !password) {
    return res.status(400).send({ error: "username or password is missing!" });
  }

  // Check if user exists
  let user = await doomUsers.findOne({ username: username });
  if (!user) {
    user = await doomUsers.findOne({ email: username });
    if (!user) {
      return res.status(400).send({ error: "user not found!" });
    }
  }

  // Get salt
  let salt = user.salt;

  // Initialise hash object
  let hash = crypto.createHmac("sha512", salt);

  // Combine password into hash
  hash.update(password);

  // Convert hash object to string
  let hashed = hash.digest("hex");

  if (hashed !== user.password) {
    return res.status(400).send({ error: "Incorrect password!" });
  }

  // Create token and update the database
  const token = createToken(username);

  await doomUsers.updateOne(
    { username: username },
    {
      $set: {
        token: token,
      },
    }
  );

  res.cookie("jwt", token, {
    maxAge: 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: true,
  });
  return res.status(200).send({ message: `${username} has been logged in!` });
});

/*
Deletes user token
params: 
{
  username: String,
  password: String
}
*/
router.get("/logout", async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); // No content to send back
  const token = cookies.jwt;
  let user = doomUsers.findOne({ token: token });
  if (!user) {
    res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true }); // secure: true - only serves on https
    return res.sendStatus(204);
  }

  // Delete token in db
  await doomUsers.updateOne(
    { token: token },
    {
      $set: {
        token: "",
      },
    }
  );

  res.clearCookie("jwt", { httpOnly: true, sameSite: "none", secure: true });
  res.sendStatus(200);
});

const createToken = (username) => {
  const token = jwt.sign({ username: username }, process.env.TOKEN_SECRET, {
    expiresIn: "1d",
  });
  return token;
};

export { router as default };
