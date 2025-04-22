import { ColorizeTwoTone } from "@mui/icons-material";
import { Typography, Button } from "@mui/material";
import Grid from '@mui/material/Grid';
//import Grid from '@mui/material/Grid2';
import { useLocation, useNavigate } from "react-router-dom";

function TypeSelectComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const handleNavigation = (path) => {
        navigate(path, { state: formData });
    };

    return (

        <Grid container spacing={10} sx={{ mt: 12 }} justifyContent="center">
            <Grid item xs={12} sm={6} md={4}>
                <Button 
                    variant="outlined"
                    sx={{
                        borderRadius: 2,
                        p: 3,
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        bgcolor:'#F0F0F0',
                        color:'#003366'
                    }}
                    onClick={() => handleNavigation("/hbtype")} // Pass state to /hbtype                    
                >
                    <Typography variant="h4"  gutterBottom>
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
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        textAlign: 'center',
                        bgcolor:'#F0F0F0',
                        color:'#003366'
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
