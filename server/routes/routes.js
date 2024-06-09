import express from "express";
import path from "path";
import multer from "multer";
import {
  handleLogin,
  handleSignup,
  handleGetUserData,
  handleImagesUpload,
  handleCreateFolder,
  handleGetParentFolder,
  handleSearchImage,
} from "../controllers/controllers.js";
import jwt from "jsonwebtoken";

const routes = express.Router();
const upload = multer({ dest: "uploads/" });

const verifyToken = (req, res, next) => {
  // for authentication of protected api calls
  const token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  try {
    const decoded = jwt.verify(token, "ashish123");
    decoded;
    req.username = decoded.username;
  } catch (err) {
    err;
  }
  return next();
};
routes.get("/", (req, res) => {
  res.send("Welcome to home route");
});

routes.post("/signup", handleSignup);
routes.post("/login", handleLogin);

routes.get("/getUserdata", verifyToken, handleGetUserData); // get all user folder and images

routes.post("/images", verifyToken, upload.array("images"), handleImagesUpload);

routes.post("/folder", verifyToken, handleCreateFolder); // upload folders
routes.get("/parent", verifyToken, handleGetParentFolder); // getting parent folders

routes.get("/searchImage", verifyToken, handleSearchImage);

export default routes;
