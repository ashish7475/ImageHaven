import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name:String,
  username: String,
  userId: String,
  email: String,
  password: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

export default User;