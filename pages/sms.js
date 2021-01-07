import { Modal, Button } from 'antd';
import React, { useState } from 'react';
import Messages from '../components/Messages';
import { PrivateRoute } from '../components/PrivateRoute';
import mockMessages from '../demos/mock/messages';
 
const SmsPage = () => {
  const [loading , setLoading] = useState(false)
  const [bulkModal , setBulkModal ] = useState(false)
  const [airtime, setAirtimeModal ] = useState(false)
  const [key , setTabKey ] = useState(1)
 let [message, setMessage] = useState(mockMessages)
  
  const onTabChange=(e)=>{
      setBulkModal(false)
      setAirtimeModal(false)
      e.key !== key  ? setTabKey(e.key) : ()=>{}
      setLoading(true)
      setMessage([])
      setTimeout(() => {
         setLoading(false)
          setMessage(mockMessages)
          if(e.key==3 || e.key==4){
            setMessage([])
          }
      }, 1000);
  }

  return (
    <Messages
     onTabChange= {onTabChange} 
     loading={loading} 
     mockMessage= {message}  
     setAirtimeModal={setAirtimeModal} 
     setBulkModal={setBulkModal} 
     bulkModal = {bulkModal}
     airtimeModal ={airtime} />
  );
}
 
 
export default PrivateRoute(SmsPage);