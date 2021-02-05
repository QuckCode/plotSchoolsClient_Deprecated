import { Card, Row, Typography, Button, Menu, Dropdown,Form,Select,AutoComplete, Input, Popconfirm , Icon} from 'antd';
import styled from 'styled-components';
import { theme } from '../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { PrivateRoute } from '../components/PrivateRoute';
import EditSchool from '../components/School/EditSchool';
import { getSchoolsSetting } from '../redux/actions/school';
import { wrapper } from '../redux/store';
import { redirectError } from '../services/redirectService';
import { AuthToken } from '../services/authToken';
import { loginSuccess } from '../redux/actions/auth';
import Axios from 'axios';
import { url } from '../redux/varables';
import { useState } from 'react';
import {  error, success } from '../components/modal';
import SectionForm from '../components/School/Section';
import  Router  from 'next/router';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

const Title = Typography.Title

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const resetPasswordPage = ({form, user}) =>{
   const [loading, setLoading] = useState(false)
   const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
   const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };

   const handleSubmit = e=>{
    e.preventDefault()
    form.validateFields((err, values) => {
      if (!err) {
        setLoading(true)
          if(values.newPassword === values.confirmPassword){
            if(user.userType==="staff") {
               Axios.post(`${url}/staff/resetPassword`, {regNumber:user.regNumber, oldPassword:values.oldPassword,newPassword:values.newPassword })
               .then(data=>{
                  Router.push("/dashboard")
                  setLoading(false)
                 success("Saves password successful") 
               })
               .catch(({response})=> {
                 setLoading(false)
                 if(response){
                  error (response.data.title, response.data.message)
                }
                else{
                  error("Network Error", "Please an error occurred")
                }
               })
            }
            else{
              Axios.post(`${url}/student/resetPassword`, {admissionNumber:user.admissionNumber, oldPassword:values.oldPassword,newPassword:values.newPassword })
              .then(data=>{
                 Router.push("/dashboard")
                 setLoading(false)
                success("Saves password successful") 
              })
              .catch(()=> {
                setLoading(false)
                if(response){
                  error (response.data.title, response.data.message)
                }
                else{
                  error("Network Error", "Please an error occurred")
                }
              })
            }
          }
          else error("New Password is not equal to Confirm Password")
      }
    });

   }
  
  return (
        <Card 
        title="Reset Password"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
         <Form>
          <FormItem name="oldPassword"   required {...formItemLayout} label="Old Password">
          {form.getFieldDecorator('oldPassword', {rules: [ {required: true,message: 'Please Input Old Password  '}] })(<Input.Password />)}
          </FormItem>
           <FormItem name="newPassword" required {...formItemLayout} label="New Password">
           {form.getFieldDecorator('newPassword', {rules: [ {required: true,message: 'Please Input New Password  '}] })(<Input.Password />)}
           </FormItem>
           <FormItem name="confirmPassword" required {...formItemLayout} label="Confirm Password">
           {form.getFieldDecorator('confirmPassword', {rules: [ {required: true,message: 'Please Input Confirm Password  '}] })(<Input.Password />)}
           </FormItem>
           <FormItem  {...tailFormItemLayout}>
             <Popconfirm  title={"Are You sure you want to change your password"} onConfirm={handleSubmit} >
                 <Button disabled={loading} loading={loading} type="primary" >
                  { loading?   <Icon type="loading" />   : (<> </>) }    Save
                 </Button>
             </Popconfirm>
        </FormItem>
      </Form>
          </div>
       </Card>
  )
};


export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    try {
      const store = ctx.store
      let data =  await AuthToken.fromNext(ctx)
      await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
      let propStore =  await store.getState()
      return {
        props:{
           loading:false, user:propStore.auth.user
        }
      } 
    } catch (error) {
        redirectError(ctx)
    }
  }
)

export default Form.create()(resetPasswordPage);