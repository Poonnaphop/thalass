import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Container, Box, Typography, TextField, Button } from '@mui/material';
import Grid from '@mui/material/Grid';
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

const generatePDF = (formData, doctorName, appointmentDetails,
  remarks, gravid, para, abortion, living, edc, ga, hospitalChoice,
  otherHospital, week, day, suggestion, additionalInfo) => {
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
          text: 'แบบบันทึกการให้คำปรึกษาแก่คู่สมรสที่มีความเสี่ยงต่อการบุตรเป็นโรคธาลัสซีเมีย',
          style: 'formTitle',
          alignment: 'center',
          margin: [0, 0, 0, 5]
        },
        {
          columns: [
            {
              width: '45%',
              stack: [
                {
                  text: `วันที่........${formatThaiDate()}........`,
                  style: 'dateText',
                  margin: [0, 0, 0, 5]
                },
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
                            suggestion == 'จำเป็นต้องตรวจ PCR for Alpha ทั้งคู่' ? { text: '[X] PCR for alpha', style: 'checkboxText' } : { text: '[ ] PCR for alpha', style: 'checkboxText' },
                            suggestion == 'จำเป็นต้องตรวจ PCR for Beta ทั้งคู่' || suggestion == 'จำเป็นต้องตรวจ PCR for Beta ของภรรยา' ? { text: '[X] PCR for beta', style: 'checkboxText' } : { text: '[ ] PCR for beta', style: 'checkboxText' }
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
                            suggestion == 'จำเป็นต้องตรวจ PCR for Alpha ทั้งคู่' ? { text: '[X] PCR for alpha', style: 'checkboxText' } : { text: '[ ] PCR for alpha', style: 'checkboxText' },
                            suggestion == 'จำเป็นต้องตรวจ PCR for Beta ทั้งคู่' || suggestion == 'จำเป็นต้องตรวจ PCR for Beta ของสามี' ? { text: '[X] PCR for beta', style: 'checkboxText' } : { text: '[ ] PCR for beta', style: 'checkboxText' }
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
                  margin: [0, 20, 0, 20]
                }
              ]
            },
            {
              width: '55%',
              stack: [
                {
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
                },
                {
                  table: {
                    body: [

                      [[{
                        text: 'สรุป',
                        style: 'normalText',
                        margin: [0, 5, 0, 5]
                      },
                      {
                        text: formData?.riskResult || '-',
                        style: 'normalText',
                        margin: [0, 5, 0, 5]
                      }
                      ]]
                    ]
                  },
                  layout: {
                    hLineWidth: function () { return 1; },
                    vLineWidth: function () { return 1; },
                    hLineColor: function () { return '#000000'; },
                    vLineColor: function () { return '#000000'; },
                  },
                  margin: [20, 20, 0, 10]
                },
                {
                  table: {
                    body: [

                      [[{
                        text: 'ข้อเสนอแนะ',
                        style: 'normalText',
                        margin: [0, 5, 0, 5]
                      },
                      {
                        text: formData?.suggestion?.join('\n') || '-',
                        style: 'normalText',
                        margin: [0, 5, 0, 5]
                      }
                      ]]
                    ]
                  },
                  layout: {
                    hLineWidth: function () { return 1; },
                    vLineWidth: function () { return 1; },
                    hLineColor: function () { return '#000000'; },
                    vLineColor: function () { return '#000000'; },
                  },
                  margin: [20, 20, 0, 10]
                },
                {
                  columns: [
                    {
                      margin: [40, 0, 0, 0],
                      width: 80,
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
                      width: 80,
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
              ]
            }
          ]
        },
        {
          stack: [
            {
              text: 'นัดหมาย',
              style: 'sectionTitle',
              margin: [0, 5, 0, 2]
            },
            {
              text: appointmentDetails || '-',
              style: 'normalText',
              margin: [0, 0, 0, 5]
            },
            {
              text: 'หมายเหตุ',
              style: 'sectionTitle',
              margin: [0, 5, 0, 2]
            },
            {
              text: remarks || '-',
              style: 'normalText'
            }
          ],
          margin: [0, 5, 0, 0]
        }
      ],
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        subHeader: {
          fontSize: 14,
          margin: [0, 0, 0, 0]
        },
        formTitle: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        dateText: {
          fontSize: 11,
          margin: [0, 0, 0, 5]
        },
        boxLabel: {
          fontSize: 11,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        boxText: {
          fontSize: 11,
          margin: [3, 0, 0, 2]
        },
        sectionTitle: {
          fontSize: 11,
          bold: true,
          margin: [0, 5, 0, 2]
        },
        normalText: {
          fontSize: 11,
          margin: [0, 0, 0, 5]
        },
        tableHeader: {
          fontSize: 11,
          bold: true,
          alignment: 'center'
        },
        tableCell: {
          fontSize: 11,
          margin: [3, 2, 3, 2]
        },
        checkboxText: {
          fontSize: 11,
          margin: [3, 1, 3, 1]
        }
      }
    };

    // Add PCR conditions
    if (formData?.riskResult === 'PCRSuggestion22') {
      docDefinition.content[4].columns[0].stack[14].table.body[1][1].stack[1].text = '[X] PCR for beta';
      docDefinition.content[4].columns[0].stack[14].table.body[2][1].stack[1].text = '[X] PCR for beta';
    } else if (formData?.riskResult === 'PCRSuggestion21') {
      docDefinition.content[4].columns[0].stack[14].table.body[1][1].stack[0].text = '[X] PCR for alpha';
      docDefinition.content[4].columns[0].stack[14].table.body[2][1].stack[0].text = '[X] PCR for alpha';
    } else if (formData?.riskResult === 'PCRSuggestion231') {
      docDefinition.content[4].columns[0].stack[14].table.body[1][1].stack[1].text = '[X] PCR for beta';
    } else if (formData?.riskResult === 'PCRSuggestion232') {
      docDefinition.content[4].columns[0].stack[14].table.body[2][1].stack[1].text = '[X] PCR for beta';
    }

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
          text: 'ศูนย์พัฒนาสู่ความเป็นเลิศการคัดกรองและวินิจฉัยก่อนคลอด',
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
                            suggestion == 'จำเป็นต้องตรวจ PCR for Alpha ทั้งคู่' ? { text: '[X] PCR for alpha', style: 'checkboxText' } : { text: '[ ] PCR for alpha', style: 'checkboxText' },
                            suggestion == 'จำเป็นต้องตรวจ PCR for Beta ทั้งคู่' || suggestion == 'จำเป็นต้องตรวจ PCR for Beta ของภรรยา' ? { text: '[X] PCR for beta', style: 'checkboxText' } : { text: '[ ] PCR for beta', style: 'checkboxText' }
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
                            suggestion == 'จำเป็นต้องตรวจ PCR for Alpha ทั้งคู่' ? { text: '[X] PCR for alpha', style: 'checkboxText' } : { text: '[ ] PCR for alpha', style: 'checkboxText' },
                            suggestion == 'จำเป็นต้องตรวจ PCR for Beta ทั้งคู่' || suggestion == 'จำเป็นต้องตรวจ PCR for Beta ของสามี' ? { text: '[X] PCR for beta', style: 'checkboxText' } : { text: '[ ] PCR for beta', style: 'checkboxText' }
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
                  margin: [0, 20, 0, 20]
                }
              ]
            },
            // Right Column (Table)
            {
              width: '55%',
              stack: [
                {
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
                },
                {
                  table: {
                    body: [

                      [[{
                        text: 'สรุป',
                        style: 'normalText',
                        margin: [0, 5, 0, 5]
                      },
                      {
                        text: formData?.riskResult || '-',
                        style: 'normalText',
                        margin: [0, 5, 0, 5]
                      }
                      ]]
                    ]
                  },
                  layout: {
                    hLineWidth: function () { return 1; },
                    vLineWidth: function () { return 1; },
                    hLineColor: function () { return '#000000'; },
                    vLineColor: function () { return '#000000'; },
                  },
                  margin: [20, 20, 0, 10],
                },
                {
                  table: {
                    body: [

                      [[{
                        text: 'ข้อเสนอแนะ',
                        style: 'normalText',
                        margin: [0, 5, 0, 5]
                      },
                      {
                        text: formData?.suggestion?.join('\n') || '-',
                        style: 'normalText',
                        margin: [0, 5, 0, 5]
                      }
                      ]]
                    ]
                  },
                  layout: {
                    hLineWidth: function () { return 1; },
                    vLineWidth: function () { return 1; },
                    hLineColor: function () { return '#000000'; },
                    vLineColor: function () { return '#000000'; },
                  },
                  margin: [20, 20, 0, 10]
                },
                {
                  columns: [
                    {
                      margin: [40, 0, 0, 0],
                      width: 80,
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
                      width: 80,
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
              ]
            }
          ]
        },
        // Bottom section
        {
          stack: [
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
          margin: [0, 0, 0, 0]
        },
      ],
      pageBreak: 'before',
      styles: {
        header: {
          fontSize: 16,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        subHeader: {
          fontSize: 14,
          margin: [0, 0, 0, 0]
        },
        formTitle: {
          fontSize: 12,
          bold: true,
          margin: [0, 0, 0, 5]
        },
        dateText: {
          fontSize: 11,
          margin: [0, 0, 0, 5]
        },
        boxLabel: {
          fontSize: 11,
          bold: true,
          margin: [0, 0, 0, 2]
        },
        boxText: {
          fontSize: 11,
          margin: [3, 0, 0, 2]
        },
        sectionTitle: {
          fontSize: 11,
          bold: true,
          margin: [0, 5, 0, 2]
        },
        normalText: {
          fontSize: 11,
          margin: [0, 0, 0, 5]
        },
        tableHeader: {
          fontSize: 11,
          bold: true,
          alignment: 'center'
        },
        tableCell: {
          fontSize: 11,
          margin: [3, 2, 3, 2]
        },
        checkboxText: {
          fontSize: 11,
          margin: [3, 1, 3, 1]
        }
      }
    };

    pdfMake.createPdf(fallbackDocDefinition).open();
  });
};

function HBTypeResultComponent() {
  const location = useLocation();
  const [doctorName, setDoctorName] = useState('');
  const [appointmentDetails, setAppointmentDetails] = useState('');
  const [remarks, setRemarks] = useState('');
  const formData = location.state;
  const [weekAfterAppoinment, setWeekAfterAppoinment] = useState(0);
  const [dayAfterAppoinment, setDayAfterAppoinment] = useState(0);

  useEffect(() => {
    const today = new Date();
    const appointmentDate = new Date(appointmentDetails);
    const diffTime = Math.abs(appointmentDate - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    console.log('today', today, 'appointmentDate', appointmentDate, 'diffTime', diffTime, 'diffDays', diffDays);

    const totalDay = week * 7 + day + diffDays;
    console.log('totalDay', totalDay);
    const weekAfterAppoinment = Math.floor(totalDay / 7);
    const dayAfterAppoinment = totalDay % 7;
    console.log('weekAfterAppoinment', weekAfterAppoinment, 'dayAfterAppoinment', dayAfterAppoinment);
    setWeekAfterAppoinment(weekAfterAppoinment);
    setDayAfterAppoinment(dayAfterAppoinment);
  }, [appointmentDetails]);

  const { momOrder, dadOrder, riskResult, momDesc, dadDesc, dadData, momData, wifeName, 
    wifeSurname, husbandName, husbandSurname, PCR, suggestion, gravid, para, abortion, 
    living, edc, ga, hospitalChoice, otherHospital, week, day,additionalInfo } = formData || {};

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
        <Typography variant="h6">หมายเหตุ</Typography>
        <TextField
          label="Enter Remark Details"
          variant="outlined"
          fullWidth
          onChange={(e) => setRemarks(e.target.value)}
          value={remarks}
        />

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
              generatePDF(formData, doctorName, appointmentDetails,
                remarks, gravid, para, abortion, living, edc, ga,
                hospitalChoice, otherHospital, week, day, suggestion, additionalInfo);
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
