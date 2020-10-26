import { Checkbox } from 'antd';

const CheckboxGroup = Checkbox.Group;

function onChange(checkedValues) {
  console.log('checked = ', checkedValues);
}

const plainOptions = ['Apple', 'Pear', 'Orange'];
const options = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange' }
];
const optionsWithDisabled = [
  { label: 'Apple', value: 'Apple' },
  { label: 'Pear', value: 'Pear' },
  { label: 'Orange', value: 'Orange', disabled: false }
];

const Component = () => (
  <div>
    <CheckboxGroup
      options={plainOptions}
      defaultValue={['Apple']}
      onChange={onChange}
    />
    <br />
    <br />
    <CheckboxGroup
      options={options}
      defaultValue={['Pear']}
      onChange={onChange}
    />
    <br />
    <br />
    <CheckboxGroup
      options={optionsWithDisabled}
      disabled
      defaultValue={['Apple']}
      onChange={onChange}
    />
  </div>
);

export default Component;
