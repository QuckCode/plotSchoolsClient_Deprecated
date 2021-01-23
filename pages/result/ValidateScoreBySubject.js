 
import { Card, Divider, Row, Typography, Button, Menu, Dropdown, Result, Table } from 'antd';
import RegisterStaff from '../../components/Staff/RegisterStaff'
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import StudentTable from '../../components/Student/StudentTable';
import { connect } from 'react-redux';
import {useEffect, useState} from 'react'
import { PrivateRoute } from '../../components/PrivateRoute';
import { getAllClasses, getCurrentClassTests } from '../../redux/actions/classes';
import {getAllSection} from '../../redux/actions/section'
import { AuthToken } from '../../services/authToken';
import { loginSuccess } from '../../redux/actions/auth';
import { wrapper } from '../../redux/store';
import { getAllArms } from '../../redux/actions/arm';
import Axios from 'axios';
import { error } from '../../components/modal';
import { url } from '../../redux/varables';
import  Router from 'next/router';
import { redirectError } from '../../services/redirectService';
import { getAllSubjects } from '../../redux/actions/subject';
import StudentBySubjectForm from '../../components/Student/StudentBySubjectForm';
import { getStudentValidatedScoreRequest } from '../../redux/actions/student';


const Title = Typography.Title

const Content = styled.div`
  z-index: 0;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const ValidateScoreBySubjectPage = ({classes, sections,arms, showResult, currentClassTests=[], subjects, studentData}) =>{
  const  [loading, setLoading] = useState(false)
  
  const parseClassTestToTable =  (data)=>{
   let c=  data.map(({name, _id})=>({title:name+" Score",key:name, dataIndex:name}))
   c.push({title:"Total",key:"Total", dataIndex:"Total"})
   c.push({title:"Admission Number",key:"admissionNumber", dataIndex:"admissionNumber"})
   c.push({title:"Student Name",key:"name", dataIndex:"name"})
   return c.reverse()
  }
  

  const  handleSubmit= (value)=>{
    setLoading(true)
    Router.push( 
      {pathname:"/result/ValidateScoreBySubject", query:{ arm:value.arm,class:value.classN, subject:value.subject}})
      .then(()=>{
        setLoading(false)
      })
  }
  
  const goToClassSetting = ()=>{
    Router.push({pathname:"/classes/classTest"})
  }

   if(!showResult){
    return (
      <Card 
        title="Validate Score By Subject"
      extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      className="mb-4"> 
          <div className="p-4">
                <StudentBySubjectForm handleSubmit={handleSubmit} subjects={subjects} loading={loading} arms={arms} sections={sections} classes={classes} />
          </div>
     </Card>
    )
  }
   else{
     console.log(parseClassTestToTable(currentClassTests), studentData)
       return (
        <Card 
        title="Validate Result By arm"
        extra={
            <Dropdown overlay={menu}>
               <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
             </Dropdown>
          }
      bodyStyle={{ padding: '1rem' }}
      className="mb-4"> 
          <div className="p-4">
              {

                currentClassTests.length==0 ? (
                   <Result
                     status='500'
                     title="This Class does not have any tests "
                     extra={<Button onClick={goToClassSetting} type="primary" key="console"> Click here to go to class tests settings  </Button>}
                   />
                )
                :(
                  <div>
                      <Table  dataSource={studentData} columns={parseClassTestToTable(currentClassTests)} />
                  </div>
                )
              }
          </div>
     </Card>
       )
   }
}




export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    try {
    const store = ctx.store
    let data =  await AuthToken.fromNext(ctx)
    await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
    await store.dispatch(getAllSection())
    await store.dispatch(getAllClasses())
    await store.dispatch(getAllArms())
    await store.dispatch(getAllSubjects())
    let propStore =  await store.getState()  
    if(ctx.query.arm && ctx.query.class){
       try {
           await store.dispatch(getCurrentClassTests(ctx.query.class))
           await store.dispatch(getStudentValidatedScoreRequest({class:ctx.query.class, arm:ctx.query.arm,subject:ctx.query.subject}))
           propStore =  await store.getState()  
           return {
            props:{
                classes:propStore.classes.classes, sections:propStore.section.section, 
                arms:propStore.arm.arms,showResult:true,studentData:propStore.student.validateStudentScore,
                currentClassTests:propStore.test.currentClassTests,subjects:propStore.subject.subjects,    
            }
          }
       } catch (error) {
        return {props:{  classes:propStore.classes.classes,  
            subjects:propStore.subject.subjects,  
            sections:propStore.section.section,
            arms:propStore.arm.arms, showResult:false}}
       }
    }
    else return { props:{
        classes:propStore.classes.classes,
       sections:propStore.section.section,  
       subjects:propStore.subject.subjects, 
         arms:propStore.arm.arms, showResult:false
       } }
  } catch (error) {
      redirectError(ctx)
  }
  
}

)

export default  ValidateScoreBySubjectPage;