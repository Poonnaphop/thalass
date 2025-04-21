import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import logo from '../img/logo.png';
import hospitalLogo from '../img/TUHospital.jpeg';

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

// Helper function to calculate days from now
const calculateDaysFromNow = (edc) => {
  if (!edc) return 0;
  const today = new Date();
  const edcDate = new Date(edc);
  const diffTime = edcDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// Function to generate PDF document
const generatePDF = (formData, doctorName, appointmentDetails, remarks, riskResult, riskTest, week, day, gravid, para, abortion, living, edc, ga, hospitalChoice, otherHospital) => {
  // Convert images to base64
  const getBase64FromImage = (img) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onloadend = () => {
        resolve(reader.result);
      };
    });
  };

  // Load images
  Promise.all([
    fetch(logo).then(res => res.blob()),
    fetch(hospitalLogo).then(res => res.blob())
  ]).then(([logoBlob, hospitalBlob]) => {
    return Promise.all([
      getBase64FromImage(logoBlob),
      getBase64FromImage(hospitalBlob)
    ]);
  }).then(([logoData, hospitalData]) => {
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20],
      defaultStyle: {
        font: 'THSarabunNew'
      },
      content: [
        {
          columns: [
            {
              width: '70%',
              stack: [
                {
                  text: 'ศูนย์พัฒนาสูตรและเป็นเลิศการคัดกรองและวินิจฉัยก่อนคลอด',
                  style: 'header',
                  bold: true,
                  alignment: 'left'
                },
                {
                  text: 'โรคโลหิตจางธาลัสซีเมีย โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ',
                  style: 'subHeader',
                  bold: true,
                  alignment: 'left'
                }
              ]
            },
            {
              width: '15%',
              image: logoData,
              fit: [70, 70],
              alignment: 'center'
            },
            {
              width: '15%',
              image: hospitalData,
              fit: [60, 60],
              alignment: 'center'
            }
          ],
          margin: [0, 0, 0, 5]
        },
        {
          canvas: [
            {
              type: 'line',
              x1: 0, y1: 0,
              x2: 555, y2: 0,
              lineWidth: 1,
              lineColor: '#000000',
              dash: { length: 1 }
            }
          ],
          margin: [0, 5, 0, 5]
        },
        {
          text: 'แบบบันทึกการให้คำปรึกษาแก่คู่สมรสที่มีความเสี่ยงต่อการมีบุตรเป็นโรคธาลัสซีเมีย',
          style: 'formTitle',
          alignment: 'center',
          margin: [0, 0, 0, 5]
        },
        {
          text: `วันที่........${formatThaiDate()}........`,
          style: 'dateText'
        },
        {
          columns: [
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      stack: [
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
                        }
                      ]
                    }
                  ]
                ]
              },
              layout: {
                hLineWidth: function (i, node) { return 1; },
                vLineWidth: function (i, node) { return 1; },
                hLineColor: function (i, node) { return '#000000'; },
                vLineColor: function (i, node) { return '#000000'; }
              },
              margin: [0, 0, 20, 10]
            },
    
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      stack: [
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
                        }
                      ]
                    }
                  ]
                ]
              },
              layout: {
                hLineWidth: function (i, node) { return 1; },
                vLineWidth: function (i, node) { return 1; },
                hLineColor: function (i, node) { return '#000000'; },
                vLineColor: function (i, node) { return '#000000'; }
              },
              margin: [0, 0, 20, 10]
            },
            {
              table: {
                widths: ['*'],
                body: [
                  [
                    {
                      stack: [
                        {
                          text: `Gravid: ${gravid || '......'} Para: ${para || '......'} Abortion: ${abortion || '......'} Living: ${living || '......'}`,
                          style: 'boxText'
                        },
                        {
                          text: `EDC: ${edc || '......'} GA: ${week || '......'} week`,
                          style: 'boxText',
                          margin: [0, 5, 0, 5]
                        },
                        {
                          text: `ส่งมารับคำปรึกษาจาก  ${hospitalChoice === 'รพธ' ? '[x] รพธ [ ] อื่นๆ ....' : '[ ] รพธ [x] อื่นๆ ' + (otherHospital || '....')}`,
                          style: 'boxText',
                          margin: [0, 0, 0, 5]
                        }
                      ]
                    }
                  ]
                ]
              },
              layout: {
                hLineWidth: function (i, node) { return 1; },
                vLineWidth: function (i, node) { return 1; },
                hLineColor: function (i, node) { return '#000000'; },
                vLineColor: function (i, node) { return '#000000'; }
              },
              margin: [0, 0, 20, 10]
            },
          ]
        },
        {
          text: 'การตรวจทางห้องปฏิบัติการเพิ่มเติม',
          style: 'boxLabel',
          margin: [0, 20, 0, 10]
        },
        {
          table: {
            headerRows: 1,
            widths: ['20%', '40%', '40%'],
            body: [
              [
                { text: 'ตรวจหา', style: 'tableHeader' },
                { text: 'รายการตรวจ', style: 'tableHeader' },
                { text: 'ผลการตรวจ', style: 'tableHeader' }
              ],
              [
                { text: 'ภรรยา', style: 'tableCell' },
                {
                  stack: [
                    formData?.isAlphaEnabled ? { text: '[X] PCR for alpha', style: 'checkboxText' } : { text: '[ ] PCR for alpha', style: 'checkboxText' },
                    formData?.isBetaEnabled ? { text: '[X] PCR for beta', style: 'checkboxText' } : { text: '[ ] PCR for beta', style: 'checkboxText' }
                  ],
                  style: 'tableCell'
                },
                {
                  stack: [
                    formData?.isAlphaEnabled ? { text: `Alpha: ${formData?.momPositiveAlpha || '-'}`, style: 'tableCell' } : '',
                    formData?.isBetaEnabled ? { text: `Beta: ${formData?.momPositiveBeta || '-'}`, style: 'tableCell' } : ''
                  ],
                  style: 'tableCell'
                }
              ],
              [
                { text: 'สามี', style: 'tableCell' },
                {
                  stack: [
                    formData?.isAlphaEnabled ? { text: '[X] PCR for alpha', style: 'checkboxText' } : { text: '[ ] PCR for alpha', style: 'checkboxText' },
                    formData?.isBetaEnabled ? { text: '[X] PCR for beta', style: 'checkboxText' } : { text: '[ ] PCR for beta', style: 'checkboxText' }
                  ],
                  style: 'tableCell'
                },
                {
                  stack: [
                    formData?.isAlphaEnabled ? { text: `Alpha: ${formData?.dadPositiveAlpha || '-'}`, style: 'tableCell' } : '',
                    formData?.isBetaEnabled ? { text: `Beta: ${formData?.dadPositiveBeta || '-'}`, style: 'tableCell' } : ''
                  ],
                  style: 'tableCell'
                }
              ]
            ]
          },
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            {
              width: 80,
              text: 'สรุป',
              style: 'label'
            },
            {
              width: '*',
              text: riskResult || '....................',
              style: 'summaryText'
            }
          ],
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            {
              width: 80,
              text: 'ข้อเสนอแนะ',
              style: 'label'
            },
            {
              width: '*',
              text: formData?.PCRSugestion || '-',
              style: 'summaryText'
            }
          ],
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            {
              width: '*',
              text: ''
            },
            {
              width: 'auto',
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
                      width: 200,
                      text: 'แพทย์/พยาบาลผู้ให้คำปรึกษา'
                    }
                  ]
                },
                {
                  columns: [
                    {
                      width: 20,
                      text: ''
                    },
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
                  ]
                }
              ],
            }
          ],
          margin: [10, 0, 0, 20]
        },
        {
          columns: [
            {
              width: 60,
              text: 'นัดหมาย'
            },
            {
              width: 150,
              canvas: [
                {
                  type: 'line',
                  x1: 0, y1: 10,
                  x2: 150, y2: 10,
                  lineWidth: 1,
                  lineColor: '#000000',
                  dash: { length: 1 }
                }
              ],
              text: appointmentDetails || '...............................................................',
              alignment: 'center'
            },
            {
              width: 40,
              text: 'วันที่'
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
              ],
              text: formData?.edc || '',
              alignment: 'center'
            },
            {
              width: 100,
              text: `อายุครรภ์ ${week || ''} สัปดาห์ ${day || ''} วัน (อีก ${calculateDaysFromNow(edc)} วัน)`,
              alignment: 'center'
            }
          ],
          margin: [0, 0, 0, 20]
        },
        {
          columns: [
            {
              width: 60,
              text: 'หมายเหตุ'
            },
            {
              width: '*',
              canvas: [
                {
                  type: 'line',
                  x1: 0, y1: 10,
                  x2: 215, y2: 10,
                  lineWidth: 1,
                  lineColor: '#000000',
                  dash: { length: 1 }
                }
              ],
              text: `${remarks || '...............................................................................................................'}`
            }
          ]
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
          margin: [0, 24, 0, 16]
        },
        dateText: {
          fontSize: 12,
          margin: [0, 16, 0, 8]
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
        tableHeader: {
          fontSize: 12,
          bold: true,
          fillColor: '#f5f5f5',
          margin: [4, 4, 4, 4]
        },
        tableCell: {
          fontSize: 12,
          margin: [4, 4, 4, 4]
        },
        checkboxText: {
          fontSize: 12,
          margin: [0, 3, 0, 0]
        },
        label: {
          fontSize: 12,
          bold: true
        },
        summaryText: {
          fontSize: 12,
          margin: [0, 0, 0, 8]
        }
      }
    };

    pdfMake.createPdf(docDefinition).open();
  }).catch(error => {
    console.error('Error loading images:', error);
    // Fallback to PDF without images if image loading fails
    const fallbackDocDefinition = {
      pageSize: 'A4',
      pageMargins: [20, 20, 20, 20],
      defaultStyle: {
        font: 'THSarabunNew'
      },
      content: [
        {
          text: 'loading failศูนย์พัฒนาสูตรและเป็นเลิศการคัดกรองและวินิจฉัยก่อนคลอด',
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
          text: 'แบบบันทึกการให้คำปรึกษาแก่คู่สมรสที่มีความเสี่ยงต่อการมีบุตรเป็นโรคธาลัสซีเมีย',
          style: 'formTitle',
          alignment: 'center'
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
          margin: [0, 24, 0, 16]
        }
      }
    };

    pdfMake.createPdf(fallbackDocDefinition).open();
  });
};

function AlphaBetaThalassemiaResultComponent() {
  const location = useLocation();
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState('');
  const [remarks, setRemarks] = useState('');
  const formData = location.state?.formData;

  const [weekAfterAppoinment, setWeekAfterAppoinment] = useState(0);
  const [dayAfterAppoinment, setDayAfterAppoinment] = useState(0);


  const {
    riskResult,
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
    edc,
    ga,
    hospitalChoice,
    otherHospital,
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
    riskTest,
    PCRResult,
    PCRSugestion,
    week,
    day,
    additionalInfo
  } = formData || {};

  console.log('formData at AlphaBetaThalassemiaResultComponent:', formData);

  const handlePrint = () => {
    if (!formData) {
      alert('ไม่พบข้อมูลสำหรับสร้าง PDF');
      return;
    }

    generatePDF(formData, doctorName, appointmentDetails, remarks, riskResult, riskTest, week, day, gravid, para, abortion, living, edc, ga, hospitalChoice, otherHospital);
  };

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
          bgcolor: 'whitesmoke',
          backgroundBlendMode: 'screen',
          padding: '20px 40px',
        }}
      >
        <Typography variant="h6">ผลตรวจคัดกรองสามี</Typography>
        <Typography color='darkblue'>ชื่อสามี: {husbandName ?? '-' + husbandSurname ?? '-'}</Typography>

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
        {/* <Typography>{riskTest}</Typography> */}
      </Box>

      {/* Suggestion Section */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
        <Typography variant="h6">คำแนะนำ</Typography>
        <Typography>{PCRSugestion}</Typography>
      </Box>

      {/* PCRResult Section
      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
        <Typography variant="h6">รายงานผลPCR</Typography>
        <Typography>{PCRResult}</Typography>
      </Box> */}

<Box
        sx={{
          border: '1px solid #ccc',
          borderRadius: 2,
          p: 2,
          mb: 3,
          bgcolor: 'whitesmoke',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          นัดหมาย
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
          <TextField
            label="วันที่นัดหมาย"
            variant="outlined"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={(e) => setAppointmentDetails(e.target.value)}
            value={appointmentDetails}
            sx={{ minWidth: 180 }}
          />

          <Typography>อายุครรภ์</Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              // label="GA"
              variant="outlined"
              value={weekAfterAppoinment}
              sx={{ width: 60 }}
              InputProps={{ readOnly: true }}
            />
            <Typography>weeks</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <TextField
              // label="GA"
              variant="outlined"
              value={dayAfterAppoinment}
              sx={{ width: 60 }}
              InputProps={{ readOnly: true }}
            />
            <Typography>days</Typography>
          </Box>
        </Box>
      </Box>

      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
        <Typography variant="h6">ข้อมูลเพิ่มเติม</Typography>
        <TextField
          // label="Enter Remark Details"
          variant="outlined"
          fullWidth
          multiline
          readOnly
          value={additionalInfo}
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
            onClick={handlePrint}
          >
            พิมพ์
                </Button>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AlphaBetaThalassemiaResultComponent;