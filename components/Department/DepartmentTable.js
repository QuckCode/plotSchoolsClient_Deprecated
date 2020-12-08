import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';
import  Router  from "next/router"


const DepartmentTable= ({department})=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   const openEditLink= (x)=>{
    Router.push(`/departments/edit/${x._id}`)
  }

   const columns = [
    {
      title: 'Department',
      width: state.mobile?100:150,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'operation',
      width: state.mobile?100:150,
      render: (x) =>{
        return (
        <Button onClick={()=>openEditLink(x)}  type="primary" htmlType="submit">
         <Icon type="edit" />
         Edit
      </Button>
        )
      }
    },
  ];


  
  React.useEffect(() => {
    setTableHeight(window.innerHeight-280)
  }, []);
   return(
     
    <Table 
     columns={columns}   
     loading={department.loading} 
     bordered
     size="default"
       pagination={true}  dataSource={department.departments} scroll={{ x: state.mobile?200:300, y: tableHeight }} />
   )
}
  
 
 
export default DepartmentTable ;
