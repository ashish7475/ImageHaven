import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const handleSignup = async (req, res) => {
  const { name, username, email, password } = req.body;

  // console.log(req.body)
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
  const { username } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    res.send({
      status: 400,
      message: "User not found, please try again later!",
    });
  } else {
    // find the files and folders with userID = user.userId
  }
};
