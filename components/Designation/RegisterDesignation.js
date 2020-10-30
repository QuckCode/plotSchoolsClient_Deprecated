import {Button,Form,Input, Modal} from 'antd';
import { school } from '../../redux/varables';

const FormItem = Form.Item;


const  RegistrationDesignation = ({ createDesignation,form})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    return (
      <div className="p-4">
      <Form onSubmit= {(e)=>{
           e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              createDesignation({...values, school:school })
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
        <FormItem {...formItemLayout} label="Designation">
        {form.getFieldDecorator('name', {rules: [ {required: true,message: 'Please input designation'}] })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }

export default  Form.create()(RegistrationDesignation);
