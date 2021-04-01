import  React, { useState } from 'react'
import Head from 'next/head';
import { Card, Dropdown , Menu, Row} from 'antd';
import { MoreHorizontal,Save, Camera, Printer } from 'react-feather';
import { theme } from '../components/styles/GlobalStyles';
import GenerateScratchCard from '../components/ScratchCard/generateScratchCard';
import ViewScratchCard from '../components/ScratchCard/ViewScratchCard';
import DeleteScratchCard from '../components/ScratchCard/DeleteScratchCard';
import ViewStatsScratchCard from '../components/ScratchCard/ViewStatsScratchCard';


const ScratchCardPage = () => {
  const [type, setType] = useState("tab0")
  const [key, setKey] = useState("tab0")
  const tabList = [{key: "tab0", tab: 'View Stats',},{key: "tab1", tab: 'Generate Scratch Card ',},{ key: "tab2",tab: 'View Scratch Card',},{ key: "tab3",tab: 'Delete Scratch Card',},];

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
  
   const contentList = {
     tab0: <ViewStatsScratchCard/>,
     tab1: <GenerateScratchCard/>, 
     tab2: <ViewScratchCard/>,  
     tab3: <DeleteScratchCard/>,
    };
  
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
