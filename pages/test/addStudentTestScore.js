
import React from 'react'
import { Card,Row, Typography,  Menu, Dropdown, Table,Input, Divider, Col,Avatar, Modal, Button , Pagination, Popconfirm} from 'antd';
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
import {getAllStudentAndSubject} from '../../redux/actions/test'
import  {connect} from 'react-redux'
import TestScoreForm from '../../components/Test/TestScoreForm';
import { useEffect } from 'react';
import { wrapper } from '../../redux/store';
import { useAppState } from '../../components/shared/AppProvider';
import { useState } from 'react';
import axios from 'axios';
import {url} from '../../redux/varables'
const { Search } = Input;


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
  const [test,setTest] = useState({})
  const [hiddenTable, setHiddenTable] = useState(true)
 const [position, setPosition] = useState(1)
  const [dataSource, setDataSource] = useState(props.testByStudent.students)


  useEffect(()=>{
    if(props.testByStudent.students.length==0){
      setHiddenTable(true)
    }
    setDataSource(props.testByStudent.students)
  },[props.testByStudent.students])


  
  const onSearch = value => console.log(value);

  const getStudentTestScore =(value, tests)=> {
    setTest(tests.find((x)=>x._id===value.testId))
    return props.getAllStudentAndSubject(value)
    .then(err=>{
      setHiddenTable(false)
    })
  }

  const handleScoreChange= (e, c)=>{
    if(((parseInt(e.target.value)!==NaN)&& !(parseInt(e.target.value)>e.target.max))){
      let scoreIndex = dataSource.findIndex(x=>x.userId==c.userId)
      let scoreList = [...dataSource]
       let subjectIndex = scoreList[scoreIndex].studentTestScore.findIndex(x=>x.subjectId==c.subjectId)
       scoreList[scoreIndex].studentTestScore[subjectIndex].score=parseInt(e.target.value)
      setDataSource(scoreList)
    }
    else{

    }
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: `Score ${test.marksObtainable? String(test.marksObtainable) +'/' +String(100) :``}`,
      dataIndex: 'score',
      key: 'score',
      render: (x, c) =>{
        return ( 
        <div style={{ textAlign: "center"}}>
              <Input type="number" onChange={(e)=>handleScoreChange(e,c)}  min={0}  max={test.marksObtainable? test.marksObtainable :0}  style={{background: (x!==0 || c.hasScore)?'white' :"#f5222dcc"}} value={x}/>
        </div>
      )
     }
    },
  ];

  const onConfirm = ()=>{
   axios.post(`${url}/student/score/save`, {student: dataSource[position-1]})
   .then(data=>{
    Modal.success({
      title:"Save Student Data Successfully "
    })
   })
   .catch(err=>{
    Modal.error({
      title:err.title,
      content:err.message
    })
   })
  }

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

              {
                hiddenTable
                ?(
                  <TestScoreForm  getStudentTestScore={getStudentTestScore} sections= {props.section.section} classes= {props.classes.classes} arms={props.arm.arms} tests={props.test.tests} subjects= {props.subject.subjects}/>
                ):(
                   <div>
                     <Row gutter={[48,0]}>
                      <Col xs={24} lg={9} style={{paddingBottom:20}} span={9} >
                         <Search placeholder="Admission Number" enterButton="Search" size="large" onSearch={onSearch} />
                      </Col>
                      <Col xs={12} lg={8} style={{paddingBottom:20}} span={8}>
                           <Pagination onChange={(e)=>setPosition(e)} simple defaultCurrent={1} total={dataSource.length*10} />
                      </Col>
                      <Col xs={12} lg={7} style={{paddingBottom:20}} span={7}>
                         <Typography.Text strong level={4}> Student 1 of {dataSource.length} </Typography.Text>
                      </Col>
                     </Row>
                     <Divider/>
                     
                     <Row gutter={[48, 48]}>
                      <Col span={16}>
                         <Typography.Text strong level={4}> Name Of Student: {dataSource[position-1]? dataSource[position-1].name :""}  </Typography.Text>
                         <br/>
                         <br/>
                         <Typography.Text strong level={4}> Admission Number: {dataSource[position-1]? dataSource[position-1].admissionNumber:""}  </Typography.Text>
                      </Col>
                      <Col span={7}>
                           <Avatar style={{width:100, height:100}} shape="square" size="large"  src={dataSource[position-1]? dataSource[position-1].passport:""}/>
                      </Col>
                     </Row>
                     <Row gutter={[48, 48]}>
                      <Col xs={24} lg={12}  span={12}>
                      <Table size='small' footer={()=>(
                          <Popconfirm placement="topLeft" onConfirm={onConfirm} title={"Are you sure you want to submit this student score sheet"}  okText="Yes" cancelText="No">
                              <Button type="primary"> Submit  Student Score </Button>
                        </Popconfirm>
                        )} pagination={false} bordered columns={columns} dataSource={dataSource.length>0?dataSource[position-1].studentTestScore:[] }   />

                      </Col>          
                     </Row>

                   </div>
                )
              }
              <Row>
              { hiddenTable? ( <></>) : (<Button style={{margin:10}} icon="arrow-left" onClick={()=>setHiddenTable(true)}> Go Back To Form</Button>) } 
              </Row>
          </div>
       </Card>
    </>
  )
};

const mapStateToProps = state => ({
    testByStudent : state.test.testByStudent
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
 getAllStudentAndSubject
};


export default connect(mapStateToProps, mapDispatchToProps)(TestAddPage);
