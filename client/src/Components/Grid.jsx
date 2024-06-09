import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";
import { Modal, Typography } from "@mui/material";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FEFAF6",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid(props) {
  const [imageOpen, setImageOpen] = React.useState(false);
  const [imgPreview, setImgPreview] = React.useState(null);

  return (
    <Box sx={{ flexGrow: 1, px: 4, py: 4, bgcolor: "#EEEEEE", height: "100%" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {props.folders?.map((folder, index) => (
          <Grid item xs={2} sm={3} md={3} key={index}>
            <Item
              onClick={() => {
                props.handleChangeFolder(folder);
              }}
            >
              {folder.folderName}
            </Item>
          </Grid>
        ))}
        {props.images?.map((file, index) => (
          <Grid item xs={2} sm={3} md={1} key={index}>
            <Item
              width="fit-content"
              sx={{ px: 0, py: 0 }}
              onClick={() => {
                setImageOpen(true);
                setImgPreview(file);
              }}
            >
              <Typography color="primary" style={{ cursor: "Pointer" }}>
                {file?.name}
              </Typography>
            </Item>
          </Grid>
        ))}
      </Grid>
      <Modal
        open={imageOpen}
        onClose={() => {
          setImageOpen(false);
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <img
            src={`${process.env.REACT_APP_URL}${imgPreview?.path}`}
            style={{ height: "500px", width: "500px" }}
          />
        </Box>
      </Modal>
    </Box>
  );
}
