import React, {useState} from 'react'
import { Card, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,Printer,
  Save,
  Trash,
} from 'react-feather';
import RegisterSection from '../../components/Section/RegisterSection';
import {connect} from 'react-redux'
import { createSection } from '../../redux/actions/section';
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

const RegisterSectionPage = (props) =>{
  const {section, createSection}= props
  return (
        <Card 
        title="Create New Section"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
            <Content>
              <RegisterSection createSection= {createSection}  loading={section.loading}/>
            </Content>
          </div>
       </Card>
  )
};

const mapStateToProps = state => ({
  section: state.section
});

const mapDispatchToProps = {
 createSection:createSection
};


export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(RegisterSectionPage))