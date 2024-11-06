import React, { useState } from 'react';
import { Container, Box, Grid, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';

function HBTypeComponent() {
    // Father's state
    const [mcvFather, setMcvFather] = useState('');
    const [mchFather, setMchFather] = useState('');
    const [hbAFather, setHbAFather] = useState('');
    const [hbA2Father, setHbA2Father] = useState('');
    const [ofFather, setOfFather] = useState('');
    const [hbEFather, setHbEFather] = useState('');
    const [hbFFather, setHbFFather] = useState('');
    const [hbCsFather, setHbCsFather] = useState('');
    const [hbBartsFather, setHbBartsFather] = useState('');
    const [dcipFather, setDcipFather] = useState('');
    const [hbA2OptionFather, setHbA2OptionFather] = useState('separate');
    const [hbA2InputFather, setHbA2InputFather] = useState('');
    const [hbA2EInputFather, setHbA2EInputFather] = useState('');
    const [eInputFather, setEInputFather] = useState('');
    const [hbhFather, sethbhFather] = useState('');

    // Mother's state
    const [mcvMother, setMcvMother] = useState('');
    const [mchMother, setMchMother] = useState('');
    const [hbAMother, setHbAMother] = useState('');
    const [hbA2Mother, setHbA2Mother] = useState('');
    const [ofMother, setOfMother] = useState('');
    const [hbEMother, setHbEMother] = useState('');
    const [hbFMother, setHbFMother] = useState('');
    const [hbCsMother, setHbCsMother] = useState('');
    const [hbBartsMother, setHbBartsMother] = useState('');
    const [dcipMother, setDcipMother] = useState('');
    const [hbA2OptionMother, setHbA2OptionMother] = useState('separate');
    const [hbA2InputMother, setHbA2InputMother] = useState('');
    const [hbA2EInputMother, setHbA2EInputMother] = useState('');
    const [eInputMother, setEInputMother] = useState('');
    const [hbhMother, sethbhMother] = useState('');

    function evaluateOrder(mcv, mch, a2_hb_a, of, hb_f, hb_cs, hb_bart, dcip, hba2_plus_e, hba2, hb_e, hb_h) {
        // Condition 1: A2A, Hb A2 ≤ 3.5% with MCV ≥ 80, MCH ≥ 27 (Alpha thalassemia 2)
        if (hba2 <= 3.5 && a2_hb_a !== 0 && hba2 !== 0 && mcv >= 80 && mch >= 27) {
            return 1;
        }

        // Condition 2: A2A, Hb A2 ≤ 3.5% with MCV < 80, MCH < 27 (Alpha thalassemia 1, 2)
        else if (hba2 <= 3.5 && a2_hb_a !== 0 && hba2 !== 0 && mcv < 80 && mch < 27) {
            return 2;
        }

        // Condition 3: A2A, Hb A2 3.6-8% with MCV < 80, MCH < 27 (β-thalassemia trait)
        else if (hba2 >= 3.6 && hba2 <= 8 && a2_hb_a !== 0 && hba2 !== 0 && mcv < 80 && mch < 27) {
            return 3;
        }

        // Condition 4: EA, Hb E ≥ 25% with MCV < 80, MCH < 27 and A2+E ≥ 25 (HbE trait)
        else if (hb_e >= 25 && a2_hb_a !== 0 && hb_e !== 0 && mcv < 80 && mch < 27 && hba2_plus_e >= 25) {
            return 4;
        }

        // Condition 5: EA, Hb E ≥ 25% with MCV < 80, MCH < 27 and A2+E < 25 (HbE trait with/without α-thalassemia)
        else if (hb_e >= 25 && a2_hb_a !== 0 && hb_e !== 0 && mcv < 80 && mch < 27 && hba2_plus_e < 25) {
            return 5;
        }

        // Condition 6: EE, Hb E ≥ 80%, Hb F ≤ 5% with MCV < 80, MCH < 27 (Homozygous Hb E)
        else if (hb_e >= 80 && hb_f <= 5 && hb_e !== 0 && mcv < 80 && mch < 27) {
            return 6;
        }

        // Condition 7: EE/EF, Hb E > 75%, Hb F > 5% with MCV < 80, MCH < 27
        else if (hb_e > 75 && hb_f > 5 && hb_e !== 0 && mcv < 80 && mch < 27) {
            return 7;
        }

        // Condition 8: CS A2A = Hb CS, Hb A2, Hb A with MCV < 80, MCH < 27
        else if (hb_cs !== 0 && hba2 !== 0 && a2_hb_a !== 0 && mcv < 80 && mch < 27) {
            return 8;
        }

        // Condition 9: CS A2A Bart's = Hb CS, Hb A2, Hb A, Hb Bart's with MCV < 80, MCH < 27
        else if (hb_cs !== 0 && hba2 !== 0 && a2_hb_a !== 0 && hb_bart !== 0 && mcv < 80 && mch < 27) {
            return 9;
        }

        // Condition 10: A2A H or A2A Bart's H = Hb A, Hb A2, Hb H, with/without Hb Bart's with MCV < 80, MCH < 27
        else if (a2_hb_a !== 0 && hba2 !== 0 && hb_h !== 0 && mcv < 80 && mch < 27) {
            return 10;
        }

        // Condition 11: CS A2A or CS A2A Bart’s H with MCV < 80, MCH < 27
        else if (hb_cs !== 0 && hba2 !== 0 && hb_h !== 0 && mcv < 80 && mch < 27) {
            return 11;
        }

        // Condition 12: A2F = Hb A2, Hb F with MCV < 80, MCH < 27
        else if (hba2 !== 0 && hb_f !== 0 && mcv < 80 && mch < 27) {
            return 12;
        }

        // Condition 13: EF = Hb E 40-80%, Hb F 20-60% with MCV < 80, MCH < 27
        else if (hb_e >= 40 && hb_e <= 80 && hb_f >= 20 && hb_f <= 60 && mcv < 80 && mch < 27) {
            return 13;
        }

        // Condition 14: A2FA = Hb F 10-30%, Hb A2 > 3.5% with MCV < 80, MCH < 27
        else if (hb_f >= 10 && hb_f <= 30 && hba2 > 3.5 && a2_hb_a !== 0 && mcv < 80 && mch < 27) {
            return 14;
        }

        // Condition 15: EFA = Have Hb E, Hb F, Hb A with MCV < 80, MCH < 27
        else if (hb_e !== 0 && hb_f !== 0 && a2_hb_a !== 0 && mcv < 80 && mch < 27) {
            return 15;
        }

        // Condition 16: EA Bart's = Have Hb E, Hb F, Hb A, Hb Bart's with MCV < 80, MCH < 27
        else if (hb_e > 0 && hb_f > 0 && a2_hb_a > 0 && hb_bart > 0 && mcv < 80 && mch < 27) {
            return 16;
        }

        // Condition 17: EE Bart’s or EF Bart’s = Hb E, Hb F, Hb Bart's with MCV < 80, MCH < 27
        else if (hb_e > 0 && hb_f > 0 && hb_bart > 0 && mcv < 80 && mch < 27) {
            return 17;
        }

        // Condition 18: EFA Bart's = Hb E, Hb F, Hb Bart's, Hb A with MCV < 80, MCH < 27
        else if (hb_e > 0 && hb_f > 0 && hb_bart > 0 && a2_hb_a > 0 && mcv < 80 && mch < 27) {
            return 18;
        }

        // Condition 19: CS EA Bart’s = Hb CS, Hb E, Hb A, Hb Bart's with MCV < 80, MCH < 27
        else if (hb_cs > 0 && hb_e > 0 && a2_hb_a > 0 && hb_bart > 0 && mcv < 80 && mch < 27) {
            return 19;
        }

        // Condition 20.1: CS EE Bart’s = Hb CS, Hb E, Hb F, Hb Bart's (EE) with MCV < 80, MCH < 27
        else if (hb_cs > 0 && hb_e > 0 && hb_f > 0 && hb_bart > 0 && mcv < 80 && mch < 27 && hb_e >= 80) {
            return 20.1;
        }

        // Condition 20.2: CS EF Bart’s = Hb CS, Hb E, Hb F, Hb Bart's (EF) with MCV < 80, MCH < 27
        else if (hb_cs > 0 && hb_e > 0 && hb_f > 0 && hb_bart > 0 && mcv < 80 && mch < 27 && hb_e < 80) {
            return 20.2;
        }

        // Condition 21: CS EFA Bart’s = Hb CS, Hb E, Hb F, Hb A, Hb Bart's with MCV < 80, MCH < 27
        else if (hb_cs > 0 && hb_e > 0 && hb_f > 0 && a2_hb_a > 0 && hb_bart > 0 && mcv < 80 && mch < 27) {
            return 21;
        }

        // Default case if none of the conditions match
        return -1;
    }



    // Handle Next Button click
    const handleNext = () => {
        const momData = {
            mcv: mcvMother, mch: mchMother, a2HbA: hbAMother, of: ofMother, hbF: hbFMother,
            hbCs: hbCsMother, hbBart: hbBartsMother, dcip: dcipMother, hba2PlusE: hbA2EInputMother,
            hbA2: hbA2InputMother, hbE: eInputMother, hbH: hbhMother
        };
        
        const dadData = {
            mcv: mcvFather, mch: mchFather, a2HbA: hbAFather, of: ofFather, hbF: hbFFather,
            hbCs: hbCsFather, hbBart: hbBartsFather, dcip: dcipFather, hba2PlusE: hbA2EInputFather,
            hbA2: hbA2InputFather, hbE: eInputFather, hbH: hbhFather
        };

        const riskResult = evaluateRisk(
            momData.mcv, momData.mch, momData.a2HbA, momData.of, momData.hbF, momData.hbCs,
            momData.hbBart, momData.dcip, momData.hba2PlusE, momData.hbA2, momData.hbE, momData.hbH,
            dadData.mcv, dadData.mch, dadData.a2HbA, dadData.of, dadData.hbF, dadData.hbCs,
            dadData.hbBart, dadData.dcip, dadData.hba2PlusE, dadData.hbA2, dadData.hbE, dadData.hbH
        );
    
        console.log("Risk Assessment Result:", riskResult);
    };

    function evaluateRisk(momMCV, momMCH, momA2HbA, momOF, momHbF, momHbCs, momHbBart, momDCIP, momHbA2PlusE, momHbA2, momHbE, momHbH,
        dadMCV, dadMCH, dadA2HbA, dadOF, dadHbF, dadHbCs, dadHbBart, dadDCIP, dadHbA2PlusE, dadHbA2, dadHbE, dadHbH) {

        const momOrder = evaluateOrder(momMCV, momMCH, momA2HbA, momOF, momHbF, momHbCs, momHbBart, momDCIP, momHbA2PlusE, momHbA2, momHbE, momHbH);
        const dadOrder = evaluateOrder(dadMCV, dadMCH, dadA2HbA, dadOF, dadHbF, dadHbCs, dadHbBart, dadDCIP, dadHbA2PlusE, dadHbA2, dadHbE, dadHbH);

        // Condition 1
        if (momOrder === 1 && dadOrder >= 1 && dadOrder <= 22) {
            return "Not risk";
        }
        // Condition 2
        else if ([2, 8, 9, 10, 11].includes(momOrder)) {
            if ([1, 4].includes(dadOrder)) return "Not risk";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
        }
        // Condition 3
        else if (momOrder === 3) {
            if (dadOrder === 1) return "Not risk";
            else if ([2, 8, 9, 10, 11].includes(dadOrder)) return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
            else if ([3, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18, 19, 20.1, 20.2, 21, 22].includes(dadOrder))
                return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ Alpha, beta";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ beta";
        }
        // Condition 4
        else if (momOrder === 4) {
            if ([1, 2, 4, 5, 6, 10, 11, 16, 19, 20.1].includes(dadOrder)) return "Not risk";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ beta";
        }
        // Condition 5
        else if ([5, 6, 16, 19, 20.1, 20.2].includes(momOrder)) {
            if ([1, 4].includes(dadOrder)) return "Not risk";
            else if ([3, 7, 12, 13, 14, 15, 17, 18, 20.1, 21, 22].includes(dadOrder))
                return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ Alpha, beta";
            else return "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
        }
        // Condition 6
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
                                    value={hbA2EInputFather}
                                    onFocus={() => setHbA2OptionFather('combined')} // Set radio when focused
                                    onChange={(e) => setHbA2EInputFather(e.target.value)}
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
                                    value={hbA2InputFather}
                                    onFocus={() => setHbA2OptionFather('separate')} // Set radio when focused
                                    onChange={(e) => setHbA2InputFather(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="E Value"
                                    type="number"
                                    variant="outlined"
                                    value={eInputFather}
                                    onFocus={() => setHbA2OptionFather('separate')} // Set radio when focused
                                    onChange={(e) => setEInputFather(e.target.value)}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                />
                            </Box>
                        </RadioGroup>
                    </Grid>
                </Grid>
            </Box>

            {/* Mother Section */}
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
                                    value={hbA2EInputMother}
                                    onFocus={() => setHbA2OptionMother('combined')} // Set radio when focused
                                    onChange={(e) => setHbA2EInputMother(e.target.value)}
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
                                    value={hbA2InputMother}
                                    onFocus={() => setHbA2OptionMother('separate')} // Set radio when focused
                                    onChange={(e) => setHbA2InputMother(e.target.value)}
                                    fullWidth
                                />
                                <TextField
                                    label="E Value"
                                    type="number"
                                    variant="outlined"
                                    value={eInputMother}
                                    onFocus={() => setHbA2OptionMother('separate')} // Set radio when focused
                                    onChange={(e) => setEInputMother(e.target.value)}
                                    fullWidth
                                    sx={{ mt: 2 }}
                                />
                            </Box>
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
