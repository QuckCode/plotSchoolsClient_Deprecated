import { Button, Form, Input, Select, Icon } from "antd";
import { school } from "../../redux/varables";

const FormItem = Form.Item;
const Option = Select.Option;

const ClassStatement = ({ form, loading }) => {
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
            <FormItem name="term" required {...formItemLayout} label="Term">
               {form.getFieldDecorator("term", {
                  initialValue: "",
                  rules: [{ required: true, message: "Please input Term" }],
               })(
                  <Select>
                     <Option value={""}>Please Select a Term</Option>
                     <Option value={"First"}>First </Option>
                     <Option value={"Second"}>Second </Option>
                     <Option value={"Third"}>Third </Option>
                  </Select>
               )}
            </FormItem>

            <FormItem name="term" required {...formItemLayout} label="Class">
               {form.getFieldDecorator("class", {
                  initialValue: "",
                  rules: [
                     {
                        required: true,
                        message: "Please input student's class",
                     },
                  ],
               })(
                  <Select>
                     <Option value={""}>Please Select a Term</Option>
                     <Option value={"First"}>First </Option>
                     <Option value={"Second"}>Second </Option>
                     <Option value={"Third"}>Third </Option>
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

export default Form.create()(ClassStatement);
