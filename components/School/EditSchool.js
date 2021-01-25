import { AutoComplete,Button, DatePicker,Form,Input,Select, Upload, Icon, message} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { school } from '../../redux/varables';

const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;

class EditSchoolForm extends React.Component {

  componentDidMount (){
    const {form, oldSchoolSettings} = this.props
    const {section, term , name, address, phoneNumber, email, schoolId, previousSchoolSection, schoolPrefix } = oldSchoolSettings
    form.setFields({
      name:{value:name },address:{value:address},  phoneNumber:{value:phoneNumber},section:{value:section},
      email:{value:email },schoolId:{value:schoolId},  term:{value:term}, schoolPrefix:{value:schoolPrefix}
    })
     const nextSection= `${new Date().getFullYear()+1}/${new Date().getFullYear()+2}`
     this.setState({sections: [...previousSchoolSection,section,nextSection]})
  }


  state = {
     sections:[]
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.props.form)
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.editSchool({...values,school})
      }
    });
  };


  render() {
    const formItemLayout = {labelCol: { xs: { span: 24 },sm: { span: 8 } }, wrapperCol: {xs: { span: 24 },sm: { span: 16 }} };
    const tailFormItemLayout = { wrapperCol: { xs: { span: 24,   offset: 0 }, sm: {span: 16, offset: 8} } };
    const videoConstraints = { width: 500, height: 500,facingMode: "user"};
    const { form, loading} = this.props
    const {sections} = this.state

    return (
      <div className="p-4">
      <Form onSubmit={this.handleSubmit}>
      <FormItem name="schoolId"   required {...formItemLayout} label="School Id">
          {form.getFieldDecorator('schoolId', {rules: [ {required: true,message: 'Please input  School Id'}] })(<Input disabled />)}
        </FormItem>
          <FormItem name="name"   required {...formItemLayout} label="School Name">
          {form.getFieldDecorator('name', {rules: [ {required: true,message: 'Please input  School Name'}] })(<Input />)}
        </FormItem>
        <FormItem name="schoolPrefix" required {...formItemLayout} label="School Prefix">
        {form.getFieldDecorator('schoolPrefix', {rules: [ {required: true,message: 'Please input  School Prefix'}] })(<Input disabled />)}
        </FormItem>
        <FormItem name="email" required  {...formItemLayout} label="Email">
        {form.getFieldDecorator('email', {rules: [ {required: true,message: 'Please input School Email '}] })(<Input />)}
        </FormItem>
        <FormItem name="phone"  required  {...formItemLayout} label="Phone Number">
            {form.getFieldDecorator('phoneNumber', {rules: [ {required: true,message: 'Please input School Phone'}] })(<Input/>)}
        </FormItem>
        <FormItem name="address"  required  {...formItemLayout} label="Address">
            {form.getFieldDecorator('address', {rules: [ {required: true,message: 'Please input School Address'}] })(<TextArea/>)}
        </FormItem>
        <FormItem   name="section"  required  {...formItemLayout} label="School Sections">
           {form.getFieldDecorator('section', { initialValue: "", rules: [ {required: true,message: 'Please input School Sections'}] })(
            <Select>
              <Option value={""}> Select School Section</Option>
              {
                sections.map(x=>(
                  <Option value={x}>{x}</Option>
                ))
              }
            </Select>
           )}
        </FormItem>
        <FormItem  required  {...formItemLayout} label="Term">
           {form.getFieldDecorator('term', { initialValue: "", rules: [ {required: true,message: 'Please input Term'}] })(
            <Select>
              <Option value={""}>Please Select a Term</Option>
              <Option value={"First"}>First </Option>
              <Option value={"Second"}>Second </Option>
              <Option value={"Third"}>Third </Option>
            </Select>
           )}
        </FormItem>
        <FormItem  {...tailFormItemLayout}>
          <Button disabled={loading} loading={loading} type="primary" htmlType="submit">
          { loading?   <Icon type="loading" />   : (<> </>) }    Save
          </Button>
        </FormItem>
      </Form>
      </div>
    );
  }
}

export default   Form.create()(EditSchoolForm);
