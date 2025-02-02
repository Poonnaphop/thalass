import { useState } from 'react';
import { TextField, Box, Container, Typography, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
//import Grid from '@mui/material/Grid2';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useNavigate } from "react-router-dom";
import 'dayjs/locale/th';

function MainComponent() {
    const navigate = useNavigate();
    const [wifeName, setWifeName] = useState('');
    const [wifeSurname, setWifeSurname] = useState('');
    const [wifeAge, setWifeAge] = useState('');
    const [wifeHn, setWifeHn] = useState('');

    const [husbandName, setHusbandName] = useState('');
    const [husbandSurname, setHusbandSurname] = useState('');
    const [husbandAge, setHusbandAge] = useState('');
    const [husbandHn, setHusbandHn] = useState('');

    const [gravid, setGravid] = useState('');
    const [para, setPara] = useState('');
    const [abortion, setAbortion] = useState('');
    const [living, setLiving] = useState('');
    const [edc, setEdc] = useState(null); // For the date picker
    const [ga, setGa] = useState('');
    const [hospitalChoice, setHospitalChoice] = useState('รพธ');
    const [otherHospital, setOtherHospital] = useState('');

    const handleNext = () => {
        console.log("Next");
        const formData = {
            wifeName,
            wifeSurname,
            wifeAge,
            wifeHn,
            husbandName,
            husbandSurname,
            husbandAge,
            husbandHn,
            gravid,
            para,
            abortion,
            living,
            edc: edc ? edc.format('DD-MM-YYYY') : null, // Format EDC as string
            ga,
            hospitalChoice,
            otherHospital,
        };
        navigate('/type-select', { state: formData });
    }

    console.log(FormData);

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs} locale="en-gb">
            <Container maxWidth="md" sx={{ mt: 4, pb: 5 }}>

                <Box
                    sx={{
                        border: '2px solid #ccc',
                        borderRadius: 2,
                        p: 4,
                        mb: 4,
                        bgcolor: 'whitesmoke', 
                        backgroundBlendMode:'screen',
                        padding: '20px 40px'
                    }}
                >
                    <Grid container spacing={4}>
                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    p: 3,
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Wife
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                    }}
                                >
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={wifeName}
                                        onChange={(e) => setWifeName(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Surname"
                                        variant="outlined"
                                        value={wifeSurname}
                                        onChange={(e) => setWifeSurname(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Age (years old)"
                                        type="number"
                                        variant="outlined"
                                        value={wifeAge}
                                        onChange={(e) => e.target.value < 0 ? setWifeAge(0) : setWifeAge(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="HN"
                                        variant="outlined"
                                        value={wifeHn}
                                        onChange={(e) => setWifeHn(e.target.value)}
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Box
                                sx={{
                                    border: '1px solid #ccc',
                                    borderRadius: 2,
                                    p: 3,
                                }}
                            >
                                <Typography variant="h6" gutterBottom>
                                    Husband
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        gap: 2,
                                    }}
                                >
                                    <TextField
                                        label="Name"
                                        variant="outlined"
                                        value={husbandName}
                                        onChange={(e) => setHusbandName(e.target.value)}
                                        fullWidth
                                    />
                                      <TextField
                                        label="Surname"
                                        variant="outlined"
                                        value={husbandSurname}
                                        onChange={(e) => setHusbandSurname(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="Age (years old)"
                                        type="number"
                                        variant="outlined"
                                        value={husbandAge}
                                        onChange={(e) => e.target.value < 0 ? setHusbandAge(0) : setHusbandAge(e.target.value)}
                                        fullWidth
                                    />
                                    <TextField
                                        label="HN"
                                        variant="outlined"
                                        value={husbandHn}
                                        onChange={(e) => setHusbandHn(e.target.value)}
                                        fullWidth
                                    />
                                </Box>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    sx={{
                        border: '2px solid #ccc',
                        borderRadius: 2,
                        p: 4,
                        mb: 4,
                        bgcolor: 'whitesmoke', 
                        backgroundBlendMode:'screen',
                        padding: '20px 40px'
                    }}
                >
                    <Typography variant="h6" gutterBottom>
                        Pregnancy Information
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Gravid"
                                variant="outlined"
                                value={gravid}
                                onChange={(e) => setGravid(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Para"
                                variant="outlined"
                                value={para}
                                onChange={(e) => setPara(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Abortion"
                                variant="outlined"
                                value={abortion}
                                onChange={(e) => setAbortion(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Living"
                                variant="outlined"
                                value={living}
                                onChange={(e) => setLiving(e.target.value)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <DatePicker
                                label="EDC"
                                value={edc}
                                onChange={(newValue) => setEdc(newValue)}
                                renderInput={(params) => <TextField {...params} fullWidth />}
                                format="DD-MM-YYYY"
                                disablePast
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                            <TextField
                                label="GA"
                                variant="outlined"
                                value={edc ? Math.floor((new Date(edc).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 1000 / 60 / 60 / 24 / 7) : ''}
                                sx={{ mr: 2 }}
                                viewOnly
                            />
                            <Typography>weeks</Typography>

                            <TextField
                                label="GA"
                                variant="outlined"
                                value={edc ? Math.floor((new Date(edc).setHours(0, 0, 0, 0) - new Date().setHours(0, 0, 0, 0)) / 1000 / 60 / 60 / 24 % 7) : ''}
                                sx={{ mr: 2 }}
                                viewOnly
                            />
                            <Typography>days</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl component="fieldset">
                                <FormLabel component="legend">Hospital</FormLabel>
                                <RadioGroup
                                    row
                                    value={hospitalChoice}
                                    onChange={(e) => setHospitalChoice(e.target.value)}
                                >
                                    <FormControlLabel value="รพธ" control={<Radio />} label="รพธ" />
                                    <FormControlLabel value="other" control={<Radio />} label="ที่อื่น" />
                                </RadioGroup>
                                {hospitalChoice === 'other' && (
                                    <TextField
                                        label="Specify Other Hospital"
                                        variant="outlined"
                                        value={otherHospital}
                                        onChange={(e) => setOtherHospital(e.target.value)}
                                        fullWidth
                                        sx={{ mt: 2 }}
                                    />
                                )}
                            </FormControl>
                        </Grid>
                    </Grid>
                </Box>

                <Button variant="contained" onClick={handleNext}>Next</Button>
            </Container>
        </LocalizationProvider>
    );
}

export default MainComponent;
