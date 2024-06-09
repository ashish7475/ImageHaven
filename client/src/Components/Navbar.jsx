import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CreateNewFolderIcon from "@mui/icons-material/CreateNewFolder";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import Typography from "@mui/material/Typography";
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import {
  FormControl,
  FormHelperText,
  FormLabel,
  InputLabel,
  Modal,
  TextField,
} from "@mui/material";
import { Input } from "./Components";
import Basic from "./Dropzone";

function ResponsiveAppBar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [typeofBtn, setTypeofBtn] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const theme = createTheme({
    palette: {
      primary: { main: "#f44336" },
      secondary: { main: "#f3e5f5" },
    },
  });
  return (
    <AppBar position="static" theme={theme}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ImageHaven
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem
                onClick={() => {
                  props.handleOpen();
                  setTypeofBtn("Insert Image");
                }}
              >
                <AddToDriveIcon sx={{ mx: 1 }} />
                <Typography textAlign="center">Insert New Image</Typography>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  props.handleOpen();
                  setTypeofBtn("Create Folder");
                }}
              >
                <CreateNewFolderIcon sx={{ mx: 1 }} />

                <Typography textAlign="center">Create New Folder</Typography>
              </MenuItem>
              {props.currentFolder.folderName !== "Root" ? (
                <MenuItem
                  onClick={() => {
                    props.handleGoBack();
                  }}
                >
                  <KeyboardBackspaceIcon sx={{ mx: 1 }} />
                  <Typography textAlign="center">Back</Typography>
                </MenuItem>
              ) : (
                <></>
              )}
            </Menu>
          </Box>

          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            ImageHaven
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <Button
              onClick={() => {
                props.handleOpen();
                setTypeofBtn("Insert Image");
              }}
              sx={{
                my: 2,

                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <AddToDriveIcon sx={{ mx: 1 }} /> Insert Image
            </Button>
            <Button
              onClick={() => {
                props.handleOpen();
                setTypeofBtn("Create Folder");
              }}
              sx={{
                my: 2,

                color: "white",
                display: "flex",
                alignItems: "center",
              }}
            >
              <CreateNewFolderIcon sx={{ mx: 1 }} /> Create New Folder
            </Button>
            {props.currentFolder.folderName !== "Root" ? (
              <Button
                onClick={() => {
                  props.handleGoBack();
                }}
                sx={{
                  my: 2,

                  color: "white",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <KeyboardBackspaceIcon sx={{ mx: 1 }} /> Back
              </Button>
            ) : (
              <></>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar>
                  {JSON.parse(sessionStorage?.getItem("User"))?.name[0]}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={props.handleLogout}>
                <Typography textAlign="center">Log Out</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
        <Modal
          open={props.open}
          onClose={props.handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          {typeofBtn == "Create Folder" ? (
            <Box sx={style}>
              <FormControl>
                <FormLabel>Create New Folder</FormLabel>
                <Input
                  id="my-input"
                  aria-describedby="my-helper-text"
                  placeholder="Folder Name"
                  name="folderName"
                  value={props.newFolder?.folderName}
                  onChange={(e) => {
                    props.setNewFolder((prev) => ({
                      ...prev,
                      [e.target.name]: e.target.value,
                    }));
                  }}
                />
                <Button
                  variant="contained"
                  tabIndex={-1}
                  onClick={props.handleCreateFolder}
                >
                  Create
                </Button>
              </FormControl>
            </Box>
          ) : (
            <Box sx={style}>
              <Basic
                images={props.images}
                setImages={props.setImages}
                setTemp={props.setTemp}
              />
              <Button
                component="label"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                onClick={props.handleInsertImage}
              >
                Upload file
              </Button>
            </Box>
          )}
        </Modal>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
