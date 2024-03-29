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
import { error } from "../modal";
const FormItem = Form.Item;
const Option = Select.Option;

class StudentBySubjectForm extends React.Component {
   state = {
      arms: [],
      class: [],
      subjects: [],
   };

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            this.props.handleSubmit({ ...values });
         }
      });
   };

   handleSectionChange = (e) => {
      let currentState = this.props.classes.filter((obj) => {
         return obj.sectionId === e;
      });
      this.setState({ class: !currentState ? [] : currentState });
      this.props.form.resetFields(["classN", "arm"]);
   };

   handleClassChange = (e) => {
      let currentState = this.props.arms.filter((obj) => {
         return obj.classID === e;
      });

      let currentClass = this.props.classes.find((x) => {
         return x._id == e;
      });
      console.log(currentClass);
      if (currentClass.subjects.length == 0) {
         this.setState({ subjects: [] });
         error("This class does not have subjects", " ");
      } else {
         let data = this.props.subjects.filter(function (item) {
            return currentClass.subjects.indexOf(item._id) !== -1;
         });
         this.setState({ subjects: data });
      }

      this.setState({ arms: !currentState ? [] : currentState });

      this.props.form.resetFields(["arm", "subject"]);
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
      const { form, classes, student, sections, arms, loading } = this.props;

      return (
         <Form onSubmit={this.handleSubmit}>
            <FormItem required {...formItemLayout} label="Section">
               {form.getFieldDecorator("section", {
                  initialValue: "",
                  rules: [
                     { required: true, message: "Please select a section" },
                  ],
               })(
                  <Select onChange={this.handleSectionChange}>
                     <Option value={""}>Select Section</Option>
                     {sections.map((d) => (
                        <Option key={d._id} value={d._id}>
                           {d.section}
                        </Option>
                     ))}
                  </Select>
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="Class">
               {form.getFieldDecorator("classN", {
                  initialValue: "",
                  rules: [{ required: true, message: "Please input  Class" }],
               })(
                  <Select onChange={this.handleClassChange}>
                     <Option value={""}>Select Your Class</Option>
                     {this.state.class.map((d) => {
                        return (
                           <Option key={d._id} value={d._id}>
                              {" "}
                              {d.name}
                           </Option>
                        );
                     })}
                  </Select>
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="Arm">
               {form.getFieldDecorator("arm", {
                  initialValue: "",
                  rules: [{ required: true, message: "Please input  Arm" }],
               })(
                  <Select>
                     <Option value={""}>Select Your Arm</Option>
                     {this.state.arms.map((d) => {
                        return (
                           <Option key={d.id} value={d.id}>
                              {" "}
                              {d.arm}
                           </Option>
                        );
                     })}
                  </Select>
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="Subject">
               {form.getFieldDecorator("subject", {
                  initialValue: "",
                  rules: [{ required: true, message: "Please input  Subject" }],
               })(
                  <Select>
                     <Option value={""}>Select Your Subject</Option>
                     {this.state.subjects.map((d) => {
                        return (
                           <Option key={d._id} value={d._id}>
                              {" "}
                              {d.name}
                           </Option>
                        );
                     })}
                  </Select>
               )}
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

export default Form.create()(StudentBySubjectForm);
