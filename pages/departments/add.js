import { Card, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import RegisterDepartment from '../../components/Department/RegisterDepartment';
import { connect } from 'react-redux';
import { createDepartment } from '../../redux/department/department';
import { useEffect } from 'react';
import { PrivateRoute } from '../../components/PrivateRoute';

const Title = Typography.Title

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
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

const RegisterDepartmentPage = props =>{
  return (
        <Card 
        title="Create New Department"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
             <RegisterDepartment department={props.department} createDepartment={props.createDepartment}/>
          </div>
       </Card>
  )
};

const mapStateToProps = state => ({
 department:state.departments
});

const mapDispatchToProps = {
  createDepartment:createDepartment
};

export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(RegisterDepartmentPage));