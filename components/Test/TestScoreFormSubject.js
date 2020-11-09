import {Button,Form,Input, Modal, Icon, InputNumber, Select} from 'antd';
import { useState } from 'react';
import { useAppState } from '../shared/AppProvider';


const FormItem = Form.Item;
const Option = Select.Option

const  TestScoreFormSubject = ({form,disable,handleSaveChange, sections,classes,arms, tests, subjects, getStudentTestScore})=> {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const [classList , setClassList] = useState([])
    const [armList , setArmList] = useState([])
   
    const handleSectionChange= (e)=>{
         setClassList(classes.filter((x)=>e==x.sectionId))
         form.setFieldsValue({"classId":""})
         form.setFieldsValue({"armId":""})
    }

    const handleClassChange= (e)=>{
      setArmList(arms.filter((x)=>e==x.classID))
      form.setFieldsValue({"armId":""})
 }

    return (
      <div className="p-2">
      <Form onSubmit= {(e)=>{
         e.preventDefault();
          form.validateFields((err, values) => {
            if (!err) {
              getStudentTestScore(values,tests )
              .then(x=>{
                Modal.success({
                   title:"Found student successfully"
                })
              })
              .catch(err=>{
                Modal.error({
                   title:err.title,
                   content:err.message
                })
              })   
            }
          });
      }}>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Section">
        {form.getFieldDecorator('sectionId', {  initialValue: "",rules: [ {required: true,message: 'Please select a section'}] })(
          <Select disabled={disable} onChange={handleSectionChange}>
             <Option value={""}>   Please select an section </Option>
               {
                 sections.map(x=>(
                  <Option key={x._id} value={x._id}>  {x.section} </Option>
                 ))
               }
          </Select>
        )}
        </FormItem>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Class">
        {form.getFieldDecorator('classId', { initialValue: "",rules: [ {required: true,message: 'Please select a class'}] })(
          <Select disabled={disable} onChange={handleClassChange}>
             <Option value={""}>  Please select an class </Option>
               {
                 classList.map(x=>(
                  <Option key={x._id} value={x._id}>  {x.name} </Option>
                 ))
               }
          </Select>
        )}
        </FormItem>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Arm">
        {form.getFieldDecorator('armId', { initialValue: "", rules: [ {required: true,message: 'Please select a arm'}] })(
          <Select disabled={disable}>
             <Option value={""}>  Please select an arm </Option>
               {
                 armList.map(x=>(
                  <Option key={x.id} value={x.id}>  {x.arm} </Option>
                 ))
               }
          </Select>

        )}
        </FormItem>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Test/Exam">
        {form.getFieldDecorator('testId', { initialValue: "",rules: [ {required: true,message: 'Please select a test/exam'}] })(
          <Select disabled={disable}>
             <Option value={""}>  Please select an test/exam </Option>
             {
                 tests.map(x=>(
                  <Option key={x._id} value={x._id}>  {x.name} </Option>
                 ))
               }
          </Select>
        )}
        </FormItem>
        <FormItem style={{width:"70%"}} {...formItemLayout} label="Subject">
        {form.getFieldDecorator('subjectId', { initialValue: "",rules: [ {required: true,message: 'Please select a subject'}] })(
          <Select disabled={disable}>
             <Option value={""}>  Please select an subject </Option>
             {
                 subjects.map(x=>(
                  <Option key={x._id} value={x._id}>  {x.name} </Option>
                 ))
               }
          </Select>
        )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button  disabled={disable} type="primary" htmlType="submit">
            Load Student
          </Button>
          <Button onClick={handleSaveChange} style={{margin:10}}  disabled={!disable} type="primary">
             Save Changes
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }

export default  Form.create()(TestScoreFormSubject);
