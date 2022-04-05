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
import { object } from "prop-types";
import { Component, createRef } from "react";
import { Image } from "react-feather";
import Webcam from "react-webcam";
import nigeriaData from "../../demos/mock/nigeriaData.json";
import { school } from "../../redux/varables";
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
import moment from "moment";

class EditStudent extends Component {
   componentDidMount() {
      const { form, student, arms } = this.props;
      const {
         address,
         admissionDate,
         arm,
         admissionNumber,
         lga,
         state,
         dob,
         firstName,
         gender,
         middleName,
         phone,
         srnName,
      } = student;
      const classN = student.class;

      let currentState = arms.filter((obj) => {
         return obj.classID === classN;
      });
      this.setState({ arms: !currentState ? [] : currentState });

      form.setFields({
         firstName: { value: firstName },
         middleName: { value: middleName },
         srnName: { value: srnName },
         gender: { value: gender ? 1 : 0 },
         phone: { value: phone },
         address: { value: address },
         classN: { value: classN },
         arm: { value: arm },
         lga: { value: lga },
         state: { value: state },
         admissionNumber: { value: admissionNumber },
         dob: { value: moment(dob) },
         admissionDate: { value: moment(admissionDate) },
      });
   }

   webcamRef = createRef();

   state = {
      confirmDirty: false,
      autoCompleteResult: [],
      lga: [],
      stateNig: nigeriaData.map((x) => x.state),
      arms: [],
   };

   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            this.props.editStudent({
               ...values,
               dob: values.dob._d,
               admissionDate: values.admissionDate._d,
               school: school,
            });
         }
         this.props.form.resetFields();
      });
   };

   handleConfirmBlur = (e) => {
      const value = e.target.value;
      this.setState({ confirmDirty: this.state.confirmDirty || !!value });
   };

   handleStateChange = (e) => {
      let currentState = nigeriaData.find((obj) => {
         return obj.state === e;
      });
      this.setState({ lga: !currentState ? [] : currentState.lga });
   };

   handleClassChange = (e) => {
      let currentState = this.props.arms.filter((obj) => {
         return obj.classID === e;
      });
      this.setState({ arms: !currentState ? [] : currentState });
      this.props.form.resetFields(["arm"]);
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
      const { form, classes, loading } = this.props;
      return (
         <Form onSubmit={this.handleSubmit}>
            <FormItem required {...formItemLayout} label="Admission date">
               {form.getFieldDecorator("admissionNumber", {
                  rules: [
                     {
                        required: true,
                        message: "Please input  your admission number",
                     },
                  ],
               })(<Input disabled />)}
            </FormItem>
            <FormItem required {...formItemLayout} label="Admission date">
               {form.getFieldDecorator("admissionDate", {
                  rules: [
                     {
                        required: true,
                        message: "Please input  your admission date",
                     },
                  ],
               })(<DatePicker format="YYYY/MM/DD" />)}
            </FormItem>
            <FormItem required {...formItemLayout} label="First Name">
               {form.getFieldDecorator("firstName", {
                  rules: [
                     { required: true, message: "Please input  First Name" },
                  ],
               })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Middle Name">
               {form.getFieldDecorator("middleName")(<Input />)}
            </FormItem>
            <FormItem required {...formItemLayout} label="Surname Name">
               {form.getFieldDecorator("srnName", {
                  rules: [{ required: true, message: "Please input  Arm" }],
               })(<Input />)}
            </FormItem>
            <FormItem required {...formItemLayout} label="Date Of Birth">
               {form.getFieldDecorator("dob", {
                  rules: [
                     { required: true, message: "Please input  Date Of Birth" },
                  ],
               })(<DatePicker format="YYYY/MM/DD" />)}
            </FormItem>
            <FormItem required {...formItemLayout} label="Gender">
               {form.getFieldDecorator("gender", {
                  initialValue: "",
                  rules: [{ required: true, message: "Please input  Gender" }],
               })(
                  <Select>
                     <Option value={""}>Please Select a gender</Option>
                     <Option value={1}>Male</Option>
                     <Option value={2}>Female</Option>
                  </Select>
               )}
            </FormItem>
            <FormItem required {...formItemLayout} label="State">
               {form.getFieldDecorator("state", {
                  initialValue: "",
                  rules: [{ required: true, message: "Please input  State" }],
               })(
                  <Select onChange={this.handleStateChange}>
                     <Option value={""}>Select Your State</Option>
                     {this.state.stateNig.map((d) => (
                        <Option value={d}>{d}</Option>
                     ))}
                  </Select>
               )}
            </FormItem>
            <FormItem required {...formItemLayout} label="Local Government">
               {form.getFieldDecorator("lga", {
                  initialValue: "",
                  rules: [
                     {
                        required: true,
                        message: "Please input  Local government area",
                     },
                  ],
               })(
                  <Select>
                     <Option value={""}>Select Your Local Government</Option>
                     {this.state.lga.map((d) => (
                        <Option value={d}>{d}</Option>
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
                     {classes.classes.map((d) => {
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
            <FormItem required {...formItemLayout} label="Address">
               {form.getFieldDecorator("address", {
                  rules: [
                     { required: true, message: "Please input  Password" },
                  ],
               })(<Input.TextArea />)}
            </FormItem>
            <FormItem required {...formItemLayout} label="Parent Phone Number">
               {form.getFieldDecorator("phone", {
                  rules: [
                     { required: true, message: "Please input  Password" },
                  ],
               })(<Input />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
               <Button disabled={loading} type="primary" htmlType="submit">
                  {loading ? <Icon type="loading" /> : <> </>} Save
               </Button>
            </FormItem>
         </Form>
      );
   }
}

export default Form.create()(EditStudent);
