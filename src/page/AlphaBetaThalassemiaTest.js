import React, { useState } from 'react';
import { Container, Typography, FormControl, InputLabel, Select, MenuItem, Box, Button, Checkbox, FormControlLabel } from '@mui/material';
import Grid from '@mui/material/Grid';
//import Grid from '@mui/material/Grid2';
import betaOptions from '../constant/betaOptions';
import alphaOptions from '../constant/alphaOption';
import Footbar from '../Footbar';
import Headbar from '../Headbar';
import { useLocation, useNavigate } from 'react-router-dom';

function AlphaBetaThalassemiaTest() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;
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

    const isAlphaThal1 = (condition) => {
        const alphaThal1Conditions = [
            'SEA', 'THAI', 'FIL', 'MED', '-20.5kb',
            'Pakse', 'PNP (Pak Num Po)'
        ];
        return alphaThal1Conditions.includes(condition);
    };

    const isAlphaThal2 = (condition) => {
        const alphaThal2Conditions = [
            '-3.7 kb', '-4.2 kb'
        ];
        return alphaThal2Conditions.includes(condition);
    };

    const isB0 = (condition) => {
        const b0Conditions = [
            '-28 (A>G)', 'CD26 (Hb E)', 'CD19 (A>G)', '-86', '-31',
            'β 126 (Dhonburi)', '3.48 kb', 'thai(δβ)', 'Hb Lepore',
            'Siriraj-thalassemia Gγ(Aγδβ)', 'Asian Indian deletion type A',
            'Asian Indian deletion type B'
        ];
        return b0Conditions.includes(condition);
    };

    const isBPlus = (condition) => {
        const bPlusConditions = [
            'CD8/9 (+G)', 'CD17 (A>T)', 'IVSI-I (G>T)', 'IVSI-S (G>C)',
            'IVSII-654 (C>T)', 'CD41/42 (-TCTT)', 'CD71/72 (+A)',
            'CD26 G>T (stop cobon)', 'CD27/28 (+C)', 'CD35 (C>A)',
            'CD41 (-C)', 'CD43 (G>T)', 'CD95 (+A)', 'CD15 (G>A)',
            'CD123-125 Hb D khonkean', '619 bp', 'fillpino (β)',
            'SEA HPFH (β)', 'Chinese Gγ(Aγδβ)', 'HPFH-6 Gγ(Aγδβ)'
        ];
        return bPlusConditions.includes(condition);
    };
    const handleSubmit = () => {
        console.log("Dad's Alpha:", dadAlpha);
        console.log("Dad's Beta:", dadBeta);
        console.log("Mom's Alpha:", momAlpha);
        console.log("Mom's Beta:", momBeta);
        let riskResult = '';
        let riskTest = '';

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
            console.log("ส่งตรวจก่อนคลอดทั้งหมด");
            riskResult = "ส่งตรวจก่อนคลอดทั้งหมด";
        } else if (alphaRisk) {
            console.log("ส่งตรวจก่อนคลอด Alpha");
            riskResult = "ส่งตรวจก่อนคลอด Alpha";
        } else if (betaRisk) {
            console.log("ส่งตรวจก่อนคลอด Beta");
            riskResult = "ส่งตรวจก่อนคลอด Beta";
        } else {
            console.log("ไม่ส่งตรวจก่อนคลอด");
            riskResult = "ไม่ส่งตรวจก่อนคลอด";
        }

        let dadAlphatal1 = false;
        let momAlphatal1 = false;
        let dadAlphatal2 = false;
        let momAlphatal2 = false;
        let dadB0 = false;
        let dadbBplus = false;
        let momB0 = false;
        let mombBplus = false;
        if (dadAlpha) {
            dadAlphatal1 = isAlphaThal1(dadAlpha);
            dadAlphatal2 = isAlphaThal2(dadAlpha);
        }
        if (dadBeta) {
            dadB0 = isB0(dadBeta);
            dadbBplus = isBPlus(dadBeta);
        }
        if (momBeta) {
            momB0 = isB0(momBeta);
            mombBplus = isBPlus(momBeta);
        }
        if (momAlpha) {
            momAlphatal1 = isAlphaThal1(momAlpha);
            momAlphatal2 = isAlphaThal2(momAlpha);
        }
        console.log("ALPHA TEST")
        console.log("-----------------------")

        console.log("dadAlphatal1", dadAlphatal1);
        console.log("dadAlphatal2", dadAlphatal2);
        console.log("dadB0", dadB0);
        console.log("dadbBplus", dadbBplus);

        console.log("momAlphatal1", momAlphatal1);
        console.log("momAlphatal2", momAlphatal2);
        console.log("momB0", momB0);
        console.log("mombBplus", mombBplus);
        console.log("-----------------------")


        if (momAlphatal1 && dadAlphatal1) {
            console.log("condition: ต้องส่งตรวจเจาะน้ำคร่ำ");
            riskTest = "ต้องส่งตรวจเจาะน้ำคร่ำ";
        } else if ((dadAlphatal1 && momAlphatal2) || (dadAlphatal2 && momAlphatal1) || (dadAlphatal2 && momAlphatal2)) {
            console.log(" ไม่ต้องส่งตรวจเจาะน้ำคร่ำ")
            riskTest = "ไม่ต้องส่งตรวจเจาะน้ำคร่ำ";
        }
        console.log("BETA TEST")
        console.log("-----------------------")

        if ((momBeta && dadBeta)
            && (
                (momB0 && dadB0)
                ||
                (momB0 && dadbBplus)
                ||
                (mombBplus && dadB0)
                ||
                (mombBplus && dadbBplus)
            )) {
            console.log(" condition1 : ต้องส่งตรวจเจาะน้ำคร่ำ ")
            riskTest = "condition1 : ต้องส่งตรวจเจาะน้ำคร่ำ";
        }else if(
            (!dadBeta && !momBeta)
            ||
            (dadBeta && !momBeta)
            ||
            (dadBeta && !momBeta)
            ||
            (dadBeta && momBeta)
        ){
            console.log(" condition2 : ไม่ต้องส่งตรวจเจาะน้ำคร่ำ ")
            riskTest = "condition2 : ไม่ต้องส่งตรวจเจาะน้ำคร่ำ";
        }else{
            console.log(" condition3 : ไม่ต้องส่งตรวจเจาะน้ำคร่ำ ")
            riskTest = "condition3 : ไม่ต้องส่งตรวจเจาะน้ำคร่ำ";
        }
       
          // Prepare the new formData
          const newFormData = {
            ...formData, // Preserve existing data
            momAlpha: momAlpha,
            momBeta: momBeta,
            momPositiveAlpha: momPositiveAlpha,
            momPositiveBeta: momPositiveBeta,
            dadAlpha: dadAlpha,
            dadBeta: dadBeta,
            dadPositiveAlpha: dadPositiveAlpha,
            dadPositiveBeta: dadPositiveBeta,
            isAlphaEnabled: isAlphaEnabled,
            isBetaEnabled: isBetaEnabled,
            riskResult: riskResult,
            riskTest: riskTest
        };

        console.log("New Form Data:", newFormData);
        navigate('/alpha-beta-thalassemia-result2', { state: { formData: newFormData } });
    };

    return (
        <>
            <Headbar />
            <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
                <Box
                    sx={{
                        order: '2px solid #ccc',
                        borderRadius: 2,
                        p: 6,
                        gap: 2,
                        display: 'flex',
                        flexDirection: 'column',

                        // white bg
                        bgcolor: 'whitesmoke',
                        backgroundBlendMode: 'screen',
                        padding: '20px 40px',

                    }}
                >
                    <Grid container spacing={4}>
                        {/* Alpha Section */}
                        <Grid item xs={12} >
                            <Box
                                sx={{
                                    //border: '2px solid #ccc',
                                    borderRadius: 2,
                                    p: 6,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: '10px 10px',

                                }}
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isAlphaEnabled}
                                            onChange={(e) => setIsAlphaEnabled(e.target.checked)}
                                        />
                                    }
                                    label="Enable Alpha Section"
                                />
                            </Box>

                            {isAlphaEnabled && (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                // border: '2px solid #ccc',
                                                borderRadius: 2,
                                                p: 6,
                                                gap: 2,
                                                display: 'flex',
                                                flexDirection: 'column',

                                                // white bg
                                                bgcolor: 'whitesmoke',
                                                backgroundBlendMode: 'screen',
                                                padding: '10px 10px',


                                            }}
                                        >
                                            <Typography variant="h5" gutterBottom>
                                                Dad - Alpha
                                            </Typography>
                                            <FormControl fullWidth>
                                                <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Dad's Alpha</InputLabel>
                                                <Select
                                                    value={dadAlpha}
                                                    onChange={(e) => {
                                                        setDadAlpha(e.target.value)
                                                        console.log("dadAlpha", e.target.value)
                                                    }}
                                                >
                                                    <MenuItem value={false}>
                                                        Negative for common alpha-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                    <MenuItem value={true}>
                                                        Positive for common alpha-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl style={{ display: dadAlpha ? '' : 'none', minWidth: '50%', mt: 5 }}>
                                                <InputLabel id="dad-order-select-label">Order</InputLabel>
                                                <Select
                                                    labelId="dad-order-select-label"
                                                    value={dadPositiveAlpha}
                                                    onChange={(e) => setDadPositiveAlpha(e.target.value)}
                                                    label="Order"
                                                    fullWidth
                                                >
                                                    {alphaOptions && Object.keys(alphaOptions).length > 0 ? (
                                                        Object.entries(alphaOptions)
                                                            .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                            .map(([key, alphaOptions]) => (
                                                                <MenuItem key={key} value={key}>
                                                                    {`${alphaOptions}`}
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
                                                // border: '2px solid #ccc',
                                                borderRadius: 2,
                                                p: 6,
                                                gap: 2,
                                                display: 'flex',
                                                flexDirection: 'column',

                                                // white bg
                                                bgcolor: 'whitesmoke',
                                                backgroundBlendMode: 'screen',
                                                padding: '10px 10px',

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

                                            <FormControl style={{ display: momAlpha ? '' : 'none', minWidth: '50%', mt: 5 }}>
                                                <InputLabel id="mom-order-select-label">Order</InputLabel>
                                                <Select
                                                    labelId="mom-order-select-label"
                                                    value={momPositiveAlpha}
                                                    onChange={(e) => setMomPositiveAlpha(e.target.value)}
                                                    label="Order"
                                                    fullWidth
                                                >
                                                    {alphaOptions && Object.keys(alphaOptions).length > 0 ? (
                                                        Object.entries(alphaOptions)
                                                            .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                            .map(([key, alphaOptions]) => (
                                                                <MenuItem key={key} value={key}>
                                                                    {`${alphaOptions}`}
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
                            <Box
                                sx={{
                                    //border: '2px solid #ccc',
                                    borderRadius: 2,
                                    p: 6,
                                    gap: 2,
                                    display: 'flex',
                                    flexDirection: 'column',

                                    // white bg
                                    bgcolor: 'whitesmoke',
                                    backgroundBlendMode: 'screen',
                                    padding: '10px 10px',


                                }}
                            >

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={isBetaEnabled}
                                            onChange={(e) => setIsBetaEnabled(e.target.checked)}
                                        />
                                    }
                                    label="Enable Beta Section"
                                />

                            </Box>

                            {isBetaEnabled && (
                                <Grid container spacing={4}>
                                    <Grid item xs={12} md={6}>
                                        <Box
                                            sx={{
                                                //border: '2px solid #ccc',
                                                borderRadius: 2,
                                                p: 6,
                                                gap: 2,
                                                display: 'flex',
                                                flexDirection: 'column',

                                                // white bg
                                                bgcolor: 'whitesmoke',
                                                backgroundBlendMode: 'screen',
                                                padding: '10px 10px',

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
                                            <FormControl style={{ display: dadBeta ? '' : 'none', minWidth: '50%', mt: 5 }}>
                                                <InputLabel id="dad-order-select-label">Order</InputLabel>
                                                <Select
                                                    labelId="dad-order-select-label"
                                                    value={dadPositiveBeta}
                                                    onChange={(e) => setDadPositiveBeta(e.target.value)}
                                                    label="Order"
                                                    fullWidth
                                                >
                                                    {betaOptions && Object.keys(betaOptions).length > 0 ? (
                                                        Object.entries(betaOptions)
                                                            .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                            .map(([key, betaOptions]) => (
                                                                <MenuItem key={key} value={key}>
                                                                    {`${betaOptions}`}
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
                                                //border: '2px solid #ccc',
                                                borderRadius: 2,
                                                p: 6,
                                                gap: 2,
                                                display: 'flex',
                                                flexDirection: 'column',

                                                // white bg
                                                bgcolor: 'whitesmoke',
                                                backgroundBlendMode: 'screen',
                                                padding: '10px 10px',
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

                                            <FormControl style={{ display: momBeta ? '' : 'none', minWidth: '50%', mt: 5 }}>
                                                <InputLabel id="mom-order-select-label">Order</InputLabel>
                                                <Select
                                                    labelId="mom-order-select-label"
                                                    value={momPositiveBeta}
                                                    onChange={(e) => setMomPositiveBeta(e.target.value)}
                                                    label="Order"
                                                    fullWidth
                                                >
                                                    {betaOptions && Object.keys(betaOptions).length > 0 ? (
                                                        Object.entries(betaOptions)
                                                            .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                            .map(([key, betaOptions]) => (
                                                                <MenuItem key={key} value={key}>
                                                                    {`${betaOptions}`}
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

                </Box>
            </Container>
            <Footbar />
        </>
    );
}

export default AlphaBetaThalassemiaTest;
