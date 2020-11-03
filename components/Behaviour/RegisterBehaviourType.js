import {Button,Form,Input, Modal, Icon, InputNumber} from 'antd';
import { school } from '../../redux/varables';

const FormItem = Form.Item;


const  RegistrationBehaviourType = ({form, createBehaviour, loading})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    console.log(form)
    return (
      <div className="p-4">
      <Form onSubmit= {(e)=>{
         e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
               createBehaviour({...values, school:school})
               .then(()=>{
                  form.resetFields()
                  Modal.success({
                    title:"Create new  successfully"
                  })
                  form.resetFields(['name'])
               })
               .catch(err=>{
                Modal.error({
                    title:err.title,
                    content:err.message
                })
               })
            }
          });
      }}>
        <FormItem {...formItemLayout} label="Behaviour">
        {form.getFieldDecorator('name', {rules: [ {required: true,message: 'Please Input  Department'}] })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button  disabled={loading} type="primary" htmlType="submit">
          { loading?   <Icon type="loading" />   : (<> </>) }    Submit
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }

export default  Form.create()(RegistrationBehaviourType);
