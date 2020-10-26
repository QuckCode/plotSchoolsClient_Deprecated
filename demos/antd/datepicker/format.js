import { DatePicker } from 'antd';
import moment from 'moment';

const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const Component = () => (
  <div>
    <DatePicker
      defaultValue={moment('2015/01/01', dateFormat)}
      format={dateFormat}
    />
    <br />
    <MonthPicker
      defaultValue={moment('2015/01', monthFormat)}
      format={monthFormat}
    />
    <br />
    <RangePicker
      defaultValue={[
        moment('2015/01/01', dateFormat),
        moment('2015/01/01', dateFormat)
      ]}
      format={dateFormat}
    />
  </div>
);

export default Component;
