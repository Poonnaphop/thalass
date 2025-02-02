import React from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography,TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
//import Grid from '@mui/material/Grid2';

function AlphaBetaThalassemiaResultComponent() {
    const location = useLocation();
    const formData = location.state;

    const {
        momOrder, dadOrder, riskResult, momDesc, dadDesc,
        dadData,momData, wifeName,wifeSurname,husbandName,husbandSurname,
        momOrderInput,dadOrderInput,dadOrderFlag,momOrderFlag
    } = formData || {};

    console.log('formData', formData);

    return (
        <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>
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
                    backgroundBlendMode:'screen',
                    padding: '20px 40px',
    
                }}         
            
            >
                <Typography variant="h6">ผลตรวจคัดกรองมารดา</Typography>
                <Typography color='darkblue'>ชื่อมารดา: {wifeName ?? '-' + wifeSurname ?? '-'}</Typography>
                <Typography color='darkblue'># Hb typing ภรรยา: {momOrder??'-' }: {momDesc??'-'}</Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                    <Grid item xs={6}><TextField label="MCV" value={momData.mcv ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="MCH" value={momData.mch ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A" value={momData.hba ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="OF" value={momData.of ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb F" value={momData.hbF ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb Cs" value={momData.hbCs ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb Bart" value={momData.hbBart ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="DCIP" value={momData.dcip ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb H" value={momData.hbH ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="A2" value={momData.A2 ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A2 + E" value={momData.hba2PlusE ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb A2" value={momData.hbA2 ?? '-'} readOnly fullWidth /></Grid>
                    <Grid item xs={6}><TextField label="Hb E" value={momData.hbE ?? '-'} readOnly fullWidth /></Grid>
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
                    backgroundBlendMode:'screen',
                    padding: '20px 40px',
        
            
                }}
            >
                <Typography variant="h6">ผลตรวจคัดกรองสามี</Typography>
                <Typography color='darkblue' >ชื่อสามี: {husbandName ?? '-' + husbandSurname ?? '-'}</Typography>
                <Typography color='darkblue' ># Hb typing สามี: {dadOrder ?? '-'}: {dadDesc ?? '-'}</Typography>

                <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={6}><TextField label="MCV" value={dadData.mcv ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="MCH" value={dadData.mch ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="Hb A" value={dadData.hba ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="OF" value={dadData.of ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="Hb F" value={dadData.hbF ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="Hb Cs" value={dadData.hbCs ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="Hb Bart" value={dadData.hbBart ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="DCIP" value={dadData.dcip ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="Hb H" value={dadData.hbH ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="A2" value={dadData.A2 ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="Hb A2 + E" value={dadData.hba2PlusE ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="Hb A2" value={dadData.hbA2 ?? '-'} readOnly fullWidth /></Grid>
                <Grid item xs={6}><TextField label="Hb E" value={dadData.hbE ?? '-'} readOnly fullWidth /></Grid>
                </Grid>
            </Box>

            {/* Risk Assessment Section */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
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
