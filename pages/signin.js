import React, { Component } from 'react';
import Signin from '../components/Signin';
import HomeHeader from '../components/HomeHeader';
import {connect} from 'react-redux'
import { useEffect } from 'react';
import {getAllSchools} from '../redux/actions/school'

 
class SignInPage extends Component {
    componentDidMount(){
       this.props.getSchools()
    }
   render() { 
      return (
         <>
         <HomeHeader/>
         <Signin schools={this.props.schools.schools}/>
      </>
      );
   }
}
 

const mapStateToProps = state => ({
   schools: state.schools
});

const mapDispatchToProps = {
 getSchools:getAllSchools,
};




export default   connect(mapStateToProps, mapDispatchToProps)(SignInPage);
