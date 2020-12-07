
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
import StaffTable from '../../components/Staff/StaffTable';
import DepartmentTable from '../../components/Department/DepartmentTable';
import SectionTable from '../../components/Section/SectionTable';
import ClassTable from '../../components/Classes/ClassTable';
import { getAllClasses } from '../../redux/actions/classes';
import {connect} from 'react-redux'
import {useEffect} from 'react'
import { PrivateRoute } from '../../components/PrivateRoute';

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

const ViewClassesPage = ({classes, getAllClasses}) =>{
  useEffect(() => {
    getAllClasses()
    return () => {
        // Anything in here is fired on component unmount.
        getAllClasses()
    }
}, [])
  return (
        <Card 
          title="View  Classes"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
            <Content>
               <ClassTable classes = {classes} />
            </Content>
       </Card>
  )
};

const mapStateToProps = state => ({
  classes: state.classes
});

const mapDispatchToProps = {
 getAllClasses: getAllClasses
};

export default  PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(ViewClassesPage));