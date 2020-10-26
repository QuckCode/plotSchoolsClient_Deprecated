
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
import RegisterArm from '../../components/Arm/RegisterArm';
import {connect} from 'react-redux'
import { getAllClasses } from '../../redux/actions/classes';
import { useEffect } from 'react';
import { createArm } from '../../redux/actions/arm';

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

const RegisterArmPage = (props) =>{
  useEffect(() => {
    props.getAllClasses()
    return () => {
        // Anything in here is fired on component unmount.
    }
}, [])
  return (
        <Card 
        title="Create New Arm"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
            <Content>
             <RegisterArm createArm={props.createArm} arm={props.arm} classes= {props.classes}/>
            </Content>
          </div>
       </Card>
  )
};

const mapStateToProps = state => ({
  classes: state.classes,
  arm:state.arm
});

const mapDispatchToProps = {
 getAllClasses: getAllClasses,
 createArm: createArm
};

export default  connect(mapStateToProps, mapDispatchToProps)(RegisterArmPage)