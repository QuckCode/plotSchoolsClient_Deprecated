import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import { Component } from 'react';
const FormItem = Form.Item;
const Option = Select.Option;

class StudentByClassForm extends React.Component {
  state = {
    class:[]
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.handleSubmit({...values})
      }
    });
  };


 
  handleSectionChange= (e)=>{
      
    let currentState=this.props.classes.filter(obj => {
      return obj.sectionId === e
    })
    this.setState({class: !currentState?[] : currentState})
  }


  render() {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const {form, classes , student, sections, arms,loading} = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
         <FormItem  required  {...formItemLayout} label="Section">
        {form.getFieldDecorator('section', {  initialValue: "",rules: [ {required: true,message: 'Please select a section'}] })(
            <Select onChange= {this.handleSectionChange} >
              <Option value={''}>Select  Section</Option>
              {
                sections.map(d=>(
                  <Option  key={d._id} value={d._id}>{d.section}</Option>
                ))
              }
            </Select>
           )}
        </FormItem>
        <FormItem    {...formItemLayout} label="Class">
        {form.getFieldDecorator('classN', {initialValue:"", rules: [ {required: true,message: 'Please input  Class'}]})(
            <Select onChange={this.handleClassChange}>
              <Option value={""}>Select Your Class</Option>
              {
                this.state.class.map(d=>{
                 return   ( <Option key={d._id} value={d._id}> {d.name}</Option> )
                })
              }
            </Select>
           )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button disabled={loading} type="primary" htmlType="submit">
          { loading?   <Icon type="loading" />   : (<> </>) }    Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(StudentByClassForm);
