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

            <Button variant="contained">Next</Button>
        </Container>
    );
}

export default HBTypeComponent;
