import { Select, Icon } from 'antd';

const smileIcon = <Icon type="smile" />;
const mehIcon = <Icon type="meh" />;
const Option = Select.Option;

function handleChange(value) {
  console.log(`selected ${value}`);
}

const Component = () => (
  <div>
    <Select
      suffixIcon={smileIcon}
      defaultValue="lucy"
      style={{ width: 120 }}
      onChange={handleChange}
    >
      <Option value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option>
    </Select>
    <Select
      suffixIcon={mehIcon}
      defaultValue="lucy"
      style={{ width: 120 }}
      disabled
    >
      <Option value="lucy">Lucy</Option>
    </Select>
  </div>
);

export default Component;
