
import React from 'react'
import { Card,Row, Typography,  Menu, Dropdown, Table,Avatar, Input, Button, Popconfirm, Modal, Icon } from 'antd';
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
import { useState } from 'react';
import axios from 'axios'
import { url } from '../../redux/varables';
import { capitalize } from '../../lib/helpers';
import { AuthToken } from '../../services/authToken';
import { loginSuccess } from '../../redux/actions/auth';

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
  const [state] = useAppState()
  const [tableHeight, setTableHeight] = React.useState(0)
  const [hiddenTable, setHiddenTable] = useState(true)
  const [dataSource, setDataSource] = useState(props.testBySubject.students)


  useEffect(()=>{
    if(props.testBySubject.students.length==0){
      setHiddenTable(true)
    }
    setDataSource(props.testBySubject.students)
  },[props.testBySubject.students])

  const handleScoreChange= (e, c)=>{
    if(((parseInt(e.target.value)!==NaN)&& !(parseInt(e.target.value)>e.target.max))){
      let scoreIndex = dataSource.findIndex(x=>x.userId==c.userId)
      let scoreList = [...dataSource]
      scoreList[scoreIndex] = {...scoreList[scoreIndex], score:parseInt(e.target.value), hasScore:true}
      setDataSource(scoreList)
    }
    else{

    }
  }

  const handleScoreSheetSubmit= ()=>{
    axios.post(`${url}/student/subject/score/save`,{test:props.testBySubject.test,subject:props.testBySubject.subject,students: dataSource } )
    .then((data)=>{
         Modal.success({
          title:"Save students records successfully "
        })
    })
    .catch(err=>{
       Modal.error({
        title:err.title,
        content:err.message
      })
    })
  }

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
        return ( 
        <div style={{ textAlign: "center"}}>
              <Input type="number" onChange={(e)=>handleScoreChange(e,c)}  min={0}  max={test.marksObtainable? test.marksObtainable :0}  style={{background: (x!==0 || c.hasScore)?'white' :"#f5222dcc"}} value={x}/>
        </div>
      )
     }
    },
  ];

  const getStudentTestScore =(value, tests)=> {
    setTest(tests.find((x)=>x._id===value.testId))
    value.subjectName=props.subject.subjects.find((x)=>x._id===value.subjectId).name
    return props.getStudentTestScore(value)
    .then(x=>{
      setHiddenTable(false)
    })

  }



  React.useEffect(() => {
    setTableHeight(window.innerHeight-280)
  }, []);
  

  return (
    <>
      <Card 
        title={`${props.testBySubject.subject  && props.testBySubject.test  ? `Add score for ${ capitalize(props.testBySubject.subject.name ? props.testBySubject.subject.name :"" )}  ${ capitalize(props.testBySubject.test.name?props.testBySubject.test.name:"")} ` : `Add Score By Subject`  } `}
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-2">
              {
                !hiddenTable ?(
                  <Table size='small' scroll={true} footer={()=>(
                    <Popconfirm placement="topLeft" title={"Are you sure you want to submit this student score sheet"} onConfirm={handleScoreSheetSubmit} okText="Yes" cancelText="No">
                          <Button type="primary"> Submit  Student Score </Button>
                    </Popconfirm>
                   )} pagination={false} bordered columns={columns} dataSource={dataSource} scroll={{ x: state.mobile?600:600, y: tableHeight }}   />
                )
                :(
                  <TestScoreFormSubject disable={!hiddenTable}  handleSaveChange={()=>setHiddenTable(true)}   getStudentTestScore={getStudentTestScore} sections= {props.section.section} classes= {props.classes.classes} arms={props.arm.arms} tests={props.test.tests} subjects= {props.subject.subjects}/>
                )
             }
             { !hiddenTable? ( <Button style={{margin:10}} icon="arrow-left" onClick={()=>setHiddenTable(true)}> Go Back To Form</Button>) : (<></>) } 
          </div>
       </Card>
    </>
  )
};

const mapStateToProps = state => ({
    testBySubject : state.test.testBySubject
});


export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
   const store = ctx.store
   let data =  await AuthToken.fromNext(ctx)
   await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
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
