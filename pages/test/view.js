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
import TestTable from '../../components/Test/TestTable';


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


const TestViewPage = ({getAllTest, test}) =>{
  useEffect(() => {
    getAllTest()
     return () => {
      getAllTest()
     }
    }, [])
  return (
        <Card 
          title="View  Tests"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
              <div className="p-4">
                  <TestTable test={test}/>
              </div>
       </Card>
  )
};

const mapStateToProps = state => ({
  test:state.test
 });
 
 const mapDispatchToProps = {
   getAllTest:getAllTest
 };

export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(TestViewPage));
