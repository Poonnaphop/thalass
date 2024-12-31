import React, { useState } from 'react';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import descriptions from '../constant/descriptions';

function AlphaBetaThalassemiaTest() {
    // States for dad's dropdowns
    const [dadAlpha, setDadAlpha] = useState(null);
    const [dadBeta, setDadBeta] = useState(null);
    const [dadPositiveAlpha, setDadPositiveAlpha] = useState(null);
    const [dadPositiveBeta, setDadPositiveBeta] = useState(null);

    // States for mom's dropdowns
    const [momAlpha, setMomAlpha] = useState(null);
    const [momBeta, setMomBeta] = useState(null);
    const [momPositiveAlpha, setMomPositiveAlpha] = useState(null);
    const [momPositiveBeta, setMomPositiveBeta] = useState(null);

    // States for checkboxes
    const [isAlphaEnabled, setIsAlphaEnabled] = useState(false);
    const [isBetaEnabled, setIsBetaEnabled] = useState(false);

    const handleSubmit = () => {
        console.log("Dad's Alpha:", dadAlpha);
        console.log("Dad's Beta:", dadBeta);
        console.log("Mom's Alpha:", momAlpha);
        console.log("Mom's Beta:", momBeta);

        if ((isAlphaEnabled && (dadAlpha === null || momAlpha === null)) ||
            (isBetaEnabled && (dadBeta === null || momBeta === null))) {
            alert("Please select values for all enabled dropdowns.");
            return;
        }

        const alphaRisk = isAlphaEnabled && momAlpha && dadAlpha;
        const betaRisk = isBetaEnabled && momBeta && dadBeta;


        console.log("Alpha Risk:", alphaRisk);
        console.log("Beta Risk:", betaRisk);

        if (alphaRisk && betaRisk) {
            console.log("ส่งตรวจก่อนคลอดทั้งหมก");
        } else if (alphaRisk) {
            console.log("ส่งตรวจก่อนคลอด Alpha");
        } else if (betaRisk) {
            console.log("ส่งตรวจก่อนคลอด Beta");
        } else {
            console.log("ไม่ส่งตรวจก่อนคลอด");
        }
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
            <Grid container spacing={4}>
                {/* Alpha Section */}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isAlphaEnabled}
                                onChange={(e) => setIsAlphaEnabled(e.target.checked)}
                            />
                        }
                        label="Enable Alpha Section"
                    />
                    {isAlphaEnabled && (
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        border: '2px solid #ccc',
                                        borderRadius: 2,
                                        p: 6,
                                        gap: 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom>
                                        Dad - Alpha
                                    </Typography>
                                    <FormControl fullWidth>
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

                                    <FormControl style={{ display: dadAlpha ? '' : 'none', minWidth: '50%',mt: 5 }}>
                                        <InputLabel id="dad-order-select-label">Order</InputLabel>
                                        <Select
                                            labelId="dad-order-select-label"
                                            value={dadPositiveAlpha}
                                            onChange={(e) => setDadPositiveAlpha(e.target.value)}
                                            label="Order"
                                            fullWidth
                                        >
                                            {descriptions && Object.keys(descriptions).length > 0 ? (
                                                Object.entries(descriptions)
                                                    .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                    .map(([key, description]) => (
                                                        <MenuItem key={key} value={key}>
                                                            {`${key}: ${description}`}
                                                            <br />
                                                        </MenuItem>
                                                    ))
                                            ) : (
                                                <MenuItem disabled value="">
                                                    No descriptions
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        border: '2px solid #ccc',
                                        borderRadius: 2,
                                        p: 6,
                                        gap: 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom>
                                        Mom - Alpha
                                    </Typography>
                                    <FormControl fullWidth>
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

                                    <FormControl style={{ display: momAlpha ? '' : 'none', minWidth: '50%',mt: 5 }}>
                                        <InputLabel id="mom-order-select-label">Order</InputLabel>
                                        <Select
                                            labelId="mom-order-select-label"
                                            value={momPositiveAlpha}
                                            onChange={(e) => setMomPositiveAlpha(e.target.value)}
                                            label="Order"
                                            fullWidth
                                        >
                                            {descriptions && Object.keys(descriptions).length > 0 ? (
                                                Object.entries(descriptions)
                                                    .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                    .map(([key, description]) => (
                                                        <MenuItem key={key} value={key}>
                                                            {`${key}: ${description}`}
                                                            <br />
                                                        </MenuItem>
                                                    ))
                                            ) : (
                                                <MenuItem disabled value="">
                                                    No descriptions
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Grid>

                {/* Beta Section */}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={isBetaEnabled}
                                onChange={(e) => setIsBetaEnabled(e.target.checked)}
                            />
                        }
                        label="Enable Beta Section"
                    />
                    {isBetaEnabled && (
                        <Grid container spacing={4}>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        border: '2px solid #ccc',
                                        borderRadius: 2,
                                        p: 6,
                                        gap: 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom>
                                        Dad - Beta
                                    </Typography>
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
                                    <FormControl style={{ display: dadBeta ? '' : 'none', minWidth: '50%',mt: 5 }}>
                                        <InputLabel id="dad-order-select-label">Order</InputLabel>
                                        <Select
                                            labelId="dad-order-select-label"
                                            value={dadPositiveAlpha}
                                            onChange={(e) => setDadPositiveAlpha(e.target.value)}
                                            label="Order"
                                            fullWidth
                                        >
                                            {descriptions && Object.keys(descriptions).length > 0 ? (
                                                Object.entries(descriptions)
                                                    .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                    .map(([key, description]) => (
                                                        <MenuItem key={key} value={key}>
                                                            {`${key}: ${description}`}
                                                            <br />
                                                        </MenuItem>
                                                    ))
                                            ) : (
                                                <MenuItem disabled value="">
                                                    No descriptions
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Box
                                    sx={{
                                        border: '2px solid #ccc',
                                        borderRadius: 2,
                                        p: 6,
                                        gap: 2,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    }}
                                >
                                    <Typography variant="h5" gutterBottom>
                                        Mom - Beta
                                    </Typography>
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

                                    <FormControl style={{ display: momBeta ? '' : 'none', minWidth: '50%',mt: 5 }}>
                                        <InputLabel id="mom-order-select-label">Order</InputLabel>
                                        <Select
                                            labelId="mom-order-select-label"
                                            value={momPositiveBeta}
                                            onChange={(e) => setMomPositiveBeta(e.target.value)}
                                            label="Order"
                                            fullWidth
                                        >
                                            {descriptions && Object.keys(descriptions).length > 0 ? (
                                                Object.entries(descriptions)
                                                    .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                    .map(([key, description]) => (
                                                        <MenuItem key={key} value={key}>
                                                            {`${key}: ${description}`}
                                                            <br />
                                                        </MenuItem>
                                                    ))
                                            ) : (
                                                <MenuItem disabled value="">
                                                    No descriptions
                                                </MenuItem>
                                            )}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Grid>
                        </Grid>
                    )}
                </Grid>
            </Grid>
            <Box sx={{ mt: 4 }}>
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={!(isAlphaEnabled || isBetaEnabled)}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
}

export default AlphaBetaThalassemiaTest;
