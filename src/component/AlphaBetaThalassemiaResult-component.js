import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, Grid, TextField, Button } from '@mui/material';

function AlphaBetaThalassemiaResultComponent() {
    const location = useLocation();
    const formData = location.state;

    const {
        momOrder, momDesc, dadOrder, dadDesc, riskResult, sendForTest,
        mcvFather, mchFather, hbAFather, ofFather, hbFFather, hbCsFather, hbBartsFather,
        dcipFather, hbhFather, a2Father, hbA2EFather, hbA2Father, hbeFather,
        mcvMother, mchMother, hbAMother, ofMother, hbFMother, hbCsMother, hbBartsMother,
        dcipMother, hbhMother, a2Mother, hbA2EMother, hbA2Mother, hbeMother,
    } = formData || {};

    console.log('formData', formData);

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
            <Typography variant="h4" gutterBottom>
                ผลการตรวจคัดกรอง HB Typing
            </Typography>

            {/* Mom Section */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3 }}>
                <Typography variant="h6">ผลตรวจคัดกรองมารดา</Typography>
                <Typography>ชื่อมารดา: {momDesc || '-'}</Typography>
                <Typography># Hb typing ภรรยา: {momOrder.order || '-'}</Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}><TextField label="MCV" value={mcvMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="MCH" value={mchMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A" value={hbAMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="OF" value={ofMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb F" value={hbFMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb Cs" value={hbCsMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb Bart" value={hbBartsMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="DCIP" value={dcipMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb H" value={hbhMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="A2" value={a2Mother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A2 + E" value={hbA2EMother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A2" value={hbA2Mother || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb E" value={hbeMother || '-'} readOnly fullWidth /></Grid>
                </Grid>
            </Box>

            {/* Dad Section */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3 }}>
                <Typography variant="h6">ผลตรวจคัดกรองสามี</Typography>
                <Typography>ชื่อสามี: {dadDesc || '-'}</Typography>
                <Typography># Hb typing สามี: {dadOrder.order || '-'}</Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}><TextField label="MCV" value={mcvFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="MCH" value={mchFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A" value={hbAFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="OF" value={ofFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb F" value={hbFFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb Cs" value={hbCsFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb Bart" value={hbBartsFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="DCIP" value={dcipFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb H" value={hbhFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="A2" value={a2Father || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A2 + E" value={hbA2EFather || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A2" value={hbA2Father || '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb E" value={hbeFather || '-'} readOnly fullWidth /></Grid>
                </Grid>
            </Box>

            {/* Risk Assessment Section */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3 }}>
                <Typography variant="h6">การประเมินความเสี่ยง</Typography>
                <Typography>{riskResult}</Typography>
            </Box>

            {/* Action Buttons */}
            <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Save
                    </Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" color="secondary">
                        Print
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default AlphaBetaThalassemiaResultComponent;
