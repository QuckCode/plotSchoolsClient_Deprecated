import  React from 'react'
import Head from 'next/head';
import Overview from '../components/Overview';
import { wrapper } from '../redux/store';
import { getAllClasses } from '../redux/actions/classes';
import { getAllStudents } from '../redux/actions/student';
import { getAllStaffs } from '../redux/actions/staff';
import { AuthToken } from '../services/authToken';
import { loginSuccess } from '../redux/actions/auth';



const DashboardPage = ({students, classes,scratchCard, staffs}) => {
  return  (
  
  <>    
    <Overview  students={students} classes={classes} scratchCard={scratchCard} staffs={staffs}/> 

  </>
)
  }

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    const store = ctx.store
    let data =  await AuthToken.fromNext(ctx)
    await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
    await store.dispatch(getAllClasses())
    await store.dispatch(getAllStudents())
    await store.dispatch(getAllStaffs())
    let propStore =  await store.getState()  
    return {
      props:{
         students:propStore.student.students.length,
         classes:propStore.classes.classes.length,
         scratchCard:100,
         staffs:propStore.staff.staffs.length
      }
    }
  }
)



export default DashboardPage;
