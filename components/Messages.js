import {
  Button,
  Col,
  DatePicker,
  Drawer,
  Form,
  Input,
  Layout,
  List,
  Menu,
  Row,
  Select,
  Spin,
  Alert,
  Modal,
  Typography
} from 'antd';
import {
  MessageCircle,
  User,
  Inbox,
  ExternalLink, Send, CreditCard
} from 'react-feather';

import distanceInWordsToNow from 'date-fns/distance_in_words_to_now';
import format from 'date-fns/format';
import styled from 'styled-components';
import { useAppState } from './shared/AppProvider';
import { useState } from 'react';
import { capitalize } from '../lib/helpers';
import BulkMessageStepper from './BulkMessage/BulkMessageStep';
import BuyAirtimeStepper from './Airtime/BuyAirtimeStep'

const { Sider } = Layout;
const { Option } = Select;

const Fab = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 1;
  width: 40px;
  right: 2rem;
  padding: 0 2rem;
  margin-bottom: 2rem;
`;

const Messages = ({ form, onTabChange, loading, message, index, bulkModal, airtimeModal, setBulkModal, setAirtimeModal, balance} = props) => {
  const [state] = useAppState();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [replyBox, setBox] = useState(false);
  const [navigation, setNavigation] = useState(false);
  const [messages, setMessages] = useState(false);
  const selectedMessage = message[selectedIndex];

  const createMarkup = body => {
    return { __html: body };
  };

  const navigationSidebar = (
    <div className="h-100">
      <div className="p-4">
        <Button type="primary" onClick={() =>  {
          form.resetFields(["phone","message"])
          setBox(!replyBox)
          }}>
          Compose
        </Button>
      </div>
      <div className="px-4">
        <small>
          <b>Sms Box</b>
        </small>
      </div>
      <Menu mode="inline" className="mb-3 border-right-0">
        <Menu.Item onClick={onTabChange} key="1" className={`${index =="1" ? "ant-menu-item-selected" :""}`} >
             <a>
               <span className="anticon"><ExternalLink  strokeOpacity={1} size={16}/> </span>
                    <span className="mr-auto">{capitalize("Outbox")}</span>
            </a>
        </Menu.Item>
        <Menu.Item onClick={ (e)=>{
             onTabChange(e)
             setAirtimeModal(false)
             setBulkModal(true)
          }} key="2" className={`${index =="2" ? "ant-menu-item-selected" :""}`} >
             <a>
               <span className="anticon"><Send  strokeOpacity={1} size={16}/> </span>
                    <span className="mr-auto">{capitalize("Bulk SMS")}</span>
            </a>
        </Menu.Item>
        <Menu.Item  onClick={ (e)=>{
             onTabChange(e)
             setAirtimeModal(true)
             setBulkModal(false)
          }}  key="3"  className={`${index =="3" ? "ant-menu-item-selected" :""}`} >
             <a>
               <span className="anticon"><CreditCard strokeOpacity={1} size={16}/> </span>
                    <span className="mr-auto">{capitalize("Buy Airtime")}</span>
            </a>
        </Menu.Item>
      </Menu>
    </div>
  );
   

  const messagesSidebar = (
    <div
    css={`
      display: flex;
      flex: 1;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      border-right: 1px solid rgba(0, 0, 0, 0.05);
    `}
  >
      <div style={{height:"8%", textAlign:"center", justifyContent:"center", marginTop:10}}>
             <Typography.Text style={{marginTop:10}} className="mr-auto"> Available Sms Units {balance} </Typography.Text>
      </div>
      <List
        className="scroll-y flex-1 bg-transparent px-3 py-1"
        itemLayout="horizontal"
        loading={loading}
        dataSource={message}
        renderItem={(item, index) => (
          <List.Item
            onClick={() => setSelectedIndex(index)}
            style={{
              backgroundColor: selectedIndex === index ? '#e6f7ff' : ''
            }}
            className={`${
              selectedIndex === index ? '' : 'border-0'
            } rounded border-0 p-3`}
          >
            <List.Item.Meta
              avatar={item.avatar}
              title={
                <small
                  css={`
                    display: flex;
                    width: 100%;
                  `}
                >
                  <span>{`${item.from }\n`}</span>
                  <span className="mr-auto" />
                  <br/>
                  <span>{distanceInWordsToNow(new Date(item.date))}</span>
                </small>
              }
            />
          </List.Item>
        )}

      /> 
   </div>
  );

  const allModal = (
    <div>
       <Modal
          title=" Send Bulk Message"
          visible={bulkModal}
          onOk={ ()=> setBulkModal(false)}
          onCancel={()=>setBulkModal(false)}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          footer={null}
          width={700}
        >
           <BulkMessageStepper/>
        </Modal>
        <Modal
          title="Buy Airtime"
          visible={airtimeModal}
          cancelButtonProps={{ style: { display: 'none' } }}
          okButtonProps={{ style: { display: 'none' } }}
          onOk={()=> setAirtimeModal(false)}
          onCancel={()=>setAirtimeModal(false)}
          footer={null}
          width={700}
        >
         <BuyAirtimeStepper/>
        </Modal>
    </div>

);


  return (
    <d>
      <Layout className="fill-workspace rounded shadow-sm overflow-hidden">
        {!state.mobile && <Sider width={150}>{navigationSidebar}</Sider>}
        
        <Drawer
          closable={false}
          width={150}
          placement="left"
          onClose={() => setNavigation(false)}
          visible={navigation}
          className="chat-drawer"
        > 
          {navigationSidebar}
        </Drawer>
        {!state.mobile && <Sider width={350}>{messagesSidebar}</Sider>}
        <Drawer
          closable={false}
          width={350}
          placement="left"
          onClose={() => setMessages(false)}
          visible={messages}
          className="chat-drawer"
        >
          {messagesSidebar}
        </Drawer>
        <div
          className="p-5 scroll-y"
          css={`
            background: #f5f5f5;
          `}
        >
          <div className={`${state.mobile ? 'px-1 py-3' : 'px-5 py-3'}`}>
            {
             message.length !==0  ? (
                <Spin
               spinning={loading} 
                delay={500}
                >
                 <div
              className="mb-3"
              css={`
                display: flex;
              `}
            >
              {selectedMessage.avatar }
              <div className="pl-3">
                <h6>{selectedMessage.from}</h6>
                <small>
                  {format(new Date(selectedMessage.date), 'MMMM Do YYYY hh:mm')}
                </small>
              </div>
            </div>
            <h5 className="my-4">{selectedMessage.subject}</h5>
            <div dangerouslySetInnerHTML={createMarkup(selectedMessage.body)} />
            <br/> <br/><br/>
            <div >
                <Button type="primary" onClick={() =>  {
                     form.resetFields(["phone","message"])
                     form.setFieldsValue({"phone":selectedMessage.from})
                     setBox(!replyBox)
                }}>
                  Send individual message
               </Button>
            </div>
            </Spin>)
            : (
            <div> 
              <Alert
                message="Error"
                description="There user you do not have any message on our platform"
                type="warning"
                showIcon
                 />
            </div>  
            )
            }

           {allModal}
            {state.mobile && (
              <Fab>
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  onClick={() => setNavigation(true)}
                  className="mb-3"
                >
                  <MessageCircle size={20} strokeWidth={1} />
                </Button>
                <span className="mr-auto" />
                <Button
                  type="primary"
                  shape="circle"
                  size="large"
                  onClick={() => setMessages(true)}
                >
                  <User size={20} strokeWidth={1} />
                </Button>
              </Fab>
            )}
          </div>
        </div>
      </Layout>

      <Drawer
        title="Compose Sms"
        width={320}
        placement="left"
        onClose={() => setBox(!replyBox)}
        maskClosable={false}
        visible={replyBox}
        style={{
          height: 'calc(100% )',
          overflow: 'auto',
        }}
      >
        <Form layout="vertical" hideRequiredMark>
          <Row gutter={0}>
            <Col span={24}>
              <Form.Item label="Phone Number">
                {form.getFieldDecorator('phone', {
                  rules: [{ required: true, message: 'please enter  receiver phone number' }]
                })(<Input placeholder="080XXXXXXX" />)}
              </Form.Item>
            </Col>

          </Row>
          <Row gutter={0}>
            <Col span={24}>
              <Form label="Message">
                {form.getFieldDecorator('message', {
                  rules: [{ required: true, message: 'please  enter the sms message' }]
                })(<Input.TextArea  placeholder="please enter the sms message " />)}
              </Form>
            </Col>

          </Row>

        </Form>
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e8e8e8',
            padding: '10px 16px',
            textAlign: 'right',
            left: 0,
            background: '#fff',
            borderRadius: '0 0 4px 4px'
          }}
        >
          <Button
            style={{
              marginRight: 8
            }}
            onClick={() => setBox(!replyBox)}
          >
            Cancel
          </Button>
          <Button onClick={() => setBox(!replyBox)}>Send</Button>
        </div>
      </Drawer>
    </d>
  );
};

export default Form.create()(Messages);
