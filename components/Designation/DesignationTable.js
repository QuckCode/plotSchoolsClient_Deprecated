import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';
import  Router  from 'next/router';


const DesignationTable= ({designation})=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   
   const columns = [
    {
      title: 'Designation',
      width: state.mobile?100:150,
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'operation',
      width: state.mobile?100:150,
      render: (x) =>(
        <Button  onClick={()=>openEditLink(x)}  type="primary" htmlType="submit">
         <Icon type="edit" />
         Edit
      </Button>
      )
    },
  ];

  const openEditLink= (x)=>{
    Router.push(`/designation/edit/${x._id}`)
  }

  React.useEffect(() => {
    setTableHeight(window.innerHeight-280)
  }, []);
   return(
     
    <Table 
     columns={columns}    
     bordered
     size="default"
       pagination={false} loading={designation.loading} dataSource={designation.designations} scroll={{ x: state.mobile?200:300, y: tableHeight }} />
   )
}
  
 
 
export default DesignationTable ;
