// Image parameters - image name, parent folderId , userId,

import mongoose from "mongoose";

const ImageSchema = new mongoose.Schema({
  name: String,
  parentFolderId: String,
  userId: String,
  path: String,
});

const Image = mongoose.model("Image", ImageSchema);

export default Image;
