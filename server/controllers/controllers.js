import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Image from "../models/image.js";
import Folder from "../models/folder.js";

export const handleSignup = async (req, res) => {
  const { name, username, email, password } = req.body;

  // (req.body)
  const userId = uuidv4();

  const salt = await bcrypt.genSalt(10); // hashing and storing password

  const hashedPassword = await bcrypt.hash(password, salt);
  const emailCount = await User.find({ email }).count();
  const usernameCount = await User.find({ username }).count();

  if (emailCount !== 0) {
    res.status(200).json({ message: "Email already registered!", status: 400 });
  } else if (usernameCount !== 0) {
    res
      .status(200)
      .json({ message: "Username already registered!", status: 400 });
  } else {
    const user = await User.create({
      name,
      username,
      userId,
      email,
      password: hashedPassword,
    });
    res
      .status(200)
      .json({ message: "User Registered Successfully!", status: 200 });
  }
};

export const handleLogin = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (!user) {
    res.send({ message: "User not registered !", status: 400 });
  } else {
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        {
          username: user.username,
          email: user.email,
          id: user.userId,
        },
        "ashish123"
      );

      res.send({
        message: "Login Successful",
        token: token,
        status: 200,
        user: user,
      });
    } else {
      res.send({ status: 400, message: "Incorrect Password" });
    }
  }
};

export const handleGetUserData = async (req, res) => {
  const { userId, parentFolderId } = req.query;
  req.query;

  const folders = await Folder.find({ userId, parentFolderId });
  const images = await Image.find({ userId, parentFolderId });

  if (folders.length == 0 && images.length == 0) {
    res.send({
      status: 202,
      message: "Empty folder",
      folders: [],
      images: [],
    });
  } else {
    res.send({ status: 200, metaData: { folders, images } });
  }
};
export const handleGetParentFolder = async (req, res) => {
  try {
    const { currentFolderId, userId } = req.query;
    const parent = await Folder.findOne({ userId, folderId: currentFolderId });
    parent;
    if (parent != null) {
      res.send({
        status: 200,
        message: "Parent retrieved",
        folder: {
          folderName: parent.folderName,
          folderId: parent.parentFolderId,
        },
      });
    }
  } catch (error) {
    error;
  }
};

export const handleImagesUpload = async (req, res) => {
  // will get images and parent folderID and userId in request object
  try {
    const { userId, parentFolderId } = req.body;
    //   (userId, parentFolderId);
    req.files;
    const files = req.files.map((file) => ({
      name: file.originalname,
      path: file.path,
      userId,
      parentFolderId,
    }));
    const response = await Image.insertMany(files);
    const imgs = await Image.find({ userId, parentFolderId });

    //(files);
    res.send({
      status: 200,
      message: "Images Uploaded Succesffully",
      images: imgs,
    });
  } catch (error) {
    res.send({ status: 202, message: `Error : ${error}` });
  }
};

export const handleCreateFolder = async (req, res) => {
  // will get name of folder, userId and parent FolderId , create a folder

  try {
    const { folderName, parentFolderId, userId } = req.body;
    const folderId = uuidv4();
    const exists = await Folder.findOne({ folderName, parentFolderId, userId });
    exists;
    if (exists == null) {
      const response = await Folder.create({
        folderName,
        parentFolderId,
        userId,
        folderId,
      });
      res.send({
        status: 200,
        message: "Folder Create Successfully",
        folderId,
      });
    } else {
      res.send({ status: 202, message: "Folder Name Already taken." });
    }
    // sending current folderId to frontend
  } catch (error) {
    error;
  }
};

export const handleSearchImage = async (req, res) => {
  // search for images using userIDs
  try {
    const { searchTerm, userId } = req.query;
    req.query;
    const images = await Image.find({
      name: { $regex: searchTerm, $options: "i" },
      userId,
    });
    images;
    res.send({ status: 200, images });
  } catch (error) {
    error;
  }
};
