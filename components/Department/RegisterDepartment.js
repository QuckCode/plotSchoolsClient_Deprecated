import {Button,Form,Input, Modal, Icon} from 'antd';
import { school } from '../../redux/varables';

const FormItem = Form.Item;


const  RegistrationDepartment = ({form, createDepartment, department})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    console.log(form)
    return (
      <div className="p-4">
      <Form onSubmit= {(e)=>{
         e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              createDepartment({...values, school:school })
              .then(()=>{
               Modal.success({
                 content: 'Created Designation Successfully ',
                 });
                }
              )
              .catch(err=>{
                Modal.error({
                  title:err.title,
                  content:err.message
                })
              })
              
            }
          });
      }}>
        <FormItem {...formItemLayout} label="Department">
        {form.getFieldDecorator('name', {rules: [ {required: true,message: 'Please Input  Department'}] })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button disabled={department.loading} type="primary" htmlType="submit">
          { department.loading?   <Icon type="loading" />   : (<> </>) }    Register
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }

export default  Form.create()(RegistrationDepartment);
