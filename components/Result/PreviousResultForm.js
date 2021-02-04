import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Form , Button, Input, Icon, Select} from 'antd';
const FormItem = Form.Item
const Option = Select.Option
import {useState} from 'react'
 
const PreviousResultForm = ({form, previousSections, submit}) => {
 
 const [loading, setLoading] = useState(false) 
 const [sections, setSections] = useState([])
 const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
 const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
 const {validateFields, getFieldDecorator} = form

 useEffect(()=>{
    setSections(previousSections)
    return {

    }
 }, [])

  const  handleSubmit = (e)=> {
    e.preventDefault();
    validateFields((err, values) => {
      if (!err) {    
        submit(values)
      }
    });
  }
  return (
    <Form onSubmit={handleSubmit} >
         <FormItem   name="section"  required  {...formItemLayout} label="School Sections">
           {form.getFieldDecorator('section', { initialValue: "", rules: [ {required: true,message: 'Please input School Sections'}] })(
            <Select  >
              <Option value={""}> Select School Section</Option>
              {
                sections.map(x=>(
                  <Option value={x}>{x}</Option>
                ))
              }
            </Select>
           )}
        </FormItem>
        <FormItem   name="term" required  {...formItemLayout} label="Term">
           {form.getFieldDecorator('term', { initialValue: "", rules: [ {required: true,message: 'Please input Term'}] })(
            <Select  >
              <Option value={""}>Please Select a Term</Option>
              <Option value={"First"}>First </Option>
              <Option value={"Second"}>Second </Option>
              <Option value={"Third"}>Third </Option>
            </Select>
           )}
        </FormItem>
    <FormItem  name="admissionNumber" {...formItemLayout} label="Admission Number">
      {form.getFieldDecorator('admissionNumber', {
        rules: [{ required: true, message: 'Please input admissionNumber' }],
      })(
        <Input/>,
      )}
    </FormItem>
    <FormItem  {...tailFormItemLayout}>
          <Button disabled={loading} loading={loading} type="primary" htmlType="submit">
          { loading?   <Icon type="loading" />   : (<> </>) }    Fetch Result
          </Button>
        </FormItem>
  </Form>
  );
}
 
PreviousResultForm.propTypes = {
  previousSections:PropTypes.array.isRequired,
  submit:PropTypes.func.isRequired
};
 
export default  Form.create()(PreviousResultForm);