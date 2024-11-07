import React, { useState } from 'react';
import { Container, Box, Grid, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HBTypeComponent() {
    const navigate = useNavigate();

    // Father's state
    const [mcvFather, setMcvFather] = useState('');
    const [mchFather, setMchFather] = useState('');
    const [hbAFather, setHbAFather] = useState('');
    const [ofFather, setOfFather] = useState('');
    const [hbFFather, setHbFFather] = useState('');
    const [hbCsFather, setHbCsFather] = useState('');
    const [hbBartsFather, setHbBartsFather] = useState('');
    const [dcipFather, setDcipFather] = useState('');
    const [hba2Father, sethba2Father] = useState('');
    const [hbA2OptionFather, setHbA2OptionFather] = useState('separate');
    const [hbA2InputFather, setHbA2InputFather] = useState('');
    const [hbA2EInputFather, setHbA2EInputFather] = useState('');
    const [eInputFather, setEInputFather] = useState('');
    const [hbhFather, sethbhFather] = useState('');

    // Mother's state
    const [mcvMother, setMcvMother] = useState('');
    const [mchMother, setMchMother] = useState('');
    const [hbAMother, setHbAMother] = useState('');
    const [ofMother, setOfMother] = useState('');
    const [hbFMother, setHbFMother] = useState('');
    const [hbCsMother, setHbCsMother] = useState('');
    const [hbBartsMother, setHbBartsMother] = useState('');
    const [dcipMother, setDcipMother] = useState('');
    const [hba2Mother, sethba2Mother] = useState('');
    const [hbA2OptionMother, setHbA2OptionMother] = useState('separate');
    const [hbA2InputMother, setHbA2InputMother] = useState('');
    const [hbA2EInputMother, setHbA2EInputMother] = useState('');
    const [eInputMother, setEInputMother] = useState('');
    const [hbhMother, sethbhMother] = useState('');

    function evaluateOrder( mcv, mch, hb_a, of, hb_f, hb_cs, hb_bart, dcip,hb_h,A2, hba2_plus_e, hba2, hb_e) {
        var order = 0
        var desc = ""

        //condition 1:
        if(mcv >= 80 && mch >= 27 && A2 <= 3.5 && hb_a!==0){
            desc = "A2A ,Hb A2<=3.5"
            order =  1
        }
        //considtion 2:
        if(mcv < 80 && mch < 27 && A2 <= 3.5 && hb_a!==0){
            desc = "A2A ,Hb A2<=3.5"
            order =  2
        }
        //condition 3:
        if(mcv < 80 && mch < 27 && 3.6 <= A2 <= 8  && hb_a!==0){
            desc = "A2A ,Hb A2 3.6-8"
            order =  3
        }
        //condition 4:
        if(mcv < 80 && mch < 27 && hb_e+hba2 >= 25 && hba2_plus_e >= 25 && hb_e !== 0 && hb_a!==0){
            console.log("EA ,Hb E >=25")
            order = 4
        }
        //condition 5:
        if(mcv < 80 && mch < 27 && hb_e+hba2 < 25 && hba2_plus_e < 25 && hb_e !== 0 && hb_a!==0){
            desc = "EA , Hb E < 25"
            order = 5
        }
        //condition 6:
        if(mcv < 80 && mch < 27 && (hb_e+hba2 >= 80 || hba2_plus_e >= 80) && hb_e !== 0 && hb_f<=5){
            desc = "EE, Hb E >=80% , HB F <=5"
            order = 6
        }
        //condition 7:
        if(mcv < 80 && mch < 27 && (hb_e+hba2 > 75 || hba2_plus_e > 75) && hb_e !== 0 && hb_f>5){
            desc = "EE/EF, Hb E >75 , Hb F >5"
            order = 7
        }
        //condition 8:
        if(mcv < 80 && mch < 27 && hb_cs !==0 && A2!==0 && hb_a!==0){
            desc = "CS A2A"
            order = 8
        }
        //condition 9:
        if(mcv < 80 && mch < 27 && hb_cs !==0 && A2!==0 && hb_a!==0 && hb_bart!==0){
            desc = "CS A2A Bart's"
            order = 9
        }
        //condition 10:
        if(mcv < 80 && mch < 27 && hb_h !==0 && A2!==0 && hb_a!==0 && hb_bart!==0){
            desc = "A2A H / A2A Bart's H"
            order = 10
        }
        //condition 11:
        if(mcv < 80 && mch < 27 && hb_h !==0 && A2!==0 && hb_a!==0 && hb_bart!==0 && hb_cs!==0){
            desc = 'CS A2A / CS A2A Bart\'s H'
            order = 11
        }
        //condition 12:
        if(mcv < 80 && mch < 27 && A2!==0 && hb_f!==0){
            desc = "A2F"
            order = 12
        }
        //condition 13:
        if(mcv < 80 && mch < 27 && (30<=hb_e+hba2<=80 || 30<=hba2_plus_e<=80) && 20<=hb_f<=60) {
            desc= 'EF Hb E 40-80 , Hb F 20-60'
            order = 13
        }
        //condition 14:
        if(mcv < 80 && mch < 27 && A2!==0 && hb_a!==0 && 10<=hb_f<=30){ 
            desc= 'A2FA Hb F 10-30'
            order = 14
        }
        //condition 15:
        if(mcv < 80 && mch < 27 && (30<=hb_e+hba2<=80 || 30<=hba2_plus_e<=80) && 20<=hb_f<=60 && hb_a!==0){ 
            desc = "EFA"
            order = 15
        }
        //condition 16:
        if(mcv < 80 && mch < 27 && (30<=hb_e+hba2<=80 || 30<=hba2_plus_e<=80) && hb_bart!==0 && hb_a!==0){
            desc = "EA Bart's"
            order = 16
        }
        //condition 17:
        if(mcv < 80 && mch < 27 && (hb_e+hba2 > 75 || hba2_plus_e > 75) && hb_e !== 0 && hb_f>5 && hb_bart!==0){
            desc = "EE/EF Bart's"
            order = 17
        }
        //condition 18:
        if(mcv < 80 && mch < 27 && (30<=hb_e+hba2<=80 || 30<=hba2_plus_e<=80) && 20<=hb_f<=60 && hb_a!==0 && hb_bart!==0){
            desc = "EFA Bart's"
            order = 18
        } 
        //condition 19:
        if(mcv < 80 && mch < 27 && (30<=hb_e+hba2<=80 || 30<=hba2_plus_e<=80) && hb_bart!==0 && hb_a!==0 && hb_cs!==0){
            desc = "CS EA Bart's"
            order = 19
        }
        //condition 20.1:
        if(mcv < 80 && mch < 27 && (hb_e+hba2 >= 80 || hba2_plus_e >= 80) && hb_e !== 0 && hb_f<=5&&hb_cs!==0 && hb_bart!==0){
            desc = "CS EE Bart's"
            order = 20.1
        }//condition 20.2:
        if(mcv < 80 && mch < 27 && (30<=hb_e+hba2<=80 || 30<=hba2_plus_e<=80) && 20<=hb_f<=60&&hb_cs!==0 && hb_bart!==0){ 
            desc = "CS EF Bart's"
            order = 20.2
        }
        //condition 21:
        if(mcv < 80 && mch < 27 && (30<=hb_e+hba2<=80 || 30<=hba2_plus_e<=80) && 20<=hb_f<=60 && hb_a!==0 && hb_bart!==0 && hb_cs!==0){
            desc = "CS EFA Bart's"
            order = 21
        }else{
            desc = "rare abnormal Hb"
            order = 22
        }
        return { order, desc };
    }



    // Handle Next Button click
    const handleNext = () => {
        const momData = {
            mcv: mcvMother, mch: mchMother, a2HbA: hbAMother, of: ofMother, hbF: hbFMother,
            hbCs: hbCsMother, hbBart: hbBartsMother, dcip: dcipMother, hba2PlusE: hbA2EInputMother,
            hbA2: hbA2InputMother, hbE: eInputMother, hbH: hbhMother
        };
        console.log("momData:", momData);
        
        const dadData = {
            mcv: mcvFather, mch: mchFather, a2HbA: hbAFather, of: ofFather, hbF: hbFFather,
            hbCs: hbCsFather, hbBart: hbBartsFather, dcip: dcipFather, hba2PlusE: hbA2EInputFather,
            hbA2: hbA2InputFather, hbE: eInputFather, hbH: hbhFather
        };
        console.log("dadData:", dadData);

        const riskResult = evaluateRisk(
            momData.mcv, momData.mch, momData.a2HbA, momData.of, momData.hbF, momData.hbCs,
            momData.hbBart, momData.dcip, momData.hba2PlusE, momData.hbA2, momData.hbE, momData.hbH,
            dadData.mcv, dadData.mch, dadData.a2HbA, dadData.of, dadData.hbF, dadData.hbCs,
            dadData.hbBart, dadData.dcip, dadData.hba2PlusE, dadData.hbA2, dadData.hbE, dadData.hbH
        );
    
        console.log("Risk Assessment Result:", riskResult);
        //navigate('/main');
    };

    function evaluateRisk(momMCV, momMCH, momA2HbA, momOF, momHbF, momHbCs, momHbBart, momDCIP, momHbA2PlusE, momHbA2, momHbE, momHbH,
        dadMCV, dadMCH, dadA2HbA, dadOF, dadHbF, dadHbCs, dadHbBart, dadDCIP, dadHbA2PlusE, dadHbA2, dadHbE, dadHbH) {
    
        const momOrderDesc = evaluateOrder(momMCV, momMCH, momA2HbA, momOF, momHbF, momHbCs, momHbBart, momDCIP, momHbA2PlusE, momHbA2, momHbE, momHbH);
        const dadOrderDesc = evaluateOrder(dadMCV, dadMCH, dadA2HbA, dadOF, dadHbF, dadHbCs, dadHbBart, dadDCIP, dadHbA2PlusE, dadHbA2, dadHbE, dadHbH);
    
        console.log("momOrderDesc:", momOrderDesc);
        console.log("dadOrderDesc:", dadOrderDesc);
    
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
                            value={hba2Father}
                            onChange={(e) => sethba2Father(e.target.value)}
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
                            value={hba2Mother}
                            onChange={(e) => sethba2Mother(e.target.value)}
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
                        <FormControlLabel
                                value="none"
                                control={<Radio />}
                                label="Don't have Hb E"
                            />
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
