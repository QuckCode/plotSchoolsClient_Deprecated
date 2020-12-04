
import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import SectionTable from '../../components/Section/SectionTable';
import { getAllSection } from '../../redux/actions/section';
import {connect} from 'react-redux'
import { useEffect } from 'react';

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

const SectionViewPage = ({section, getAllSections}) =>{
  useEffect(() => {
    getAllSections()
    return () => {
        // Anything in here is fired on component unmount.
    }
}, [])
  return (
        <Card 
          title="View  Sections"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
            <Content>
               <SectionTable data={section.section} loading= {section.loading}/>
            </Content>
       </Card>
  )
};
const mapStateToProps = state => ({
  section: state.section
});

const mapDispatchToProps = {
 getAllSections: getAllSection,
};



 export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(SectionViewPage));