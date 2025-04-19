import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import { BlobProvider } from '@react-pdf/renderer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.pdfMake.vfs;
pdfMake.fonts = {
  THSarabunNew: {
    normal: 'THSarabunNew.ttf',
    bold: 'THSarabunNew Bold.ttf',
    italics: 'THSarabunNew.ttf',
    bolditalics: 'THSarabunNew.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf'
  }
}

// Helper function to format date in Thai
const formatThaiDate = () => {
  const months = [
    'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
    'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
  ];
  const date = new Date();
  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear() + 543; // Convert to Buddhist Era
  return `${day} ${month} พ.ศ. ${year}`;
};

const generatePDF = (formData, doctorName, appointmentDetails, remarks) => {
  const docDefinition = {
    pageSize: 'A4',
    pageMargins: [30, 30, 30, 30],
    defaultStyle: {
      font: 'THSarabunNew'
    },
    content: [
      {
        text: 'ศูนย์พัฒนาสูตรและเป็นเลิศการคัดกรองและวินิจฉัยก่อนคลอด',
        style: 'header',
        bold: true,
        alignment: 'center'
      },
      {
        text: 'โรคโลหิตจางธาลัสซีเมีย โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ',
        style: 'subHeader',
        bold: true,
        alignment: 'center'
      },
      {
        canvas: [
          {
            type: 'line',
            x1: 0, y1: 0,
            x2: 515, y2: 0,
            lineWidth: 1,
            lineColor: '#000000',
            dash: { length: 1 }
          }
        ],
        margin: [0, 10, 0, 10]
      },
      {
        text: 'แบบบันทึกการให้คำปรึกษาแก่คู่สมรสที่มีความเสี่ยงต่อการบุตรเป็นโรคธาลัสซีเมีย',
        style: 'formTitle',
        alignment: 'center'
      },
      {
        columns: [
          // Left Column
          {
            width: '45%',
            stack: [
              {
                text: `วันที่........${formatThaiDate()}........`,
                style: 'dateText'
              },
              {
                text: 'ภรรยา',
                style: 'boxLabel'
              },
              {
                text: `ชื่อ-สกุล: ${formData?.wifeName || '-'} ${formData?.wifeSurname || '-'}`,
                style: 'boxText'
              },
              {
                text: `อายุ: ${formData?.wifeAge || '-'} ปี`,
                style: 'boxText'
              },
              {
                text: `HN: ${formData?.wifeHn || '-'}`,
                style: 'boxText',
                margin: [0, 0, 0, 10]
              },
              {
                text: 'สามี',
                style: 'boxLabel'
              },
              {
                text: `ชื่อ-สกุล: ${formData?.husbandName || '-'} ${formData?.husbandSurname || '-'}`,
                style: 'boxText'
              },
              {
                text: `อายุ: ${formData?.husbandAge || '-'} ปี`,
                style: 'boxText'
              },
              {
                text: `HN: ${formData?.husbandHn || '-'}`,
                style: 'boxText',
                margin: [0, 0, 0, 10]
              },
              {
                text: 'สรุป',
                style: 'sectionTitle'
              },
              {
                text: formData?.riskResult || '-',
                style: 'normalText'
              },
              {
                text: 'ข้อเสนอแนะ',
                style: 'sectionTitle'
              },
              {
                text: formData?.suggestion?.join('\n') || '-',
                style: 'normalText'
              }
            ]
          },
          // Right Column (Table)
          {
            width: '55%',
            table: {
              headerRows: 1,
              widths: ['40%', '30%', '30%'],
              body: [
                ['รายการตรวจ', 'ภรรยา', 'สามี'],
                ['MCV', formData?.momData?.mcv || '-', formData?.dadData?.mcv || '-'],
                ['MCH', formData?.momData?.mch || '-', formData?.dadData?.mch || '-'],
                ['Hb A', formData?.momData?.hba || '-', formData?.dadData?.hba || '-'],
                ['OF', formData?.momData?.of || '-', formData?.dadData?.of || '-'],
                ['Hb F', formData?.momData?.hbF || '-', formData?.dadData?.hbF || '-'],
                ['Hb Cs', formData?.momData?.hbCs || '-', formData?.dadData?.hbCs || '-'],
                ['Hb Bart', formData?.momData?.hbBart || '-', formData?.dadData?.hbBart || '-'],
                ['DCIP', formData?.momData?.dcip || '-', formData?.dadData?.dcip || '-'],
                ['Hb H', formData?.momData?.hbH || '-', formData?.dadData?.hbH || '-'],
                ['A2', formData?.momData?.A2 || '-', formData?.dadData?.A2 || '-'],
                ['Hb A2 + E', formData?.momData?.hba2PlusE || '-', formData?.dadData?.hba2PlusE || '-'],
                ['Hb A2', formData?.momData?.hbA2 || '-', formData?.dadData?.hbA2 || '-'],
                ['Hb E', formData?.momData?.hbE || '-', formData?.dadData?.hbE || '-']
              ]
            }
          }
        ]
      },
      // Bottom section
      {
        stack: [
          {
            columns: [
              {
                width: 40,
                text: 'ลงนาม'
              },
              {
                width: 100,
                canvas: [
                  {
                    type: 'line',
                    x1: 0, y1: 10,
                    x2: 100, y2: 10,
                    lineWidth: 1,
                    lineColor: '#000000',
                    dash: { length: 1 }
                  }
                ]
              },
              {
                width: '*',
                text: 'แพทย์/พยาบาลผู้ให้คำปรึกษา'
              }
            ],
            margin: [0, 0, 0, 20]
          },
          {
            columns: [
              {
                width: 20,
                text: '('
              },
              {
                width: 100,
                text: doctorName || '',
                alignment: 'center'
              },
              {
                width: 20,
                text: ')'
              }
            ],
            margin: [40, 0, 0, 20]
          },
          {
            text: 'นัดหมาย',
            style: 'sectionTitle'
          },
          {
            text: appointmentDetails || '-',
            style: 'normalText'
          },
          {
            text: 'หมายเหตุ',
            style: 'sectionTitle'
          },
          {
            text: remarks || '-',
            style: 'normalText'
          }
        ],
        margin: [0, 20, 0, 0]
      }
    ],
    styles: {
      header: {
        fontSize: 18,
        bold: true,
        margin: [0, 0, 0, 2]
      },
      subHeader: {
        fontSize: 16,
        margin: [0, 0, 0, 0]
      },
      formTitle: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 16]
      },
      dateText: {
        fontSize: 12,
        margin: [0, 0, 0, 8]
      },
      boxLabel: {
        fontSize: 12,
        bold: true,
        margin: [0, 0, 0, 4]
      },
      boxText: {
        fontSize: 12,
        margin: [3, 0, 0, 2]
      },
      sectionTitle: {
        fontSize: 12,
        bold: true,
        margin: [0, 10, 0, 5]
      },
      normalText: {
        fontSize: 12,
        margin: [0, 0, 0, 10]
      },
      signatureLabel: {
        fontSize: 12,
        margin: [0, 20, 0, 5]
      },
      signatureText: {
        fontSize: 12,
        margin: [0, 0, 0, 5]
      },
      signatureName: {
        fontSize: 12,
        margin: [0, 0, 0, 20]
      }
    }
  };

  pdfMake.createPdf(docDefinition).open();
};

function HBTypeResultComponent() {
    const location = useLocation();
    const [doctorName, setDoctorName] = useState('');
    const [appointmentDetails, setAppointmentDetails] = useState('');
    const [remarks, setRemarks] = useState('');
    const formData = location.state;

    const { momOrder, dadOrder, riskResult, momDesc, dadDesc, dadData, momData, wifeName, wifeSurname, husbandName, husbandSurname, PCR, suggestion } = formData || {};

    console.log('formData at HBTypeResultComponent:', formData);

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
                <Typography color='darkblue'># Hb typing ภรรยา: {momOrder ?? '-'}: {momDesc ?? '-'}</Typography>

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
                    backgroundBlendMode: 'screen',
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

            {/* Suggestion Section */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
                <Typography variant="h6">คำแนะนำ</Typography>
                {suggestion.map((item, index) => (
                    <Typography key={index}>{item}</Typography>
                ))}
            </Box>

            {/* PCR Section */}
            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
                <Typography variant="h6">รายงานผล Hb typing</Typography>
                {PCR.map((item, index) => (
                    <Typography key={index}>{item}</Typography>
                ))}
            </Box>

            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
                <Typography variant="h6">นัดหมาย</Typography>
                <TextField
                    label="Enter Appointment Details"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setAppointmentDetails(e.target.value)}
                    value={appointmentDetails}
                />

            </Box>

            <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
                <Typography variant="h6">หมายเหตุ</Typography>
                <TextField
                    label="Enter Remark Details"
                    variant="outlined"
                    fullWidth
                    onChange={(e) => setRemarks(e.target.value)}
                    value={remarks}
                />

            </Box>

            {/* Action Buttons */}
            <Grid container justifyContent="space-between" spacing={2}>
                <Grid item>
                    <Button variant="contained" color="primary">
                        Save
                    </Button>
                </Grid>
                <Grid item>
                    <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => {
                            if (!formData) {
                                alert('ไม่พบข้อมูลสำหรับสร้าง PDF');
                                return;
                            }
                            generatePDF(formData, doctorName, appointmentDetails, remarks);
                        }}
                    >
                        พิมพ์
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}

export default HBTypeResultComponent;
