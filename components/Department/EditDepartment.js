import {Button,Form,Input, Modal, Icon, Spin} from 'antd';
import  Router  from 'next/router';
import { useEffect, useState } from 'react';
import { school } from '../../redux/varables';

const FormItem = Form.Item;


const  EditDepartment = ({form, createDepartment, department})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const [departmentName, setDepartmentName] = useState("")

   const onPress= ()=>{
     Router.back()
   }

    useEffect(()=>{
        setDepartmentName(department.name)
    },[department])
    return (
      <Spin spinning={department.loading}>
      <div className="p-4">
      <Form>
        <FormItem {...formItemLayout} label="Department">
       <Input onChange={(e)=>{
         setDepartmentName(e.target.value)
       }} value={departmentName} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button  onClick={onPress} type="primary" htmlType="submit">
          { department.loading?   <Icon type="loading" />   : (<> </>) }   Save
          </Button>
        </FormItem>
      </Form>
      </div>
      </Spin>
    );
  }

export default  Form.create()(EditDepartment);
