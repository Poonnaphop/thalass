import React from "react";
import { useNavigate } from "react-router-dom";
import SignIn from "../component/Signin";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@mui/material/Alert';

function Login() {
    const navigate = useNavigate();
    const [open, setOpen] = React.useState(false);
    const handleClose = (event, reason) => {
        if ("clickaway" === reason) return;
        setOpen(false);
    };
    const Alert = React.forwardRef(function Alert(props, ref) {
        return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
    });
    const SnackbarEvent = (severity, text) => {
        setOpen(true);
        setSnackbarData({ severity, text });
    };

    const [snackbarData, setSnackbarData] = React.useState({
        severity: 'success',
        text: 'This is a success message!',
    });

    const handleSignIn = (id, password) => {
        // Do something with id and password, e.g., send a request to the server
        console.log("Received id and password:", id, password);
        if(id ==="admin" && password === "admin"){
            SnackbarEvent('success', 'Login success');
                setTimeout(() => {
                    navigate('/main');
                }, 1000); // Delay the navigation by 1 second (adjust as needed)
        }else{
            SnackbarEvent('error', 'An error occurred while signing in.');
        }
    }


    return (
        <div>
            <SignIn onSignIn={handleSignIn} />

            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={snackbarData.severity} sx={{ width: '100%' }}>
                    {snackbarData.text}
                </Alert>
            </Snackbar>

        </div>
    );
}

export default Login;