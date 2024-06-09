import mongoose from "mongoose";

const FolderSchema = new mongoose.Schema({
  folderName: String,
  parentFolderId: String,
  userId: String,
  folderId: String,
});

const Folder = mongoose.model("Folder", FolderSchema);

export default Folder;
