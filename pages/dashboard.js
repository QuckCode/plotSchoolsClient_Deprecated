import  React from 'react'
import Head from 'next/head';
import Overview from '../components/Overview';
import { wrapper } from '../redux/store';
const DashboardPage = ({student, classes,scratchCard, staff}) => {
  console.log(staff)
  return  (
  
  <>    
    <Overview student={student} classes={classes} scratchCard={scratchCard} staff={staff}/> 
  </>
)
  }

export const getServerSideProps = wrapper.getServerSideProps(
  async ({ store }) => {
    
    return {
      props:{
         student:100,
         classes:5,
         scratchCard:100,
         staff:10
      }
    }
  }
)



export default DashboardPage;
