import React from 'react';
import {Archive,Edit,Printer,Save,Trash,User,CreditCard,MessageCircle,Home,MoreHorizontal,} from 'react-feather';
import { Col, Menu,message, Row,Icon,DatePicker, Card,Dropdown,Spin, Statistic} from 'antd';

import StatCard from '../shared/StatCard';
import { theme } from '../styles/GlobalStyles';
import styled from 'styled-components';
import {
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis,
  Hint
} from 'react-vis';


 
const ViewStatsScratchCard = () => {
  return (
    <Row>
    <Col  xs={8} sm={8} md={8} >
      <Statistic title="Generated Cards" value={100}  />
    </Col>
    <Col   xs={8} sm={8} md={8}>
      <Statistic title="Used  Cards" value={90} suffix="/ 100" />
    </Col>
    <Col   xs={8} sm={8} md={8}>
       <Statistic  title="Unused  Cards" value={10}   suffix="/ 100" />
    </Col>
  </Row>
  );
}
 
ViewStatsScratchCard.propTypes = {};
 
export default ViewStatsScratchCard;