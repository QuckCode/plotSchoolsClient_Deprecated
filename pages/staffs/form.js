import React from 'react'
import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';

import {
  Edit,
  Printer,
  Save,
  Trash,
  Download,
} from 'react-feather';
// import StaffForm from '../../components/Staff/Form';

const Title = Typography.Title

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const StaffFormPage = (props) =>{
  return (
        <Card 
        title="Print Staff Form"
        bodyStyle={{ padding: '1rem' }}
        extra={
          <div>
            <Button style={{margin:10}}>
             <Download/> 
           </Button>
           <Button>
             <Printer/> 
           </Button>
          </div>
        }
        className="mb-4"> 
          <div className="p-4">
            <Content>
      
            </Content>
          </div>
       </Card>
  )
};


export default StaffFormPage;
