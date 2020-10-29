import React, { Component } from 'react';
import Signin from '../components/Signin';
import HomeHeader from '../components/HomeHeader';
import {connect} from 'react-redux'
import { useEffect } from 'react';
import {getAllSchools} from '../redux/actions/school'
import  Router  from 'next/router';
import { loginStudent, loginStaff } from '../redux/actions/auth';

 
class SignInPage extends Component {
    componentDidMount(){
       if (this.props.auth.isAuth) {
          Router.push('/dashboard')
       }
    }
   render() { 
      const {schools, auth, loginStaff, loginStudent } = this.props
      return (
         <>
         <HomeHeader/>
         <Signin loginStaff={loginStaff} loginStudent={loginStudent} schools={schools.schools}/>
      </>
      );
   }
}
 

const mapStateToProps = state => ({
   schools: state.schools,
   auth:state.auth
});

const mapDispatchToProps = {
 getSchools:getAllSchools,
 loginStudent: loginStudent,
 loginStaff:loginStaff

};




export default   connect(mapStateToProps, mapDispatchToProps)(SignInPage);
