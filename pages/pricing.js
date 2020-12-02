import { connect } from 'react-redux';
import HomeHeader from '../components/HomeHeader';
import Pricing from '../components/Pricing';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { NotPrivateRoute } from '../components/NotPrivateRoute';

const PricingPage = ({auth}) =>{
  const Router = useRouter()
  // useEffect(()=>{
  //   if (auth.isAuth) {
  //     Router.push('/dashboard')
  //    }
  // })
   return (
  <>
     <HomeHeader/>
     <Pricing />
   </>
)
  }
const mapStateToProps = state => ({
  auth:state.auth
});

const mapDispatchToProps = {};

export default   NotPrivateRoute(connect(mapStateToProps, mapDispatchToProps)(PricingPage));