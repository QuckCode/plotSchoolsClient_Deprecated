
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
import ArmTable from '../../components/Arm/ArmTable';
import { getAllArms } from '../../redux/actions/arm';
import {connect} from 'react-redux'
import React from 'react'
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

const ViewArmPage = ({getAllArms, arm}) =>{
  React.useEffect(() => {
    getAllArms()
    return () => {
        // Anything in here is fired on component unmount.
        getAllArms()
    }
}, [])
  return (
        <Card 
          title="View  Arms"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
            <Content>
                 <ArmTable arm={arm}/>
            </Content>
       </Card>
  )
};
const mapStateToProps = state => ({
  arm: state.arm
});

const mapDispatchToProps = {
 getAllArms:getAllArms
};

export default  PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(ViewArmPage))