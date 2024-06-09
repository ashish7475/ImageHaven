import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  name: String,
  parentFolderId: String,
  userId: String,
});

const Folder = mongoose.model("Folder", FolderSchema);

export default Folder;
