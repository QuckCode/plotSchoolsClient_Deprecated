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
const Option = Select.Option;

class RegistrationClass extends React.Component {
   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         console.error("Data submit ", err, values);
         if (!err) this.props.createClass({ ...values, school: school });
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
      const { form, classes } = this.props;
      const { loading } = classes;
      return (
         <div className="p-4">
            <Form onSubmit={this.handleSubmit}>
               <FormItem required {...formItemLayout} label="Section">
                  {form.getFieldDecorator("section", {
                     initialValue: "",
                     rules: [
                        { required: true, message: "Please select a section" },
                     ],
                  })(
                     <Select onChange={this.handleStateChange}>
                        <Option value={""}>Select Section</Option>
                        {this.props.sections.map((d) => (
                           <Option key={d._id} value={d._id}>
                              {d.section}
                           </Option>
                        ))}
                     </Select>
                  )}
               </FormItem>
               <FormItem required {...formItemLayout} label="Class Name">
                  {form.getFieldDecorator("className", {
                     rules: [
                        {
                           required: true,
                           message: "Please input  your Class Name",
                        },
                     ],
                  })(<Input />)}
               </FormItem>
               <FormItem {...tailFormItemLayout}>
                  <Button
                     disabled={loading}
                     type="primary"
                     htmlType="submit"
                     loading={loading}
                     role="submit"
                  >
                     Submit
                  </Button>
               </FormItem>
            </Form>
         </div>
      );
   }
}

export default Form.create()(RegistrationClass);
