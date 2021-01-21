import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';
import moment from 'moment'
import Router  from 'next/router';


const StudentTable= ({student})=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   const columns = [
    {
      title: 'Admission Number',
      width: state.mobile ?150:163,
      dataIndex: 'admissionNumber',
      key: 'regNo',
      fixed: 'left',
    },
    {
      title: 'Name',
      width: state.mobile?100:150,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      width: state.mobile?100:150,
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Passport',
      width: state.mobile?100:150,
      dataIndex: 'passport',
      key: 'age',
      render: (x) =>( 
        <div style={{ textAlign: "center"}}>
              <Avatar style={{width:state.mobile?50:70, height:state.mobile?50:70}} size="large" src={x} />
        </div>
      )
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: '1',
      width:state.mobile?100:150,
    },
    {
      title: 'Arm',
      dataIndex: 'arm',
      key: '2',
      width: state.mobile?100:150,
      render: (x, data) =>( 
             <span> {data.class+" "+x}</span>
      )
    },
    {
      title: 'State of Origin',
      dataIndex: 'state',
      key: '3',
      width: state.mobile?100:150,
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: '5',
      width: state.mobile?100:150,
      render: (x) =>( 
             <span> {x===true ? "Male": "Female"}</span>
      )
    },
    {
      title: 'Date of birth',
      dataIndex: 'dob',
      key: '4',
      width: state.mobile?100:150,
      render: (x) =>( 
        <div style={{ textAlign: "center"}}>
             <span> {moment(x).format("DD/MM/YYYY")}</span>
        </div>
      )
    },
    {
      title: 'Action',
      key: 'operation',
      fixed: 'right',
      width: state.mobile?100:150,
      render: (x) =>(
        <Button onClick= {()=>{
           Router.push(`/students/edit/${ !x.admissionNumber? "empty" :x.admissionNumber.replaceAll("/","-")}`)
        }}  type="primary" htmlType="submit">
         <Icon type="edit" />
         Edit
      </Button>
      )
    },
  ];
  

  React.useEffect(() => {
    setTableHeight(window.innerHeight-280)
  }, []);
   return(
    <Table 
     columns={columns}    
     bordered
     size="default"
     pagination={{ pageSize: 10 }}  loading={student.loading} dataSource={student.students} scroll={{ x: state.mobile?950:1500, y: tableHeight }} />
   )
}
  
 
 
export default StudentTable ;
