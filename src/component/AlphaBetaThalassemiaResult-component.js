import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from "react";
import { useLocation } from "react-router-dom";


function AlphaBetaThalassemiaResultComponent() {
    const location = useLocation();
    const [doctorName, setDoctorName] = useState('');
    const formData = location.state?.formData;

    const {
        riskResult,
        wifeName,
        wifeSurname,
        husbandName,
        husbandSurname,
        momAlpha,
        momBeta,
        momPositiveAlpha,
        momPositiveBeta,
        dadAlpha,
        dadBeta,
        dadPositiveAlpha,
        dadPositiveBeta,
        isAlphaEnabled,
        isBetaEnabled,
        riskTest
    } = formData || {};

    return (
        <Container maxWidth="md" sx={{ my: 4, pb: 5 }}>
            <Typography variant="h4" gutterBottom>
                ผลการตรวจคัดกรอง HB Typing
            </Typography>

            {/* Mom Section */}
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    p: 3,
                    mb: 3,
                    gap: 2,
                    display: 'flex',
                    flexDirection: 'column',

                    // white bg
                    bgcolor: 'whitesmoke',
                    backgroundBlendMode: 'screen',
                    padding: '20px 40px',

                }}

            >
                <Typography variant="h6">ชื่อ แพทย์/พยาบาลผู้ให้คำปรึกษา</Typography>
                <TextField
                    label="ชื่อ แพทย์/พยาบาลผู้ให้คำปรึกษา"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                />
                <Typography variant="h6">ผลตรวจคัดกรองมารดา</Typography>
                <Typography color='darkblue'>ชื่อมารดา: {wifeName ?? '-' + wifeSurname ?? '-'}</Typography>

                <Grid container spacing={1} sx={{ mt: 1 }}>
                    {/* Alpha Section */}
                    {isAlphaEnabled && (
                        <>
                            <Grid item xs={6}>
                                <TextField label="mom Alpha" value={momAlpha ?? '-'} readOnly fullWidth />
                            </Grid>
                            {momAlpha && (
                                <Grid item xs={6}>
                                    <TextField label="mom positive Alpha" value={momPositiveAlpha ?? '-'} readOnly fullWidth />
                                </Grid>
                            )}
                        </>
                    )}
                </Grid>

                {/* Separate Grid for Beta Section */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {isBetaEnabled && (
                        <>
                            <Grid item xs={6}>
                                <TextField label="mom Beta" value={momBeta ?? '-'} readOnly fullWidth />
                            </Grid>
                            {momBeta && (
                                <Grid item xs={6}>
                                    <TextField label="mom positive Beta" value={momPositiveBeta ?? '-'} readOnly fullWidth />
                                </Grid>
                            )}
                        </>
                    )}
                </Grid>

            </Box>

            {/* Dad Section */}
            <Box
                sx={{
                    border: '1px solid #ccc',
                    borderRadius: 2,
                    p: 3,
                    mb: 3,
                    gap: 2,
                    display: 'flex',
                    flexDirection: 'column',

                    // white bg
                    bgcolor: 'whitesmoke',
                    backgroundBlendMode: 'screen',
                    padding: '20px 40px',


                }}
            >
                <Typography variant="h6">ผลตรวจคัดกรองสามี</Typography>
                <Typography color='darkblue' >ชื่อสามี: {husbandName ?? '-' + husbandSurname ?? '-'}</Typography>

                <Grid container spacing={1} sx={{ mt: 1 }}>
                    {/* Alpha Section */}
                    {isAlphaEnabled && (
                        <>
                            <Grid item xs={6}>
                                <TextField label="dad Alpha" value={dadAlpha ?? '-'} readOnly fullWidth />
                            </Grid>
                            {dadAlpha && (
                                <Grid item xs={6}>
                                    <TextField label="dad positive Alpha" value={dadPositiveAlpha ?? '-'} readOnly fullWidth />
                                </Grid>
                            )}
                        </>
                    )}
                </Grid>

                {/* Separate Grid for Beta Section */}
                <Grid container spacing={2} sx={{ mt: 1 }}>
                    {isBetaEnabled && (
                        <>
                            <Grid item xs={6}>
                                <TextField label="dad Beta" value={dadBeta ?? '-'} readOnly fullWidth />
                            </Grid>
                            {dadBeta && (
                                <Grid item xs={6}>
                                    <TextField label="dad positive Beta" value={dadPositiveBeta ?? '-'} readOnly fullWidth />
                                </Grid>
                            )}
                        </>
                    )}
                </Grid>
            </Box>

            {/* Risk Assessment Section */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
                <Typography variant="h6">การประเมินความเสี่ยง</Typography>
                <Typography>{riskResult}</Typography>
                <Typography>{riskTest}</Typography>
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
    )
}

export default AlphaBetaThalassemiaResultComponent