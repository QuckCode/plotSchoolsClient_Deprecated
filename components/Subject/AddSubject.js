import React from "react";
import {
   AutoComplete,
   Button,
   DatePicker,
   Form,
   Input,
   Select,
   Upload,
   Icon,
   message,
} from "antd";
import { school } from "../../redux/varables";
const FormItem = Form.Item;

class AddSubject extends React.Component {
   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            this.props.form.resetFields(["subject"]);
            this.props.createSubject({ name: values.subject, school: school });
         }
      });
   };

   render() {
      const formItemLayout = {
         labelCol: { xs: { span: 24 }, sm: { span: 8 } },
         wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
      };
      const tailFormItemLayout = {
         wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 },
         },
      };
      const { form, loading } = this.props;
      console.log(loading);
      return (
         <Form onSubmit={this.handleSubmit}>
            <FormItem required {...formItemLayout} label="Subject">
               {form.getFieldDecorator("subject", {
                  rules: [
                     { required: true, message: "Please input  your subject" },
                  ],
               })(<Input />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
               <Button disabled={loading} type="primary" htmlType="submit">
                  {loading ? <Icon type="loading" /> : <> </>} Submit
               </Button>
            </FormItem>
         </Form>
      );
   }
}

export default Form.create()(AddSubject);
