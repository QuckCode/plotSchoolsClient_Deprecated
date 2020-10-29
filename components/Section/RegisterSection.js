import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import { school } from '../../redux/varables';
const FormItem = Form.Item;
const Option = Select.Option;


class RegistrationSection extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields(['section'])
        this.props.createSection({section:values.section, school:school})
      }
    });
  };
  

  render() {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const {form, loading } = this.props
    return (
      <div className="p-4">
      <Form onSubmit={this.handleSubmit}>
        <FormItem  required  {...formItemLayout} label="Section">
            {form.getFieldDecorator('section', {rules: [ {required: true,message: 'Please input  your section'}] })(<Input/>)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button disabled={loading} type="primary" htmlType="submit">
            { loading?   <Icon type="loading" />   : (<> </>) }    Register
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

export default Form.create()(RegistrationSection);
