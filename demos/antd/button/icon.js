import { Button } from 'antd';

const Component = () => (
  <div>
    <Button type="primary" shape="circle" icon="search" />
    <Button type="primary" icon="search">
      Search
    </Button>
    <Button shape="circle" icon="search" />
    <Button icon="search">Search</Button>
    <br />
    <Button shape="circle" icon="search" />
    <Button icon="search">Search</Button>
    <Button type="dashed" shape="circle" icon="search" />
    <Button type="dashed" icon="search">
      Search
    </Button>
  </div>
);

export default Component;
