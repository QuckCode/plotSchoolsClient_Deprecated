import { Card, Col, Row , Icon} from 'antd';
import Meta from 'antd/lib/card/Meta';
import Messages from '../../components/Messages';
import { PrivateRoute } from '../../components/PrivateRoute';

const StorePage = () => {
  return (
    <Row justify="space-around" gutter={[24, 24]}>
       <Col lg={6} md={8} xs={12} >
          <Card
          style={{ width: 300 }}
             hoverable 
             className="storeCard"
             cover={
                <div className="storeCover">
                       <img className="storeImage" alt="example" src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png" />
                </div>
             }
             actions={[
            <Icon type="shopping-cart" key="buy" />,
            <Icon type="heart" key="like" />,
          ]}
             >
           <Meta title="Social Studies For Basic 3" />
         </Card>
         </Col>
    </Row>
  )
}

export default PrivateRoute(StorePage);
