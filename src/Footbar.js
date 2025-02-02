import React from "react";
import Box from "@mui/material/Box";
import Typography from '@mui/material/Typography';
import { lightBlue } from "@mui/material/colors";

const footerHeight = 100;
const footerEltMarginTop = 130;

const div1Style = {
  width: "100vw",
  height: `${footerHeight + footerEltMarginTop}px`,
  backgroundColor: lightBlue[900],
  marginTop: "100px",
  position: "absolute",
};

const div2Style = {
  width: "100%",
  position: "absolute",
  color: "white",
  height: `${footerHeight}px`,
  marginTop: `${footerEltMarginTop}px`,
};

export default function Footbar() {
  return (
    <Box>
        <Box style={div1Style}>   </Box>
        <Box style={div2Style}  marginLeft-200px >
            <Box sx={{ marginLeft: '25px', justifyContent: 'center' }}>                
                <Typography variant="caption2" sx={{ color: 'florawhite' }}>
                    Copyright © 2025 Thammasart Hospital University, Thailand.
                </Typography>
            </Box>
        </Box>
    </Box>
  );
}
