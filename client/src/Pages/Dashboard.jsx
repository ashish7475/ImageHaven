import React from "react";
import ResponsiveAppBar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Container } from "@mui/material";
import ResponsiveGrid from "../Components/Grid";

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [folders, setFolders] = React.useState([]);
  const [currentFolder, setCurrentFolder] = React.useState({
    folderName: "",
    parentFolder: null,
  });
  const [newFolder, setNewFolder] = React.useState({
    folderName: "",
    folderId: "",
  });
  const [tempFiles, setTemp] = React.useState([]);
  const [images, setImages] = React.useState([]);
  const navigate = useNavigate();
  const handleLogout = () => {
    sessionStorage.clear();
    NotificationManager.error("Logging Out");
    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleCreateFolder = async () => {
    // create folder in backend

    // after creating - add new folder to current folders list
    setFolders((prev) => [...prev, newFolder]);
    // close the modal after creating
    setOpen(false);
  };
  const handleInsertImage = async () => {
    setImages((prev) => [...prev, ...tempFiles]);
    setOpen(false);
    setTemp([]);
  };
  return (
    <>
      <ResponsiveAppBar
        handleLogout={handleLogout}
        handleClose={handleClose}
        handleOpen={handleOpen}
        setFolders={setFolders}
        setImages={setImages}
        images={images}
        setImages={setImages}
        handleCreateFolder={handleCreateFolder}
        handleInsertImage={handleInsertImage}
        currentFolder={currentFolder}
        newFolder={newFolder}
        setNewFolder={setNewFolder}
        setTemp={setTemp}
        open={open}
      />
      <ResponsiveGrid folders={folders} images={images} />
      <NotificationContainer />
    </>
  );
};

export default Dashboard;
