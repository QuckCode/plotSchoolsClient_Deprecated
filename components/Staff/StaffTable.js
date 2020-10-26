import React from 'react'
import { Table, Button , Icon, Avatar} from 'antd';
import { useAppState } from '../../components/shared/AppProvider';


const StaffTable= ({staff})=>{
   const [tableHeight, setTableHeight] = React.useState(0)
   const [state] = useAppState()
   const columns = [
    {
      title: 'Reg Number',
      width: state.mobile ?100:150,
      dataIndex: 'regNumber',
      key: 'regNumber',
      // fixed: 'left',
    },
    {
      title: 'Name',
      width: state.mobile?100:150,
      dataIndex: 'name',
      key:"name",
      render: (name) =>( 
        <span> {`${name.firstName} ${name.middleName? name.middleName :""} ${name.srnName} `}</span>
      )
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
      title: 'Passport',
      width: state.mobile?100:150,
      dataIndex: 'passport',
      key: 'passport',
      render: (passport) =>( 
        <div style={{ textAlign: "center"}}>
              <Avatar style={{width:state.mobile?50:70, height:state.mobile?50:70}} size="large" src={passport} />
        </div>
      )
    },
    {
      title: 'Staff Active',
      dataIndex: 'active',
      key: 'active',
      width: state.mobile?100:150,
      render: (x) =>( 
        <span> {x===true ? "Active": "Not Active"}</span>
 )
    },
    {
      title: 'Action',
      key: 'operation',
      // fixed: 'right',
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
  console.log(staff,"dd")
   return(
    <Table 
     columns={columns}    
     bordered
     size="default"
     pagination={{ pageSize: 10 }}  dataSource={staff.staffs} loading={staff.loading} scroll={{ x: state.mobile?600:800, y: tableHeight }} />
   )
}
  
 
 
export default StaffTable ;
