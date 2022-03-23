import {
   Button,
   Checkbox,
   Form,
   Input,
   message,
   Row,
   AutoComplete,
   Card,
   Divider,
} from "antd";
import { Eye, User, Grid } from "react-feather";

import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
import { Select } from "antd";
import { useEffect, useState } from "react";

const Option = Select.Option;

const FormItem = Form.Item;

const Content = styled.div`
  max-width: 400px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const Signin = ({
   form,
   schools,
   loginStaff,
   loginStudent,
   loginAdmin,
   loading,
}) => {
   const [schoolName, setSchoolName] = useState([]);
   // const [loading , setLoading] = useState(true)
   useEffect(() => {
      setSchoolName(schools.reduce((a, o) => (a.push(o.name), a), []));
   }, [schools]);
   return (
      <Row
         type="flex"
         align="middle"
         justify="center"
         className="px-3  mh-page"
         style={{ minHeight: "90vh", height: "80%" }}
      >
         <Content>
            <Card>
               <div className="text-center mb-5">
                  <Link href="/signin">
                     <a className="brand mr-0">
                        <img src="../logo.svg" />
                     </a>
                  </Link>
               </div>
               <Divider />
               <Form
                  layout="vertical"
                  onSubmit={(e) => {
                     e.preventDefault();
                     form.validateFields((err, values) => {
                        if (!err) {
                           //  console.log(loginStaff, loginStudent, values.userType)
                           // form.resetFields()
                           if (values.userType == 0) {
                              loginAdmin(values.regNumber, values.password);
                           }
                           if (values.userType == 1) {
                              loginStaff(values.regNumber, values.password);
                           }

                           if (values.userType == 2) {
                           }

                           if (values.userType == 3) {
                              loginStudent(values.regNumber, values.password);
                           }
                        }
                     });
                  }}
               >
                  <FormItem label="Login As">
                     {form.getFieldDecorator("userType", {
                        rules: [
                           {
                              required: true,
                              message: "Please select your user type",
                           },
                        ],
                     })(
                        <Select
                           placeholder="Login in as"
                           optionFilterProp="children"
                           filterOption={(input, option) =>
                              option.props.children
                                 .toLowerCase()
                                 .indexOf(input.toLowerCase()) >= 0
                           }
                        >
                           <Option value={0}>Admin</Option>
                           <Option value={1}>Staff</Option>
                           <Option value={2}>Parent</Option>
                           <Option value={3}>Student</Option>
                        </Select>
                     )}
                  </FormItem>
                  <FormItem label="Reg Number">
                     {form.getFieldDecorator("regNumber", {
                        rules: [
                           {
                              required: true,
                              message: "Please input your Reg Number!",
                           },
                        ],
                     })(
                        <Input
                           prefix={
                              <User
                                 size={16}
                                 strokeWidth={1}
                                 style={{ color: "rgba(0,0,0,.25)" }}
                              />
                           }
                           type="text"
                           placeholder="RegNumber"
                        />
                     )}
                  </FormItem>

                  <FormItem label="Password">
                     {form.getFieldDecorator("password", {
                        rules: [
                           {
                              required: true,
                              message: "Please input your Password!",
                           },
                        ],
                     })(
                        <Input.Password
                           type="password"
                           placeholder="Password"
                        />
                     )}
                  </FormItem>

                  <FormItem>
                     {form.getFieldDecorator("remember", {
                        valuePropName: "checked",
                        initialValue: true,
                     })(<Checkbox>Remember me</Checkbox>)}
                     <Link href="/forgot">
                        <a className="text-xs-right">
                           <small>Forgot password</small>
                        </a>
                     </Link>
                     <Button
                        disabled={loading}
                        loading={loading}
                        type="primary"
                        htmlType="submit"
                        block
                        className="mt-3"
                     >
                        Log in
                     </Button>
                  </FormItem>
               </Form>
            </Card>
         </Content>
      </Row>
   );
};

export default Form.create()(Signin);
