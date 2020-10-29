import React from 'react'
import { Card, Divider, Row, Typography, Button, Col, Modal, } from 'antd';
import styled from 'styled-components';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import {
  Printer,
  Download,
  Phone,
  Mail,
  MapPin
} from 'react-feather';

const Text = Typography.Text

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const StudentFormPage = (props) =>{

const savePDF =()=> {
    const printArea = document.getElementById("formStaff");
    html2canvas(printArea, {useCORS:true}).then(canvas => {
      let img = new Image();
      img.src = canvas.toDataURL('image/png');
      img.onload = function () {
        let pdf = new jsPDF("portrait", 'mm', 'a4');
        console.log(img)
        pdf.addImage(img, 10, 0, 190, 200);
        pdf.save('formStaff.pdf');
      }
    })

}

const printPDF =()=> {
  const printArea = document.getElementById("formStaff");
  html2canvas(printArea, {useCORS:true}).then(canvas => {
    let img = new Image();
    img.src = canvas.toDataURL('image/png');
    img.onload = function () {
      let pdf = new jsPDF();
      pdf.addImage(img, 10, 0, 190, 200);
      window.open(pdf.output('bloburi',{ filename: 'formStaff.pdf' }), '_blank')
    }
  })

}
  return (
        <Card 
        title="Print Student  Form"
        bodyStyle={{ padding: '1rem' }}
        extra={
          <div>
            <Button onClick={()=>savePDF()} style={{margin:10}}>
             <Download/> 
           </Button>
           <Button onClick={()=>printPDF()}>
             <Printer/> 
           </Button>
          </div>
        }> 
            <div id="formStaff">
                <Row className="rowForm">
                   <Col span={12}>
                       <img className="banner" src="https://www.integratedschoolrecords.com/storage/images/school_configuration/schoollogo/biiagauraka/mastlogo.gif"/>
                   </Col>
                   <Col span={12}>
                     <div className="description-form">
                         <span className="textForm">  <Phone/> O8034055074 </span>
                         <span className="textForm"> <Mail/>  brilliantimpactschool@gmail.com </span>
                         <span className="textForm"> <MapPin/> Angwan Tomato, Gauraka, Tafa L.G.A, Niger State </span>
                     </div>
                   </Col>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Admission Date: (M/D/Y)  </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > First Name: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Middle Name: (optional) </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Surname: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Birth Date: (M/D/Y)  </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Sex: </span>
                      <div>
                      <input type='checkbox'></input>
                      <span className="textForm" style={{marginLeft:10}} > Male  </span>
                      <input type='checkbox' style={{marginLeft:40}}></input>
                      <span className="textForm" style={{marginLeft:10}} > Female  </span>
                      </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > State: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Class: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Arm: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Address: </span>
                       <div className="line" > </div>
                </Row>
                <Row className=" rowForm flexRow">
                       <span className="textForm labelForm" > Parent Phone Number: </span>
                       <div className="line" > </div>
                </Row>
                <span className="textForm labelForm" style={{marginLeft:'30%', marginRight:'30%', fontFamily:"Roboto", fontSize:15}} > Generated by Quantum Cude For Plot Schools </span>
                <a className="textForm labelForm" href="http://www.plotSchools.com" style={{marginLeft:'35%', marginRight:'35%', fontFamily:"Roboto", fontSize:13}} > www.plotSchool.com </a> 
            </div>
       </Card>
  )
};


export default StudentFormPage;
