
import React from 'react'
import { Card,Row, Typography,  Menu, Dropdown, Table, Tag, Divider, Col,Avatar } from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { getAllTest} from '../../redux/actions/test';
import { getAllClasses} from '../../redux/actions/classes';
import { getAllSection} from '../../redux/actions/section';
import { getAllSubjects} from '../../redux/actions/subject';
import {getAllArms} from '../../redux/actions/arm'
import {getStudentTestScore} from '../../redux/actions/test'
import  {connect} from 'react-redux'
import TestScoreFormSubject from '../../components/Test/TestScoreFormSubject';
import { useEffect } from 'react';
import { wrapper } from '../../redux/store';
import { useAppState } from '../../components/shared/AppProvider';


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
const TestAddPage = (props) =>{
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Passport',
      dataIndex: 'passport',
      key: 'passport',
      render: (x) =>( 
        <div style={{ textAlign: "center"}}>
              <Avatar style={{width:70, height:70}} size="large" src={x} />
        </div>
      )
    },
    {
      title: 'Score 20/100',
      dataIndex: 'score',
      key: 'score',
    },
  ];

  
  return (
    <>
      <Card 
        title="Add Test Score By Subject"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-2">
              <TestScoreFormSubject    getStudentTestScore={props.getStudentTestScore} sections= {props.section.section} classes= {props.classes.classes} arms={props.arm.arms} tests={props.test.tests} subjects= {props.subject.subjects}/>
              <Row>
                 <Col sm={24} xs={24}>
                   <Table bordered columns={columns} dataSource={props.testBySubject.students} />
                 </Col>
              </Row>
          </div>
       </Card>
    </>
  )
};

const mapStateToProps = state => ({
    testBySubject : state.test.testBySubject
});


export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
   await store.dispatch(getAllTest())
   await store.dispatch(getAllArms())
   await store.dispatch(getAllSection())
   await store.dispatch(getAllSubjects())
   await store.dispatch(getAllClasses())
   let propStore =  await store.getState()
    return {
      props:{
       section:propStore.section,
       classes:propStore.classes,
       arm:propStore.arm,
       subject:propStore.subject,
       test:propStore.test
      }
    }
  }
)

const mapDispatchToProps = {
  getStudentTestScore:getStudentTestScore
};


export default connect(mapStateToProps, mapDispatchToProps)(TestAddPage);
