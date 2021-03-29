import  React from 'react'
import Head from 'next/head';
import Overview from '../components/Overview';
import { wrapper } from '../redux/store';
import { getAllClasses } from '../redux/actions/classes';
import { getAllStudents, getGraphStudentClassTotal } from '../redux/actions/student';
import { getAllStaffs } from '../redux/actions/staff';
import { AuthToken } from '../services/authToken';
import { loginSuccess } from '../redux/actions/auth';
import { Card , Dropdown, Menu,Row } from 'antd';
import { MoreHorizontal, Archive, Edit, Save, Trash, Printer } from 'react-feather';
import { theme } from '../components/styles/GlobalStyles';
import { getSmsBalanceRequest, getSmsOutBoxRequest } from '../redux/actions/sms';
import { redirectError } from '../services/redirectService';
import { getSchoolsSetting } from '../redux/actions/school';
import StudentOverview from '../components/StudentOverview';

const DashboardPage = ({students, classes,scratchCard, staffs, graphStudentClassTotal,  loading, userType, smsBalance, smsSent, oldSchoolSettings}) => {

  const menu = (
    <Menu>
      <Menu.Item>
        <Row type="flex" align="middle">
          <Archive size={16} strokeWidth={1} className="mr-3" />{' '}
          <span>Archive</span>
        </Row>
      </Menu.Item>
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


if(userType==="student")
  return  (
  
  <>    
     <StudentOverview  
     students={students}
    classes={classes}
    scratchCard={scratchCard}
    staffs={staffs}
    graphStudentClassTotal={graphStudentClassTotal}
    loadingTotalGraph={loading}
    smsBalance={smsBalance}
    smsSent={smsSent}
    schoolSettings= {oldSchoolSettings}/>
  </>
)
if(userType==="staff")
return  ( 
<>    
  <Overview  students={students}
    classes={classes}
    scratchCard={scratchCard}
    staffs={staffs}
    graphStudentClassTotal={graphStudentClassTotal}
    loadingTotalGraph={loading}
    smsBalance={smsBalance}
    smsSent={smsSent}
    schoolSettings= {oldSchoolSettings}
    /> 
  </>
)
  }

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    try {
      const store = ctx.store
      let data =  await AuthToken.fromNext(ctx)
      await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
      await store.dispatch(getAllClasses())
      await store.dispatch(getAllStudents())
      await store.dispatch(getAllStaffs())
      await store.dispatch(getGraphStudentClassTotal())
      await store.dispatch(getSmsOutBoxRequest())
      await store.dispatch(getSmsBalanceRequest())
      await store.dispatch(getSchoolsSetting(data.decodedToken.school))
      let propStore =  await store.getState()  
      return {
        props:{
           students:propStore.student.students.length,
           classes:propStore.classes.classes.length,
           scratchCard:100,
           staffs:propStore.staff.staffs.length,
           graphStudentClassTotal:propStore.student.graphOfTotalParClass,
           loading:propStore.student.loading,
           userType:propStore.auth.user.userType,
           smsBalance:propStore.sms.balance,
           smsSent:propStore.sms.messages.length,
           oldSchoolSettings: propStore.schools.settings
        }
      } 
    } catch (error) {
      console.log(error, ctx)
        redirectError(ctx)
    }
  }
)



export default DashboardPage;
