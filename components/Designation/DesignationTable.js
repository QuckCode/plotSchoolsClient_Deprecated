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
        <div>
        <Button  onClick={()=>openEditLink(x)}  type="primary" htmlType="submit">
         <Icon type="edit" />
         Edit
      </Button>
        <Button onClick={()=>deleteDesignation(x)}  style={{background:"red", color:'#fff', marginLeft:10}}>
          <Icon type="delete" />
              Delete
          </Button>
      </div>
      )
    },
  ];

  const deleteDesignation = (x)=>{

  }

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
     size={10}
     pagination={true}  loading={designation.loading} dataSource={designation.designations} scroll={{ x: state.mobile?200:300, y: tableHeight }} />
   )
}
  
 
 
export default DesignationTable ;
