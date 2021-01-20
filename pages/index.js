import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../components/HomeHeader';
import { NotPrivateRoute } from '../components/NotPrivateRoute';
import Overview from '../components/Overview';
import Demo from '../demos/antd/carousel/demo';
import '../node_modules/react-vis/dist/style.css';

const IndexPage = () => {
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



export default IndexPage;
