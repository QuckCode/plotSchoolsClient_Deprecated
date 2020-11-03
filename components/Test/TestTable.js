import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';


const TestTable= ({test})=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   const columns = [
    {
      title: 'Department',
      width: state.mobile?100:150,
      dataIndex: 'name',
      key: '_id',
    },
    {
      title: 'Maximum Max Obtainable',
      width: state.mobile?100:150,
      dataIndex: 'marksObtainable',
    },
    {
      title: 'Parentage Of Total Score',
      width: state.mobile?100:150,
      dataIndex: 'parentageOfTotal',
    },
    {
      title: 'Action',
      key: 'operation',
      width: state.mobile?100:150,
      render: () =>(
        <Button  type="primary" htmlType="submit">
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
     loading={test.loading} 
     bordered
     size="default"
       pagination={true}  dataSource={test.tests} scroll={{ x: state.mobile?200:300, y: tableHeight }} />
   )
}
  
 
 
export default TestTable ;
