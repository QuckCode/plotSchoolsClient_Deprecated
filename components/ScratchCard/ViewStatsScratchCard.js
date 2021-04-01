import React from 'react';
import {Archive,Edit,Printer,Save,Trash,User,CreditCard,MessageCircle,Home,MoreHorizontal,} from 'react-feather';
import { Col, Menu,message, Row,Icon,DatePicker, Card,Dropdown,Spin} from 'antd';

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
    <Row gutter={16}>
       <Col xs={24} sm={8} md={8}>
         <StatCard
            type="fill"
            title="Total  Scratchcards "
            value={10}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
       </Col>
       <Col xs={24} sm={8} md={8}>
         <StatCard
            type="fill"
            title="Total Used Scratchcards "
            value={10}
            color={theme.primaryColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
       </Col>
       <Col xs={24} sm={8} md={8}>
         <StatCard
            type="fill"
            title="Total  UnUsed Scratchcards "
            value={10}
            color={theme.warningColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
       </Col>
    </Row>
  );
}
 
ViewStatsScratchCard.propTypes = {};
 
export default ViewStatsScratchCard;