import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../components/HomeHeader';
import Overview from '../components/Overview';
import Demo from '../demos/antd/carousel/demo';

const IndexPage = ({auth}) => {
  const Router = useRouter()
  useEffect(()=>{
    if (auth.isAuth) {
      Router.push('/dashboard')
   }
  })

  return(
    <>
    <Head>
      <link rel="stylesheet" href="/static/react-vis.css" />
    </Head>
     <HomeHeader/>
     <Demo/>
     
  </>
  )
};


const mapStateToProps = state => ({
  auth:state.auth
});

const mapDispatchToProps = {};

export default   connect(mapStateToProps, mapDispatchToProps)(IndexPage);
