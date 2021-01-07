
import { Card, Divider, Row, Typography, Button,Checkbox, Menu, Dropdown, Form , Select, List, Col, Modal} from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Printer,
  Download,
  Mail,
  Phone, MapPin
} from 'react-feather';
import {connect} from 'react-redux'
import {useEffect} from 'react'
import { getAllSubjects } from '../../redux/actions/subject';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { PrivateRoute } from '../../components/PrivateRoute';

const FormItem = Form.Item;
const Option = Select.Option;

const Title = Typography.Title

const Content = styled.div`
  z-index: 0;
  max-width: 600px;,
  backgroundColor:'#f0f0f0'
`;


const ClassesSubjectsPage = (props) =>{
  useEffect(() => {
      props.getAllSubject()
      return ()=>{
       
      }
  }, [])

  const savePDF =(id)=> {
    const printArea = document.getElementById(id);
    html2canvas(printArea, {useCORS:true}).then(canvas => {
      let img = new Image();
      img.src = canvas.toDataURL('image/png');
      img.onload = function () {
        let pdf = new jsPDF("portrait", 'mm', 'a4');
        console.log(img)
        pdf.addImage(img, 10, 0, 190, 200);
        pdf.save(`${id}.pdf`);
      }
    })

}

const printPDF =(id)=> {
  const printArea = document.getElementById(id);
  html2canvas(printArea, {useCORS:true}).then(canvas => {
    let img = new Image();
    img.src = canvas.toDataURL('image/png');
    img.onload = function () {
      let pdf = new jsPDF();
      pdf.addImage(img, 10, 0, 190, 200);
      window.open(pdf.output('bloburi',{ filename: `${id}.pdf` }), '_blank')
    }
  })
}
 
   const {subjects, currentClassSubjects} = props.subjects
  return (
    <Card 
    title="Print Student  Form"
    bodyStyle={{ padding: '1rem' }}
    extra={
      <div>
        <Button onClick={()=>savePDF("formSubject")} style={{margin:10}}>
         <Download/> 
       </Button>
       <Button onClick={()=>printPDF("formSubject")}>
         <Printer/> 
       </Button>
      </div>
    }> 
        <div id="formSubject" className="p-4">
            <Row className="rowForm">
               <Col span={12}>
                 <img className='banner' src="data:image/png;base64,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"/>
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
             <span className="textForm labelForm" > Section:  </span>
                   <div className="line" > </div>
            </Row>
            <Row className=" rowForm flexRow">
                <span className="textForm labelForm" > Class:  </span>
                   <div className="line" > </div>
            </Row>

            <Row>
            <List
             bordered
             dataSource={props.subjects.subjects}
             loading={props.subjects.loading}
             renderItem={item => (
               <List.Item>
                   <Checkbox  key={item._id} value= {item._id}> {item.name}</Checkbox>
               </List.Item>
               )}
             />
            </Row>
            <Row>
            <span className="textForm labelForm" style={{marginLeft:'30%', marginRight:'30%', fontFamily:"Roboto", fontSize:15}} > Generated by Quantum Cude For Plot Schools </span>
            <a className="textForm labelForm" href="http://www.plotSchools.com" style={{marginLeft:'35%', marginRight:'35%', fontFamily:"Roboto", fontSize:13}} > www.plotSchool.com </a> 
            </Row>
        </div>
   </Card>
       
  )
};





const mapStateToProps = state => ({
  subjects:state.subject
});

const mapDispatchToProps = {
  getAllSubject:getAllSubjects,
};

export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(ClassesSubjectsPage))
