import {Button,Form,Input, Modal, Icon, Spin} from 'antd';
import  Router  from 'next/router';
import { useEffect, useState } from 'react';
import { school } from '../../redux/varables';

const FormItem = Form.Item;


const  EditDesignation = ({form, designation, editDesignation})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const [designationName, setDesignationName] = useState("")

   const onPress= ()=>{
      let newDesignation = {designation:designation._id, ...designation,name:designationName}
      editDesignation(newDesignation)
      .then(data=>{
        return Modal.success({
          title:"Successful edit",
          content:`Changed department name from ${designation.name} to ${designationName}`
        })
     })
     .catch(err=>{
      return Modal.error({
        title:err.title,
        content:err.message
      })
     })
      Router.back()
   }

    useEffect(()=>{
        setDesignationName(designation.name)
    },[designation])
    return (
      <Spin spinning={designation.loading}>
      <div className="p-4">
      <Form>
        <FormItem {...formItemLayout} label="Department">
       <Input onChange={(e)=>{
         setDesignationName(e.target.value)
       }} value={designationName} />
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button  onClick={onPress} type="primary" htmlType="submit">
          { designation.loading?   <Icon type="loading" />   : (<> </>) }   Save
          </Button>
        </FormItem>
      </Form>
      </div>
      </Spin>
    );
  }

export default  Form.create()(EditDesignation);
