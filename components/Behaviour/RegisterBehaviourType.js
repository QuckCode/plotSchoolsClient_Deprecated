import { Button, Form, Input, Modal, Icon, InputNumber } from "antd";
import { school } from "../../redux/varables";

const FormItem = Form.Item;

const RegistrationBehaviourType = ({ form, createBehaviour, loading }) => {
   const formItemLayout = {
      labelCol: { xs: { span: 24 }, sm: { span: 8 } },
      wrapperCol: { xs: { span: 24 }, sm: { span: 16 } },
   };
   const tailFormItemLayout = {
      wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 8 } },
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      form.validateFields(async (err, values) => {
         if (!err) {
            try {
               await createBehaviour({ ...values, school: school });
               form.resetFields(["name"]);
               Modal.success({ title: "Create new successfully" });
            } catch (error) {
               Modal.error({
                  title: error.title,
                  content: error.message,
               });
            }
         }
      });
   };
   return (
      <div className="p-4">
         <Form onSubmit={handleSubmit}>
            <FormItem {...formItemLayout} label="Behaviour" htmlFor="name">
               {form.getFieldDecorator("name", {
                  rules: [
                     { required: true, message: "Please Input Behaviour" },
                  ],
               })(<Input id="name" name="behaviour" />)}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
               <Button
                  disabled={loading}
                  loading={loading}
                  type="primary"
                  htmlType="submit"
               >
                  Submit
               </Button>
            </FormItem>
         </Form>
      </div>
   );
};

export default Form.create()(RegistrationBehaviourType);
