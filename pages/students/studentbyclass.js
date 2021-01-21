
import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from 'antd';
import RegisterStaff from '../../components/Staff/RegisterStaff'
import styled from 'styled-components';
import { theme } from '../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import StudentTable from '../../components/Student/StudentTable';
import { connect } from 'react-redux';
import {useEffect, useState} from 'react'
import { PrivateRoute } from '../../components/PrivateRoute';
import { getAllClasses } from '../../redux/actions/classes';
import {getAllSection} from '../../redux/actions/section'
import { AuthToken } from '../../services/authToken';
import { loginSuccess } from '../../redux/actions/auth';
import { wrapper } from '../../redux/store';
import StudentByClassForm from '../../components/Student/StudentByClassForm';
import Axios from 'axios';
import { url } from '../../redux/varables';
import { error } from '../../components/modal';

const Title = Typography.Title

const Content = styled.div`
  z-index: 0;
  min-width: 300px;,
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

const StudentByClassPage = ({classes, sections,student}) =>{
  const  [loading, setLoading] = useState(false)
  const [hideTable , setHideTable] = useState(true)
  const [ students , setStudents] = useState({loading:true,students:[]})

  const  handleSubmit= (value)=>{
    setLoading(true)
   Axios.get(`${url}/class/students/${value.classN}`)
   .then(({data})=>{
     setLoading(false); setHideTable(false);
     setTimeout(()=>{setStudents({loading:false,students:data})}, 1000)

   })
   .catch(({response})=>{
     setLoading(false)
     if(response){
       error (response.data.title, response.data.message)
     }
     else{
       error("Network Error", "Please an error occurred")
     }
   })
  }

  return (
        <Card 
          title="View  Students By Class"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: 0 , height:'100%'}}
        className="mb-10"> 
              <div className="p-4">
               {
                 hideTable ? 
                 (
                  <StudentByClassForm handleSubmit={handleSubmit} loading={loading} sections={sections} classes={classes} />
                 )
                 :
                 (
                  <div>
                     <Typography.Text> Total Number of Student : {students.students.length} </Typography.Text>
                     <br/>
                     <br/>
                      <Button type="primary" onClick={()=>setHideTable(true)} > click here to go back to the form</Button>
                     <br/>
                     <br/>
                    <StudentTable   student={students}/>
                 </div>
                 )
               }
            </div>
       </Card>
  )
};



const mapStateToProps = state => ({
  
});

const mapDispatchToProps = {
   
};

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    const store = ctx.store
    let data =  await AuthToken.fromNext(ctx)
    console.log(data)
    await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
    await store.dispatch(getAllSection())
    await store.dispatch(getAllClasses())
    let propStore =  await store.getState()  
    return {
      props:{
         classes:propStore.classes.classes,
         sections:propStore.section.section
      }
    }
  }
)

export default connect(mapStateToProps,mapDispatchToProps)(StudentByClassPage);