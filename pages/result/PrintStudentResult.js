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
import { Menu, Row, Card, Dropdown, Table, Col,Avatar, Button } from 'antd';
import { Edit, Trash,Save, Printer, MoreHorizontal, Phone , Mail, MapPin} from 'react-feather';
import { theme } from '../../components/styles/GlobalStyles';
import Router  from 'next/router';
import { error, success } from '../../components/modal';
import Axios from 'axios';
import { school, url } from '../../redux/varables';
import { capitalize, handleEnumScore, nth ,  printPDF, termTextToNUmbers,romanize  } from '../../lib/helpers';
import { getSchoolsSetting } from '../../redux/actions/school';
import PrintStudentResultForm from '../../components/Student/PrintStudentResultForm';

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


const getResult = async (classN, arm,admissionNumber ) =>{
  try {
    let data =  await (await Axios.post(`${url}/result/printResult/arm`, {classN:classN, arm:arm, school:school})).data
    return data.filter(data=>data.admissionNumber===admissionNumber)
  } catch (error) {
     return []
  }
}

const PrintStudentResultPage = ({showResult,classes, sections,  arms, currentClassTests=[], results, schoolSettings={}, currentStudent}) => {
  const  [loading, setLoading] = useState(false)
  const [position, setPosition] = useState(0)

  const  handleSubmit= (value)=>{
     setLoading(true)
      Axios.post(`${url}/result/printResult/arm`, {classN:value.classN, arm:value.arm, school:school})
      .then(data=>{
         Router.push({ pathname:`/result/PrintStudentResult`, query:{classN:value.classN, arm:value.arm, school:school}})
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





 const parseResultColumn =  (data)=>{
  let c=  []
  c.push({
    title:"Term",
    children:[{title:"1st(100%)",key:"first", dataIndex:"first"},{title:"2nd (100%)",key:"second", dataIndex:"second"},{title:"3rd (100%)",key:"third", dataIndex:"third"}]
   })
  c.push({title:"Position",key:"position", dataIndex:"studentResults.position",  render: text => <span>{ text+nth(text)} </span>,})
  c.push({title:"Class",
     children:[{title:"High",key:"high", dataIndex:"studentResults.high"},{title:"Low",key:"low", dataIndex:"studentResults.low"},{title:"Avg",key:"avg", dataIndex:"studentResults.avg"}]
  })
  c.push({title:"Total (100)%",key:"total", dataIndex:"studentResults.total"})
  let v =  data.map(({name, marksObtainable})=>({title:`${name+" ("+marksObtainable+")%"}`,key:name, dataIndex:"studentResults.scores" , 
  render:(value, item, index)=>{
     let testScore = value.find(x=> x.test === name)
    return <span> { testScore ? testScore.score : " "} </span>
  }}))
  c.push(...v)
  c.push({title:"Subject",key:"subject", dataIndex:"subject"})
  c.push({title:"S/No",key:"index",render:(value, item, index)=> <span>{index+1}</span>})
  return [{title:"Student Result Records",children:c.reverse()}]
 }

 const parseColumn =  (name)=>{
  return [{title:capitalize(name+ " Records "),children:[{title:"S/No",key:"index",render:(value, item, index)=> <span>{index+1}</span>},{title:capitalize(name),key:name, dataIndex:name},{title:"Grade",key:"score", dataIndex:"score",render: text => <span>{handleEnumScore(text)} </span>,}]}]
 }
 
 const parseAttendanceColumn= ()=>{
   return [{ title:capitalize("Attendance Record"), children:[{title:capitalize("No of Times School Opened"),key:"opened",dataIndex:"opened"},{title:capitalize("No of Times Present"),key:"present",dataIndex:"present"}]}]
 }

  if(!showResult){
    return (
      <Card 
      title="Confirm my Information"
       extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      id="result"
      className="mb-4"> 
        <div className="p-4">
              <PrintStudentResultForm student={currentStudent} loading={loading}  printResult= {handleSubmit} classes={classes} arms={arms}/>
        </div>
      </Card>
    )
  }
  else {
    return (
      <Card 
      title="Print My  Result "
       extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}

      className="mb-4">
       <div id="result" className="p-4">
           <Row className="rowForm">
                   <Col span={12}>
                       <img className='banner' src={`${schoolSettings.schoolImageAsBlob}`}/>
                   </Col>
                   <Col span={12}>
                     <div className="description-form">
                         <span className="textForm">  <Phone/> {schoolSettings.phoneNumber} </span>
                         <span className="textForm"> <Mail/> {schoolSettings.email} </span>
                         <span className="textForm"> <MapPin/>{schoolSettings.address} </span>
                     </div>
                   </Col>
           </Row>
           <Row>
            <Col span={24}>
               <br/>
               <span className="textForm"> Term Result for { termTextToNUmbers(schoolSettings.term)+nth(termTextToNUmbers(schoolSettings.term))} term  { schoolSettings.section} Section </span> 
            </Col>
            </Row>
           <Row className="rowForm">
            <Col span={12}>
            <div style={{textAlign:"start"}}>
                <span> Name of student :  {results[position].name} </span>
                <span style={{marginLeft:"20%"}}> Class:  {results[position].class} {results[position].arm} </span>
            </div>
            <div style={{textAlign:"start", marginTop:"5%"}}>
                <span> Admission Number:  {results[position].admissionNumber} </span>
                <span style={{marginLeft:"12%"}}> Gender:  {results[position].gender? "Male" :"Female"} </span>
            </div>
            </Col>
            <Col span={12}>
              <div style={{textAlign:"end"}}>
                <Avatar shape="square"  size={100}  src={results[position].passport}/>
              </div>
            </Col>
           </Row>
           <br/>
           <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Table size="small"
                   pagination={false}  bordered 
                   dataSource={results[position].resultScores}
                   columns={parseResultColumn(currentClassTests)}
                   footer={() =>(
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                          <div style={{margin:"1rem",textAlign:"end"}}>
                          <span> { schoolSettings.term} Term Avg : {results[position].avg}% </span>
                              <br/> <br/>
                            <span> Cumulative Term Avg : {results[position].cumulativeAvg}% </span>
                          </div>
                      </Col>
                      <Col span={12}>
                         <div style={{margin:"1rem",textAlign:"end"}}>
                           <span> { schoolSettings.term} Term position : { results[position].position+nth(results[position].position)} </span>
                              <br/> <br/>
                             <span> Cumulative Term Position : {results[position].cumulativePostion+nth(results[position].cumulativePostion)} </span>
                        </div>
                      </Col>
                    </Row>
                   )}                   
                  />
              </Col>
           </Row>
           <br/>
          <Row gutter={[16, 16]}>
              <Col span={8}>
                  <Table size="small" dataSource={results[position].resultBehaviours} pagination={false} bordered columns={parseColumn('behaviour')}/>
              </Col>
            <Col span={8}>
                <Table size="small"  dataSource={results[position].resultSkills} pagination={false} bordered columns={parseColumn("skill")}/>
            </Col>
            <Col  span={8}>
                  <Table dataSource={[{opened:100, present:10, absent:90}]} size="small" pagination={false} bordered columns={parseAttendanceColumn()}/>
              </Col>
          </Row>
          <br/>
           <div>
              <span> NOTICES: </span>
              {
               schoolSettings.notice.map((x, no)=>(
                   <p> ({romanize(no+1)}) {x} </p>
               ))
             }
          </div>
          <br/>
          <div>
              <span> Signators</span>
              <p> (i) Form Master: _________________________________ </p>
              <p> (ii) Prinicipal :_________________________________  </p>
          </div>
          </div>
          <Button onClick={()=>printPDF("result")} type="primary" style={{marginLeft:"1rem"}} > Prints My Result  </Button>
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
        await store.dispatch(getCurrentClassTests(ctx.query.classN))
        let  results = await getResult(ctx.query.classN, ctx.query.arm,data.decodedToken.admissionNumber )
        await store.dispatch(getSchoolsSetting(data.decodedToken.school))
        propStore =  await store.getState() 
         return { props:{  
            classes:propStore.classes.classes, 
            currentClassTests:propStore.test.currentClassTests,
            schoolSettings:propStore.schools.settings,
            sections:propStore.section.section, arms:propStore.arm.arms,showResult:true , results:results,
            currentStudent:propStore.auth.user
            
          } }

      } catch (error) {
        return { props:{  classes:propStore.classes, sections:propStore.section.section, arms:propStore.arm.arms,showResult:false , currentStudent:propStore.auth.user} }
      }
    }
    else 
     return {
            props:{ classes:propStore.classes, sections:propStore.section.section, arms:propStore.arm.arms,showResult:false, currentStudent:propStore.auth.user}
        }
  } catch (error) {
      redirectError(ctx)
  }
}

)
export default PrintStudentResultPage;