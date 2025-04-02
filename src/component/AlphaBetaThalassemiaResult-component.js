import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Document, Page, Text, View, StyleSheet, BlobProvider, Font } from '@react-pdf/renderer';

// Register custom font and disable word hyphenation
const registerFonts = () => {
  try {
    Font.register({
      family: 'Sarabun',
      src: '/fonts/Sarabun-Medium.ttf',
      format: 'truetype'
    });
    Font.registerHyphenationCallback((word) => [word]);
  } catch (error) {
    console.error('Error registering font:', error);
  }
};

// Call registerFonts before creating any PDF documents
registerFonts();

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    padding: 30,
    fontFamily: 'Sarabun',
    fallbackFonts: ['Helvetica'],
    fontSize: 10,
  },
  header: {
    fontSize: 14,
    marginBottom: 2,
    textAlign: 'left',
  },
  subHeader: {
    fontSize: 12,
    marginBottom: 0,
    textAlign: 'left',
  },
  dotLine: {
    borderBottomWidth: 1,
    borderBottomStyle: 'dotted',
    borderBottomColor: '#000',
    marginVertical: 2,
    flex: 1,
  },
  signatureLine: {
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: '#000',
    marginVertical: 8,
    width: '25%',
  },
  formTitle: {
    fontSize: 12,
    marginBottom: 16,
    textAlign: 'center',
    marginTop: 24,
  },
  dateContainer: {
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 16,
  },
  dateText: {
    fontSize: 10,
  },
  boxesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  box: {
    width: '31%',
    minHeight: 100,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    fontSize: 8,
  },
  boxLabel: {
    fontSize: 10,
    textAlign: 'left',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  boxText: {
    fontSize: 8,
    marginBottom: 2,
    paddingLeft: 3,
  },
  table: {
    marginTop: 16,
    marginBottom: 16,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
  },
  tableHeader: {
    backgroundColor: '#f5f5f5',
    fontSize: 10,
    padding: 4,
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    minHeight: 24,
  },
  tableCell: {
    padding: 4,
    fontSize: 10,
    flex: 1,
    borderRightStyle: 'solid',
    borderRightWidth: 1,
    borderRightColor: '#000',
    borderTopStyle: 'solid',
    borderTopWidth: 0,
    borderTopColor: '#000',
  },
  tableCellLast: {
    padding: 4,
    fontSize: 10,
    flex: 1,
    borderTopStyle: 'solid',
    borderTopWidth: 0,
    borderTopColor: '#000',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 3,
  },
  checkbox: {
    width: 8,
    height: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 4,
    backgroundColor: '#FFFFFF',
  },
  checkedBox: {
    width: 8,
    height: 8,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    marginRight: 4,
    backgroundColor: '#000',
  },
  footer: {
    marginTop: 24,
  },
  footerText: {
    fontSize: 10,
    marginBottom: 4,
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 8,
    marginTop: 16,
  },
  appointmentSection: {
    flexDirection: 'row',
    marginTop: 16,
  },
  textWrap: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    flexBasis: 0,
    padding: 2,
  },
  wrappedText: {
    display: "flex",
    flexDirection: 'column',
    width: '100%',
    flex: 1,
    marginBottom: 1,
  },
  summaryText: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    flexBasis: 0,
    fontSize: 10,
    marginBottom: 4,
    lineHeight: 1.5,
    paddingLeft: 3,
  },
});

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

// PDF Document Component
const PDFDocument = ({ formData, doctorName, appointmentDetails, remarks }) => (
  <Document onRender={() => console.log('PDF rendered successfully')}>
    <Page size="A4" style={styles.page}>
      <Text style={styles.header}>
        ศูนย์พัฒนาสูตรและเป็นเลิศการคัดกรองและวินิจฉัยก่อนคลอด
      </Text>
      <Text style={styles.subHeader}>
        โรคโลหิตจางธาลัสซีเมีย โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ
      </Text>
      <View
        style={[
          styles.wrappedText,
          { maxHeight: 1, marginTop: 4, marginBottom: 4 },
        ]}
      >
        <View style={styles.dotLine} />
      </View>

      <Text style={styles.formTitle}>
        แบบบันทึกการให้คำปรึกษาแก่คู่สมรสที่มีความเสี่ยงต่อการมีบุตรเป็นโรคธาลัสซีเมียย
      </Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateText}>
          วันที่........{formatThaiDate()}........
        </Text>
      </View>

      <View style={styles.boxesContainer}>
        <View style={styles.box}>
          <Text style={[styles.boxLabel, { textAlign: "center" }]}>ภรรยา</Text>
          <View style={styles.wrappedText}>
            <Text style={styles.boxText}>
              ชื่อ-สกุล: {formData?.wifeName || "-"}{" "}
              {formData?.wifeSurname || "-"}
            </Text>
            <Text style={styles.boxText}>
              อายุ: {formData?.wifeAge || "-"} ปี
            </Text>
            <Text style={styles.boxText}>HN: {formData?.wifeHn || "-"}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={[styles.boxLabel, { textAlign: "center" }]}>สามี</Text>
          <View style={styles.wrappedText}>
            <Text style={styles.boxText}>
              ชื่อ-สกุล: {formData?.husbandName || "-"}{" "}
              {formData?.husbandSurname || "-"}
            </Text>
            <Text style={styles.boxText}>
              อายุ: {formData?.husbandAge || "-"} ปี
            </Text>
            <Text style={styles.boxText}>HN: {formData?.husbandHn || "-"}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <Text style={[styles.boxLabel, { textAlign: "center" }]}>
            บุตร (ถ้ามี)
          </Text>
          <View style={styles.wrappedText}>
            <Text style={styles.boxText}>G: {formData?.gravid || "-"}</Text>
            <Text style={styles.boxText}>P: {formData?.para || "-"}</Text>
            <Text style={styles.boxText}>A: {formData?.abortion || "-"}</Text>
            <Text style={styles.boxText}>L: {formData?.living || "-"}</Text>
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          marginBottom: 8,
        }}
      >
        <Text style={styles.boxLabel}>การตรวจทางห้องปฏิบัติการเพิ่มเติม</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 0.2 }]}>
            <Text>ตรวจหา</Text>
          </View>
          <View style={[styles.tableCell, { flex: 0.4 }]}>
            <Text>รายการตรวจ</Text>
          </View>
          <View style={[styles.tableCell, { flex: 0.4, borderRightWidth: 0 }]}>
            <Text>ผลการตรวจ</Text>
          </View>
        </View>

        <View style={styles.tableRow}>
          <View style={[styles.tableCell, { flex: 0.2 }]}>
            <Text>ภรรยา</Text>
          </View>
          <View style={[styles.tableCell, { flex: 0.4 }]}>
            {formData?.isAlphaEnabled && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkedBox} />
                <Text>PCR for alpha</Text>
              </View>
            )}
            {!formData?.isAlphaEnabled && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text>PCR for alpha</Text>
              </View>
            )}
            {formData?.isBetaEnabled && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkedBox} />
                <Text>PCR for beta</Text>
              </View>
            )}
            {!formData?.isBetaEnabled && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text>PCR for beta</Text>
              </View>
            )}
          </View>
          <View style={[styles.tableCell, { flex: 0.4, borderRightWidth: 0 }]}>
            {formData?.isAlphaEnabled && (
              <Text>Alpha: {formData?.momPositiveAlpha || "-"}</Text>
            )}
            {formData?.isBetaEnabled && (
              <Text>Beta: {formData?.momPositiveBeta || "-"}</Text>
            )}
          </View>
        </View>

        <View style={[styles.tableRow, { borderBottomWidth: 0 }]}>
          <View style={[styles.tableCell, { flex: 0.2 }]}>
            <Text>สามี</Text>
          </View>
          <View style={[styles.tableCell, { flex: 0.4 }]}>
            {formData?.isAlphaEnabled && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkedBox} />
                <Text>PCR for alpha</Text>
              </View>
            )}
            {!formData?.isAlphaEnabled && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text>PCR for alpha</Text>
              </View>
            )}
            {formData?.isBetaEnabled && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkedBox} />
                <Text>PCR for beta</Text>
              </View>
            )}
            {!formData?.isBetaEnabled && (
              <View style={styles.checkboxContainer}>
                <View style={styles.checkbox} />
                <Text>PCR for beta</Text>
              </View>
            )}
          </View>
          <View style={[styles.tableCell, { flex: 0.4, borderRightWidth: 0 }]}>
            {formData?.isAlphaEnabled && (
              <Text>Alpha: {formData?.dadPositiveAlpha || "-"}</Text>
            )}
            {formData?.isBetaEnabled && (
              <Text>Beta: {formData?.dadPositiveBeta || "-"}</Text>
            )}
          </View>
        </View>
      </View>

      <View style={styles.wrappedText}>
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <Text style={{ width: 80 }}>สรุป</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.summaryText, { marginBottom: 8 }]}>{formData?.PCRResult || "-"}</Text>
            <View style={styles.dotLine} />
          </View>
        </View>
      </View>

      <View style={styles.wrappedText}>
        <View style={{ flexDirection: "row", marginBottom: 16 }}>
          <Text style={{ width: 80 }}>ข้อเสนอแนะ</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.summaryText, { marginBottom: 8 }]}>{formData?.PCRSugestion || "-"}</Text>
            <View style={styles.dotLine} />
          </View>
        </View>
      </View>

      <View
        style={{ flexDirection: "row", marginBottom: 4, alignItems: "center" }}
      >
        <Text>ลงนาม</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "flex-end",
            width: 100,
            marginHorizontal: 4,
            height: 20,
          }}
        >
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomStyle: "dotted",
              borderBottomColor: "#000",
              width: 100,
            }}
          />
        </View>
        <Text>แพทย์/พยาบาลผู้ให้คำปรึกษาา</Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 16, marginLeft: 40 }}>
        <Text>(</Text>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomStyle: "dotted",
            borderBottomColor: "#000",
            width: 100,
          }}
        />
        <Text>)</Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 16 }}>
        <Text>นัดหมาย</Text>
        <View
          style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.5 }]}
        />
        <Text>วันที่</Text>
        <View
          style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.3 }]}
        />
        <Text>อายุครรภ์</Text>
        <View
          style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.3 }]}
        />
        <Text>สัปดาห์</Text>
      </View>

      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <Text>หมายเหตุ</Text>
        <View style={[styles.dotLine, { marginLeft: 4 }]} />
      </View>
    </Page>
  </Document >
);

function AlphaBetaThalassemiaResultComponent() {
  const location = useLocation();
  const [doctorName, setDoctorName] = useState(' ');
  const [appointmentDetails, setAppointmentDetails] = useState(' ');
  const [remarks, setRemarks] = useState(' ');
  const formData = location.state?.formData;

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
    PCRSugestion
  } = formData || {};
  console.log(formData);

  const openPdfInNewTab = (blob) => {
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
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

      {/* Suggestion Section */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
        <Typography variant="h6">คำแนะนำ</Typography>
        <Typography>{PCRSugestion}</Typography>
      </Box>

      {/* PCRResult Section */}
      <Box sx={{ border: '1px solid #ccc', borderRadius: 2, p: 3, mb: 3, bgcolor: 'whitesmoke', }}>
        <Typography variant="h6">รายงานผลPCR</Typography>
        <Typography>{PCRResult}</Typography>
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
          <BlobProvider
            document={
              <PDFDocument
                formData={formData}
                doctorName={doctorName}
                appointmentDetails={appointmentDetails}
                remarks={remarks}
              />
            }
            onError={(error) => {
              console.error('Error generating PDF:', error);
              alert('เกิดข้อผิดพลาดในการสร้าง PDF กรุณาลองใหม่อีกครั้ง');
            }}
            options={{
              cMapUrl: 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.12.313/cmaps/',
              cMapPacked: true,
            }}
          >
            {({ blob, url, loading, error }) => {
              console.log('PDF Generation Status:', { loading, error });
              if (error) console.error('PDF Error:', error);

              return (
                <Button
                  variant="outlined"
                  color="secondary"
                  disabled={loading || error}
                  onClick={() => {
                    if (!formData) {
                      alert('ไม่พบข้อมูลสำหรับสร้าง PDF');
                      return;
                    }
                    if (error) {
                      console.error('Error in PDF generation:', error);
                      alert('เกิดข้อผิดพลาดในการสร้าง PDF กรุณาลองใหม่อีกครั้ง');
                      return;
                    }
                    if (blob) {
                      console.log('Creating PDF blob...');
                      openPdfInNewTab(blob);
                    }
                  }}
                >
                  {loading ? 'กำลังสร้าง PDF...' : error ? 'เกิดข้อผิดพลาด' : 'พิมพ์'}
                </Button>
              );
            }}
          </BlobProvider>
        </Grid>
      </Grid>
    </Container>
  )
}

export default AlphaBetaThalassemiaResultComponent