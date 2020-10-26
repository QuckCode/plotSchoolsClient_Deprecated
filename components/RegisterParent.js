import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import {
 Image
} from "react-feather"
import Webcam from 'react-webcam';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;


class RegistrationParent extends React.Component {
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
        Message.success(
          'Sign complete. Taking you to your dashboard!'
        ).then(() => Router.push('/dashboard'));
      
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
    const {form} = this.props
    return (
      <Form onSubmit= {this.handleSubmit} >
            <div style={{
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
            </div>
          <FormItem  required {...formItemLayout} label="Title">
          {form.getFieldDecorator('title', {rules: [ {required: true,message: 'Please input   title'}] })(<Input />)}
        </FormItem>
        <FormItem required {...formItemLayout} label="Name">
        {form.getFieldDecorator('name', {rules: [ {required: true,message: 'Please input  the parent name'}] })(<Input />)}
        </FormItem>
        <FormItem required  {...formItemLayout} label="Residence Address">
        {form.getFieldDecorator('homeAddress', {rules: [ {required: true, message: 'Please input  the residence address'}] })(<Input.TextArea />)}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Business/Office Address">
         {form.getFieldDecorator('officeAddress', {rules: [ {required: true, message: 'Please input  the Office Address address'}] })(<Input.TextArea />)}
        </FormItem>
        <FormItem name="password"  required  {...formItemLayout} label="Password">
        {form.getFieldDecorator('password', {rules: [ {required: true, message: 'Please input  the password address'}] })(<Input.Password />)}
        </FormItem>
        <FormItem name='confirmPassword'   {...formItemLayout} label="Confirm Password">
           {form.getFieldDecorator('confirmPassword', {rules: [ {required: true, message: 'Please input  the confirm password'}] })(<Input.Password />)}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default  Form.create()(RegistrationParent);
