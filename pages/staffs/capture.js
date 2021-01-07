import React, { useState } from 'react'
import { Card, Divider, Row, Typography, Button, Col,Modal } from 'antd';
import styled from 'styled-components';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import {
  Printer,
  Download,
  Phone,
  Mail,
  MapPin
} from 'react-feather';
import { PrivateRoute } from '../../components/PrivateRoute';


const StaffCapturePage = (props) =>{

  return (
        <Card 
        title="Print Staff Form"
        bodyStyle={{ padding: '1rem' }}> 
         
       </Card>
  )
};


export default PrivateRoute(StaffCapturePage);
