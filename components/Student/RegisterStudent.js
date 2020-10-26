import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import { object } from 'prop-types';
import {
 Image
} from "react-feather"
import Webcam from 'react-webcam';
import nigeriaData from '../../demos/mock/nigeriaData.json'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationStudent extends React.Component {

  webcamRef = React.createRef()
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    image:"",
    takePassport :false,
    valid:false,
    lga:[],
    stateNig:nigeriaData.map((x)=>x.state),
    arms:[]
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.createStudent({...values, passport:this.state.image, dob:values.dob._d, admissionDate:values.admissionDate._d,  school:"5f8c7ee1b9776e05f105a6db"})
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
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

  handleStateChange =(e)=>{
     let currentState=nigeriaData.find(obj => {
      return obj.state === e
    })
    this.setState({lga: !currentState?[] : currentState.lga})
  }
  handleUpload= (info)=>{
    let fileList = [...info.fileList];
    // Accept 5 files only
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

    handleClassChange= (e)=>{
      let currentState=this.props.arm.arms.filter(obj => {
        return obj.classID === e
      })
      this.setState({arms: !currentState?[] : currentState})
    }

  render() {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const videoConstraints = { width: 500, height: 500,facingMode: "user"};
    const {form, classes , student} = this.props
    const {loading}= student
    return (
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
        <FormItem  required  {...formItemLayout} label="Admission date">
            {form.getFieldDecorator('admissionDate', {rules: [ {required: true,message: 'Please input  your admission date'}] })(<DatePicker format="YYYY/MM/DD"/>)}
        </FormItem>
          <FormItem   required {...formItemLayout} label="First Name">
          {form.getFieldDecorator('firstName', {rules: [ {required: true,message: 'Please input  First Name'}] })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label="Middle Name">
           {form.getFieldDecorator('middleName')(<Input />)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Surname Name">
        {form.getFieldDecorator('srnName', {rules: [ {required: true,message: 'Please input  Arm'}] })(<Input />)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Date Of Birth">
        {form.getFieldDecorator('dob', {rules: [ {required: true,message: 'Please input  Date Of Birth'}] })(<DatePicker format="YYYY/MM/DD"/>)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Gender">
           {form.getFieldDecorator('gender', { initialValue: "", rules: [ {required: true,message: 'Please input  Gender'}] })(
            <Select style={{ width: 120 }}>
              <Option value={""}>Please Select a gender</Option>
              <Option value={1}>Male</Option>
              <Option value={2}>Female</Option>
            </Select>
           )}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="State">
        {form.getFieldDecorator('state', {  initialValue: "",rules: [ {required: true,message: 'Please input  State'}] })(
            <Select onChange= {this.handleStateChange}  style={{ width: 320 }}>
              <Option value={''}>Select Your State</Option>
              {
                this.state.stateNig.map(d=>(
                  <Option  value={d}>{d}</Option>
                ))
              }
            </Select>
           )}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Local Government">
        {form.getFieldDecorator('lga', { initialValue: "",rules: [ {required: true,message: 'Please input  Local government area'}] })(
            <Select style={{ width: 320 }}>
              <Option value={''}>Select Your Local Government</Option>
              {
                this.state.lga.map(d=>(
                  <Option  value={d}>{d}</Option>
                ))
              }
            </Select>
           )}
        </FormItem>
        <FormItem    {...formItemLayout} label="Class">
        {form.getFieldDecorator('classN', {initialValue:"", rules: [ {required: true,message: 'Please input  Class'}]})(
            <Select onChange={this.handleClassChange} style={{ width: 320 }}>
              <Option value={""}>Select Your Class</Option>
              {
                classes.classes.map(d=>{
                 return   ( <Option key={d._id} value={d._id}> {d.name}</Option> )
                })
              }
            </Select>
           )}
        </FormItem>
        <FormItem   {...formItemLayout} label="Arm">
        {form.getFieldDecorator('arm', {initialValue:'',rules: [ {required: true,message: 'Please input  Arm'}] })(
            <Select  style={{ width: 320 }}>
              <Option value={''}>Select Your Arm</Option>
              {
                this.state.arms.map(d=>{
                 return   ( <Option key={d.id} value={d.id}> {d.arm}</Option> )
                })
              }
            </Select>
           )}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Address">
           {form.getFieldDecorator('address', {rules: [ {required: true,message: 'Please input  Password'}] })(<Input.TextArea />)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Parent Phone Number">
           {form.getFieldDecorator('phone', {rules: [ {required: true,message: 'Please input  Password'}] })(<Input />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button disabled={loading} type="primary" htmlType="submit">
          { loading?   <Icon type="loading" />   : (<> </>) }    Register
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(RegistrationStudent);
