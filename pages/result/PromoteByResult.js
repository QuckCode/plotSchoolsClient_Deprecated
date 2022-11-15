import  React, { useState } from 'react'
import Head from 'next/head';
import { PrivateRoute } from '../../components/PrivateRoute';
import StudentByArmForm from '../../components/Student/StudentByArmForm';
import { wrapper } from '../../redux/store';
import { loginSuccess } from '../../redux/actions/auth';
import { getAllSection } from '../../redux/actions/section';
import { getAllClasses, getCurrentClassTests } from '../../redux/actions/classes';
import { getAllArms } from '../../redux/actions/arm';
import { redirectError } from '../../services/redirectService';
import { AuthToken } from '../../services/authToken';
import { Menu, Row, Card, Dropdown, Table, Col,Avatar, Button, InputNumber, Result, Modal } from 'antd';
import { Edit, Trash,Save, Printer, MoreHorizontal, Phone , Mail, MapPin} from 'react-feather';
import { theme } from '../../components/styles/GlobalStyles';
import Router  from 'next/router';
import { error, success } from '../../components/modal';
import { capitalize, handleEnumScore, nth ,  printPDFMultiple, termTextToNUmbers,romanize  } from '../../lib/helpers';
import Axios from 'axios';
import { school, url } from '../../redux/varables';
import { getSchoolsSetting } from '../../redux/actions/school';
import { PromotionTerm } from '../../lib/constants';

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


const getResult = async (classN, arm) =>{
  try {
    let data =  await (await Axios.post(`${url}/result/printResult/arm`, {classN:classN, arm:arm, school:school})).data
    return data
  } catch (error) {
     return []
  }
}


const PromoteByResultPage = ({showResult,classes, sections,  arms, currentClassTests=[], results, schoolSettings={}}) => {
  const  [loading, setLoading] = useState(false)
  const  [promote, setPromote ] = useState(50.0)
  const [showPromote, setShowPromote] = useState(false)

  const promoteTable =[
      { title:"Name",key:"_id" , dataIndex:"name"},
      { title:"Admission Number",key:"_id" , dataIndex:"admissionNumber"},
      { title:"Avg",key:"_id" , dataIndex:"avg",  render: text => <span>{ text} </span>,},
      { title:"Cumulative Average",key:"_id" , dataIndex:"cumulativeAvg",  render: text => <span>{ text+"%"} </span>,},
      { title:"Promoting",key:"_id" , dataIndex:"cumulativeAvg",  render: text => <div style={{width:"2rem", height:"2rem", backgroundColor:text<=promote ? "red":"green", margin:'auto'}}> </div>},
    ]

  const  handleSubmit= (value)=>{
     setLoading(true)
      Axios.post(`${url}/result/printResult/arm`, {classN:value.classN, arm:value.arm, school:school})
      .then(data=>{
         Router.push({ pathname:`/result/PromoteByResult`, query:{classN:value.classN, arm:value.arm, school:school}})
        setLoading(false)
      })
      .catch(({response})=>{
        setLoading(false)
        if(response){
          console.log(response)
            error (response.data.title, response.data.message)
        }
        else{
           error("Network Error", "Please an error occurred")
        }
      })
  }

  const promoteToNewClass= (value, school) =>{
    setLoading(true)
    const students = results.filter((x)=>x.cumulativeAvg>=promote)
    let data = students.map(x=>({admissionNumber:x.admissionNumber, _id:x._id}))
    Axios.post(`${url}/result/promote`,{classN:value.classN, arm:value.arm, studentData:data, school})
    .then(({data})=>{
       setLoading(false)
       success(data.message)
       Router.reload(window.location.pathname);
    })
    .catch(({response})=>{
      setLoading(false)
      if(response){
          error (response.data.title, response.data.message)
      }
      else{
         error("Network Error", "Please an error occurred")
      }  
    })
  }

  if(!showResult){
    return (
      <Card 
      title="Promote Result "
       extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      id="result"
      className="mb-4"> 
        <div className="p-4">
            <StudentByArmForm handleSubmit={handleSubmit} loading={loading} classes={classes} sections={sections} arms={arms}/>
        </div>
      </Card>
    )
  }
  else {
    if(schoolSettings.term!==PromotionTerm){
       return (
        <Card 
         title="Promote By Result "
        extra={
         <Dropdown overlay={menu}>
              <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
         </Dropdown>
       }
       bodyStyle={{ padding: '1rem' }}  className="mb-4"> 
            <Result
              status="warning"
              title="You can not promote student when its not 3rd term "
              subTitle={`Dear user you  can not promote student when it is  not 3rd term to solve this error call customer care  `}
            />
       </Card>
       )
    }
    else 
       return (
      <Card 
       title="Promote By Result "
       extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      id="result"
      className="mb-4"> 
      <div  className="p-4">
        <span> Promotion Criteria : </span>
       <InputNumber style={{width:"20%"}}  defaultValue={promote}  min={0} max={100} formatter={value => `${value}%`}  parser={value => value.replace('%', '')} onChange={(value)=>setPromote(value)}/>
       <Button onClick={()=>setShowPromote(true)} type="primary" style={{marginLeft:"1rem"}}> Promote</Button>
      </div>
        <div className="p-4">
            <Table bordered  pagination={false} columns={promoteTable} dataSource={results}/>
        </div>
        <Modal visible={showPromote} onCancel={()=>setShowPromote(false)} footer={null}  title="Promote ">
              <StudentByArmForm submitText="Promote To" handleSubmit={(value)=>promoteToNewClass(value, schoolSettings._id)}  loading={loading} classes={classes} sections={sections} arms={arms}/>
        </Modal>
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
    if(ctx.query.arm && ctx.query.classN){
      try {
        await store.dispatch(getCurrentClassTests(ctx.query.classN))
        let  results = await getResult(ctx.query.classN, ctx.query.arm)
        await store.dispatch(getSchoolsSetting(data.decodedToken.school))
        propStore =  await store.getState() 
         return { props:{  
            classes:propStore.classes.classes, 
            currentClassTests:propStore.test.currentClassTests,
            schoolSettings:propStore.schools.settings,
            sections:propStore.section.section, arms:propStore.arm.arms,showResult:true , results:results} }

      } catch (error) {
        return { props:{  classes:propStore.classes.classes, sections:propStore.section.section, arms:propStore.arm.arms,showResult:false} }
      }
    }
    else 
     return {
            props:{ classes:propStore.classes.classes, sections:propStore.section.section, arms:propStore.arm.arms,showResult:false}
        }
  } catch (error) {
      redirectError(ctx)
  }
}

)
export default PromoteByResultPage;