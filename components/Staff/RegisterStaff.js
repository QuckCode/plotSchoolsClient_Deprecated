import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import {
 Image
} from "react-feather"
import Webcam from 'react-webcam';
import { school } from '../../redux/varables';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationStaff extends React.Component {
  webcamRef = React.createRef()
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    image:"",
    takePassport :false,
    valid:false
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.form)
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.createStaff({...values, dob:values.dob._d, employmentDate:values.employmentDate._d, school:school})
      }
    });
  };


  render() {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const videoConstraints = { width: 500, height: 500,facingMode: "user"};
    const {form, staff, departments, designations} = this.props
    return (
      <div className="p-4">
      <Form onSubmit={this.handleSubmit}>
          <FormItem name="firstName"   required {...formItemLayout} label="First Name">
          {form.getFieldDecorator('firstName', {rules: [ {required: true,message: 'Please input  First Name'}] })(<Input />)}
        </FormItem>
        <FormItem name="middleName" required {...formItemLayout} label="Middle Name">
        {form.getFieldDecorator('middleName')(<Input />)}
        </FormItem>
        <FormItem name="lastName" required  {...formItemLayout} label="Surname">
        {form.getFieldDecorator('srnName', {rules: [ {required: true,message: 'Please input Name'}] })(<Input />)}
        </FormItem>
        <FormItem name="dob" required  {...formItemLayout} label="Date Of Birth">
        {form.getFieldDecorator('dob', {rules: [ {required: true,message: 'Please input Dob'}] })(<DatePicker />)}
        </FormItem>
        <FormItem name="email"  required  {...formItemLayout} label="E-mail">
        {form.getFieldDecorator('email', {rules: [ {required: true,message: 'Please input Email'}] })(<Input />)}
        </FormItem>
        <FormItem name="phone"  required  {...formItemLayout} label="Phone Number">
            {form.getFieldDecorator('phone', {rules: [ {required: true,message: 'Please input phone'}] })(<Input/>)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Gender">
           {form.getFieldDecorator('gender', { initialValue: "", rules: [ {required: true,message: 'Please input  Gender'}] })(
            <Select>
              <Option value={""}>Please Select a gender</Option>
              <Option value={1}>Male</Option>
              <Option value={2}>Female</Option>
            </Select>
           )}
        </FormItem>
        <FormItem name="employmentDate" requiredMark required  {...formItemLayout} label="Employment date">
        {form.getFieldDecorator('employmentDate', {rules: [ {required: true,message: 'Please input Employment Date'}] })(<DatePicker showToday={false} />)}
        </FormItem>
        <FormItem name="designation"  required  {...formItemLayout} label="Designation">
        {form.getFieldDecorator('designation', {initialValue:"", rules: [ {required: true,message: 'Please input designation'}]})(
            <Select>
              <Option value={""}>Select Your Designation</Option> 
              {
                 designations.map(value=>(
                  <Option key={value._id} value={value._id}>{value.name}</Option> 
                 ))
              }
            </Select>
           )}
        </FormItem>
        <FormItem name="department"   required  {...formItemLayout} label="Department">
        {form.getFieldDecorator('department', {initialValue:"", rules: [ {required: true,message: 'Please input department'}]})(
            <Select>
              <Option value={""}>Select Your Department</Option>
              {
                 departments.map(value=>(
                  <Option key={value._id} value={value._id}>{value.name}</Option> 
                 ))
              }
            </Select>
           )}
        </FormItem>
        <FormItem  {...tailFormItemLayout}>
          <Button disabled={staff.loading} loading={staff.loading} type="primary" htmlType="submit">
          { staff.loading?   <Icon type="loading" />   : (<> </>) }    Save
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

export default   Form.create()(RegistrationStaff);
