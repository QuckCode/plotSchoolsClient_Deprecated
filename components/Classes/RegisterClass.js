import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import { school } from '../../redux/varables';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationClass extends React.Component {

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values)
        console.log(this.props.createClass({...values,school:school}))
      }
    });
  };


  render() {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const {form, classes } = this.props
    const {loading} = classes
    return (
      <Form onSubmit={this.handleSubmit}>
         <FormItem  required  {...formItemLayout} label="Section">
        {form.getFieldDecorator('section', {  initialValue: "",rules: [ {required: true,message: 'Please select a section'}] })(
            <Select onChange= {this.handleStateChange} >
              <Option value={''}>Select  Section</Option>
              {
                this.props.sections.map(d=>(
                  <Option  value={d._id}>{d.section}</Option>
                ))
              }
            </Select>
           )}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Class Name">
            {form.getFieldDecorator('className', {rules: [ {required: true,message: 'Please input  your Class Name'}] })(<Input/>)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button disabled={loading} type="primary" htmlType="submit">
          { loading?   <Icon type="loading" />   : (<> </>) }   Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationClass);
