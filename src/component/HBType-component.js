import React, { useState } from 'react';
import { Container, Box, Grid, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';

function HBTypeComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;
    // Handle Next Button click
    const handleNext = () => {
        // Construct momData and dadData objects
        const momData = {
            mcv: mcvMother, mch: mchMother, hba: hbAMother, of: ofMother, hbF: hbFMother,
            hbCs: hbCsMother, hbBart: hbBartsMother, dcip: dcipMother, hbH: hbhMother, A2: a2Mother, hba2PlusE: hbA2EMother, hbA2: hbA2Mother, hbE: hbeMother
        };

        const dadData = {
            mcv: mcvFather, mch: mchFather, hba: hbAFather, of: ofFather, hbF: hbFFather,
            hbCs: hbCsFather, hbBart: hbBartsFather, dcip: dcipFather, hbH: hbhFather, A2: a2Father, hba2PlusE: hbA2EFather, hbA2: hbA2Father, hbE: hbeFather
        };

        // Log for debugging
        console.log("momData:", momData);
        console.log("dadData:", dadData);

        // Calculate risk assessment
        const riskResult = evaluateRisk(
            momData.mcv, momData.mch, momData.hba, momData.of, momData.hbF, momData.hbCs, momData.hbBart, momData.dcip, momData.hbH, momData.A2, momData.hba2PlusE, momData.hbA2, momData.hbE,
            dadData.mcv, dadData.mch, dadData.hba, dadData.of, dadData.hbF, dadData.hbCs, dadData.hbBart, dadData.dcip, dadData.hbH, dadData.A2, dadData.hba2PlusE, dadData.hbA2, dadData.hbE
        );

        const momOrder = evaluateOrder(
            momData.mcv, momData.mch, momData.hba, momData.of, momData.hbF, momData.hbCs, momData.hbBart, momData.dcip, momData.hbH, momData.A2, momData.hba2PlusE, momData.hbA2, momData.hbE
        )

        const dadOrder = evaluateOrder(
            dadData.mcv, dadData.mch, dadData.hba, dadData.of, dadData.hbF, dadData.hbCs, dadData.hbBart, dadData.dcip, dadData.hbH, dadData.A2, dadData.hba2PlusE, dadData.hbA2, dadData.hbE
        )

        console.log("Risk Assessment Result:", riskResult);

        // Prepare the new formData
        const newFormData = {
            ...formData, // Preserve existing data
            momData,
            dadData,
            riskResult,
            momOrder,
            dadOrder
        };

        console.log("New Form Data:", newFormData);

        // Navigate to the result page and pass the data
        navigate('/alpha-beta-thalassemia-result', { state: newFormData });
    };


    // Father's state
    const [mcvFather, setMcvFather] = useState('');
    const [mchFather, setMchFather] = useState('');
    const [hbAFather, setHbAFather] = useState('');
    const [ofFather, setOfFather] = useState('');
    const [hbFFather, setHbFFather] = useState('');
    const [hbCsFather, setHbCsFather] = useState('');
    const [hbBartsFather, setHbBartsFather] = useState('');
    const [dcipFather, setDcipFather] = useState('');
    const [hbhFather, sethbhFather] = useState('');
    const [a2Father, seta2Father] = useState('');
    const [hbA2OptionFather, setHbA2OptionFather] = useState('separate');
    const [hbA2EFather, setHbA2EFather] = useState('');
    const [hbA2Father, setHbA2Father] = useState('');
    const [hbeFather, sethbEFather] = useState('');


    // Mother's state
    const [mcvMother, setMcvMother] = useState('');
    const [mchMother, setMchMother] = useState('');
    const [hbAMother, setHbAMother] = useState('');
    const [ofMother, setOfMother] = useState('');
    const [hbFMother, setHbFMother] = useState('');
    const [hbCsMother, setHbCsMother] = useState('');
    const [hbBartsMother, setHbBartsMother] = useState('');
    const [dcipMother, setDcipMother] = useState('');
    const [hbhMother, sethbhMother] = useState('');
    const [a2Mother, seta2Mother] = useState('');
    const [hbA2OptionMother, setHbA2OptionMother] = useState('separate');
    const [hbA2EMother, setHbA2EMother] = useState('');
    const [hbA2Mother, setHbA2Mother] = useState('');
    const [hbeMother, sethbEMother] = useState('');


    function evaluateOrder(mcv, mch, hb_a, of, hb_f, hb_cs, hb_bart, dcip, hb_h, A2, hba2_plus_e, hba2, hb_e) {
        var order = 0
        var desc = ""
        console.log(`evaluateOrder: mcv=${mcv}, mch=${mch}, hb_a=${hb_a}, of=${of}, hb_f=${hb_f}, hb_cs=${hb_cs}, hb_bart=${hb_bart}, dcip=${dcip}, hb_h=${hb_h}, A2=${A2}, hba2_plus_e=${hba2_plus_e}, hba2=${hba2}, hb_e=${hb_e}`);
        var incondition = []

        desc = "rare abnormal Hb"
        order = 22

        // Condition 1:
        if (A2 <= 3.5 && hb_a !== 0 && hb_e === 0 && hba2_plus_e === 0 && hb_f === 0 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(1);
            desc = "A2A ,Hb A2<=3.5";
            order = 1;
        }
        // Condition 2:
        else if (A2 <= 3.5 && hb_a !== 0 && hb_e === 0 && hba2_plus_e === 0 && hb_f === 0 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(2);
            desc = "A2A ,Hb A2<=3.5";
            order = 2;
        }
        // Condition 3:
        else if (A2 > 3.5 && A2 <= 8 && hb_a !== 0 && hb_e === 0 && hba2_plus_e === 0 && hb_f === 0 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(3);
            desc = "A2A ,Hb A2 3.6-8";
            order = 3;
        }
        // Condition 4:
        else if ((hb_e + hba2 >= 25 || hba2_plus_e >= 25) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_a !== 0 && hb_f === 0 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(4);
            desc = "EA ,Hb E >=25";
            order = 4;
        }
        // Condition 5:
        else if ((hb_e + hba2 >= 25 || hba2_plus_e >= 25) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_a !== 0 && hb_f === 0 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(5);
            desc = "EA , Hb E < 25";
            order = 5;
        }
        // Condition 6:
        else if ((hb_e + hba2 >= 80 || hba2_plus_e >= 80) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_f <= 5 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(6);
            desc = "EE, Hb E >=80% , HB F <=5";
            order = 6;
        }
        // Condition 7:
        else if ((hb_e + hba2 > 75 || hba2_plus_e > 75) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_f > 5 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(7);
            desc = "EE/EF, Hb E >75 , Hb F >5";
            order = 7;
        }
        // Condition 8:
        else if (hb_cs !== 0 && A2 !== 0 && hb_a !== 0 && (hb_e === 0 || hba2_plus_e === 0) && hb_f === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(8);
            desc = "CS A2A";
            order = 8;
        }
        // Condition 9:
        else if (hb_cs !== 0 && A2 !== 0 && hb_a !== 0 && hb_bart !== 0 && hb_e === 0 && hb_f === 0 && hb_h === 0) {
            incondition.push(9);
            desc = "CS A2A Bart's";
            order = 9;
        }
        // Condition 10:
        else if (hb_h !== 0 && A2 !== 0 && hb_a !== 0 && hb_bart !== 0 && hb_e === 0 && hb_f === 0 && hb_cs === 0) {
            incondition.push(10);
            desc = "A2A H / A2A Bart's H";
            order = 10;
        }
        // Condition 11:
        else if (hb_h !== 0 && A2 !== 0 && hb_a !== 0 && hb_bart !== 0 && hb_cs !== 0 && hb_e === 0 && hb_f === 0) {
            incondition.push(11);
            desc = "CS A2A / CS A2A Bart's H";
            order = 11;
        }
        // Condition 12:
        else if (A2 !== 0 && hb_f !== 0 && hb_a === 0 && hb_cs === 0 && hb_bart === 0 && hb_e === 0 && hb_h === 0) {
            incondition.push(12);
            desc = "A2F";
            order = 12;
        }
        // Condition 13:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && (hb_f >= 20 && hb_f <= 60) && hb_a === 0 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(13);
            desc = 'EF Hb E 40-80, Hb F 20-60';
            order = 13;
        }
        // Condition 14:
        else if (A2 !== 0 && hb_a !== 0 && hb_f >= 10 && hb_f <= 30 && hb_cs === 0 && hb_bart === 0 && hb_e === 0 && hb_h === 0) {
            incondition.push(14);
            desc = 'A2FA, Hb F 10-30';
            order = 14;
        }
        // Condition 15:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && (hb_f >= 20 && hb_f <= 60) && hb_a !== 0 && hb_cs === 0 && hb_bart === 0 && hb_h === 0) {
            incondition.push(15);
            desc = "EFA";
            order = 15;
        }
        // Condition 16:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && hb_bart !== 0 && hb_a !== 0 && hb_cs === 0 && hb_f === 0 && hb_h === 0) {
            incondition.push(16);
            desc = "EA Bart's";
            order = 16;
        }
        // Condition 17:
        else if ((hb_e + hba2 > 75 || hba2_plus_e > 75) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_f > 5 && hb_bart !== 0 && hb_cs === 0 && hb_h === 0) {
            incondition.push(17);
            desc = "EE/EF Bart's";
            order = 17;
        }
        // Condition 18:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && (hb_f >= 20 && hb_f <= 60) && hb_a !== 0 && hb_bart !== 0 && hb_cs === 0 && hb_h === 0) {
            incondition.push(18);
            desc = "EFA Bart's";
            order = 18;
        }
        // Condition 19:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && hb_bart !== 0 && hb_a !== 0 && hb_cs !== 0 && hb_f === 0 && hb_h === 0) {
            incondition.push(19);
            desc = "CS EA Bart's";
            order = 19;
        }
        // Condition 20.1:
        else if ((hb_e + hba2 >= 80 || hba2_plus_e >= 80) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_f <= 5 && hb_cs !== 0 && hb_bart !== 0 && hb_h === 0) {
            incondition.push(20.1);
            desc = "CS EE Bart's";
            order = 20.1;
        }
        // Condition 20.2:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && (hb_f >= 20 && hb_f <= 60) && hb_cs !== 0 && hb_bart !== 0 && hb_h === 0) {
            incondition.push(20.2);
            desc = "CS EF Bart's";
            order = 20.2;
        }
        // Condition 21:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && (hb_f >= 20 && hb_f <= 60) && hb_a !== 0 && hb_bart !== 0 && hb_cs !== 0 && hb_h === 0) {
            incondition.push(21);
            desc = "CS EFA Bart's";
            order = 21;
        }

        console.log("incondition:", incondition);
        return { order, desc };
    }

    function evaluateRisk(momMCV, momMCH, momHbA, momOF, momHbF, momHbCs, momHbBart, momDCIP, momHbH, momA2, momHbA2PlusE, momHbA2, momHbE, dadMCV, dadMCH, dadHbA, dadOF, dadHbF, dadHbCs, dadHbBart, dadDCIP, dadHbH, dadA2, dadHbA2PlusE, dadHbA2, dadHbE) {
        console.log("mom")
        const momOrderDesc = evaluateOrder(
            parseFloat(momMCV) || 0, parseFloat(momMCH) || 0, parseFloat(momHbA) || 0, parseFloat(momOF) || 0,
            parseFloat(momHbF) || 0, parseFloat(momHbCs) || 0, parseFloat(momHbBart) || 0, parseFloat(momDCIP) || 0,
            parseFloat(momHbH) || 0, parseFloat(momA2) || 0, parseFloat(momHbA2PlusE) || 0, parseFloat(momHbA2) || 0, parseFloat(momHbE) || 0
        );
        console.log("dad")
        const dadOrderDesc = evaluateOrder(
            parseFloat(dadMCV) || 0, parseFloat(dadMCH) || 0, parseFloat(dadHbA) || 0, parseFloat(dadOF) || 0,
            parseFloat(dadHbF) || 0, parseFloat(dadHbCs) || 0, parseFloat(dadHbBart) || 0, parseFloat(dadDCIP) || 0,
            parseFloat(dadHbH) || 0, parseFloat(dadA2) || 0, parseFloat(dadHbA2PlusE) || 0, parseFloat(dadHbA2) || 0, parseFloat(dadHbE) || 0
        );

        if (!momOrderDesc || !dadOrderDesc) {
            console.warn("evaluateOrder returned undefined for mom or dad");
            return "No specific risk condition met";
        }

        const { order: momOrder, desc: momDesc } = momOrderDesc;
        const { order: dadOrder, desc: dadDesc } = dadOrderDesc;

        console.log("momOrder:", momOrder, "momDesc:", momDesc);
        console.log("dadOrder:", dadOrder, "dadDesc:", dadDesc);

        if (momOrder === 1 && dadOrder >= 1 && dadOrder <= 22) {
            return "Not risk";
        }
        else if ([2, 8, 9, 10, 11].includes(momOrder)) {
            if ([1, 4].includes(dadOrder)) return "Not risk";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
        }
        else if (momOrder === 3) {
            if (dadOrder === 1) return "Not risk";
            else if ([2, 8, 9, 10, 11].includes(dadOrder)) return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
            else if ([3, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18, 19, 20.1, 20.2, 21, 22].includes(dadOrder))
                return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ Alpha, beta";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ beta";
        }
        else if (momOrder === 4) {
            if ([1, 2, 4, 5, 6, 10, 11, 16, 19, 20.1].includes(dadOrder)) return "Not risk";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ beta";
        }
        else if ([5, 6, 16, 19, 20.1, 20.2].includes(momOrder)) {
            if ([1, 4].includes(dadOrder)) return "Not risk";
            else if ([3, 7, 12, 13, 14, 15, 17, 18, 20.1, 21, 22].includes(dadOrder))
                return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ Alpha, beta";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
        }
        else if ([7, 12, 13, 14, 15, 17, 18, 21, 22].includes(momOrder)) {
            if (dadOrder === 1) return "Not risk";
            else if ([2, 8, 9, 10, 11].includes(dadOrder)) return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
            else if (dadOrder === 4) return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ beta";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ Alpha, beta";
        }

        return "No specific risk condition met";
    }

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
            {/* Father Section */}
            <Box
                sx={{
                    border: '2px solid #ccc',
                    borderRadius: 2,
                    p: 4,
                    mb: 4,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    พ่อ (Father)
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="MCV"
                            type="number"
                            variant="outlined"
                            value={mcvFather}
                            onChange={(e) => setMcvFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="MCH"
                            type="number"
                            variant="outlined"
                            value={mchFather}
                            onChange={(e) => setMchFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb A"
                            type="number"
                            variant="outlined"
                            value={hbAFather}
                            onChange={(e) => setHbAFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="OF"
                            type="number"
                            variant="outlined"
                            value={ofFather}
                            onChange={(e) => setOfFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb F"
                            type="number"
                            variant="outlined"
                            value={hbFFather}
                            onChange={(e) => setHbFFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb Cs"
                            type="number"
                            variant="outlined"
                            value={hbCsFather}
                            onChange={(e) => setHbCsFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb Bart's"
                            type="number"
                            variant="outlined"
                            value={hbBartsFather}
                            onChange={(e) => setHbBartsFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="DCIP"
                            type="number"
                            variant="outlined"
                            value={dcipFather}
                            onChange={(e) => setDcipFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb H"
                            type="number"
                            variant="outlined"
                            value={hbhFather}
                            onChange={(e) => sethbhFather(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb A2"
                            type="number"
                            variant="outlined"
                            value={a2Father}
                            onChange={(e) => seta2Father(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    {/* HbA2 and HbE Radio Group for Father */}
                    <Grid item xs={12}>
                        <RadioGroup
                            value={hbA2OptionFather}
                            onChange={(e) => setHbA2OptionFather(e.target.value)}
                        >
                            <FormControlLabel
                                value="combined"
                                control={<Radio />}
                                label="HbA2 + E"
                            />
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="HbA2 + E Value"
                                    type="number"
                                    variant="outlined"
                                    value={hbA2EFather}
                                    onFocus={() => setHbA2OptionFather('combined')} // Set radio when focused
                                    onChange={(e) => setHbA2EFather(e.target.value)}
                                    fullWidth
                                />
                            </Box>

                            <FormControlLabel
                                value="separate"
                                control={<Radio />}
                                label="Separate HbA2 and E"
                            />
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="HbA2 Value"
                                    type="number"
                                    variant="outlined"
                                    value={hbA2Father}
                                    onFocus={() => setHbA2OptionFather('separate')} // Set radio when focused
                                    onChange={(e) => setHbA2Father(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="E Value"
                                    type="number"
                                    variant="outlined"
                                    value={hbeFather}
                                    onFocus={() => setHbA2OptionFather('separate')} // Set radio when focused
                                    onChange={(e) => sethbEFather(e.target.value)}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                />
                            </Box>
                            <FormControlLabel
                                value="none"
                                control={<Radio />}
                                label="Don't have Hb E"
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Box>

            <Box
                sx={{
                    border: '2px solid #ccc',
                    borderRadius: 2,
                    p: 4,
                    mb: 4,
                }}
            >
                <Typography variant="h6" gutterBottom>
                    แม่ (Mother)
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="MCV"
                            type="number"
                            variant="outlined"
                            value={mcvMother}
                            onChange={(e) => setMcvMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="MCH"
                            type="number"
                            variant="outlined"
                            value={mchMother}
                            onChange={(e) => setMchMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb A"
                            type="number"
                            variant="outlined"
                            value={hbAMother}
                            onChange={(e) => setHbAMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="OF"
                            type="number"
                            variant="outlined"
                            value={ofMother}
                            onChange={(e) => setOfMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb F"
                            type="number"
                            variant="outlined"
                            value={hbFMother}
                            onChange={(e) => setHbFMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb Cs"
                            type="number"
                            variant="outlined"
                            value={hbCsMother}
                            onChange={(e) => setHbCsMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb Bart's"
                            type="number"
                            variant="outlined"
                            value={hbBartsMother}
                            onChange={(e) => setHbBartsMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="DCIP"
                            type="number"
                            variant="outlined"
                            value={dcipMother}
                            onChange={(e) => setDcipMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb H"
                            type="number"
                            variant="outlined"
                            value={hbhMother}
                            onChange={(e) => sethbhMother(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb A2"
                            type="number"
                            variant="outlined"
                            value={a2Mother}
                            onChange={(e) => seta2Mother(e.target.value)}
                            fullWidth
                        />
                    </Grid>

                    {/* HbA2 and HbE Radio Group for Mother */}
                    <Grid item xs={12}>
                        <RadioGroup
                            value={hbA2OptionMother}
                            onChange={(e) => setHbA2OptionMother(e.target.value)}
                        >
                            <FormControlLabel
                                value="combined"
                                control={<Radio />}
                                label="HbA2 + E"
                            />
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="HbA2 + E Value"
                                    type="number"
                                    variant="outlined"
                                    value={hbA2EMother}
                                    onFocus={() => setHbA2OptionMother('combined')} // Set radio when focused
                                    onChange={(e) => setHbA2EMother(e.target.value)}
                                    fullWidth
                                />
                            </Box>

                            <FormControlLabel
                                value="separate"
                                control={<Radio />}
                                label="Separate HbA2 and E"
                            />
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="HbA2 Value"
                                    type="number"
                                    variant="outlined"
                                    value={hbA2Mother}
                                    onFocus={() => setHbA2OptionMother('separate')} // Set radio when focused
                                    onChange={(e) => setHbA2Mother(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="E Value"
                                    type="number"
                                    variant="outlined"
                                    value={hbeMother}
                                    onFocus={() => setHbA2OptionMother('separate')} // Set radio when focused
                                    onChange={(e) => sethbEMother(e.target.value)}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                />
                            </Box>
                            <FormControlLabel
                                value="none"
                                control={<Radio />}
                                label="Don't have Hb E"
                            />
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Box>

            <Button variant="contained" onClick={handleNext}>
                Next
            </Button>
        </Container>
    );
}

export default HBTypeComponent;
