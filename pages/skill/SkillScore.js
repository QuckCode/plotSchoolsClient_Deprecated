
import React from 'react'
import { Card,Row, Typography,  Menu, Dropdown, Table, Tag, Divider, Col,Avatar, InputNumber, Button } from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { getAllClasses} from '../../redux/actions/classes';
import { getAllSection} from '../../redux/actions/section';
import {getAllArms} from '../../redux/actions/arm'
import {getAllSkill} from '../../redux/actions/skill'
import  {connect} from 'react-redux'
import { useEffect } from 'react';
import { wrapper } from '../../redux/store';
import { useAppState } from '../../components/shared/AppProvider';
import { useState } from 'react';


const Title = Typography.Title

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

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
const SkillScore = (props) =>{
  const [test,setTest] = useState({})
  const [state] = useAppState()
  const [tableHeight, setTableHeight] = React.useState(0)
  const [hiddenTable, setHiddenTable] = useState(true)
  const columns = [
    {
      title: 'Admission Number',
      dataIndex: 'admissionNumber',
      key: 'admissionNumber',
      width:state.mobile?150:150,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width:state.mobile?150:150,
    },
    {
      title: 'Passport',
      dataIndex: 'passport',
      key: 'passport',
      width:state.mobile?150:150,
      render: (x) =>( 
        <div style={{ textAlign: "center"}}>
              <Avatar style={{width:30, height:30}} size='small' src={x} />
        </div>
      )
    },
    {
      title: `Score ${test.marksObtainable? String(test.marksObtainable) +'/' +String(100) :``}`,
      dataIndex: 'score',
      key: 'score',
      width:state.mobile?150:150,
      render: (x, c) =>{
        console.log(c.hasScore || x!==0)
        return ( 
        <div style={{ textAlign: "center"}}>
              <InputNumber  min={0}  max={20} type="danger" style={{background: (x!==0 || c.hasScore)?'white' :"#f5222dcc"}} value={x}/>
        </div>
      )
     }
    },
  ];


  React.useEffect(() => {
    setTableHeight(window.innerHeight-280)
  }, []);
  
  return (
    <>
      <Card 
        title="Add Skill Score"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-2">
           
          </div>
       </Card>
    </>
  )
};

const mapStateToProps = state => ({
    // testBySubject : state.test.testBySubject
});


export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
   await store.dispatch(getAllSkill())
   await store.dispatch(getAllArms())
   await store.dispatch(getAllSection())
   await store.dispatch(getAllClasses())
   let propStore =  await store.getState()
    return {
      props:{
       section:propStore.section,
       classes:propStore.classes,
       arm:propStore.arm,
       skill:propStore.skill
      }
    }
  }
)

const mapDispatchToProps = {
 
};


export default  PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(SkillScore));
