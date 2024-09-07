import { Box, Typography, Grid, Button } from "@mui/material";

function TypeSelectComponent() {
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
                        textDecoration: 'none', // Remove underline from Typography links
                    }}
                    href="/hbtype"
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
                        textDecoration: 'none', // Remove underline from Typography links
                    }}
                    href="/main"
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
