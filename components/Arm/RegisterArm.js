import { Button, Form, Input, Select, Icon } from "antd";
import { school } from "../../redux/varables";

const FormItem = Form.Item;
const Option = Select.Option;

const RegistrationArm = ({ form, classes, createArm, arm }) => {
   const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
   };
   const tailFormItemLayout = {
      wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
   };
   const { loading } = arm;

   return (
      <div className="p-4">
         <Form
            onSubmit={(e) => {
               e.preventDefault();
               form.validateFields((err, values) => {
                  if (!err) {
                     createArm({ ...values, school: school });
                  }
               });
            }}
         >
            <FormItem required {...formItemLayout} label="Class">
               {form.getFieldDecorator("classes", {
                  initialValue: "",
                  rules: [
                     { required: true, message: "Please select your class" },
                  ],
               })(
                  <Select>
                     <Option value={""}>Select Your Class</Option>
                     {classes.classes.map((d) => (
                        <Option key={d._id} value={d._id}>
                           {d.name}
                        </Option>
                     ))}
                  </Select>
               )}
            </FormItem>
            <FormItem {...formItemLayout} label="Arm">
               {form.getFieldDecorator("arm", {
                  rules: [{ required: true, message: "Please input  Arm" }],
               })(<Input role="arm-input" />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
               <Button
                  role="submit"
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

export default Form.create()(RegistrationArm);
