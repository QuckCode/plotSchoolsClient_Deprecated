
import { Card, Divider, Row, Typography, Button,Checkbox, Menu, Dropdown, Form , Select, List, Col, Modal} from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { getAllClasses } from '../../redux/actions/classes';
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import { getAllSection } from '../../redux/actions/section';
import { wrapper } from '../../redux/store';
import { getAllSubjects , getCurrentClassSubjects, addSubjects, removeSubject} from '../../redux/actions/subject';
import FetchSubjectForm  from '../../components/Classes/FetchSubject'

const FormItem = Form.Item;
const Option = Select.Option;

const Title = Typography.Title

const Content = styled.div`
  z-index: 0;
  max-width: 600px;,
  backgroundColor:'#f0f0f0'
`;

const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const ClassesSubjectsPage = (props) =>{
  useEffect(() => {
      props.getAllSection()
      props.getAllClasses()
      return ()=>{
       
      }
  }, [])

  const [loadedSubject, setLoadedObject] = useState(false)
  const [disableButton , setDisabledButton ] = useState(false)
  const [className , setClassName ] = useState("")
  const [classId, setClassId] = useState("")
  const [addSubjectList, setAddSubjectList] = useState([])
  const [removeSubjectList, setRemoveSubjectList] = useState([])


  const loadSubject= (value)=>{
    props.getAllSubject()
    .then((() =>{
      setClassName(props.classes.classes.find(x=>x._id===value.class).name)
      setClassId(props.classes.classes.find(x=>x._id===value.class)._id)
        props.getCurrentClassSubjects(props.classes.classes.find(x=>x._id===value.class)._id)
        .then(()=>{
             setLoadedObject(true) 
             setDisabledButton(true)
        })
        .catch(err=>{
           Modal.error({
             title:"Please an error occurred",
           })
        })
    }))  
    .catch(err=>{
      Modal.error({
        title:"Please an error occurred",
      })
    })
 }

 const addClassSubject= (e)=>{
   if(e.target.checked){
     if(!addSubjectList.includes(e.target.value)){
      return  setAddSubjectList([...addSubjectList,e.target.value])
     }
   }
   return setAddSubjectList(addSubjectList.filter(x => x!==e.target.value))
 }

 const removeClassSubject= (e)=>{
  if(e.target.checked){
    if(!removeSubjectList.includes(e.target.value)){
     return  setRemoveSubjectList([...removeSubjectList,e.target.value])
    }
  }
  return setRemoveSubjectList(removeSubjectList.filter(x => x!==e.target.value))
 }

 const saveAddedSubject= ()=>{
    props.addSubjects({ subjects:addSubjectList, classId:classId})
    .then(()=>{
      Modal.success({
        title:"Updated subject",
      })
      props.getCurrentClassSubjects(classId)
    })
    .catch(err=>{
      Modal.error({
        title:err.title||'Please an error occurred',
      })
    })
 }

 const saveRemovedSubject= ()=>{
    props.removeSubject({ subjects:removeSubjectList, classId:classId})
     .then(()=>{
      Modal.success({
        title:"Updated subject",
      })
      props.getCurrentClassSubjects(classId)
    })
    .catch(err=>{
      console.log(err)
      Modal.error({
        title:"Please an error occurred",
      })
    })

 }

  const handleOnSave = ()=>{
    setLoadedObject(false) 
    setDisabledButton(false)
    setClassId('')
    setClassName(''),
    setAddSubjectList([])
    setRemoveSubjectList([])
 }
 
   const {subjects, currentClassSubjects} = props.subjects
  return (
     <div>
        <Card 
          title="Classes Subjects"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
         <div className="p-4">
         <Content>
               <FetchSubjectForm onSave= {handleOnSave} disable= {disableButton} sections={props.sections.section} classes={props.classes.classes} onLoadSubject= {loadSubject} />
         </Content>
         {
          loadedSubject ?
          (
        <Row gutter={15}>
          <Col span={12}>
          <List
             bordered
             dataSource={subjects}
             header= {
               <div>
                <Typography.Title level={4}> All School Subjects</Typography.Title>
               </div>
             }

             footer = {
              <div>
                 <Button onClick={saveAddedSubject}  disabled= {addSubjectList.length==0 } type="primary" >  Add Subjects </Button>
               </div>
             }
             loading={props.subjects.loading}
             renderItem={item => (
               <List.Item>
               <Checkbox onChange={addClassSubject} key={item._id} value= {item._id}> {item.name}</Checkbox>
               </List.Item>
               )}
             />
          </Col>
          <Col span={12}>
          <List
            
             bordered
             header= {
               <div>
                <Typography.Title level={4}> {className} Subjects</Typography.Title>
               </div>
             }
             footer = {
              <div>
                 <Button onClick={saveRemovedSubject}  disabled= {removeSubjectList.length==0 } type='danger' >  Remove  Subjects </Button>
               </div>
             }
             dataSource={currentClassSubjects}
             loading={props.subjects.loading}
             renderItem={item => (
               <List.Item>
                 <Checkbox onChange= {removeClassSubject}  value={item._id}> {item.name}</Checkbox>
               </List.Item>
               )}
             />

          </Col>
       </Row>
          ) :(<> </>)
         }
         </div>
       </Card>
 </div>
  )
};

const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    store.dispatch(getAllSection())
    store.dispatch(getAllClasses())
    store.dispatch((getAllSubjects()))

    return {
      props:{
       
      }
    }
  }
)




const mapStateToProps = state => ({
  classes: state.classes,
  sections: state.section,
  subjects:state.subject
});

const mapDispatchToProps = {
  getAllClasses: getAllClasses,
  getAllSection:getAllSection,
  getAllSubject:getAllSubjects,
  getCurrentClassSubjects:getCurrentClassSubjects,
  addSubjects:addSubjects,
  removeSubject :removeSubject
};

export default  connect(mapStateToProps, mapDispatchToProps)(ClassesSubjectsPage)
