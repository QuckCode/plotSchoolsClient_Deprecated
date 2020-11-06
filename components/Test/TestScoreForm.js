import {Button,Form,Input, Modal, Icon, InputNumber} from 'antd';
import { school } from '../../redux/varables';

const FormItem = Form.Item;


const  TestScoreForm = ({form})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    return (
      <div className="p-4">
      <Form onSubmit= {(e)=>{
         e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              
            }
          });
      }}>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Section">
        {form.getFieldDecorator('section', {rules: [ {required: true,message: 'Please select a section'}] })(<Input />)}
        </FormItem>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Class">
        {form.getFieldDecorator('class', {rules: [ {required: true,message: 'Please select a class'}] })(<Input />)}
        </FormItem>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Arm">
        {form.getFieldDecorator('arm', {rules: [ {required: true,message: 'Please select a arm'}] })(<Input />)}
        </FormItem>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Test/Exam">
        {form.getFieldDecorator('test', {rules: [ {required: true,message: 'Please select a test/exam'}] })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button  type="primary" htmlType="submit">
            Load Student And Subject
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }

export default  Form.create()(TestScoreForm);
