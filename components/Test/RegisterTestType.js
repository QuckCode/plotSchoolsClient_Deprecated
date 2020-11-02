import {Button,Form,Input, Modal, Icon, InputNumber} from 'antd';
import { school } from '../../redux/varables';

const FormItem = Form.Item;


const  RegistrationTestType = ({form, createTest, loading})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    console.log(form)
    return (
      <div className="p-4">
      <Form onSubmit= {(e)=>{
         e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
               createTest({...values, school:school})
               .then(()=>{
                  form.resetFields()
                  Modal.success({
                    title:"Create new test successfully"
                  })
                  form.resetFields(['name','marksObtainable','parentageOfTotal'])
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
        <FormItem {...formItemLayout} label="Test/ Exam">
        {form.getFieldDecorator('name', {rules: [ {required: true,message: 'Please Input  Department'}] })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Mark Obtainable">
        {form.getFieldDecorator('marksObtainable',  {  initialValue: 0, rules: [ {required: true,message: 'Please Input  Department'}] })(<InputNumber />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Parentage Of Total">
        {form.getFieldDecorator('parentageOfTotal', { initialValue: 0,rules: [ {required: true,message: 'Please Input The '}] })(
          <InputNumber min={1} max={100} formatter={value => `${value}%`} parser={value => value.replace('%', '')}/>
        )}
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

export default  Form.create()(RegistrationTestType);
