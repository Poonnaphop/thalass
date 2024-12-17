import React, { useState } from 'react';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Button } from '@mui/material';

function AlphaBetaThalassemiaTest() {
    // States for dad's dropdowns
    const [dadAlpha, setDadAlpha] = useState(null);
    const [dadBeta, setDadBeta] = useState(null);

    // States for mom's dropdowns
    const [momAlpha, setMomAlpha] = useState(null);
    const [momBeta, setMomBeta] = useState(null);

    const handleSubmit = () => {
        console.log("Dad's Alpha:", dadAlpha);
        console.log("Dad's Beta:", dadBeta);
        console.log("Mom's Alpha:", momAlpha);
        console.log("Mom's Beta:", momBeta);

        if (dadAlpha === null || dadBeta === null || momAlpha === null || momBeta === null) {
            alert("Please select values for all dropdowns.");
            return
        }

        const alphaRisk = momAlpha && dadAlpha
        const betaRisk = momBeta && dadBeta

        const totalRisk = alphaRisk || betaRisk

        console.log("Alpha Risk:", alphaRisk);
        console.log("Beta Risk:", betaRisk);

        if (totalRisk) {
            console.log("ส่งตรวจก่อนคลอด")
        } else {
            console.log("ไม่ต้องตรวจ")
        }

    };

    const calculateRisk = (momAlpha, momBeta, dadAlpha, dadBeta) => {
        if(momAlpha && momBeta && dadAlpha && dadBeta) return "Not risk";
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
            <Grid container spacing={4}>
                {/* Dad Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            border: '2px solid #ccc',
                            borderRadius: 2,
                            p: 6,
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Dad
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Dad's Alpha</InputLabel>
                            <Select
                                value={dadAlpha}
                                onChange={(e) => setDadAlpha(e.target.value)}
                            >
                                <MenuItem value={false}>
                                    Negative for common alpha-globin deletions based on GAP-PCR analysis
                                </MenuItem>
                                <MenuItem value={true}>
                                    Positive for common alpha-globin deletions based on GAP-PCR analysis
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Dad's Beta</InputLabel>
                            <Select
                                value={dadBeta}
                                onChange={(e) => setDadBeta(e.target.value)}
                            >
                                <MenuItem value={false}>
                                    Negative for common beta-globin deletions based on GAP-PCR analysis
                                </MenuItem>
                                <MenuItem value={true}>
                                    Positive for common beta-globin deletions based on GAP-PCR analysis
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>

                {/* Mom Section */}
                <Grid item xs={12} md={6}>
                    <Box
                        sx={{
                            border: '2px solid #ccc',
                            borderRadius: 2,
                            p: 6,
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Mom
                        </Typography>
                        <FormControl fullWidth sx={{ mb: 4 }}>
                            <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Mom's Alpha</InputLabel>
                            <Select
                                value={momAlpha}
                                onChange={(e) => setMomAlpha(e.target.value)}
                            >
                                <MenuItem value={false}>
                                    Negative for common alpha-globin deletions based on GAP-PCR analysis
                                </MenuItem>
                                <MenuItem value={true}>
                                    Positive for common alpha-globin deletions based on GAP-PCR analysis
                                </MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Mom's Beta</InputLabel>
                            <Select
                                value={momBeta}
                                onChange={(e) => setMomBeta(e.target.value)}
                            >
                                <MenuItem value={false}>
                                    Negative for common beta-globin deletions based on GAP-PCR analysis
                                </MenuItem>
                                <MenuItem value={true}>
                                    Positive for common beta-globin deletions based on GAP-PCR analysis
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
}

export default AlphaBetaThalassemiaTest;
