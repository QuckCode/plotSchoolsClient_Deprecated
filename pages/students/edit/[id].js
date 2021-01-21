import { Card , Dropdown } from 'antd';
import { MoreHorizontal } from 'react-feather';
import Calendar from '../../../components/Calendar';
import { PrivateRoute } from '../../../components/PrivateRoute';
import { loginSuccess } from '../../../redux/actions/auth';
import { editStudent, getCurrentStudent } from '../../../redux/actions/student';
import { wrapper } from '../../../redux/store';
import { AuthToken } from '../../../services/authToken';
import { getAllClasses } from '../../../redux/actions/classes';
import { getAllArms } from '../../../redux/actions/arm';
import { theme } from '../../../components/styles/GlobalStyles';
import { redirectBack } from '../../../services/redirectService';
import EditStudent from '../../../components/Student/EditStudent';
import { connect } from 'react-redux';
import { useState } from 'react';




const EditStudentPage = ({currentStudent, classes, arms, editStudent}) => {
  const [loading, setLoading]= useState(false)
   
  const edit = (value)=>{
     setLoading(true)
     editStudent(value)
     setTimeout(()=>{
        setLoading(false)
     }, 2000)
  }

  return (
        <Card 
        title="Edit Student "
        extra={
          <Dropdown>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
               <EditStudent student={currentStudent} loading={loading}  editStudent= {edit} classes={classes} arms={arms}/>
          </div>
       </Card>
  )
};

const mapDispatchToProps = {
  editStudent
};


const mapStateToProps = state => ({

});

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    const store = ctx.store
    const {id} =   ctx.query
    let data =  await AuthToken.fromNext(ctx)
    await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
    await store.dispatch(getCurrentStudent(id))
    await store.dispatch(getAllClasses())
    await store.dispatch(getAllArms())
    let propStore =  await store.getState()  
    if(propStore.student.currentStudent===""){
       redirectBack(ctx)
    }
    return {
      props:{
         currentStudent:propStore.student.currentStudent,
         classes:propStore.classes,
         arms:propStore.arm.arms
      }
    }
  }
)



export default  connect(mapStateToProps,mapDispatchToProps)(EditStudentPage);
