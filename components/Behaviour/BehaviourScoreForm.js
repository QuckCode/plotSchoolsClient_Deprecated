import { Button, Form, Input, Modal, Icon, InputNumber, Select } from "antd";
import { useState } from "react";
import { useAppState } from "../shared/AppProvider";

const FormItem = Form.Item;
const Option = Select.Option;

const BehaviourScoreScoreForm = ({
   form,
   sections,
   classes,
   arms,
   getScore,
}) => {
   const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
   };
   const tailFormItemLayout = {
      wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
   };
   const [classList, setClassList] = useState([]);
   const [armList, setArmList] = useState([]);

   const handleSectionChange = (e) => {
      setClassList(classes.filter((x) => e == x.sectionId));
      form.setFieldsValue({ classId: "" });
      form.setFieldsValue({ armId: "" });
   };

   const handleClassChange = (e) => {
      setArmList(arms.filter((x) => e == x.classID));
      form.setFieldsValue({ armId: "" });
   };

   return (
      <Form
         data-testid="behaviour-score-form"
         onSubmit={(e) => {
            e.preventDefault();
            form.validateFields((err, values) => {
               if (!err) return getScore(values);
            });
         }}
      >
         <FormItem style={{ width: "70%" }} {...formItemLayout} label="Section">
            {form.getFieldDecorator("sectionId", {
               initialValue: "",
               rules: [{ required: true, message: "Please select a section" }],
            })(
               <Select onChange={handleSectionChange}>
                  <Option value={""}> Please select an section </Option>
                  {sections.map((x) => (
                     <Option key={x._id} value={x._id}>
                        {" "}
                        {x.section}{" "}
                     </Option>
                  ))}
               </Select>
            )}
         </FormItem>
         <FormItem style={{ width: "70%" }} {...formItemLayout} label="Class">
            {form.getFieldDecorator("classId", {
               initialValue: "",
               rules: [{ required: true, message: "Please select a class" }],
            })(
               <Select onChange={handleClassChange}>
                  <Option value={""}> Please select an class </Option>
                  {classList.map((x) => (
                     <Option key={x._id} value={x._id}>
                        {" "}
                        {x.name}{" "}
                     </Option>
                  ))}
               </Select>
            )}
         </FormItem>
         <FormItem style={{ width: "70%" }} {...formItemLayout} label="Arm">
            {form.getFieldDecorator("armId", {
               initialValue: "",
               rules: [{ required: true, message: "Please select a arm" }],
            })(
               <Select>
                  <Option value={""}> Please select an arm </Option>
                  {armList.map((x) => (
                     <Option key={x.id} value={x.id}>
                        {" "}
                        {x.arm}{" "}
                     </Option>
                  ))}
               </Select>
            )}
         </FormItem>
         <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
               Load Student & Subject
            </Button>
         </FormItem>
      </Form>
   );
};

export default Form.create()(BehaviourScoreScoreForm);
