import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
//import Grid from '@mui/material/Grid2';
import { Container, Box, Typography, TextField, Button, RadioGroup, FormControlLabel, Radio, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import descriptions from '../constant/descriptions';



function HBTypeComponent() {
    const location = useLocation();
    const navigate = useNavigate();
    const formData = location.state;

    const PCRResult1 = 'ไม่ใช่คู่เสี่ยงธาลัสซีเมียชนิดรุนแรง'
    const PCRResult21 = '2.1 มีความเสี่ยงที่จะเป็นคู่เสี่ยงธาลัสซีเมียชนิดรุนแรง Hb Bart’s hydrop fetalis '
    const PCRResult22 = '2.2 มีความเสี่ยงที่จะเป็นคู่เสี่ยงธาลัสซีเมียชนิดรุนแรง Homozygous Beta-thalassemia ชนิด β๐/ β๐ '
    const PCRResult23 = '2.3 มีความเสี่ยงที่จะเป็นคู่เสี่ยงธาลัสซีเมียชนิดรุนแรง Beta-thalassemia/Hb E ชนิด β๐/ βE '

    const PCRSuggestion22 = 'จำเป็นต้องตรวจ PCR for Beta ทั้งคู่'
    const PCRSuggestion21 = 'จำเป็นต้องตรวจ PCR for Alpha ทั้งคู่'
    const PCRSuggestion231 = 'จำเป็นต้องตรวจ PCR for Beta ของภรรยา'
    const PCRSuggestion232 = 'จำเป็นต้องตรวจ PCR for Beta ของสามี'
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
        const riskResult2 = evaluateRisk(
            momData.mcv, momData.mch, momData.hba, momData.of, momData.hbF, momData.hbCs, momData.hbBart, momData.dcip, momData.hbH, momData.A2, momData.hba2PlusE, momData.hbA2, momData.hbE,
            dadData.mcv, dadData.mch, dadData.hba, dadData.of, dadData.hbF, dadData.hbCs, dadData.hbBart, dadData.dcip, dadData.hbH, dadData.A2, dadData.hba2PlusE, dadData.hbA2, dadData.hbE
        );
        console.log("Risk Result2:", riskResult2);
        const riskResult = riskResult2.risk;
        console.log("Risk Result:", riskResult2);
        console.log("Risk:", riskResult2.risk);
        console.log("Mom Order:", riskResult2.momOrder);
        console.log("Dad Order:", riskResult2.dadOrder);

        const momOrder = riskResult2.momOrder;
        const momDesc = riskResult2.momDesc;
        const dadDesc = riskResult2.dadDesc;
        const dadOrder = riskResult2.dadOrder;
        let PCR = riskResult2.PCR;
        let suggestion = riskResult2.suggestion;


        // Prepare the new formData
        const newFormData = {
            ...formData, // Preserve existing data
            dadOrderFlag,
            momOrderFlag,
            dadOrderInput,
            momOrderInput,
            momData,
            dadData,
            riskResult,
            momOrder,
            dadOrder,
            momDesc,
            dadDesc,
            PCR,
            suggestion
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
    const [dadOrderInput, setDadOrderInput] = useState(0);
    const [dadOrderFlag, setDadOrderFlag] = useState(false);


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
    const [momOrderInput, setMomOrderInput] = useState(0);
    const [momOrderFlag, setMomOrderFlag] = useState(false);




    function evaluateOrder(mcv, mch, hb_a, of, hb_f, hb_cs, hb_bart, dcip, hb_h, A2, hba2_plus_e, hba2, hb_e) {
        var order = 0
        var desc = ""
        console.log(`evaluateOrder: mcv=${mcv}, mch=${mch}, hb_a=${hb_a}, of=${of}, hb_f=${hb_f}, hb_cs=${hb_cs}, hb_bart=${hb_bart}, dcip=${dcip}, hb_h=${hb_h}, A2=${A2}, hba2_plus_e=${hba2_plus_e}, hba2=${hba2}, hb_e=${hb_e}`);
        var incondition = []

        desc = descriptions[22];
        order = 22

        // Condition 1:
        if (A2 <= 3.5 && hb_a !== 0 && hb_e == 0 && hba2_plus_e == 0 && hb_f <= 5 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && mcv >= 80 && mch >= 27
        ) {
            incondition.push(1);
            desc = descriptions[1];
            order = 1;
        }
        // Condition 2:
        else if (A2 <= 3.5 && hb_a !== 0 && hb_e == 0 && hba2_plus_e == 0 && hb_f <= 5 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && mcv < 80 && mch < 27
        ) {
            incondition.push(2);
            desc = descriptions[2];
            order = 2;
        }
        // Condition 3:
        else if (A2 > 3.5 && A2 <= 8 && hb_a !== 0 && hb_e == 0 && hba2_plus_e == 0 && hb_f <= 5 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && 80 <= mcv <= 100 && mch < 27
        ) {
            incondition.push(3);
            desc = descriptions[3];
            order = 3;
        }
        // Condition 4:
        else if ((hb_e + hba2 >= 25 || hba2_plus_e >= 25) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_a !== 0 && hb_f <= 5 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && 80 <= mcv <= 100 && mch < 27
        ) {
            incondition.push(4);
            desc = descriptions[4];
            order = 4;
        }
        // Condition 5:
        else if ((hb_e + hba2 >= 25 || hba2_plus_e >= 25) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_a !== 0 && hb_f <= 5 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && mcv < 80 && mch < 27
        ) {
            incondition.push(5);
            desc = descriptions[5];
            order = 5;
        }
        // Condition 6:
        else if ((hb_e + hba2 >= 80 || hba2_plus_e >= 80) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_f <= 5 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && mcv < 80 && mch < 27
        ) {
            incondition.push(6);
            desc = descriptions[6];
            order = 6;
        }
        // Condition 7:
        else if ((hb_e + hba2 > 75 || hba2_plus_e > 75) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_f > 5 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && mcv < 80 && mch < 27
        ) {
            incondition.push(7);
            desc = descriptions[7];
            order = 7;
        }
        // Condition 8:
        else if (hb_cs !== 0 && A2 !== 0 && hb_a !== 0 && (hb_e == 0 || hba2_plus_e == 0) && hb_f <= 5 && hb_bart == 0 && hb_h == 0 && mcv <= 100 && mch < 27
        ) {
            incondition.push(8);
            desc = descriptions[8];
            order = 8;
        }
        // Condition 9:
        else if (hb_cs !== 0 && A2 !== 0 && hb_a !== 0 && hb_bart !== 0 && hb_e == 0 && hb_f <= 5 && hb_h == 0 && mcv < 80 && mch < 27
        ) {
            incondition.push(9);
            desc = descriptions[9];
            order = 9;
        }
        // Condition 10:
        else if (hb_h !== 0 && A2 !== 0 && hb_a !== 0 && hb_bart !== 0 && hb_e == 0 && hb_f <= 5 && hb_cs == 0 && mcv < 80 && mch < 27) {
            incondition.push(10);
            desc = descriptions[10];
            order = 10;
        }
        // Condition 11:
        else if (hb_h !== 0 && A2 !== 0 && hb_a !== 0 && hb_bart !== 0 && hb_cs !== 0 && hb_e == 0 && hb_f <= 5 && mcv < 80 && mch < 27) {
            incondition.push(11);
            desc = descriptions[11];
            order = 11;
        }
        // Condition 12:
        else if (A2 !== 0 && hb_f !== 0 && hb_a == 0 && hb_cs == 0 && hb_bart == 0 && hb_e == 0 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(12);
            desc = descriptions[12];
            order = 12;
        }
        // Condition 13:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && (hb_f >= 20 && hb_f <= 60) && hb_a == 0 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(13);
            desc = descriptions[13];
            order = 13;
        }
        // Condition 14:
        else if (A2 !== 0 && hb_a !== 0 && hb_f >= 10 && hb_f <= 30 && hb_cs == 0 && hb_bart == 0 && hb_e == 0 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(14);
            desc = descriptions[14];
            order = 14;
        }
        // Condition 15:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && hb_f !== 0 && hb_a !== 0 && hb_cs == 0 && hb_bart == 0 && hb_h == 0 && A2 == 0 && mcv < 80 && mch < 27) {
            incondition.push(15);
            desc = descriptions[15];
            order = 15;
        }
        // Condition 16:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && hb_bart !== 0 && hb_a !== 0 && hb_cs == 0 && hb_f <= 5 && hb_h == 0 && A2 == 0 && mcv < 80 && mch < 27) {
            incondition.push(16);
            desc = descriptions[16];
            order = 16;
        }
        // Condition 17:
        else if ((hb_e + hba2 > 75 || hba2_plus_e > 75) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_f > 5 && hb_bart !== 0 && hb_cs == 0 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(17);
            desc = descriptions[17];
            order = 17;
        }
        // Condition 18:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && hb_f !== 0 && hb_a !== 0 && hb_bart !== 0 && hb_cs == 0 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(18);
            desc = descriptions[18];
            order = 18;
        }
        // Condition 19:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && hb_bart !== 0 && hb_a !== 0 && hb_cs !== 0 && hb_f <= 5 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(19);
            desc = descriptions[19];
            order = 19;
        }
        // Condition 20.1:
        else if ((hb_e + hba2 >= 80 || hba2_plus_e >= 80) && (hb_e !== 0 || hba2_plus_e !== 0) && hb_f <= 5 && hb_cs !== 0 && hb_bart !== 0 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(20.1);
            desc = descriptions[20.1];
            order = 20.1;
        }
        // Condition 20.2:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && (hb_f >= 20 && hb_f <= 60) && hb_cs !== 0 && hb_bart !== 0 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(20.2);
            desc = descriptions[20.2];
            order = 20.2;
        }
        // Condition 21:
        else if (((hb_e + hba2 >= 30 && hb_e + hba2 <= 80 || 30 <= hba2_plus_e <= 80)) && hb_f !== 0 && hb_a !== 0 && hb_bart !== 0 && hb_cs !== 0 && hb_h == 0 && mcv < 80 && mch < 27) {
            incondition.push(21);
            desc = descriptions[21];
            order = 21;
        }

        console.log("incondition:", incondition);
        return { order, desc };
    }

    function evaluateRisk(momMCV, momMCH, momHbA, momOF, momHbF, momHbCs, momHbBart, momDCIP, momHbH, momA2, momHbA2PlusE, momHbA2, momHbE,
        dadMCV, dadMCH, dadHbA, dadOF, dadHbF, dadHbCs, dadHbBart, dadDCIP, dadHbH, dadA2, dadHbA2PlusE, dadHbA2, dadHbE) {

        let PCR = [];
        let suggestion = [];

        let risk = "No specific risk condition met";
        let momOrderDesc = evaluateOrder(
            parseFloat(momMCV) || 0, parseFloat(momMCH) || 0, parseFloat(momHbA) || 0, parseFloat(momOF) || 0,
            parseFloat(momHbF) || 0, parseFloat(momHbCs) || 0, parseFloat(momHbBart) || 0, parseFloat(momDCIP) || 0,
            parseFloat(momHbH) || 0, parseFloat(momA2) || 0, parseFloat(momHbA2PlusE) || 0, parseFloat(momHbA2) || 0, parseFloat(momHbE) || 0
        );

        let dadOrderDesc = evaluateOrder(
            parseFloat(dadMCV) || 0, parseFloat(dadMCH) || 0, parseFloat(dadHbA) || 0, parseFloat(dadOF) || 0,
            parseFloat(dadHbF) || 0, parseFloat(dadHbCs) || 0, parseFloat(dadHbBart) || 0, parseFloat(dadDCIP) || 0,
            parseFloat(dadHbH) || 0, parseFloat(dadA2) || 0, parseFloat(dadHbA2PlusE) || 0, parseFloat(dadHbA2) || 0, parseFloat(dadHbE) || 0
        );
        console.log("momOrderFlag:", momOrderFlag);
        if (momOrderFlag) {
            console.log("momOrderInput:", momOrderInput);
            console.log("momOrderDesc:", momOrderDesc);
            momOrderDesc = {
                order: momOrderInput,
                desc: descriptions[momOrderInput]
            };
        }
        console.log("dadOrderFlag:", dadOrderFlag);
        if (dadOrderFlag) {
            console.log("dadOrderInput:", dadOrderInput);
            console.log("dadOrderDesc:", dadOrderDesc);
            dadOrderDesc = {
                order: dadOrderInput,
                desc: descriptions[dadOrderInput]
            };
        }


        if (!momOrderDesc || !dadOrderDesc) {
            console.log('error in momOrderDesc or dadOrderDesc');
            console.warn("evaluateOrder returned undefined for mom or dad");
            return {
                risk: "No specific risk condition met",
                momOrder: null,
                dadOrder: null
            };
        }

        const { order: momOrder, desc: momDesc } = momOrderDesc;
        const { order: dadOrder, desc: dadDesc } = dadOrderDesc;

        console.log("momOrder:", momOrder, "momDesc:", momDesc);
        console.log("dadOrder:", dadOrder, "dadDesc:", dadDesc);

        console.log("......")

        if (momOrder == 1 && dadOrder >= 1 && dadOrder <= 22) {
            risk = "Not risk";
            PCR.push(PCRResult1);
        } else if ([2, 8, 9, 10, 11].includes(parseInt(momOrder))) {
            if ([1, 4].includes(parseInt(dadOrder))) {
                risk = "Not risk";
                PCR.push(PCRResult1);
            } else {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
                PCR.push(PCRResult22);
                suggestion.push(PCRSuggestion21)
            }
        } else if (momOrder == 3) {
            if (dadOrder == 1) { risk = "Not risk"; PCR.push(PCRResult1); }
            else if ([2, 8, 9, 10, 11].includes(parseInt(dadOrder))) {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
                PCR.push(PCRResult22);
                suggestion.push(PCRSuggestion21)
            }
            else if ([3, 5, 6, 7, 12, 13, 14, 15, 16, 17, 18, 19, 20.1, 20.2, 21, 22].includes(parseInt(dadOrder))) {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ Alpha, beta";
                PCR.push(PCRResult21);
                PCR.push(PCRResult22);
                suggestion.push(PCRSuggestion21);
                suggestion.push(PCRSuggestion22);
            }

            else {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: สามีควรส่งตรวจ beta";
                PCR.push(PCRResult23);
                suggestion.push(PCRSuggestion232);
            }
        } else if (momOrder == 4) {
            if ([1, 2, 4, 5, 6, 10, 11, 16, 19, 20.1].includes(parseInt(dadOrder))) {
                risk = "Not risk";
                PCR.push(PCRResult1);
            } else {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: สามีควรส่งตรวจ beta";
                PCR.push(PCRResult23);
                suggestion.push(PCRSuggestion232);
            }
        } else if ([5, 6, 16, 19, 20.1, 20.2].includes(parseInt(momOrder))) {
            if ([1, 4].includes(parseInt(dadOrder))) {
                risk = "Not risk";
                PCR.push(PCRResult1);
            }
            else if ([3, 7, 12, 13, 14, 15, 17, 18, 20.1, 21, 22].includes(parseInt(dadOrder))) {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ Alpha, beta";
                PCR.push(PCRResult21);
                PCR.push(PCRResult22);
                suggestion.push(PCRSuggestion21);
                suggestion.push(PCRSuggestion22);
            }
            else {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
                PCR.push(PCRResult22);
                suggestion.push(PCRSuggestion21);
            }
        } else if ([7, 12, 13, 14, 15, 17, 18, 21, 22].includes(parseInt(momOrder))) {
            if (dadOrder == 1) {
                risk = "Not risk";
                PCR.push(PCRResult1);
            }
            else if ([2, 8, 9, 10, 11].includes(parseInt(dadOrder))) {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ alpha";
                PCR.push(PCRResult22);
                suggestion.push(PCRSuggestion21);
            }
            else if (dadOrder == 4) {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: ภรรยาควรส่งตรวจ beta";
                PCR.push(PCRResult23);
                suggestion.push(PCRSuggestion231);
            }
            else {
                risk = "-มีความเสี่ยงต้องส่งเลือดตรวจวิเคราะห์ระดับ DNA\nส่งตรวจ: คู่สมรสควรตรวจ Alpha, beta";
                PCR.push(PCRResult21);
                PCR.push(PCRResult22);
                suggestion.push(PCRSuggestion21);
                suggestion.push(PCRSuggestion22);
            }
        }
        console.log(
            'risk', risk,
            'momOrder', momOrder,
            'dadOrder', dadOrder,
            'momDesc', momDesc,
            'dadDesc', dadDesc,
            'PCR', PCR,
            'suggestion', suggestion
        );
        return { risk, momOrder, dadOrder, momDesc, dadDesc, PCR, suggestion };
    }


    return (
        <Container maxWidth="md" sx={{ my: 4, pb: 5 }}>
            {/* Mother Section */}
            <Box
                sx={{
                    border: '2px solid #ccc',
                    borderRadius: 2,
                    p: 4,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',

                    // white bg
                    bgcolor: 'whitesmoke',
                    backgroundBlendMode: 'screen',
                    padding: '20px 40px',

                }}
            >
                <Typography variant="h6" gutterBottom>
                    แม่ (Mother)
                </Typography>
                <Grid item xs={12} sm={6} p={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={momOrderFlag}
                                onChange={(e) => setMomOrderFlag(e.target.checked)}
                            />
                        }
                        label="know Mom Order"
                    />
                    <FormControl style={{ display: momOrderFlag ? '' : 'none', minWidth: '50%' }}>
                        <InputLabel id="mom-order-select-label">Order</InputLabel>
                        <Select
                            labelId="mom-order-select-label"
                            value={momOrderInput}
                            onChange={(e) => setMomOrderInput(e.target.value)}
                            label="Order"
                            fullWidth
                        >
                            {descriptions && Object.keys(descriptions).length > 0 ? (
                                Object.entries(descriptions)
                                    .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                    .map(([key, description]) => (
                                        <MenuItem key={key} value={key} style={{ display: 'block' }}>
                                            <span>
                                                {`${key}: ${description}`}
                                            </span>

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
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="MCV"
                            type="number"
                            variant="outlined"
                            value={mcvMother}
                            onChange={(e) => setMcvMother(e.target.value)}
                            disabled={momOrderFlag}
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
                            disabled={momOrderFlag}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="mom-DCIP-label">DCIP</InputLabel>
                            <Select
                                labelId="mom-DCIP-label"
                                value={dcipMother}
                                onChange={(e) => setDcipMother(e.target.value)}
                                label="DCIP"
                                disabled={momOrderFlag}
                                fullWidth
                            >
                                <MenuItem value="positive">Positive</MenuItem>
                                <MenuItem value="negative">Negative</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="mom-OF-label">OF</InputLabel>
                            <Select
                                labelId="mom-OF-label"
                                value={ofMother}
                                onChange={(e) => setOfMother(e.target.value)}
                                label="OF"
                                disabled={momOrderFlag}
                                fullWidth
                            >
                                <MenuItem value="positive">Positive</MenuItem>
                                <MenuItem value="negative">Negative</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb A"
                            type="number"
                            variant="outlined"
                            value={hbAMother}
                            onChange={(e) => setHbAMother(e.target.value)}
                            disabled={momOrderFlag}
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
                            disabled={momOrderFlag}
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
                            disabled={momOrderFlag}
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
                            disabled={momOrderFlag}
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
                            disabled={momOrderFlag}
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
                            disabled={momOrderFlag}
                            fullWidth
                        />
                    </Grid>
                    

                    <Typography variant="h7" gutterBottom sx={{ mt: 2, ml: 2 }}>
                        HbE
                    </Typography>
                    {/* HbA2 and HbE Radio Group for Mother */}
                    <Box
                        sx={{
                            border: '2px solid #ccc',
                            borderRadius: 2,
                            p: 4,
                            mb: 4,
                            ml: 2,
                            width: '100%',
                        }}
                    >
                        <RadioGroup
                            value={hbA2OptionMother}
                            onChange={(e) => setHbA2OptionMother(e.target.value)}
                            disabled={momOrderFlag}
                        >
                            <FormControlLabel
                                value="combined"
                                control={<Radio />}
                                label="HbA2 + E"
                                disabled={momOrderFlag}
                            />
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="HbA2 + E Value"
                                    type="number"
                                    variant="outlined"
                                    value={hbA2EMother}
                                    onFocus={() => setHbA2OptionMother('combined')} // Set radio when focused
                                    onChange={(e) => setHbA2EMother(e.target.value)}
                                    disabled={momOrderFlag}
                                    fullWidth
                                />
                            </Box>

                            <FormControlLabel
                                value="separate"
                                control={<Radio />}
                                label="Separate HbA2 and E"
                                disabled={momOrderFlag}
                            />
                            <Box sx={{ mt: 2 }}>
                                <TextField
                                    label="HbA2 Value"
                                    type="number"
                                    variant="outlined"
                                    value={hbA2Mother}
                                    onFocus={() => setHbA2OptionMother('separate')} // Set radio when focused
                                    onChange={(e) => setHbA2Mother(e.target.value)}
                                    disabled={momOrderFlag}
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
                                    disabled={momOrderFlag}
                                    sx={{ mt: 2 }}
                                />
                            </Box>
                            <FormControlLabel
                                value="none"
                                control={<Radio />}
                                label="Don't have Hb E"
                                disabled={momOrderFlag}
                            />
                        </RadioGroup>
                    </Box>
                </Grid>
            </Box>

            {/* Father Section */}
            <Box
                sx={{
                    border: '2px solid #ccc',
                    borderRadius: 2,
                    p: 4,
                    mb: 4,
                    display: 'flex',
                    flexDirection: 'column',

                    // white bg
                    bgcolor: 'whitesmoke',
                    backgroundBlendMode: 'screen',
                    padding: '20px 40px',
                }}
            >
                <Typography variant="h6" gutterBottom>
                    พ่อ (Father)
                </Typography>
                <Grid item xs={12} sm={6} p={1}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={dadOrderFlag}
                                onChange={(e) => setDadOrderFlag(e.target.checked)}
                            />
                        }
                        label="know Dad Order"
                    />
                    <FormControl style={{ display: dadOrderFlag ? '' : 'none', minWidth: '50%' }}>
                        <InputLabel id="dad-order-select-label">Order</InputLabel>
                        <Select
                            labelId="dad-order-select-label"
                            value={dadOrderInput}
                            onChange={(e) => setDadOrderInput(e.target.value)}
                            label="Order"
                            fullWidth
                        >
                            {descriptions && Object.keys(descriptions).length > 0 ? (
                                Object.entries(descriptions)
                                    .sort(([keyA], [keyB]) => parseFloat(keyA) - parseFloat(keyB)) // Sort by numeric key
                                    .map(([key, description]) => (
                                        <MenuItem key={key} value={key} style={{ display: 'block' }}>
                                            <span>
                                                {`${key}: ${description}`}
                                            </span>

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
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="MCV"
                            type="number"
                            variant="outlined"
                            value={mcvFather}
                            onChange={(e) => setMcvFather(e.target.value)}
                            disabled={dadOrderFlag}
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
                            disabled={dadOrderFlag}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="dad-DCIP-label">DCIP</InputLabel>
                            <Select
                                labelId="dad-DCIP-label"
                                value={dcipFather}
                                onChange={(e) => setDcipFather(e.target.value)}
                                label="DCIP"
                                disabled={dadOrderFlag}
                                fullWidth
                            >
                                <MenuItem value="positive">Positive</MenuItem>
                                <MenuItem value="negative">Negative</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth>
                            <InputLabel id="dad-OF-label">OF</InputLabel>
                            <Select
                                labelId="dad-OF-label"
                                value={ofFather}
                                onChange={(e) => setOfFather(e.target.value)}
                                label="OF"
                                disabled={dadOrderFlag}
                                fullWidth
                            >
                                <MenuItem value="positive">Positive</MenuItem>
                                <MenuItem value="negative">Negative</MenuItem>
                                <MenuItem value="unknown">Unknown</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Hb A2"
                            type="number"
                            variant="outlined"
                            value={a2Father}
                            onChange={(e) => seta2Father(e.target.value)}
                            disabled={dadOrderFlag}
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
                            disabled={dadOrderFlag}
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
                            disabled={dadOrderFlag}
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
                            disabled={dadOrderFlag}
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
                            disabled={dadOrderFlag}
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
                            disabled={dadOrderFlag}
                            fullWidth
                        />
                    </Grid>

                    <Typography variant="h7" gutterBottom sx={{ mt: 2, ml: 2 }}>
                        HbE
                    </Typography>
                    <Box
                        sx={{
                            border: '2px solid #ccc',
                            borderRadius: 2,
                            p: 4,
                            mb: 4,
                            ml: 2,
                            width: '100%',
                        }}
                    >

                        {/* HbA2 and HbE Radio Group for Father */}
                        <Grid item xs={12}>
                            <RadioGroup
                                value={hbA2OptionFather}
                                onChange={(e) => setHbA2OptionFather(e.target.value)}
                                disabled={dadOrderFlag}
                            >
                                <FormControlLabel
                                    value="combined"
                                    control={<Radio />}
                                    label="HbA2 + E"
                                    disabled={dadOrderFlag}
                                />
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        label="HbA2 + E Value"
                                        type="number"
                                        variant="outlined"
                                        value={hbA2EFather}
                                        onFocus={() => setHbA2OptionFather('combined')} // Set radio when focused
                                        onChange={(e) => setHbA2EFather(e.target.value)}
                                        disabled={dadOrderFlag}
                                        fullWidth
                                    />
                                </Box>

                                <FormControlLabel
                                    value="separate"
                                    control={<Radio />}
                                    label="Separate HbA2 and E"
                                    disabled={dadOrderFlag}
                                />
                                <Box sx={{ mt: 2 }}>
                                    <TextField
                                        label="HbA2 Value"
                                        type="number"
                                        variant="outlined"
                                        value={hbA2Father}
                                        onFocus={() => setHbA2OptionFather('separate')} // Set radio when focused
                                        onChange={(e) => setHbA2Father(e.target.value)}
                                        disabled={dadOrderFlag}
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
                                        disabled={dadOrderFlag}
                                        sx={{ mt: 2 }}
                                    />
                                </Box>
                                <FormControlLabel
                                    value="none"
                                    control={<Radio />}
                                    label="Don't have Hb E"
                                    disabled={dadOrderFlag}
                                />
                            </RadioGroup>
                        </Grid>
                    </Box>
                </Grid>
            </Box>


            <Button variant="contained" onClick={handleNext}>
                Next
            </Button>
        </Container>
    );
}
export default HBTypeComponent
