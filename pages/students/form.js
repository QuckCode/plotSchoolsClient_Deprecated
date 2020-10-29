import React from 'react'
import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import {
  Printer,
  Download,
} from 'react-feather';
import dynamic from 'next/dynamic';
import { PDFJS } from 'pdfjs-dist';

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
             <Button>
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
