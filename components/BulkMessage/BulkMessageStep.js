import { Steps, Button, message, Row , Col, Icon, Result, Progress} from 'antd';
import Axios from 'axios';
import { useState } from 'react';
import { Briefcase, Users, Home, Copy, Layers } from 'react-feather';
import { url } from '../../redux/varables';
import { theme } from '../styles/GlobalStyles';
import BulkMessageCard from './BulkMessageCard';
const { Step } = Steps;



 const BulkMessageStepper = ()=>{

    const [ current, setCurrent] = useState(0)
    const [ userType, setUserType] = useState("")
    const [ progress, setProgress] = useState(0);
    const [phoneNumbers , setPhoneNumbers]= useState([])
   const next =() =>{
      setCurrent(current + 1);
    }
  
   const prev =() =>{
      setCurrent(current - 1);
    }
  
    const addToProgress= ()=>{
      if(progress===100){
        setProgress(100)
      }
      else{
        setProgress(100)
      }
    }

    const steps = [
      {
        title: 'First',
        content: (
          <div style={{textAlign:'center', width:"100%", height:"100%",justifyContent:"center" }}>
              <Row  gutter={0}>
               <Col xs={24} sm={12} md={6}>
                   <BulkMessageCard
                      value="Students"
                      icon={ <Users size={20} strokeWidth={1}/>}
                      color={theme.warningColor  }
                      clickHandler={() => {
                         next()
                         setUserType('student')
                      }}
                   />
               </Col>
               <Col xs={24} sm={12} md={6}>
                   <BulkMessageCard
                      value="Parents"
                      icon={
                        <Home size={20} strokeWidth={1} />
                      }
                      color={theme.warningColor  }
                      clickHandler={() => {
                        //  next()
                         setUserType('parent')
                      }}
                   />
               </Col>
               <Col xs={24} sm={12} md={6}>
                   <BulkMessageCard
                      value="Teachers"
                      color={theme.warningColor  }
                      icon={ <Briefcase size={20} strokeWidth={1} />}
                      clickHandler={() => {
                        // next()
                        setUserType('teacher')
                      }}
                   />
               </Col>
              </Row>
          </div>
        ),
      },
      {
        title: 'Second',
        content:(
          <div style={{textAlign:'center', width:"100%", height:"100%",justifyContent:"center" }}>
          <Row  gutter={0}>
           <Col xs={24} sm={12} md={6}>
               <BulkMessageCard
                  value="All Students"
                  icon={
                    <Users size={20} strokeWidth={1}/>
                  }
                  color={theme.warningColor  }
                  clickHandler={() => {
                     next()
                     Axios.get(`${url}/sms/allstudent`)
                     .then(({data})=>{
                         setTimeout(()=>{
                            addToProgress()
                         },2000)
                        console.log(data)
                     })
                     .catch(err=>{
                        console.log(err)
                     })
                    //  setUserType('parent')
                  }}
               />
           </Col>
           <Col xs={24} sm={12} md={6}>
               <BulkMessageCard
                  title="Current School term"
                  value=" Students In a class"
                  icon={
                    <Copy size={20} strokeWidth={1}/>
                  }
                  color={theme.warningColor  }
                  clickHandler={() => {
                  
                  }}
               />
           </Col>
           <Col xs={24} sm={12} md={6}>
               <BulkMessageCard
                  title="Current School term"
                  value=" Students In an arm"
                  icon={
                    <Layers size={20} strokeWidth={1}/>
                  }
                  color={theme.warningColor  }
                  clickHandler={() => {
                    //  next()
                    //  setUserType('parent')
                  }}
               />
           </Col>
          </Row>
      </div>
        )
      },
      {
        title: 'Third',
        content:(
          <Result
            icon={<Progress type="circle" percent={progress} />}
            title="Fetching Students Phone Numbers"
            subTitle="All the messages are at a flat fee of 2.00 naira per unit  "
            extra={[<Button type="primary" onClick={
              ()=>{
                  next()
              }
            } disabled={progress!==100 ?true : false} > Send Sms </Button> ]}
         />
        )
      },
      {
        title: 'Last',
        content: (
          <Result
          status="success"
          title="Successfully  Sent Messages "
          subTitle="All the messages where successfully sent with a total cost 10.00 at a rate of 2.0 naira  "
         /> 
        )
      },
    ];


     return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
      
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
              Previous
            </Button>
          )}
        </div>
      </div>
    );
 }


 export default  BulkMessageStepper
