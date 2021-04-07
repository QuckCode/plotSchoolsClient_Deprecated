import React from 'react';
import PropTypes from 'prop-types';
import ViewStatsScratchCard from './ViewStatsScratchCard';
import { Row, Col, Card } from 'antd';
 
const DeleteScratchCard =  ({stats}) => {
  const gridStyle = {
    width: '50%',
    textAlign: 'center',
  };
  return (
    <div>
     <Row 
      type="flex"
      align="middle"
      justify="center"
       className="px-3  mh-page">
       <Col style={{alignSelf:"center"}} span={24}>
          <ViewStatsScratchCard  stats={stats} />
          <div style={{margin:20}}>
             <Card title=" View Scratch Card"  style={{background:"rgba(242, 242, 242, 0.5)", borderWidth:10, borderColor:"rgba(0,0,0,0.1)"}}>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid hoverable={false} style={gridStyle}>
                  Content
                </Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
                <Card.Grid style={gridStyle}>Content</Card.Grid>
            </Card>
          </div>
       </Col>
     </Row>
    </div>
  );
}
 
 
export default DeleteScratchCard;