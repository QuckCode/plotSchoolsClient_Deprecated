
import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from 'antd';
import RegisterStaff from '../../components/Staff/RegisterStaff'
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import StudentTable from '../../components/Student/StudentTable';
import { getAllStudents } from '../../redux/actions/student';
import { connect } from 'react-redux';
import React from 'react'
const Title = Typography.Title

const Content = styled.div`
  z-index: 0;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const RegisterStaffPage = ({getAllStudents,student}) =>{
 React.useEffect(() => {
    getAllStudents()
    return () => {
        // Anything in here is fired on component unmount.
        getAllStudents()
    }
}, [])
  return (
        <Card 
          title="View  Staffs"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
            <Content>
               <StudentTable student={student}/>
            </Content>
       </Card>
  )
};

const mapStateToProps = state => ({
  student:state.student
});

const mapDispatchToProps = {
 getAllStudents:getAllStudents
};
export default connect(mapStateToProps,mapDispatchToProps)(RegisterStaffPage);
