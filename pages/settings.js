import  React, { useEffect, useState } from 'react'
import Head from 'next/head';
import { Card, Row, Typography, Button, Menu, Dropdown, Avatar } from 'antd';
import { theme } from '../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { PrivateRoute } from '../components/PrivateRoute';
import { connect } from 'react-redux';
import { getAllClasses } from '../redux/actions/classes';
import { getAllArms } from '../redux/actions/arm';
import { getAllStaffs, getCurrentStaff } from '../redux/actions/staff';
import { getAllDesignations } from '../redux/actions/designation';
import { getAllDepartments } from '../redux/department/department';
import EditStaff from '../components/Staff/EditStaff';
import EditStudentProfile from '../components/Student/EditStudentProfile';

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

const SettingPage = ({auth,getAllClasses, getAllArms, getAllStaffs, getAllDesignations,  getAllDepartments,  staff, designations,  departments, classes, arm, student, getCurrentStaff}) => {

  const [staffData, setStaffData] = useState({name:{} , gender:0,})
  const [studentData, setStudentData] = useState({})

   useEffect(()=>{
      if(auth.userType==="staff"){
         getAllDepartments()
         getAllStaffs()
         getAllDesignations()
         getCurrentStaff(auth.user.regNumber)
         setStaffData(staff.currentStaff)
      }
      else{
         getAllClasses()
         getAllArms()
      }
   },[])

   const editStaff= (value)=>{
    
   }

   const editStudent= (value)=>{
     
  }

  if(auth.userType==="staff"){
    return (
      <Card 
      title="User Setting for Staff"
      extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      className="mb-4"> 
        <div className="p-4">
            <div style={{textAlign:"center"}}>
               <Avatar src={auth.user.passport} size={150} icon="user" />
               <div>
               <Button style={{margin:"1rem"}}> Change Passport </Button>
               <Button style={{margin:"1rem"}}> Take a Passport </Button>
               </div>
            </div>
            <EditStaff currentStaff={staffData}  designations={designations.designations} departments= {departments.departments} staff={staff} editStaff={editStaff}/>
        </div>
     </Card>
     )  
  }
  else{
    return (
      <Card 
      title="User setting  for student"
      extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      className="mb-4"> 
           <div className="p-4">
            <div style={{textAlign:"center"}}>
               <Avatar size={150} icon="user" />
               <div>
               <Button style={{margin:"1rem"}}> Change Passport </Button>
               <Button style={{margin:"1rem"}}> Take a Passport </Button>
               </div>
            </div>
            <EditStudentProfile  student={student} editStudent= {editStudent} classes={classes} arm={arm}/>
        </div>
     </Card>
     )  
  }
}

const mapStateToProps = state => ({
  auth:state.auth,
  staff:state.staff,
  designations:state.designation,
  departments:state.departments,
  classes: state.classes,
  arm:state.arm,
  student:state.student
});

const mapDispatchToProps = {
  getAllClasses:getAllClasses,
  getAllArms:getAllArms,
  getAllStaffs:getAllStaffs,
  getAllDesignations:getAllDesignations,
  getAllDepartments:getAllDepartments,
  getCurrentStaff
};

export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(SettingPage));
