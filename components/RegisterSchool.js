import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import {
 Image
} from "react-feather"
import Webcam from 'react-webcam';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const Dragger= Upload.Dragger;


  const RegistrationSchool =({form})=>{

  const [image, setImage] = React.useState("")
  const [valid,setValid] = React.useState(false)

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFields((err, values) => {
      if (!err) {
        Message.success(
          'Sign complete. Taking you to your dashboard!'
        ).then(() => Router.push('/dashboard'));
      
      }
    });
  };

  const  handleUpload= (info)=>{
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList.forEach( (file, index)=>{
      let reader = new FileReader();
      reader.onload = (e) => {
        file.base64 = e.target.result;
        if(valid) setValid({image:e.target.result})
      };
      reader.readAsDataURL(file.originFileObj);
   });

  }
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    return (
      <Form onSubmit={handleSubmit}>
          <FormItem  {...formItemLayout} label="School Name">
          {form.getFieldDecorator('schoolName', {rules: [ {required: true,message: 'Please input  School Name'}] })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="School Abbreviation">
        {form.getFieldDecorator('prefix', {rules: [ {required: true,message: 'Please input  school  Abbreviation'}] })(<Input />)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Establishment Date">
        {form.getFieldDecorator('dob', {rules: [ {required: true,message: 'Please input  Establishment Date'}] })(  <DatePicker/>)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Location Address">
        {form.getFieldDecorator('address', {rules: [ {required: true,message: 'Please input  school  Address'}] })(<Input />)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Phone Number">
           {form.getFieldDecorator('phone', {rules: [ {required: true,message: 'Please input  phone number'}] })(<Input />)}
        </FormItem>
        <FormItem>
         <Dragger  onChange={handleUpload}
         customRequest={(x, c)=>{ console.log(x.OK())}}
         beforeUpload = {(file) => {
         const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
            if (!isJPG) {message.error('You can only upload JPG or PNG file!'); 
                      setValid(false)
                 return false;
                      } else{ setValid(true)
                       return true }}}>
             <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint"> Support for a single or bulk upload. Strictly prohibit from uploading   company data or other band files</p>
          </Dragger>    
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Create School
          </Button>
        </FormItem>
      </Form>
    );
  }

export default  Form.create()(RegistrationSchool);
