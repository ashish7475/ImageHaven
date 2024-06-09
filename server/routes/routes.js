import express from "express";
import path from "path";
import multer from "multer";
import {
  handleLogin,
  handleSignup,
  handleGetUserData,
} from "../controllers/controllers.js";

const routes = express.Router();
const upload = multer({ dest: "uploads/" });

const verifyToken = (req, res, next) => {
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "ashish123");

    req.username = decoded.username;
  } catch (err) {
    console.log(err);
  }
  return next();
};
routes.get("/", (req, res) => {
  res.send("Welcome to home route");
});

routes.post("/signup", handleSignup);
routes.post("/login", handleLogin);
routes.get("/getUserdata", verifyToken, handleGetUserData);

export default routes;
