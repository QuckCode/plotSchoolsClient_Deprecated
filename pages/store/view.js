import { Card } from 'antd';
import Meta from 'antd/lib/card/Meta';
import Messages from '../../components/Messages';
import { PrivateRoute } from '../../components/PrivateRoute';

const StorePage = () => {
  return (
    <Card
         hoverable style={{ width: 240 }} cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}>
        <Meta title="Europe Street beat" description="www.instagram.com" />
  </Card>
  )
}

export default PrivateRoute(StorePage);
