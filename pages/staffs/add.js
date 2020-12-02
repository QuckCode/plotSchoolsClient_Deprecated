import React, { useEffect } from 'react'
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
import { createStaff, getAllStaffs } from '../../redux/actions/staff';
import { connect } from 'react-redux';
import { getAllDesignations } from '../../redux/actions/designation';
import { getAllDepartments } from '../../redux/actions/department';
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

const RegisterStaffPage = (props) =>{
  useEffect(()=>{
    props.getAllDepartments()
    props.getAllDesignations()
  },[])
  return (
        <Card 
        title="Create New Staff"
        extra={
          <>
           <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
          </>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
            <Content>
               <RegisterStaff designations={props.designations.designations} departments= {props.departments.departments} staff={props.staff} createStaff={props.createStaff}/>
            </Content>
          </div>
       </Card>
  )
};

const mapStateToProps = state => ({
  staff:state.staff,
  designations:state.designation,
  departments:state.departments
});

const mapDispatchToProps = {
  createStaff: createStaff,
  getAllStaff:getAllStaffs,
  getAllDesignations:getAllDesignations,
  getAllDepartments:getAllDepartments
};


export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(RegisterStaffPage));
