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
import PropTypes from 'prop-types'


 
const ViewStatsScratchCard = ({stats}) => {
   const  {totalScratchCard ,totalUsedScratchCard, totalNotUsedScratchCard  }  = stats
  return (
    <Row>
    <Col  xs={8} sm={8} md={8} >
      <Statistic title="Generated Cards" value={totalScratchCard}  />
    </Col>
    <Col   xs={8} sm={8} md={8}>
      <Statistic title="Used  Cards" value={totalUsedScratchCard } suffix={`/ ${totalScratchCard}`} />
    </Col>
    <Col   xs={8} sm={8} md={8}>
       <Statistic  title="Unused  Cards" value={totalNotUsedScratchCard}  suffix={`/ ${totalScratchCard}`} />
    </Col>
  </Row>
  );
}
 
ViewStatsScratchCard.propTypes = {
   stats: PropTypes.shape({
    totalScratchCard: PropTypes.number,
    totalUsedScratchCard: PropTypes.number,
    totalNotUsedScratchCard:PropTypes.number,
  })
};
 
export default ViewStatsScratchCard;