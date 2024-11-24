import { Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Box } from "@mui/system";
import React from "react";
import { Outlet, useLoaderData, useNavigation } from "react-router-dom";
import UserMenu from "../components/UserMenu";
import FolderList from "../components/FolderList";

export default function Home() {
  const {folders} = useLoaderData() || {folders: []};

  return (
    <>
      <Typography variant="h4" sx={{ mb: "20px" }}>
        Note App
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "right", mb: "10px" }}>
        <UserMenu />
      </Box>
      <Grid
        container
        sx={{
          minHeight: "50vh",
          boxShadow: "0 0 15px 0 rgb(193 193 193 / 60%)",
          mt: "20px",
        }}
      >
        <Grid size={{ xs: 12, lg: 3 }}>
          <FolderList
            folders={folders}
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 9 }}>
          <Outlet />
        </Grid>
      </Grid>
    </>
  );
}
