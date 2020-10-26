import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';


const SectionTable= ({loading, data})=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   const columns = [
    {
      title: 'Section',
      width: state.mobile?100:150,
      dataIndex: 'section',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'operation',
      width: state.mobile?100:150,
      render: () =>(
        <div>
           <Button  type="primary" htmlType="submit">
             <Icon type="edit" />
              Edit
          </Button>
          <Button  style={{background:"red", color:'#fff', marginLeft:10}}>
          <Icon type="delete" />
              Delete
          </Button>
        </div>
      )
    },
  ];
  
  // const data = [];
  // for (let i = 0; i < 4; i++) {
  //   data.push({
  //     key: i,
  //     name: `Edrward ${i}`,
  //     age: 32,
  //     address: `London Park no. ${i}`,
  //   });
  // }
  console.log(state.mobile)
  React.useEffect(() => {
    setTableHeight(window.innerHeight-280)
  }, []);
   return(
    <Table 
     columns={columns}    
     bordered
     size="default"
     loading={loading}
       pagination={false} dataSource={data} scroll={{ x: state.mobile?200:300, y: tableHeight }} />
   )
}
  
 
 
export default SectionTable ;