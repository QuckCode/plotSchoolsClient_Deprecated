import React, { useState } from 'react';
import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import PropTypes from 'prop-types';
const FormItem = Form.Item;
const Option = Select.Option;

const FetchTestForm = ({form, sections, onLoadTest, onSave, classes,disable}) => {
   
  const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
  const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
  const [classesState, setClasses] = useState([])

const  handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
          onLoadTest(values)
      }
    });
  };


 const handleSectionChange= e =>{
    form.setFieldsValue({'class':''})
    setClasses(classes.filter(x=>x.sectionId==e))
 }


  return (
    <div className="p-4">
    <Form onSubmit={handleSubmit}>
    <FormItem   required  {...formItemLayout} label="Section">
      {form.getFieldDecorator('section', {  initialValue: "",rules: [ {required: true,message: 'Please select a section'}] })(
          <Select  disabled= {disable} onChange= {handleSectionChange} >
            <Option value={''}>Select  Section</Option>
            {
              sections.map(d=>(
                <Option  key={d._id} value={d._id}>{d.section}</Option>
              ))
            }
          </Select>
         )}
      </FormItem>
      <FormItem  required  {...formItemLayout} label="Class">
      {form.getFieldDecorator('class', {  initialValue: "",rules: [ {required: true,message: 'Please select a class'}] })(
          <Select  disabled= {disable} style={{maxHeight:"300px"}}  >
            <Option value={''}>Select  Class</Option>
            {
              classesState.map(d=>(
                <Option  key={d._id} value={d._id}>{d.name}</Option>
              ))
            }
          </Select>
         )}
      </FormItem>
      <FormItem  {...tailFormItemLayout}>
        <Button style={{margin:2}} disabled= {disable} type="primary" htmlType="submit">
          Load Tests
        </Button>
        <Button   onClick= {onSave} disabled= {!disable} type="primary" >
           Save Changes 
        </Button>
      </FormItem>
    </Form>
    </div>
  )
}
 


export default   Form.create()(FetchTestForm);