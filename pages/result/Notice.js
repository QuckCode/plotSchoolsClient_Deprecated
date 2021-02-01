import  React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { wrapper } from '../../redux/store';
import { loginSuccess } from '../../redux/actions/auth';
import { redirectError } from '../../services/redirectService';
import { AuthToken } from '../../services/authToken';
import { Menu, Row, Card, Dropdown, List, Typography, Button, Popconfirm, Modal, Form, Input } from 'antd';
import { Edit, Trash,Save, Printer, MoreHorizontal} from 'react-feather';
import { theme } from '../../components/styles/GlobalStyles';
import { error, success } from '../../components/modal';
import Axios from 'axios';
import { school, url } from '../../redux/varables';
import { getSchoolsSetting } from '../../redux/actions/school';

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


const getNotices = async (school) =>{
  try {
    let data =  await (await Axios.get(`${url}/result/notice/${school}`)).data
    return data
  } catch (error) {
     return []
  }
}


const NoticePage = ({notices, schoolSetting}) => {
  const [ not, setNotices] = useState([])
  const [model , setShowModal ] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
     setNotices(notices)
    return () => {
        // Anything in here is fired on component unmount.
    }
   }, [])

   const addMessage = (message, school) =>{
    setLoading(true)
    Axios.put(`${url}/result/addNotice`, {message: message, school})
    .then(data=>{
      setLoading(false)
       let newNot = not.concat(message)
       setNotices(newNot)
       success("Saved notice successfully")
       setMessage("")
     // setNotices(not.pop(message))
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

   
  const  handleNoticeDelete= (message, school)=>{
   setLoading(true)
   Axios.delete(`${url}/result/removeNotice`, {data:{message: message, school}})
   .then(data=>{
     setLoading(false)
      success("Remove notice successfully")
      let newNot= not.filter((x)=>x!==message)
      setNotices(newNot)
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

   
    return (
      <Card 
      title="Notice settings "
       extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      id="result"
      className="mb-4"> 
        <div className="p-4">
        <Modal
          title="Add notifications"
          visible={model}
          footer={null}
          onCancel={()=>setShowModal(false)}
        >
          <p> Please not that this notification will be show to all users on login </p>
          <p> Please also  not that this notification will be be printed on the result </p>
          <div>
           <Form.Item label=" Message" >
               <Input value={message} onChange={ (e)=> setMessage(e.target.value)}/>
           </Form.Item>
          </div>
          <Button loading={loading} disabled={loading} onClick={()=>addMessage(message,schoolSetting._id)} type="primary" > Save Message</Button>
        </Modal>
         <List
            header={
             <div style={{textAlign:"center"}}>
             <Typography.Title level={4}> School notification For Result   <Button type="primary" onClick={()=>setShowModal(true)} style={{marginLeft:"1rem"}} icon="plus"> Add notification </Button> </Typography.Title> 
            </div>
            }
            footer={null}
            bordered
            dataSource={not}
            renderItem={item => (
            <List.Item>
              <div style={{textAlign:"start"}}>
                  <Typography.Text strong style={{fontSize:"100%"}} editable={false} >{item}  </Typography.Text>
              </div>
              <div style={{textAlign:"end"}}>
              <Popconfirm onConfirm= {()=>handleNoticeDelete(item,schoolSetting._id)}  placement="topLeft" title="Are You sure you want to delete this notification">
                  <Button loading={loading} disabled={loading} style={{margin:"1rem"}} type="danger"> Delete </Button>
              </Popconfirm>
              </div>
             </List.Item>
              )}
            />
        </div>
      </Card>
    )
 
}


export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    try {
      const store = ctx.store
      let data =  await AuthToken.fromNext(ctx)
      await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
      await store.dispatch(getSchoolsSetting(data.decodedToken.school))
      let notices =    await getNotices(data.decodedToken.school)
      let propStore =  await store.getState() 
      return {
        props:{ 
          notices:notices,
          schoolSetting:propStore.schools.settings
        }
      }  
    }
    catch(error){
       redirectError(ctx)
    }
   }
)
export default NoticePage;