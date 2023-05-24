import { Button, Form, Input, Modal, Icon, InputNumber } from "antd";
import { school } from "../../redux/varables";

const FormItem = Form.Item;

const RegistrationSkillType = ({ form, createSkill, loading }) => {
   const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
   };
   const tailFormItemLayout = {
      wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
   };
   return (
      <div className="p-4">
         <Form
            onSubmit={(e) => {
               e.preventDefault();
               form.validateFields((err, values) => {
                  console.error("submitted", values);
                  if (!err) {
                     createSkill({ ...values, school: school })
                        .then(() => {
                           form.resetFields();
                           Modal.success({
                              title: "Create new skill successfully",
                           });
                           form.resetFields(["name"]);
                        })
                        .catch((err) => {
                           Modal.error({
                              title: err.title,
                              content: err.message,
                           });
                        });
                  }
               });
            }}
         >
            <FormItem {...formItemLayout} label="Skill">
               {form.getFieldDecorator("name", {
                  rules: [{ required: true, message: "Please Input  Skill" }],
               })(<Input />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
               <Button
                  disabled={loading}
                  type="primary"
                  htmlType="submit"
                  loading={loading}
               >
                  Submit
               </Button>
            </FormItem>
         </Form>
      </div>
   );
};

export default Form.create()(RegistrationSkillType);
