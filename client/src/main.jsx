import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Container } from "@mui/material";

import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import "./index.css";
import router from "./router";
import "./firebase/config";


createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <Container maxWidth="lg" sx={{ textAlign: "center", marginTop: "50px" }}>
      <RouterProvider router={router} />
    </Container>
  // </StrictMode>
);
