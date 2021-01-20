import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import Messages from '../components/Messages';
import { messageFormatting } from '../lib/helpers';
import { loginSuccess } from '../redux/actions/auth';
import { getSmsBalanceRequest, getSmsOutBoxRequest } from '../redux/actions/sms';
import { wrapper } from '../redux/store';
import { AuthToken } from '../services/authToken';

 
const SmsPage = ({smsSent, smsBalance}) => {
  const [loading , setLoading] = useState(false)
  const [bulkModal , setBulkModal ] = useState(false)
  const [airtime, setAirtimeModal ] = useState(false)
  const [key , setTabKey ] = useState(1)
 let [message, setMessage] = useState(messageFormatting(smsSent))


  const onTabChange=(e)=>{
      setBulkModal(false)
      setAirtimeModal(false)
      e.key !== key  ? setTabKey(e.key) : ()=>{}
      setLoading(true)
      setTimeout(() => {
         setLoading(false)
          if(e.key==2 || e.key==3){
          }
      }, 1000);
  }

  return (
    <Messages
     onTabChange= {onTabChange} 
     loading={loading} 
     message= {message}  
     balance= {smsBalance}
     setAirtimeModal={setAirtimeModal} 
     setBulkModal={setBulkModal} 
     bulkModal = {bulkModal}
     airtimeModal ={airtime} />
  );
}
 
export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    const store = ctx.store
    let data =  await AuthToken.fromNext(ctx)
    await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
    await store.dispatch(getSmsOutBoxRequest())
    await store.dispatch(getSmsBalanceRequest())
    let propStore =  await store.getState()  
    return {
      props:{
         smsSent:propStore.sms.messages,
         smsBalance:propStore.sms.balance,
      }
    }
  }
)
 
export default SmsPage;