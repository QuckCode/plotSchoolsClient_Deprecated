import {Button,Form,Input, Modal, Icon, Spin} from 'antd';
import  Router  from 'next/router';
import { useEffect, useState } from 'react';
import { school } from '../../redux/varables';

const FormItem = Form.Item;


const  EditDesignation = ({form, department, editDesignation})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const [designationName, setDesignationName] = useState("")

   const onPress= ()=>{
      alert("sjsj")
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
         setDesignationName(e.target.value)
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

export default  Form.create()(EditDesignation);
