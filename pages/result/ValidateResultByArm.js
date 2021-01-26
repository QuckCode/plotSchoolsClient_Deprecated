 
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
import StudentByArmForm from '../../components/Student/StudentByArmForm';
import Axios from 'axios';
import { error } from '../../components/modal';
import { url } from '../../redux/varables';
import  Router from 'next/router';
import { redirectError } from '../../services/redirectService';
import { nth } from '../../lib/helpers';

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

const getArmResult = async (classN, arm) =>{
  try {
    let data =  await (await Axios.get(`${url}/student/validate/${classN}/${arm}`)).data
    return data
  } catch (error) {
     return []
  }
}

const ValidateResultByArmPage = ({classes, sections,arms, showResult, currentClassTests=[], armResult=[], resultError}) =>{
  const  [loading, setLoading] = useState(false)
  const [position, setPosition] = useState(0)
  const  [ arm , setArm] = useState("")
  const  [classN, setClass] = useState("")
  const  [subject, setSubject] = useState("")

  const parseClassTestToTable =  (data)=>{
   let c=  data.map(({name, _id})=>({title:name+" Score",key:name, dataIndex:name}))
   c.push({title:"Total",key:"Total", dataIndex:"Total"})
   c.push( {title:"Position",key:"position", dataIndex:"postion",  render: text => <span>{ text+nth(text)} </span>,})
   c.push({title:"Admission Number",key:"admissionNumber", dataIndex:"admissionNumber"})
   c.push({title:"Student Name",key:"name", dataIndex:"name"})
   return c.reverse()
  }

  const  handleSubmit= (value)=>{
    setLoading(true)
    Router.push( 
      {pathname:"/result/ValidateResultByArm", query:{
        arm:value.arm,
        class:value.classN
      }})
      .then(()=>{
        setLoading(false)
      })
  }
  
  const  handleGoBack = ()=>{
    Router.push( {pathname:"/result/ValidateResultByArm"})
      .then(()=>{
        setLoading(false)
      }) 
  }
  const gotoSubjectSetting = ()=>{
    Router.push({pathname:"/classes/classSubjects"})
  }

  const handleNext= ()=>{
   if(position===armResult.length-1){
    setLoading(true)
      setTimeout(()=>{
            setPosition(0)
      }, 500)
    return  setLoading(false)
   }
   else{
    setLoading(true)
    setTimeout(()=>{
          setPosition(position+1)
    }, 500)
    return  setLoading(false)
   } 
  }

   if(!showResult){
    return (
      <Card 
        title="Validate Result By Arm"
      extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      className="mb-4"> 
          <div className="p-4">
          {
                     resultError ?
                     (
                      <Alert
                         message="Result error"
                         description="Could not fetch scores for  student in this class"
                        type="error"
                         closable
                      />

                     )
                     :(
                       <div> </div>
                     )
                   }
                   <br/>
                <StudentByArmForm  handleSubmit={handleSubmit} loading={loading} arms={arms} sections={sections} classes={classes} />
          </div>
     </Card>
    )
  }
   else{
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
                     title="Add Class Subjects"
                     extra={<Button onClick={gotoSubjectSetting} type="primary" key="console"> Click here to go to class subjects settings  </Button>}
                   />
                )
                :(
                  <div>
                   <div>
                   <span> Section: Jss 1 A</span>
                      <span style={{marginLeft:"10rem"}}> Class: Mathematics</span>
                    </div>
                     <br/>
                    <div> 
                      <span> Arm:  {arm}</span>
                      <span style={{marginLeft:"10rem"}}>  Subject :  { classResult[position]?  classResult[position].subject.name: ""}  </span>
                    </div>
                      <br/>
                      <br/>
                      <Table    bordered  loading={loading}  pagination={false} dataSource={armResult[position] ?   armResult[position].studentData:[]}   columns={parseClassTestToTable(currentClassTests)} />
                      <Button onClick={handleNext} style={{margin:"1rem"}} type="primary" > {position!==armResult.length-1 ? "Next Subject" :"Start Again"} </Button>
                      <Button  onClick={handleGoBack} style={{margin:"1rem"}} type="danger" > Go Back To Form </Button>
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
    let propStore =  await store.getState()  
    if(ctx.query.arm && ctx.query.class){
       try {
           await store.dispatch(getCurrentClassTests(ctx.query.class))
           let armResult =  await  getArmResult(ctx.query.class, ctx.query.arm)
            propStore =  await store.getState()  
           return {
            props:{
               classes:propStore.classes.classes, sections:propStore.section.section, 
                arms:propStore.arm.arms,showResult:true,
                currentClassTests:propStore.test.currentClassTests,
                armResult:armResult
            }
          }
       } catch (error) {
        return {props:{  classes:propStore.classes.classes,   sections:propStore.section.section,  arms:propStore.arm.arms, showResult:false, resultError:true}}
       }
    }
    else return { props:{classes:propStore.classes.classes, sections:propStore.section.section, arms:propStore.arm.arms, showResult:false } }
  } catch (error) {
      redirectError(ctx)
  }
  
}

)

export default  ValidateResultByArmPage;