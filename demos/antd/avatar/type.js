import { Avatar } from 'antd';

const Component = () => (
  <div id="components-avatar-demo-basic">
    <Avatar icon="user" />
    <Avatar>U</Avatar>
    <Avatar>USER</Avatar>
    <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
    <Avatar style={{ color: '#f56a00', backgroundColor: '#fde3cf' }}>U</Avatar>
    <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
  </div>
);

export default Component;
