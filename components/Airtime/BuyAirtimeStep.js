import { Steps, Button, message } from 'antd';
import { useState } from 'react';

const { Step } = Steps;

const steps = [
  {
    title: 'First',
    content: (
      <div>
        
      </div>
    )
  },
  {
    title: 'Second',
    content: 'Second-content',
  },
  {
    title: 'Last',
    content: 'Last-content',
  },
];


 const BuyAirtimeStepper = ()=>{
    const [ current, setCurrent] = useState(0)
    
   const next =() =>{
      setCurrent(current + 1);
    }
  
   const prev =() =>{
      setCurrent(current - 1);
    }
     return (
      <div>
        <Steps current={current}>
          {steps.map(item => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
        <div className="steps-content">{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
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


 export default  BuyAirtimeStepper
