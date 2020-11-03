import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';


const BehaviourTable= ({behaviour,getAllBehaviour})=>{
  console.log(behaviour)
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   const columns = [
    {
      title: 'Behavior',
      width: state.mobile?100:150,
      dataIndex: 'name',
      key: '_id',
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
     loading={behaviour.loading} 
     bordered
     size="default"
       pagination={true}  dataSource={behaviour.behaviors} scroll={{ x: state.mobile?200:300, y: tableHeight }} />
   )
}
  
 
 
export default BehaviourTable ;
