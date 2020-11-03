import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import { getAllDepartments, getAllTest } from '../../redux/actions/test';
import { getAllBehaviour } from '../../redux/actions/behaviour';
import RegisterBehaviourType from '../../components/Behaviour/RegisterBehaviourType';
import BehaviourTable from '../../components/Behaviour/BehaviorTable';


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


const BehaviourViewPage = ({getAllBehaviour, behaviour}) =>{
  useEffect(() => {
    getAllBehaviour()
     return () => {
      getAllBehaviour()
     }
    }, [])
  return (
        <Card 
          title="View  Behaviour"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
              <div className="p-4">
                 <BehaviourTable behaviour={behaviour} />
              </div>
       </Card>
  )
};

const mapStateToProps = state => ({
  behaviour:state.behavior
 });
 
 const mapDispatchToProps = {
   getAllBehaviour:getAllBehaviour
 };

export default connect(mapStateToProps, mapDispatchToProps)(BehaviourViewPage);
