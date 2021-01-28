 
import { Card, Divider, Row, Typography, Button, Menu, Dropdown, Result, Table,Popconfirm, Col } from 'antd';
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
import { error, success, warning } from '../../components/modal';
import { school, url } from '../../redux/varables';
import  Router from 'next/router';
import { redirectError } from '../../services/redirectService';
import {handleEnumScore} from '../../lib/helpers'
import { getAllBehaviour, getCurrentSectionBehaviour } from '../../redux/actions/behaviour';

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

const getBehaviourResult = async (classN, arm) =>{
  try {
    let data =  await (await Axios.get(`${url}/student/behaviour/compute/${classN}/${arm}`)).data
    return data
  } catch (error) {
     return []
  }
}

const ComputeResultBehaviourPage = ({classes, sections,arms, showResult, currentClassBehaviors =[],  behaviourResult=[], resultError, classN, arm}) =>{
  const  [loading, setLoading] = useState(false)

  

  const parseBehaviorsToTable =  (data)=>{
   let c=  data.map(({name, _id})=>({title:name,key:name, dataIndex:name, render: text => <span>{handleEnumScore(text)} </span>,}))
   c.push({title:"Admission Number",key:"admissionNumber", dataIndex:"admissionNumber"})
   c.push({title:"Student Name",key:"name", dataIndex:"name"})
   return c.reverse()
  }

  const  handleSubmit= (value)=>{setLoading(true), Router.push(  {pathname:"/result/ComputeBehaviour", query:{arm:value.arm, class:value.classN, section:value.section}})
  .then(()=>{  setLoading(false) })}


  const gotoSubjectSetting = ()=>Router.push({pathname:"/section/sectionBehaviors"})


  const handleComputeResultBehaviour= ()=>{
     setLoading(true)
     Axios.post(`${url}/result/compute/behaviour`, {
       classN, arm , school
     })
     .then(data=>{
       setTimeout(()=> setLoading(false), success("Computation Successfully", ""), 2000)
     })
     .catch(({response})=>{
      setLoading(false)
      if(response){
        if( response.data.message==="Result for behaviour have already bean computed"){
          warning(response.data.title, response.data.message, handleReComputeResultBehaviour, "Recompute Result")
        } else error (response.data.title, response.data.message)
      }
      else{
        error("Network Error", "Please an error occurred")
      }

     })
  }
  
  const handleReComputeResultBehaviour = ()=>{
    setLoading(true)
     Axios.post(`${url}/result/recompute/behaviour`, {
       classN, arm , school
     })
     .then(data=>{
       setTimeout(()=> success("Computation Successfully", ""), 1000)
       setLoading(false)
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
        title="Compute Behaviour Result "
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
                <StudentByArmForm  handleSubmit={handleSubmit} loading={loading} arms={arms} sections={sections} classes={classes} />
          </div>
     </Card>
    )
  }
   else{
       return (
        <Card 
      title="Compute Behaviour Result "
        extra={
            <Dropdown overlay={menu}>
               <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
             </Dropdown>
          }
      bodyStyle={{ padding: '1rem' }}
      className="mb-4"> 
          <div className="p-4">
              {

                 currentClassBehaviors.length==0 ? (
                   <Result
                     status='500'
                     title="Add Class Subjects"
                     extra={<Button onClick={gotoSubjectSetting} type="primary" key="console"> Click here to go to section behaviors settings </Button>}
                   />
                )
                :(
                  <div>
                   <div>
                      <span style={{textDecoration:"underline"}}> Class:  {classes.find(x => x._id === classN).name}  {arms.find(x => x.id === arm).arm} </span>
                    </div>
                     <br/>
                    <div> 
                      <span> Arm:  {arms.find(x => x.id === arm).arm}</span>
                    </div>
                      <br/>
                      <br/>
                      <Row>
                          <Col gutter={[16,16]}>
                           <Table size="small"   bordered  loading={loading}  pagination={false} dataSource={behaviourResult}   columns={parseBehaviorsToTable(currentClassBehaviors)} />
                          </Col>
                        </Row> 
                      {/* <Button onClick={handleNext} disabled={loading} style={{margin:"1rem"}} type="primary" > {position!==armResult.length-1 ? "Next Subject" :"Start Again"} </Button> */}
                      <Popconfirm onConfirm={handleComputeResultBehaviour} title="Are you sure you want to compute student result">
                         <Button loading={loading} disabled={loading ? true :false} style={{margin:"1rem"}} type="primary" > Save Computed Behaviour  </Button>
                      </Popconfirm>
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
    await store.dispatch(getAllBehaviour())
    let propStore =  await store.getState()  
    if(ctx.query.arm && ctx.query.class){
       try {
           await store.dispatch(getCurrentSectionBehaviour(ctx.query.section))
           let  behaviourResult =  await  getBehaviourResult(ctx.query.class, ctx.query.arm)
           console.log(behaviourResult)
            propStore =  await store.getState()  
           return {
            props:{
                classes:propStore.classes.classes, sections:propStore.section.section, 
                arms:propStore.arm.arms,showResult:true,
                currentClassBehaviors:propStore.behavior.currentSectionBehaviour,
                behaviourResult: behaviourResult ,classN:ctx.query.class, arm:ctx.query.arm
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

export default  ComputeResultBehaviourPage;