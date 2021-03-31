import  React, { useState } from 'react'
import Head from 'next/head';
import { Card, Dropdown , Menu, Row} from 'antd';
import { MoreHorizontal,Save, Camera, Printer } from 'react-feather';
import { theme } from '../components/styles/GlobalStyles';


const ScratchCardPage = () => {
  const [type, setType] = useState("tab1")
  const [key, setKey] = useState("tab1")
  const tabList = [{key: "tab1", tab: 'Generate Scratch Card ',},{ key: "tab2",tab: 'View Scratch Card',},{ key: "tab3",tab: 'View And Delete Scratch Card',},];

  const menu = (
    <Menu>
      <Menu.Item>
        <Row type="flex" align="middle">
          <Camera size={16} strokeWidth={1} className="mr-3" />{' '}
          <span>SnapShot</span>
        </Row>
      </Menu.Item>
      <Menu.Item>
        <Row type="flex" align="middle">
          <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as pdf</span>
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
  
  const contentList = {tab1: <p>content1</p>, tab2: <p>content2</p>,  tab3: <p>content3</p>,};
  
  const  onTabChange = (key, type) => {
    setKey(key), setType(type)
  };


  return (
    <>
       <Card
          style={{ width: '100%' }}
          extra={
            <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
          }
          tabList={tabList}
          activeTabKey={key}
          onTabChange={key => {
            onTabChange(key, 'key');
          }}
        >
          {contentList[key]}
        </Card>
    </>
  )

}

export default ScratchCardPage;
