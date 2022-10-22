import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { doomUsers } from "../database.js";
dotenv.config();
/*
Check for a token in the cookie and returns 200 if the token is valid
*/
const verifyJWT = async (req, res, next) => {
  const cookies = req.cookies;
  console.log(cookies);
  if (!cookies?.jwt) return res.status(401).send({ error: "token missing" });
  const token = cookies.jwt;
  const user = await doomUsers.findOne({ token: token });
  if (!user) {
    return res.status(403).send({ error: "Invalid token" });
  }
  jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
    if (err) return res.status(403).send({ error: "Invalid token" });
    req.authUser = user;
    next();
  });
};

export { verifyJWT };
