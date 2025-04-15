import React from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../component/Signin";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Headbar from "../Headbar";
import Footbar from "../Footbar";

export default function Login() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const [snackbarData, setSnackbarData] = React.useState({
        severity: "success",
        text: "This is a success message!",
    });

    const handleClose = (event, reason) => {
        if (reason === "clickaway") return;
        setOpen(false);
    };

    const SnackbarEvent = (severity, text) => {
        setSnackbarData({ severity, text });
        setOpen(true);  // Move this after updating state
    };

    const handleSignIn = (id, password) => {
        console.log("Received id and password:", id, password);
        if (id === "admin" && password === "admin") {
            SnackbarEvent("success", "Login success");
            setTimeout(() => {
                navigate("/main");
            }, 1000); 
        } else {
            SnackbarEvent("error", "An error occurred while signing in.");
        }
    };

    return (
        <div>
            <Headbar />
            <div style={{ minHeight: "85vh" }}>
                <SignIn onSignIn={handleSignIn} />
                <p style={{visibility: "hidden"}}>version 202504152335</p>

                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <MuiAlert onClose={handleClose} severity={snackbarData.severity} sx={{ width: "100%" }}>
                        {snackbarData.text}
                    </MuiAlert>
                </Snackbar>
            </div>
            <Footbar />
        </div>
    );
}
