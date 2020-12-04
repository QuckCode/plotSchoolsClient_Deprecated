
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
import FetchSection from '../../components/Section/FetchSection';
import { getAllBehaviour , getCurrentSectionBehaviour, removeSectionBehaviour , addSectionBehaviour} from '../../redux/actions/behaviour';
import { PrivateRoute } from '../../components/PrivateRoute';

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

const SectionBehaviourPage = (props) =>{
  useEffect(() => {
      props.getAllSection()
      return ()=>{
       
      }
  }, [])

  const [loadedBehaviour, setLoadedBehaviour] = useState(false)
  const [disableButton , setDisabledButton ] = useState(false)
  const [sectionId, setSectionId] = useState("")
  const [sectionName, setSectionName] = useState("")
  const [addBehaviourList, setAddBehaviourList] = useState([])
  const [removeBehaviourList, setRemoveBehaviourList] = useState([])


  const loadBehaviour= (value)=>{
     props.getAllBehaviour()
     .then(()=>{
       setSectionId(props.sections.section.find(x=>x._id===value.section)._id)
       setSectionName(props.sections.section.find(x=>x._id===value.section).section)
      props.getCurrentSectionBehaviour(sectionId)
       .then(()=>{
           setDisabledButton(true)
           setLoadedBehaviour(true)
 
       })
       .catch((err)=>{
          console.log(err)

       })
     })
     .catch(err=>{
        return Modal.error({
          title:err.title,
          content:err.message
        })
     })
 }

 const addSectionBehaviour= (e)=>{
   if(e.target.checked){
     if(!addBehaviourList.includes(e.target.value)){
      return  setAddBehaviourList([...addBehaviourList,e.target.value])
     }
   }
   return setAddBehaviourList(addBehaviourList.filter(x => x!==e.target.value))
 }


 const removeSectionBehaviour= (e)=>{
  if(e.target.checked){
    if(!removeBehaviourList.includes(e.target.value)){
     return  setRemoveBehaviourList([...removeBehaviourList,e.target.value])
    }
  }
  return setRemoveBehaviourList(removeBehaviourList.filter(x => x!==e.target.value))
 }

  const  saveRemovedBehaviour = ()=>{
   props.removeSectionBehaviour({
      sectionId:sectionId,
      behaviour:removeBehaviourList
    })
    .then(()=>{
      Modal.success({
        title:"Removed Behaviour"  
      })
      props.getAllBehaviour()
      props.getCurrentSectionBehaviour(sectionId)
      setRemoveBehaviourList([])
    })
    .catch(err=>{
      Modal.error({
        title:err.title,
        content:err.message 
      })
    })
  }

  const saveAddedBehaviour = ()=>{
    props.addSectionBehaviour({
      sectionId:sectionId,
      behaviour:addBehaviourList
    })
    .then(()=>{
      Modal.success({
        title:"Save Behaviour"  
      })
      props.getAllBehaviour()
      props.getCurrentSectionBehaviour(sectionId)
      setAddBehaviourList([])
    })
    .catch(err=>{
      Modal.error({
        title:err.title,
        content:err.message 
      })
    })
  }


  
 const { behaviors, currentSectionBehaviour, loading} = props.behaviour
  return (
     <div>
        <Card 
          title="Section Behaviour"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
         <div className="p-4">
         <Content>
               <FetchSection type="Behaviour"  onSave= {()=>{
                 setLoadedBehaviour(false)
                 setDisabledButton(false)}
                 } disable= {disableButton} loading={loading} sections={props.sections.section}  onLoad= {loadBehaviour} />
         </Content>
         {
          loadedBehaviour ?
          (
        <Row gutter={15}>
          <Col style={{marginTop:10}} span={12} lg={12} sm={24}  xs={24}  md={24}>
          <List
             bordered
             dataSource={behaviors}
             header= {
               <div>
                <Typography.Title level={4}> All School Behaviors</Typography.Title>
               </div>
             }

             footer = {
              <div>
                 <Button onClick={saveAddedBehaviour}   disabled= {addBehaviourList.length==0 } type="primary" >  Add Subjects </Button>
               </div>
             }
             loading={props.behaviour.loading}
             renderItem={item => (
               <List.Item>
                  <Checkbox onChange={addSectionBehaviour} key={item._id} value= {item._id}> {item.name}</Checkbox>
               </List.Item>
               )}
             />
          </Col>
          <Col style={{marginTop:10}}  span={12} lg={12} sm={24}  xs={24}  md={24}>
          <List
            
             bordered
             header= {
               <div>
                <Typography.Title level={4}> {sectionName} Behaviors</Typography.Title>
               </div>
             }
             footer = {
              <div>
                 <Button onClick={saveRemovedBehaviour} disabled= {removeBehaviourList.length==0} type='danger' >  Remove  Subjects </Button>
               </div>
             }
             dataSource={currentSectionBehaviour}
             loading={loading}
             renderItem={item => (
               <List.Item>
                 <Checkbox onChange= {removeSectionBehaviour} key={item._id}  value={item._id}> {item.name}</Checkbox>
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
    return {
      props:{
       
      }
    }
  }
)




const mapStateToProps = state => ({
  sections: state.section,
  behaviour:state.behavior,

});

const mapDispatchToProps = {
  getAllSection:getAllSection,
  getAllBehaviour:getAllBehaviour,
  getCurrentSectionBehaviour:getCurrentSectionBehaviour,
  addSectionBehaviour:addSectionBehaviour,
  removeSectionBehaviour:removeSectionBehaviour

};

export default  PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(SectionBehaviourPage))
