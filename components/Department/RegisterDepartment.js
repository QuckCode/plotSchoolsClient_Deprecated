import {Button,Form,Input} from 'antd';

const FormItem = Form.Item;


const  RegistrationDepartment = ({form})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    return (
      <Form onSubmit= {(e)=>{
             e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              console.log(values)
  
            }
          });
      }}>
        <FormItem {...formItemLayout} label="Department">
        {form.getFieldDecorator('Department', {rules: [ {required: true,message: 'Please input  department'}] })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }

export default  Form.create()(RegistrationDepartment);
