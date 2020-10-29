import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import {
 Image
} from "react-feather"
import Webcam from 'react-webcam';
import { school } from '../../redux/varables';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class RegistrationStaff extends React.Component {
  webcamRef = React.createRef()
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    image:"",
    takePassport :false,
    valid:false
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createStaff({...values, dob:values.dob._d, employmentDate:values.employmentDate._d, school:school})
      }
    });
  };

  capture = () => {
    if(!this.webcamRef.current) return  message.error("Please delete the current image")
    else{
      const imageSrc = this.webcamRef.current.getScreenshot();
     this.setState({image:imageSrc})
    }
  }
  
  setTakePassport= ()=>{
    if(!this.state.takePassport)return  this.setState({takePassport:!this.state.takePassport})
    else{
      this.capture()
      this.setState({takePassport:!this.state.takePassport})
    }
  }
  handleUpload= (info)=>{
    let fileList = [...info.fileList];
    fileList = fileList.slice(-1);
    fileList.forEach( (file, index)=>{
      let reader = new FileReader();
      reader.onload = (e) => {
        file.base64 = e.target.result;
        if(this.state.valid) this.setState({image:e.target.result})
      };
      reader.readAsDataURL(file.originFileObj);
    });
    // console.log(fileList)
    // this.setState({ fileList });

  }

    deleteImage= ()=>{
      if(!this.state.image) return
      else{
        this.setState({image:""})
      }
    }
     onFinish = (values) => {
        console.log('Success:', values);
      };
    
      onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    

  render() {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const videoConstraints = { width: 500, height: 500,facingMode: "user"};
    const {form, staff} = this.props
    return (
      <div className="p-4">
      <Form onSubmit={this.handleSubmit}>
            {/* <div style={{
              justifyContent:'center',
              alignItems:'center',
              display:'flex',
              flexDirection:'column',
              marginBottom:15
            }}>
                {  this.state.image?
                      <img src= {this.state.image}  style= {{width:200, height:200}}/>
                    : (this.state.takePassport ?
                 <Webcam audio={false} height={200}  ref={this.webcamRef} screenshotFormat="image/jpeg" width={250} videoConstraints={videoConstraints} />
                  :
                  <Image style={{fontSize:50,color:'#000' }} size={200} strokeWidth={1}/> )}
               <div>
                 <Button onClick= {this.setTakePassport} style={{margin:5}}>
                    <Icon type='camera' /> { !this.state.takePassport? "Take a Passport":"Capture Passport"  }
                  </Button>
                 <Upload 
                 showUploadList = {false}
                 onChange={this.handleUpload}
                 beforeUpload = {(file) => {
                    const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                      if (!isJPG) {message.error('You can only upload JPG or PNG file!'); 
                      this.setState({valid:false})
                      return false;
                      } else{ this.setState({valid:true})
                       return true }}} > 
                   <Button  style={{margin:5}}>
                    <Icon type="upload" /> Upload Passport
                  </Button>
                 </Upload>
                 <Button onClick= {this.deleteImage} style={{margin:5}}>
                    <Icon type='delete' />  Delete Image
                  </Button>
               </div>
            </div> */}
          <FormItem name="firstName"   required {...formItemLayout} label="First Name">
          {form.getFieldDecorator('firstName', {rules: [ {required: true,message: 'Please input  First Name'}] })(<Input />)}
        </FormItem>
        <FormItem name="middleName" required {...formItemLayout} label="Middle Name">
        {form.getFieldDecorator('middleName')(<Input />)}
        </FormItem>
        <FormItem name="lastName" required  {...formItemLayout} label="Surname">
        {form.getFieldDecorator('srnName', {rules: [ {required: true,message: 'Please input Name'}] })(<Input />)}
        </FormItem>
        <FormItem name="dob" required  {...formItemLayout} label="Date Of Birth">
        {form.getFieldDecorator('dob', {rules: [ {required: true,message: 'Please input Dob'}] })(<DatePicker />)}
        </FormItem>
        <FormItem name="email"  required  {...formItemLayout} label="E-mail">
        {form.getFieldDecorator('email', {rules: [ {required: true,message: 'Please input Email'}] })(<Input />)}
        </FormItem>
        <FormItem name="phone"  required  {...formItemLayout} label="Phone Number">
            {form.getFieldDecorator('phone', {rules: [ {required: true,message: 'Please input phone'}] })(<Input/>)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Gender">
           {form.getFieldDecorator('gender', { initialValue: "", rules: [ {required: true,message: 'Please input  Gender'}] })(
            <Select>
              <Option value={""}>Please Select a gender</Option>
              <Option value={1}>Male</Option>
              <Option value={2}>Female</Option>
            </Select>
           )}
        </FormItem>
        <FormItem name="employmentDate" requiredMark required  {...formItemLayout} label="Employment date">
        {form.getFieldDecorator('employmentDate', {rules: [ {required: true,message: 'Please input Employment Date'}] })(<DatePicker showToday={false} />)}
        </FormItem>
        <FormItem name="designation"  required  {...formItemLayout} label="Designation">
        {form.getFieldDecorator('designation', {initialValue:""})(
            <Select>
              <Option value={""}>Select Your Class</Option>
            </Select>
           )}
        </FormItem>
        <FormItem name="department"   required  {...formItemLayout} label="Department">
        {form.getFieldDecorator('department', {initialValue:""})(
            <Select>
              <Option value={""}>Select Your Class</Option>
            </Select>
           )}
        </FormItem>
        <FormItem  {...tailFormItemLayout}>
          <Button disabled={staff.loading} loading={staff.loading} type="primary" htmlType="submit">
          { staff.loading?   <Icon type="loading" />   : (<> </>) }    Save
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

export default   Form.create()(RegistrationStaff);
