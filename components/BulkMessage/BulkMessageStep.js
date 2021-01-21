import { Steps, Button, message, Row , Col, Icon, Result, Progress, Typography} from 'antd';
import { Input } from 'antd';
import Axios from 'axios';
import { useState } from 'react';
import { Briefcase, Users, Home, Copy, Layers, Facebook } from 'react-feather';
import { school, url } from '../../redux/varables';
import { error, success } from '../modal';
import { theme } from '../styles/GlobalStyles';
import BulkMessageCard from './BulkMessageCard';

const { TextArea } = Input;
const { Step } = Steps;



 const BulkMessageStepper = ({closeModal})=>{

    const [ current, setCurrent] = useState(0)
    const [ userType, setUserType] = useState("")
    const [ progress, setProgress] = useState(0);
    const [phoneNumbers , setPhoneNumbers]= useState([])
    const [message, setMessage] = useState("")
    const [showNext, setShowNext] = useState(false)
    const [result , setResult]= useState({type:"", message:""})

   const next =() =>{
      setCurrent(current + 1);
    }
  
   const prev =() =>{
      setCurrent(current - 1);
    }
  
    const addToProgress= ()=>{
      (progress===100) ? setProgress(100) : setProgress(100)
    }

    const handleSendSms = ()=>{
      if(message===""){
         return error("Please enter the message ", " ")
      }
      else{
        if(phoneNumbers.length===0){
            return error("Please select who the message is going to  ", " ")
        }
        Axios.post(`${url}/sms/send`, {
          phoneNumbers:phoneNumbers,
          message:message,
          school:school
        })
        .then(({data})=>{
            success("Sent Message")
            setResult({type:"success",message:"Successfully  Sent Messages"})
            next()
        })
        .catch(({response})=>{
           (!response) ? error("Network Error","Please check your network"):  error(response.data.title,response.data.message)
            setResult({type:"error",message:response.data.message})
            next()
        })
     }
    }


    const steps = [
      {
        title: 'First',
        content: (
          <div style={{textAlign:'center', width:"100%", height:"100%",justifyContent:"center" }}>
              <Row  gutter={0}>
               <Col xs={6} sm={6} md={6}>
                   <BulkMessageCard
                      value="Students"
                      icon={ <Users size={20} strokeWidth={1}/>}
                      color={theme.warningColor  }
                      clickHandler={() => {
                         next()
                         setShowNext(true)
                         setUserType('student')
                      }}
                   />
               </Col>
               <Col xs={6} sm={6} md={6}>
                   <BulkMessageCard
                      value="Parents"
                      icon={<Home size={20} strokeWidth={1} /> }
                      color={theme.warningColor  }
                      clickHandler={() => {setUserType('parent')}}
                   />
               </Col>
               <Col xs={6} sm={6} md={6}>
                   <BulkMessageCard
                      value="Teachers"
                      color={theme.warningColor  }
                      icon={ <Briefcase size={20} strokeWidth={1} />}
                      clickHandler={() => { setUserType('teacher')}}
                   />
               </Col>
              </Row>
          </div>
        ),
      },
      {
        title:"Second",
        content:(
          <div style={{width:"75%",height:"70%"}}>
             <Typography.Text style={{marginBottom:"10rem"}}> Enter Your Message </Typography.Text>
             <br/>  <div> <TextArea rows={7} value={message} onChange={ (e)=>{ setMessage(e.target.value)}  } /></div>
          </div>
        )
      },
      {
        title: 'Third',
        content:(
          <div style={{textAlign:'center', width:"100%", height:"100%",justifyContent:"center" }}>
          <Row  gutter={0}>
           <Col xs={6} sm={6} md={6}>
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
                         setTimeout(()=>{addToProgress()},1000); setPhoneNumbers(data);
                     })
                     .catch(({response})=>{
                        (!response) ? error("Network Error","Please check your network"):  error(response.data.title,response.data.message)
                     })
                  }}
               />
           </Col>
           <Col xs={6} sm={6} md={6}>
               <BulkMessageCard
                  value=" Students In a class"
                  icon={
                    <Copy size={20} strokeWidth={1}/>
                  }
                  color={theme.warningColor  }
                  clickHandler={() => {
                  
                  }}
               />
           </Col>
           <Col xs={6} sm={6} md={6}>
               <BulkMessageCard
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
        title: 'Four',
        content:(
          <Result
            icon={<Progress type="circle" percent={progress} />}
            title="Fetching Students Phone Numbers"
            subTitle="All the messages are at a flat fee of 2.00 naira per unit  "
            extra={[<Button type="primary" onClick={handleSendSms} disabled={progress!==100 ?true : false} > Send Sms </Button> ]}
         />
        )
      },
      {
        title: 'Last',
        content: (
          <Result
          status={result.type}
          title={result.message}
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
            <Button type="primary" onClick={() => closeModal()}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button style={{ marginLeft: 8 }} onClick={() => {
                setShowNext(false)
               if(progress===100){
                 setProgress(0)
                 prev()
               }
               else{
                 prev()
               }
            }}>
              Previous
            </Button>
          )}
          {showNext && (
            <Button type="primary" style={{ marginLeft: 8 }} onClick={() => {
              setShowNext(false)
              next()
            }
            }>
              Next
            </Button>
          )}
        </div>
      </div>
    );
 }


 export default  BulkMessageStepper
