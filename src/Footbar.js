import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { lightBlue } from "@mui/material/colors";

const footerHeight = 50;

export default function Footbar() {
  return (
    <Box
      sx={{
        width: "100vw",
        height: `${footerHeight}px`,
        backgroundColor: lightBlue[900],
        bottom: 0,
        left: 0,
        display: "flex",
        alignItems: "center",
        paddingLeft: "25px",
        marginBottom: "0px",
        position: "fixed",
      }}
    >
      <Typography variant="caption" sx={{ color: "white" }}>
        Copyright © 2025 Thammasart Hospital University, Thailand.
      </Typography>
    </Box>
  );
}
