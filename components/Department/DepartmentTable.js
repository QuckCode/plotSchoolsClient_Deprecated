import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';


const DepartmentTable= ()=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
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
      render: () =>(
        <Button  type="primary" htmlType="submit">
         <Icon type="edit" />
         Edit
      </Button>
      )
    },
  ];
  
  const data = [];
  for (let i = 0; i < 4; i++) {
    data.push({
      key: i,
      name: `Edrward ${i}`,
      age: 32,
      address: `London Park no. ${i}`,
    });
  }
  console.log(state.mobile)
  React.useEffect(() => {
    setTableHeight(window.innerHeight-280)
  }, []);
   return(
     
    <Table 
     columns={columns}    
     bordered
     size="default"
       pagination={false} dataSource={data} scroll={{ x: state.mobile?200:300, y: tableHeight }} />
   )
}
  
 
 
export default DepartmentTable ;
