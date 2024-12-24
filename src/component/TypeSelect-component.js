import { Box, Typography, Grid, Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

function TypeSelectComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const handleNavigation = (path) => {
        navigate(path, { state: formData });
    };

    return (
        <Grid container spacing={4} sx={{ mt: 4 }} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                    onClick={() => handleNavigation("/hbtype")} // Pass state to /hbtype
                >
                    <Typography variant="h4" gutterBottom>
                        HB Typing
                    </Typography>
                </Button>
            </Grid>

            <Grid item xs={12} sm={6} md={4}>
                <Button
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        p: 3,
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                    onClick={() => handleNavigation("/alpha-beta-thalassemia-test")} // Pass state to /alpha-beta-thalassemia-test
                >
                    <Typography variant="h4" gutterBottom>
                        Alpha & Beta Thalassemia Test
                    </Typography>
                </Button>
            </Grid>
        </Grid>
    );
}

export default TypeSelectComponent;
