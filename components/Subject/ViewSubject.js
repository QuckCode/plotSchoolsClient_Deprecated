import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';


const SubjectTable= ({loading, data})=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   const columns = [
    {
      title: 'Subject',
      width: state.mobile?100:150,
      dataIndex: 'name',
      key: 'subject',
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
        </div>
      )
    },
  ];
  
  // const datas = [];
  // for (let i = 0; i < 4; i++) {
  //   datas.push({
  //     key: i,
  //     name: `Edrward ${i}`,
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
       pagination={true} dataSource={data} scroll={{ x: state.mobile?200:300, y: tableHeight }} />
   )
}
  
 
 
export default  SubjectTable ;