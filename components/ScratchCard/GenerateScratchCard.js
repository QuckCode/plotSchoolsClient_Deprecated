import React from 'react';
import PropTypes from 'prop-types';
import ViewStatsScratchCard from './ViewStatsScratchCard';
import { Row, Col } from 'antd';
import GenerateForm from './GenerateForm';

 
const GenerateScratchCard = ({stats, generateScratchCardRequest}) => {
  return (
    <div>
      <Row 
      type="flex"
      align="middle"
      justify="center"
       className="px-3  mh-page">
       <Col style={{alignSelf:"center"}} span={24}>
          <ViewStatsScratchCard stats={stats}/>
       </Col>
     </Row>
     <Row 
      type="flex"
      align="middle"
      justify="center"
       className="px-3  mh-page">
       <Col style={{alignSelf:"center"}} span={24}>
           <GenerateForm generateScratchCardRequest={generateScratchCardRequest}/>
       </Col>
     </Row>
    </div>
  );
}
 
export default GenerateScratchCard;