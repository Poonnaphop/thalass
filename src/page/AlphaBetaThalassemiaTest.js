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
    const [dadAlpha, setDadAlpha] = useState(true);
    const [dadBeta, setDadBeta] = useState(null);
    const [dadPositiveAlpha, setDadPositiveAlpha] = useState(null);
    const [dadPositiveBeta, setDadPositiveBeta] = useState(null);
    const [isdadHavemorethanonealpha, setIsdadHavemorethanonealpha] = useState(false);
    const [isdadHavemorethanonebeta, setIsdadHavemorethanonebeta] = useState(false);
    const [dadsecondPositiveAlpha, setDadsecondPositiveAlpha] = useState(null);
    const [dadsecondBeta, setDadsecondBeta] = useState(null);
    const [dadsecondPositiveBeta, setDadsecondPositiveBeta] = useState(null);

    // States for mom's dropdowns
    const [momAlpha, setMomAlpha] = useState(true);
    const [momBeta, setMomBeta] = useState(null);
    const [momPositiveAlpha, setMomPositiveAlpha] = useState(null);
    const [momPositiveBeta, setMomPositiveBeta] = useState(null);
    const [ismomHavemorethanonealpha, setIsmomHavemorethanonealpha] = useState(false);
    const [ismomHavemorethanonebeta, setIsmomHavemorethanonebeta] = useState(false);
    const [momsecondPositiveAlpha, setMomsecondPositiveAlpha] = useState(null);
    const [momsecondBeta, setMomsecondBeta] = useState(null);
    const [momsecondPositiveBeta, setMomsecondPositiveBeta] = useState(null);

    // States for checkboxes
    const [isAlphaEnabled, setIsAlphaEnabled] = useState(false);
    const [isBetaEnabled, setIsBetaEnabled] = useState(false);

    const PCRResult1 = `ไม่มีความเสี่ยงในการให้กำเนิดบุตรเป็นโรค Hb Bart’s hydrop fetalis, Homozygous Beta-thalassemia ชนิด 
β๐/ β๐ และ Beta-thalassemia/Hb E ชนิด β๐/ βE `
    const PCRResult21 = `มีความเสี่ยงในการให้กำเนิดบุตรเป็นโรค Hb Bart’s hydrop fetalis`
    const PCRResult22 = `มีความเสี่ยงในการให้กำเนิดบุตรเป็นโรค Homozygous Beta-thalassemia ชนิด β๐/ β๐`
    const PCRResult23 = `มีความเสี่ยงในการให้กำเนิดบุตรเป็นโรค  Beta-thalassemia/Hb E ชนิด β๐/ βE`

    const PCRSuggestion1 = '---'
    const PCRSuggestion2 = 'แนะนำตรวจวินิจฉัยเพิ่มเติม ได้แก่ 1) เจาะน้ำคร่ำ 2) เจาะเลือดจากสายสะดือทารกในครรภ์ '
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
        let PCRResult = "";
        let PCRSugestion = "";

        let dadAlphatal1 = false;
        let momAlphatal1 = false;
        let dadAlphatal2 = false;
        let momAlphatal2 = false;
        let dadB0 = false;
        let dadbBplus = false;
        let momB0 = false;
        let mombBplus = false;
        if (dadAlpha) {
            dadAlphatal1 = isAlphaThal1(dadPositiveAlpha);
            dadAlphatal2 = isAlphaThal2(dadPositiveAlpha);
        }
        if (dadBeta) {
            dadB0 = isB0(dadPositiveBeta);
            dadbBplus = isBPlus(dadPositiveBeta);
        }
        if (momBeta) {
            momB0 = isB0(momPositiveBeta);
            mombBplus = isBPlus(momPositiveBeta);
        }
        if (momAlpha) {
            momAlphatal1 = isAlphaThal1(momPositiveAlpha);
            momAlphatal2 = isAlphaThal2(momPositiveAlpha);
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
            PCRResult = PCRResult1
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
            PCRResult = PCRResult1
        } else if (
            (!dadBeta && !momBeta)
            ||
            (dadBeta && !momBeta)
            ||
            (dadBeta && !momBeta)
            ||
            (dadBeta && momBeta)
        ) {
            console.log(" condition2 : ไม่ต้องส่งตรวจเจาะน้ำคร่ำ ")
            riskTest = "condition2 : ไม่ต้องส่งตรวจเจาะน้ำคร่ำ";
            PCRResult = PCRResult1
            PCRSugestion = PCRSuggestion1
        } else {
            console.log(" condition3 : ไม่ต้องส่งตรวจเจาะน้ำคร่ำ ")
            riskTest = "condition3 : ไม่ต้องส่งตรวจเจาะน้ำคร่ำ";
            PCRResult = PCRResult1
            PCRSugestion = PCRSuggestion1
        }

        if (dadAlphatal1 && momAlphatal1) {
            PCRResult = PCRResult21
            PCRSugestion = PCRSuggestion2
        } else if (dadPositiveBeta && momPositiveBeta) {
            PCRResult = PCRResult22
            PCRSugestion = PCRSuggestion2
        } else if (dadPositiveBeta && momB0 || momPositiveBeta && dadB0) {
            PCRResult = PCRResult23
            PCRSugestion = PCRSuggestion2
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
            riskTest: riskTest,
            PCRResult: PCRResult,
            PCRSugestion: PCRSugestion
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
                                            onChange={(e) => {
                                                setIsAlphaEnabled(e.target.checked);
                                                if (!e.target.checked) {
                                                    setDadPositiveAlpha(null);
                                                    setMomPositiveAlpha(null);
                                                }
                                            }}
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
                                            {/* <FormControl fullWidth>
                                                <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Dad's Alpha</InputLabel>
                                                <Select
                                                    value={dadAlpha}
                                                    onChange={(e) => {
                                                        setDadAlpha(e.target.value)
                                                        console.log("dadAlpha", e.target.value)
                                                        if(!e.target.value){
                                                            setDadPositiveAlpha(null)
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value={false}>
                                                        Negative for common alpha-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                    <MenuItem value={true}>
                                                        Positive for common alpha-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                </Select>
                                            </FormControl> */}
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
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={isdadHavemorethanonealpha}
                                                        onChange={(e) => {
                                                            setIsdadHavemorethanonealpha(e.target.checked);
                                                        }}
                                                    />
                                                }
                                                label="Have more than one"
                                            />

                                            {isdadHavemorethanonealpha &&  (
                                                <FormControl style={{ display: isdadHavemorethanonealpha ? '' : 'none', minWidth: '50%', mt: 5 }}>
                                                    <InputLabel id="dad-second-order-select-label">Order</InputLabel>
                                                    <Select
                                                        labelId="dad-second-order-select-label"
                                                        value={dadsecondPositiveAlpha}
                                                        onChange={(e) => setDadsecondPositiveAlpha(e.target.value)}
                                                        label="Order"
                                                        fullWidth
                                                    >
                                                        {alphaOptions && Object.keys(alphaOptions).length > 0 ? (
                                                            Object.entries(alphaOptions)
                                                                .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                                .filter(([key, value]) => {
                                                                      // Don't allow selecting the same alpha mutation twice
                                                                      if (dadPositiveAlpha === key) {
                                                                        return false;
                                                                    }
                                                                    // // If dadPositiveAlpha is Alphatal1, only show Alphatal2 options
                                                                    // if (dadPositiveAlpha && isAlphaThal1(dadPositiveAlpha)) {
                                                                    //     return isAlphaThal2(key);
                                                                    // }
                                                                    // // If dadPositiveAlpha is Alphatal2, only show Alphatal1 options
                                                                    // if (dadPositiveAlpha && isAlphaThal2(dadPositiveAlpha)) {
                                                                    //     return isAlphaThal1(key);
                                                                    // }
                                                                    return true; // Show all options if no filter applies
                                                                })
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
                                            )}
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
                                            {/* <FormControl fullWidth>
                                                <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Mom's Alpha</InputLabel>
                                                <Select
                                                    value={momAlpha}
                                                    onChange={(e) => {
                                                        setMomAlpha(e.target.value)
                                                        if(!e.target.value){
                                                            setMomPositiveAlpha(null)
                                                        }
                                                    }
                                                }
                                                >
                                                    <MenuItem value={false}>
                                                        Negative for common alpha-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                    <MenuItem value={true}>
                                                        Positive for common alpha-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                </Select>
                                            </FormControl> */}

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
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={ismomHavemorethanonealpha}
                                                        onChange={(e) => {
                                                            setIsmomHavemorethanonealpha(e.target.checked);
                                                        }}
                                                    />
                                                }
                                                label="Have more than one"
                                            />

                                            {ismomHavemorethanonealpha && (
                                                <FormControl style={{ display: ismomHavemorethanonealpha ? '' : 'none', minWidth: '50%', mt: 5 }}>
                                                    <InputLabel id="mom-second-order-select-label">Order</InputLabel>
                                                    <Select
                                                        labelId="mom-second-order-select-label"
                                                        value={momsecondPositiveAlpha}
                                                        onChange={(e) => setMomsecondPositiveAlpha(e.target.value)}
                                                        label="Order"
                                                        fullWidth
                                                    >
                                                        {alphaOptions && Object.keys(alphaOptions).length > 0 ? (
                                                            Object.entries(alphaOptions)
                                                                .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                                .filter(([key, value]) => {
                                                                    // Don't allow selecting the same alpha mutation twice
                                                                    if (momPositiveAlpha === key) {
                                                                        return false;
                                                                    }
                                                                    // // For SEA, THAI, FIL, MED, -20.5kb, Pakse, PNP mutations (alpha thal 1)
                                                                    // // only allow selecting alpha thal 2 mutations for the second selection
                                                                    // if (momPositiveAlpha && isAlphaThal1(momPositiveAlpha)) {
                                                                    //     return isAlphaThal2(key);
                                                                    // }
                                                                    // // For -3.7kb, -4.2kb mutations (alpha thal 2)
                                                                    // // only allow selecting alpha thal 1 mutations for the second selection
                                                                    // if (momPositiveAlpha && isAlphaThal2(momPositiveAlpha)) {
                                                                    //     return isAlphaThal1(key);
                                                                    // }
                                                                    return true; // Show all options if no filter applies
                                                                })
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
                                            )}
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
                                            onChange={(e) => {
                                                setIsBetaEnabled(e.target.checked);
                                                if (!e.target.checked) {
                                                    setDadPositiveBeta(null);
                                                    setMomPositiveBeta(null);
                                                }
                                            }}
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
                                                    onChange={(e) => {
                                                        setDadBeta(e.target.value)
                                                        if (!e.target.value || e.target.value != 2) {
                                                            setDadPositiveBeta(null);
                                                        }
                                                    }
                                                    }
                                                >
                                                    <MenuItem value={1}>
                                                        Negative for common beta-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Positive for common beta-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        HBE
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            <FormControl style={{ display: dadBeta == 2 ? '' : 'none', minWidth: '50%', mt: 5 }}>
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
                                            <FormControlLabel
                                                style={{ display: dadBeta != 1 ? '' : 'none' }}
                                                control={
                                                    <Checkbox
                                                        checked={isdadHavemorethanonebeta}
                                                        onChange={(e) => {
                                                            setIsdadHavemorethanonebeta(e.target.checked);
                                                        }}
                                                    />
                                                }
                                                label="Have more than one"
                                            />

                                            {isdadHavemorethanonebeta && (
                                                <FormControl fullWidth>
                                                <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Dad's Beta</InputLabel>
                                                <Select
                                                    value={dadsecondBeta}
                                                    onChange={(e) => {
                                                        setDadsecondBeta(e.target.value)
                                                    }
                                                    }
                                                >
                                                    <MenuItem value={2}>
                                                        Positive for common beta-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>    
                                                    <MenuItem value={3}>
                                                        HBE
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            )}

                                            {dadsecondBeta && (
                                              <FormControl style={{ display: dadsecondBeta == 2 ? '' : 'none', minWidth: '50%', mt: 5 }}>
                                              <InputLabel id="dad-order-select-label">Order</InputLabel>
                                              <Select
                                                  labelId="dad-order-select-label"
                                                  value={dadsecondPositiveBeta}
                                                  onChange={(e) => setDadsecondPositiveBeta(e.target.value)}
                                                  label="Order"
                                                  fullWidth
                                              >
                                                  {betaOptions && Object.keys(betaOptions).length > 0 ? (
                                                      Object.entries(betaOptions)
                                                          .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                          .filter(([key, value]) => {
                                                              // If dadPositiveBeta is B0, only show B+ options
                                                              if (dadPositiveBeta && isB0(dadPositiveBeta)) {
                                                                  return !isB0(key);
                                                              }
                                                              // If dadPositiveBeta is B+, only show B0 options
                                                              if (dadPositiveBeta && !isB0(dadPositiveBeta)) {
                                                                  return isB0(key);
                                                              }
                                                              return true; // Show all options if no filter applies
                                                          })
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
                                            )}
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
                                                    onChange={(e) => {
                                                        setMomBeta(e.target.value)
                                                        if (!e.target.value || e.target.value != 2) {
                                                            setMomPositiveBeta(null);
                                                        }
                                                    }}
                                                >
                                                    <MenuItem value={1}>
                                                        Negative for common beta-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                    <MenuItem value={2}>
                                                        Positive for common beta-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>
                                                    <MenuItem value={3}>
                                                        HBE
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>

                                            <FormControl style={{ display: momBeta == 2 ? '' : 'none', minWidth: '50%', mt: 5 }}>
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
                                            <FormControlLabel
                                                style={{ display: momBeta != 1 ? '' : 'none' }}
                                                control={
                                                    <Checkbox
                                                        checked={ismomHavemorethanonebeta}
                                                        onChange={(e) => {
                                                            setIsmomHavemorethanonebeta(e.target.checked);
                                                        }}
                                                    />
                                                }
                                                label="Have more than one"
                                            />

                                            {ismomHavemorethanonebeta && (
                                                <FormControl fullWidth>
                                                <InputLabel sx={{ backgroundColor: 'white', px: 1 }}>Mom's Beta</InputLabel>
                                                <Select
                                                    value={momsecondBeta}
                                                    onChange={(e) => {
                                                        setMomsecondBeta(e.target.value)
                                                    }
                                                    }
                                                >
                                                    <MenuItem value={2}>
                                                        Positive for common beta-globin deletions based on GAP-PCR analysis
                                                    </MenuItem>    
                                                    <MenuItem value={3}>
                                                        HBE
                                                    </MenuItem>
                                                </Select>
                                            </FormControl>
                                            )}

                                            {momsecondBeta && (
                                              <FormControl style={{ display: momsecondBeta == 2 ? '' : 'none', minWidth: '50%', mt: 5 }}>
                                              <InputLabel id="mom-order-select-label">Order</InputLabel>
                                              <Select
                                                  labelId="mom-order-select-label"
                                                  value={momsecondPositiveBeta}
                                                  onChange={(e) => setMomsecondPositiveBeta(e.target.value)}
                                                  label="Order"
                                                  fullWidth
                                              >
                                                  {betaOptions && Object.keys(betaOptions).length > 0 ? (
                                                      Object.entries(betaOptions)
                                                          .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                                          .filter(([key, value]) => {
                                                              // If dadPositiveBeta is B0, only show B+ options
                                                              if (momPositiveBeta && isB0(momPositiveBeta)) {
                                                                  return !isB0(key);
                                                              }
                                                              // If dadPositiveBeta is B+, only show B0 options
                                                              if (momPositiveBeta && !isB0(momPositiveBeta)) {
                                                                  return isB0(key);
                                                              }
                                                              return true; // Show all options if no filter applies
                                                          })
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
                                            )}
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
