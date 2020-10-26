import { Card, Col, Row, Switch } from 'antd';

import MockPricing from '../demos/mock/pricing';
import PricingTable from './shared/Pricing';
import { useState } from 'react';

const Pricing = () => {
  const [annual, setAnnual] = useState(false);
  return (
    <>
    <div style={{height:'100%', margin:10, backgroundColor:'##f0f0f0'}}>
        <Row type="flex" justify="space-around" gutter={10}>
          {MockPricing.map((item, index) => (
            <Col
              className={` ${MockPricing.length - 1 !== index ? '' : ''}`}
              key={index}
              xl={6}
              md={12}
              sm={24}
              xs={24}
            >
              <PricingTable
                title={item.title}
                subtitle={item.subtitle}
                description={item.description}
                price={!annual ? item.price : item.price * 12 * 0.9}
                features={item.features}
                icon={item.icon}
              />
            </Col>
          ))}
        </Row>
        </div>
    </>
  );
};

export default Pricing;
