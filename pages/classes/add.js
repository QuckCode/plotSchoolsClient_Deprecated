import {useEffect} from 'react'
import { Card, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import RegisterClass from '../../components/Classes/RegisterClass';
import { createSection, getAllSection } from '../../redux/actions/section';
import { connect} from "react-redux"
import { createClasses } from '../../redux/actions/classes';

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

const RegisterClassesPage = (props) =>{
   const {getAllSections, createClass} = props
  useEffect(() => {
    getAllSections()
    return () => {
        // Anything in here is fired on component unmount.
    }
}, [])
  return (
        <Card 
        title="Create New Class"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
            <Content>
               <RegisterClass classes= {props.classes} createClass={createClass} sections= {props.section.section}/>
            </Content>
          </div>
       </Card>
  )
};

const mapStateToProps = state => ({
  section: state.section,
  classes:state.classes

});

const mapDispatchToProps = {
 getAllSections:getAllSection,
 createClass: createClasses
};

export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(RegisterClassesPage));