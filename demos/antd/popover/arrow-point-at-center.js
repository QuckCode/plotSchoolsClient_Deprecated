import { Popover, Button } from 'antd';

const text = <span>Title</span>;
const content = (
  <div>
    <p>Content</p>
    <p>Content</p>
  </div>
);

const Component = () => (
  <div>
    <Popover placement="topLeft" title={text} content={content}>
      <Button>Align edge / 边缘对齐</Button>
    </Popover>
    <Popover
      placement="topLeft"
      title={text}
      content={content}
      arrowPointAtCenter
    >
      <Button>Arrow points to center / 箭头指向中心</Button>
    </Popover>
  </div>
);
export default Component;
