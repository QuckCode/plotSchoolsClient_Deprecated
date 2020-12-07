import React, { useState } from 'react'
import { Card, Divider, Row, Typography, Button, Col,Modal } from 'antd';
import styled from 'styled-components';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { PrivateRoute } from '../../components/PrivateRoute';

import {
  Printer,
  Download,
  Phone,
  Mail,
  MapPin
} from 'react-feather';


const StudentCapturePage = (props) =>{

  return (
        <Card 
        title="Capture student Passport"
        bodyStyle={{ padding: '1rem' }}> 
         
       </Card>
  )
};


export default PrivateRoute(StudentCapturePage);
