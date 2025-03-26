import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Font } from '@react-pdf/renderer';
import { BlobProvider } from '@react-pdf/renderer';

// Register custom font and disable word hyphenation
try {
    Font.register({
      family: 'Sarabun',
      src: '/fonts/Sarabun-Medium.ttf',
      fontStyle: 'normal',
      fontWeight: 'normal',
      subset: true,
      format: 'truetype'
    });
    
    // Disable word hyphenation
    Font.registerHyphenationCallback((word) => {
      return [word];
    });
    
    console.log('Font registered successfully');
  } catch (error) {
    console.error('Error registering font:', error);
  }
  
  // Define styles for PDF using the custom font
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
      marginBottom: 1,
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
      marginBottom: 8,
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
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={[styles.header, { marginBottom: 1 }]}>ศูนย์พัฒนาสูตรและเป็นเลิศการคัดกรองและวินิจฉัยก่อนคลอด</Text>
        <Text style={[styles.subHeader, { marginBottom: 1 }]}>โรคโลหิตจางธาลัสซีเมีย โรงพยาบาลธรรมศาสตร์เฉลิมพระเกียรติ</Text>
        <View style={[styles.dotLine, { marginTop: 1 }]} />
        
        <Text style={[styles.formTitle, { marginBottom: 8, marginTop: 8 }]}>แบบบันทึกการให้คำปรึกษาแก่คู่สมรสที่มีความเสี่ยงต่อการบุตรเป็นโรคธาลัสซีเมีย </Text>
        
        <View style={[styles.dateContainer, { marginBottom: 4 }]}>
          <Text style={styles.dateText}>วันที่........{formatThaiDate()}........</Text>
        </View>

        {/* Container for div1 and div2 in the same row */}
        <View style={{ display: 'flex', flexDirection: 'row', gap: 8, marginBottom: 8 }}>
          {/* div1: Personal Information - Vertical Layout */}
          <View style={{ flex: 0.4, display: 'flex', flexDirection: 'column', gap: 4 }}>
            <View style={[styles.box, { width: '100%', padding: 3 }]}>
              <Text style={[styles.boxLabel, { textAlign: 'center', marginBottom: 2 }]}>ภรรยา</Text>
              <View style={[styles.wrappedText, { width: '100%' }]}>
                <Text style={[styles.boxText, { marginBottom: 1 }]}>ชื่อ-สกุล: {formData?.wifeName || '-'} {formData?.wifeSurname || '-'}</Text>
                <Text style={[styles.boxText, { marginBottom: 1 }]}>อายุ: {formData?.wifeAge || '-'} ปี</Text>
                <Text style={[styles.boxText, { marginBottom: 1 }]}>HN: {formData?.wifeHn || '-'}</Text>
              </View>
            </View>

            <View style={[styles.box, { width: '100%', padding: 3 }]}>
              <Text style={[styles.boxLabel, { textAlign: 'center', marginBottom: 2 }]}>สามี</Text>
              <View style={[styles.wrappedText, { width: '100%' }]}>
                <Text style={[styles.boxText, { marginBottom: 1 }]}>ชื่อ-สกุล: {formData?.husbandName || '-'} {formData?.husbandSurname || '-'}</Text>
                <Text style={[styles.boxText, { marginBottom: 1 }]}>อายุ: {formData?.husbandAge || '-'} ปี</Text>
                <Text style={[styles.boxText, { marginBottom: 1 }]}>HN: {formData?.husbandHn || '-'}</Text>
              </View>
            </View>

            <View style={[styles.box, { width: '100%', padding: 3 }]}>
              <Text style={[styles.boxLabel, { textAlign: 'center', marginBottom: 2 }]}>ประวัติ (เพิ่มเติม)</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                <View style={[styles.wrappedText, { flex: 1 }]}>
                  <Text style={[styles.boxText, { marginBottom: 1 }]}>G: {formData?.gravid || '-'}</Text>
                  <Text style={[styles.boxText, { marginBottom: 1 }]}>P: {formData?.para || '-'}</Text>
                </View>
                <View style={[styles.wrappedText, { flex: 1 }]}>
                  <Text style={[styles.boxText, { marginBottom: 1 }]}>A: {formData?.abortion || '-'}</Text>
                  <Text style={[styles.boxText, { marginBottom: 1 }]}>L: {formData?.living || '-'}</Text>
                </View>
              </View>
            </View>
          </View>

          {/* div2: First Table */}
          <View style={{ flex: 0.6 }}>
            <View style={[styles.table, { width: '100%', marginTop: 0, marginBottom: 0 }]}>
              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>รายการตรวจ</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>ภรรยา</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>สามี</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>MCV</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.mcv || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.mcv || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>MCH</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.mch || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.mch || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>Hb A</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.hba || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.hba || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>OF</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.of || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.of || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>Hb F</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.hbF || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.hbF || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>Hb Cs</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.hbCs || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.hbCs || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>Hb Bart</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.hbBart || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.hbBart || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>DCIP</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.dcip || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.dcip || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>Hb H</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.hbH || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.hbH || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>A2</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.A2 || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.A2 || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>Hb A2 + E</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.hba2PlusE || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.hba2PlusE || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>Hb A2</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.hbA2 || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.hbA2 || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>Hb E</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>{formData?.momData?.hbE || '-'}</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>{formData?.dadData?.hbE || '-'}</Text>
                </View>
              </View>

              <View style={[styles.tableRow, { borderBottomWidth: 0, minHeight: 20 }]}>
                <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                  <Text>- Other</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, padding: 2 }]}>
                  <Text>-</Text>
                </View>
                <View style={[styles.tableCell, { flex: 0.3, borderRightWidth: 0, padding: 2 }]}>
                  <Text>-</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* div3: Rest of the content */}
        <View style={{ marginTop: 8 }}>
          <View style={{ flexDirection: 'row', marginBottom: 2 }}>
            <Text>Gravida</Text>
            <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.2 }]} />
            <Text>Para</Text>
            <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.2 }]} />
            <Text>Abortion</Text>
            <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.2 }]} />
            <Text>Living</Text>
            <View style={[styles.dotLine, { marginLeft: 4, flex: 0.2 }]} />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 2 }}>
            <Text>EDC</Text>
            <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.3 }]} />
            <Text>GA</Text>
            <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.3 }]} />
            <Text>Weeks</Text>
            <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.2 }]} />
            <Text>Days</Text>
            <View style={[styles.dotLine, { marginLeft: 4, flex: 0.2 }]} />
          </View>

          <View style={{ flexDirection: 'row', marginBottom: 4, alignItems: 'center' }}>
            <Text>ส่งมารับคำปรึกษาจากก</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
              <View style={{ width: 8, height: 8, borderWidth: 1, borderColor: '#000', marginRight: 4, borderRadius: 4 }} />
              <Text>รพธ</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 12 }}>
              <View style={{ width: 8, height: 8, borderWidth: 1, borderColor: '#000', marginRight: 4, borderRadius: 4 }} />
              <Text>ที่อื่น</Text>
            </View>
            <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.4, marginTop: 2, position: 'relative', top: 3 }]} />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'flex-start', marginBottom: 4, marginTop: 8 }}>
            <Text style={styles.boxLabel}>การตรวจทางห้องปฏิบัติการเพิ่มเติม</Text>
          </View>
          
          <View style={[styles.table, { marginTop: 0, marginBottom: 8 }]}>
            <View style={[styles.tableRow, { minHeight: 20 }]}>
              <View style={[styles.tableCell, { flex: 0.2, padding: 2 }]}>
                <Text>ตรวจหา</Text>
              </View>
              <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                <Text>รายการตรวจ</Text>
              </View>
              <View style={[styles.tableCell, { flex: 0.4, borderRightWidth: 0, padding: 2 }]}>
                <Text>ผลการตรวจ</Text>
              </View>
            </View>

            <View style={[styles.tableRow, { minHeight: 20 }]}>
              <View style={[styles.tableCell, { flex: 0.2, padding: 2 }]}>
                <Text>ภรรยา</Text>
              </View>
              <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                {formData?.isAlphaEnabled && (
                  <View style={[styles.checkboxContainer, { marginBottom: 2 }]}>
                    <View style={styles.checkedBox} />
                    <Text>PCR for alpha</Text>
                  </View>
                )}
                {!formData?.isAlphaEnabled && (
                  <View style={[styles.checkboxContainer, { marginBottom: 2 }]}>
                    <View style={styles.checkbox} />
                    <Text>PCR for alpha</Text>
                  </View>
                )}
                {formData?.isBetaEnabled && (
                  <View style={[styles.checkboxContainer, { marginBottom: 2 }]}>
                    <View style={styles.checkedBox} />
                    <Text>PCR for beta</Text>
                  </View>
                )}
                {!formData?.isBetaEnabled && (
                  <View style={[styles.checkboxContainer, { marginBottom: 2 }]}>
                    <View style={styles.checkbox} />
                    <Text>PCR for beta</Text>
                  </View>
                )}
              </View>
              <View style={[styles.tableCell, { flex: 0.4, borderRightWidth: 0, padding: 2 }]}>
                {formData?.isAlphaEnabled && (
                  <Text>Alpha: {formData?.momPositiveAlpha || '-'}</Text>
                )}
                {formData?.isBetaEnabled && (
                  <Text>Beta: {formData?.momPositiveBeta || '-'}</Text>
                )}
              </View>
            </View>

            <View style={[styles.tableRow, { borderBottomWidth: 0, minHeight: 20 }]}>
              <View style={[styles.tableCell, { flex: 0.2, padding: 2 }]}>
                <Text>สามี</Text>
              </View>
              <View style={[styles.tableCell, { flex: 0.4, padding: 2 }]}>
                {formData?.isAlphaEnabled && (
                  <View style={[styles.checkboxContainer, { marginBottom: 2 }]}>
                    <View style={styles.checkedBox} />
                    <Text>PCR for alpha</Text>
                  </View>
                )}
                {!formData?.isAlphaEnabled && (
                  <View style={[styles.checkboxContainer, { marginBottom: 2 }]}>
                    <View style={styles.checkbox} />
                    <Text>PCR for alpha</Text>
                  </View>
                )}
                {formData?.isBetaEnabled && (
                  <View style={[styles.checkboxContainer, { marginBottom: 2 }]}>
                    <View style={styles.checkedBox} />
                    <Text>PCR for beta</Text>
                  </View>
                )}
                {!formData?.isBetaEnabled && (
                  <View style={[styles.checkboxContainer, { marginBottom: 2 }]}>
                    <View style={styles.checkbox} />
                    <Text>PCR for beta</Text>
                  </View>
                )}
              </View>
              <View style={[styles.tableCell, { flex: 0.4, borderRightWidth: 0, padding: 2 }]}>
                {formData?.isAlphaEnabled && (
                  <Text>Alpha: {formData?.dadPositiveAlpha || '-'}</Text>
                )}
                {formData?.isBetaEnabled && (
                  <Text>Beta: {formData?.dadPositiveBeta || '-'}</Text>
                )}
              </View>
            </View>
          </View>
        </View>
  
        <View style={styles.wrappedText}>
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={{ width: 40 }}>สรุป</Text>
            <View style={styles.dotLine} />
          </View>
          
          <View style={{ flexDirection: 'row', marginBottom: 8 }}>
            <Text style={{ width: 80 }}>ข้อเสนอแนะ</Text>
            <View style={styles.dotLine} />
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginBottom: 2, alignItems: 'center' }}>
          <Text>ลงนาม</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', width: 100, marginHorizontal: 4, height: 16 }}>
            <View style={{ borderBottomWidth: 1, borderBottomStyle: 'dotted', borderBottomColor: '#000', width: 100 }} />
          </View>
          <Text>แพทย์/พยาบาลผู้ให้คำปรึกษาา</Text>
        </View>
  
        <View style={{ flexDirection: 'row', marginBottom: 8, marginLeft: 40 }}>
          <Text>(</Text>
          <View style={{ borderBottomWidth: 1, borderBottomStyle: 'dotted', borderBottomColor: '#000', width: 100 }} />
          <Text>)</Text>
        </View>
  
        <View style={{ flexDirection: 'row', marginBottom: 8 }}>
          <Text>นัดหมาย</Text>
          <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.5 }]} />
          <Text>วันที่</Text>
          <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.3 }]} />
          <Text>อายุครรภ์</Text>
          <View style={[styles.dotLine, { marginLeft: 4, marginRight: 8, flex: 0.3 }]} />
          <Text>สัปดาห์</Text>
        </View>
  
        <View style={{ flexDirection: 'row', marginBottom: 4 }}>
          <Text>หมายเหตุ</Text>
          <View style={[styles.dotLine, { marginLeft: 4 }]} />
        </View>
      </Page>
    </Document>
  );
  
function HBTypeResultComponent() {
    const location = useLocation();
    const [doctorName, setDoctorName] = useState('');
    const [appointmentDetails, setAppointmentDetails] = useState('');
    const [remarks, setRemarks] = useState('');
    const formData = location.state;

    const { momOrder, dadOrder, riskResult, momDesc, dadDesc, dadData, momData, wifeName, wifeSurname, husbandName, husbandSurname, PCR, suggestion } = formData || {};

    console.log('formData at HBTypeResultComponent:', formData);

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
                <Typography variant="h6">รายงานผลPCR</Typography>
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
    );
}

export default HBTypeResultComponent;
