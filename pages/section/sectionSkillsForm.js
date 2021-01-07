
import { Card, Divider, Row, Typography, Button,Checkbox, Menu, Dropdown, Form , Select, List, Col, Modal} from 'antd';
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {Edit,MoreHorizontal,Printer,Save,Trash,} from 'react-feather';
import {connect} from 'react-redux'
import {useEffect, useState} from 'react'
import { getAllSection } from '../../redux/actions/section';
import { wrapper } from '../../redux/store';
import FetchSection from '../../components/Section/FetchSection';
import { getAllSkill, getCurrentSectionSkill, addSectionSkill, removeSectionSkill } from '../../redux/actions/skill';
import { PrivateRoute } from '../../components/PrivateRoute';

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

const SectionSkillPage = (props) =>{
  useEffect(() => {
      props.getAllSection()
      return ()=>{
       
      }
  }, [])

  const [loadedSkill, setLoadedSkill] = useState(false)
  const [disableButton , setDisabledButton ] = useState(false)
  const [sectionId, setSectionId] = useState("")
  const [sectionName, setSectionName] = useState("")
  const [addSkillList, setAddSkillList] = useState([])
  const [removeSkillList, setRemoveSkillList] = useState([])


  const loadSkill= (value)=>{
     props.getAllSkill()
     .then(()=>{
         setSectionId(props.sections.section.find(x=>x._id===value.section)._id)
         setSectionName(props.sections.section.find(x=>x._id===value.section).section)
        props.getCurrentSectionSkill(sectionId)
       .then(()=>{
           setDisabledButton(true)
           setLoadedSkill(true)
 
       })
       .catch((err)=>{
        return Modal.error({
          title:err.title,
          content:err.message
        })

       })
     })
     .catch(err=>{
        return Modal.error({
          title:err.title,
          content:err.message
        })
     })
 }

 const addSectionSkill= (e)=>{
   if(e.target.checked){
     if(!addSkillList.includes(e.target.value)){
      return  setAddSkillList([...addSkillList,e.target.value])
     }
   }
   return setAddSkillList(addSkillList.filter(x => x!==e.target.value))
 }


 const removeSectionSkill= (e)=>{
  if(e.target.checked){
    if(!removeSkillList.includes(e.target.value)){
     return  setRemoveSkillList([...removeSkillList,e.target.value])
    }
  }
  return setRemoveSkillList(removeSkillList.filter(x => x!==e.target.value))
 }

  const  saveRemovedSkill = ()=>{
   props.removeSectionSkill({
      sectionId:sectionId,
      skills:removeSkillList
    })
    .then(()=>{
      Modal.success({
        title:"Removed Skill"  
      })
      props.getAllSkill()
      props.getCurrentSectionSkill(sectionId)
      setRemoveSkillList([])
    })
    .catch(err=>{
      Modal.error({
        title:err.title,
        content:err.message 
      })
    })
  }

  const saveAddedSkill = ()=>{
    props.addSectionSkill({
      sectionId:sectionId,
      skills:addSkillList
    })
    .then(()=>{
      Modal.success({
        title:"Save Skill"  
      })
      props.getAllSkill()
      props.getCurrentSectionSkill(sectionId)
      setAddSkillList([])
    })
    .catch(err=>{
      Modal.error({
        title:err.title,
        content:err.message 
      })
    })
  }


  
 const { skills, currentSectionSkills, loading} = props.skill
  return (
     <div>
        <Card 
          title="Section Skill"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
         <div className="p-4">
         <Content>
               <FetchSection type="Skills  "  onSave= {()=>{
                 setLoadedSkill(false)
                 setDisabledButton(false)}
                 } disable= {disableButton} loading={loading} sections={props.sections.section}  onLoad= {loadSkill} />
         </Content>
         {
          loadedSkill ?
          (
        <Row gutter={15}>
          <Col style={{marginTop:10}} span={12} lg={12} sm={24}  xs={24}  md={24}>
          <List
             bordered
             dataSource={skills}
             header= {
               <div>
                <Typography.Title level={4}> All School Skills</Typography.Title>
               </div>
             }

             footer = {
              <div>
                 <Button  onClick={saveAddedSkill}  disabled= {addSkillList.length==0 } type="primary" >  Add Subjects </Button>
               </div>
             }
             loading={props.skill.loading}
             renderItem={item => (
               <List.Item>
                  <Checkbox onChange={addSectionSkill} key={item._id} value= {item._id}> {item.name}</Checkbox>
               </List.Item>
               )}
             />
          </Col>
          <Col style={{marginTop:10}}  span={12} lg={12} sm={24}  xs={24}  md={24}>
          <List
            
             bordered
             header= {
               <div>
                <Typography.Title level={4}> {sectionName} Skills </Typography.Title>
               </div>
             }
             footer = {
              <div>
                 <Button onClick={saveRemovedSkill} disabled= {removeSkillList.length==0} type='danger' >  Remove  Subjects </Button>
               </div>
             }
             dataSource={currentSectionSkills}
             loading={loading}
             renderItem={item => (
               <List.Item>
                 <Checkbox onChange= {removeSectionSkill} key={item._id}  value={item._id}> {item.name}</Checkbox>
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






const mapStateToProps = state => ({
  sections: state.section,
  skill:state.skill,
});

const mapDispatchToProps = {
  getAllSection:getAllSection,
  getAllSkill:getAllSkill,
  getCurrentSectionSkill:getCurrentSectionSkill,
  addSectionSkill:addSectionSkill,
  removeSectionSkill:removeSectionSkill
};

export default  PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(SectionSkillPage))
