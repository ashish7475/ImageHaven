import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Unstable_Grid2";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#FEFAF6",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid(props) {
  return (
    <Box sx={{ flexGrow: 1, px: 4, py: 4, bgcolor: "#EEEEEE", height: "100%" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {props.folders.map((folder, index) => (
          <Grid item xs={2} sm={3} md={1} key={index}>
            <Item width="fit-content">{folder.folderName}</Item>
          </Grid>
        ))}
        {props.images.map((file, index) => (
          <Grid item xs={2} sm={3} md={1} key={index}>
            <Item width="fit-content" sx={{ px: 0, py: 0 }}>
              <img
                style={{ height: "100%", width: "100%" }}
                src={file.preview}
                alt={`preview-${index}`}
                // Revoke data uri after image is loaded to free up memory
                onLoad={() => {
                  URL.revokeObjectURL(file.preview);
                }}
              />
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
