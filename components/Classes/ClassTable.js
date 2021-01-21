import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../shared/AppProvider';


const ClassTable= ({classes})=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   const columns = [
    {
      title: 'Class',
      width: state.mobile?100:150,
      dataIndex: 'name',
      key: 'name',
    },
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

  React.useEffect(() => {
    setTableHeight(window.innerHeight-280)
  }, []);
   return(
    <Table 
     columns={columns}    
     bordered
     size="default"
       pagination={false} dataSource={classes.classes}  loading={classes.loading} scroll={{ x: state.mobile?200:300 }} />
   )
}
  
 
 
export default ClassTable ;