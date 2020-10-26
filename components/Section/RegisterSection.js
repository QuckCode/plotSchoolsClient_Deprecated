import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;


class RegistrationSection extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.form.resetFields(['section'])
        this.props.createSection({section:values.section, school:"5f8c7ee1b9776e05f105a6db"})
      }
    });
  };
  

  render() {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const {form, loading } = this.props
    console.log(loading)
    return (
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
    );
  }
}

export default Form.create()(RegistrationSection);
