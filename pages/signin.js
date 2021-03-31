import React, { Component } from 'react';
import Signin from '../components/Signin';
import HomeHeader from '../components/HomeHeader';
import {connect} from 'react-redux'
import { useEffect } from 'react';
import {getAllSchools} from '../redux/actions/school'
import  Router  from 'next/router';
import { postLogin } from '../services/restService';
import { NotPrivateRoute } from '../components/NotPrivateRoute';
import { loginSuccess } from '../redux/actions/auth';
 
class SignInPage extends Component {
   state = {
      loading:false
   }
    componentDidMount(){
       if (this.props.auth.isAuth) {
          
         //  Router.push('/dashboard')
       }
    }
     
    loginStaff= (regNumber, password)=>{
      //  console.log({regNumber, password})
      this.setState({loading:true})
       postLogin("/login/staff",{regNumber, password}, this.props.loginSuccess)
       .then(()=>{
         this.setState({loading:false})
      })
      .catch(e=>{
         this.setState({loading:false})
      })
    }

    loginStudent= (regNumber, password)=>{
      this.setState({loading:true})
      postLogin("/login/student",{admissionNumber:regNumber, password}, this.props.loginSuccess)
      .then(()=>{
         this.setState({loading:false})
      })
      .catch(e=>{
         this.setState({loading:false})
      })

    }
   render() { 
      const {schools, auth } = this.props
      return (
         <>
         <HomeHeader/>
         <Signin  loading={this.state.loading} loginStaff={this.loginStaff} loginStudent={this.loginStudent} schools={schools.schools}/>
      </>
      );
   }
}
 

const mapStateToProps = state => ({
   schools: state.schools,
   auth:state.auth
});

const mapDispatchToProps = {
 loginSuccess
};




export default  NotPrivateRoute(connect(mapStateToProps, mapDispatchToProps)(SignInPage));
