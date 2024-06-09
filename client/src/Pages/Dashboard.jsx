import React from "react";
import ResponsiveAppBar from "../Components/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  NotificationContainer,
  NotificationManager,
} from "react-notifications";
import { Container, TextField } from "@mui/material";
import ResponsiveGrid from "../Components/Grid";

const Dashboard = () => {
  const [user, setUser] = React.useState(null);
  const [open, setOpen] = React.useState(false);
  const [folders, setFolders] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [currentFolder, setCurrentFolder] = React.useState({
    folderName: "Root",
    folderId: JSON.parse(sessionStorage.getItem("User")).userId,
  });
  const [newFolder, setNewFolder] = React.useState({
    folderName: "",
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
  const handleGoBack = async () => {
    const response = await axios.get(
      `${process.env.REACT_APP_URL}parent?userId=${user?.userId}&currentFolderId=${currentFolder.folderId}`,
      {
        headers: {
          "x-access-token": sessionStorage.getItem("authToken"),
        },
      }
    );
    if (response.data.status == 200) {
      if (response.data.folder.folderId == user?.userId) {
        setCurrentFolder({ folderName: "Root", folderId: user?.userId });
      } else {
        console.log(response.data.folder);
        setCurrentFolder(response.data.folder);
      }
    }
  };
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChangeFolder = (folder) => {
    console.log(folder);
    setCurrentFolder({
      folderName: folder.folderName,
      folderId: folder.folderId,
    });
  };
  const handleCreateFolder = async () => {
    // add folders in backend - send newFolderName, parentFolderId

    const response = await axios.post(
      `${process.env.REACT_APP_URL}folder`,
      {
        ...newFolder,
        userId: user?.userId,
        parentFolderId: currentFolder?.folderId,
      },
      {
        headers: {
          "x-access-token": sessionStorage.getItem("authToken"),
        },
      }
    );
    if (response.data.status == 200) {
      //    console.log(response.data);
      setFolders((prev) => [
        ...prev,
        { ...newFolder, folderId: response.data.folderId }, // set new folderID from backend
      ]);
      setNewFolder({ folderName: "" });
      // close the modal after creating
      NotificationManager.success("New Folder Created Succesfully");
      setOpen(false);
    } else {
      NotificationManager.error(response.data.message);
    }

    //
  };
  //console.log(images);
  const handleInsertImage = async () => {
    const formData = new FormData();

    if (tempFiles.length == 0) {
      NotificationManager.warning("No Image Selected");
    } else {
      formData.append("userId", user?.userId);
      formData.append("parentFolderId", currentFolder?.folderId);
      for (let i = 0; i < tempFiles.length; i++) {
        formData.append("images", tempFiles[i]);
      }
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL}images`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              "x-access-token": sessionStorage.getItem("authToken"),
            },
          }
        );
        if (response.data.status == 200) {
          NotificationManager.success(response.data.message);
          setImages(response.data.images);
          setOpen(false);
          setTemp([]);
        } else {
          NotificationManager.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };
  React.useEffect(() => {
    // get user images and folders
    //set images and folders
    // at root level - folderid and parentId are same
    const User = JSON.parse(sessionStorage.getItem("User"));
    setUser(User);
    setCurrentFolder((prev) => ({ ...prev, folderId: User.userId }));

    axios
      .get(
        `${process.env.REACT_APP_URL}getUserdata?userId=${User?.userId}&parentFolderId=${currentFolder?.folderId}`,
        {
          headers: {
            "x-access-token": sessionStorage.getItem("authToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          setFolders((prev) => {
            const fold = res.data?.metaData.folders?.map((folder) => ({
              folderName: folder.folderName,
              folderId: folder.folderId,
            }));
            return [...prev, ...fold];
          });
          setImages(res?.data?.metaData.images);
        }
      });
  }, []);

  React.useEffect(() => {
    // get currentFolders files
    console.log(currentFolder);
    axios
      .get(
        `${process.env.REACT_APP_URL}getUserdata?userId=${user?.userId}&parentFolderId=${currentFolder?.folderId}`,
        {
          headers: {
            "x-access-token": sessionStorage.getItem("authToken"),
          },
        }
      )
      .then((res) => {
        console.log(res);
        if (res.data.status == 200) {
          setFolders((prev) => {
            const fold = res.data?.metaData?.folders?.map((folder) => ({
              folderName: folder.folderName,
              folderId: folder.folderId,
            }));
            return [...fold];
          });
          setImages(res.data?.metaData?.images);
        } else {
          setFolders([]);
          setImages([]);
        }
      });
  }, [currentFolder]);
  React.useEffect(() => {
    if (searchQuery !== "") {
      axios
        .get(
          `${process.env.REACT_APP_URL}searchImage?searchTerm=${searchQuery}&userId=${user?.userId}`,
          {
            headers: {
              "x-access-token": sessionStorage.getItem("authToken"),
            },
          }
        )
        .then((res) => {
          if (res.data.status == 200) {
            setImages(res.data.images);
          }
        });
    }
  }, [searchQuery]);

  return (
    <>
      <ResponsiveAppBar
        handleLogout={handleLogout}
        handleClose={handleClose}
        handleOpen={handleOpen}
        setFolders={setFolders}
        setImages={setImages}
        images={images}
        handleCreateFolder={handleCreateFolder}
        handleInsertImage={handleInsertImage}
        currentFolder={currentFolder}
        newFolder={newFolder}
        setNewFolder={setNewFolder}
        setTemp={setTemp}
        open={open}
        handleGoBack={handleGoBack}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3 style={{ padding: "20px" }}>
          Current Folder -{currentFolder.folderName}
        </h3>
        <TextField
          id="filled-basic"
          label="Search Image"
          variant="filled"
          sx={{ mx: 2 }}
          name="searchQuery"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
          }}
        />
      </div>
      <ResponsiveGrid
        folders={folders}
        images={images}
        handleChangeFolder={handleChangeFolder}
      />
      <NotificationContainer />
    </>
  );
};

export default Dashboard;
