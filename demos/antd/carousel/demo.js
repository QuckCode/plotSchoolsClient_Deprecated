import { Card, Col, Divider, Row } from 'antd';

import Autoplay from './autoplay';
import Basic from './basic';
import Fade from './fade';
import Vertical from './vertical';

class Demo extends React.Component {
  render() {
    return (
      <Row gutter={0} id="components-carousel-demo">
        <Col lg={24} md={24}>
          <Card bodyStyle={{ padding: 0 }}>
            <div>
              <Basic />
            </div>
          </Card>
        </Col>
      </Row>
    );
  }
}

export default Demo;
