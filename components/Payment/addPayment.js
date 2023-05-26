import { Button, Form, Input, Select, Icon } from "antd";
import { school } from "../../redux/varables";

const FormItem = Form.Item;
const Option = Select.Option;

const CreatePayment = ({ form, loading }) => {
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
               form.validateFields((err, values) => {});
            }}
         >
            <FormItem {...formItemLayout} label="Payment type">
               {form.getFieldDecorator("name", {
                  rules: [
                     {
                        required: true,
                        message: "Please input Payment Item Name",
                     },
                  ],
               })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Amount">
               {form.getFieldDecorator("amount", {
                  rules: [
                     {
                        required: true,
                        message: "Please input Payment Amount",
                     },
                  ],
               })(<Input />)}
            </FormItem>

            <FormItem {...formItemLayout} label="Class">
               {form.getFieldDecorator("userType", {
                  rules: [
                     {
                        required: true,
                        message: "Please select your user type",
                     },
                  ],
               })(
                  <Select
                     placeholder="Select class"
                     optionFilterProp="children"
                     filterOption={(input, option) =>
                        option.props.children
                           .toLowerCase()
                           .indexOf(input.toLowerCase()) >= 0
                     }
                  >
                     <Option value={0}>All</Option>
                     <Option value={1}>JSS1</Option>
                     <Option value={2}>JSS2</Option>
                     <Option value={3}>SS3</Option>
                  </Select>
               )}
            </FormItem>

            <FormItem {...tailFormItemLayout}>
               <Button disabled={loading} type="primary" htmlType="submit">
                  {loading ? <Icon type="loading" /> : <> </>} Submit
               </Button>
            </FormItem>
         </Form>
      </div>
   );
};

export default Form.create()(CreatePayment);
