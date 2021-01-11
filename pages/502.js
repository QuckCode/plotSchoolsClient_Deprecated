import Head from 'next/head';
import { Component } from 'react';
import HomeHeader from '../components/HomeHeader';
import NotFound from '../components/NotFound';

class Error extends Component {
  render() {
    return (
      <> 
     <Head>
      <link rel="stylesheet" href="/static/react-vis.css" />
    </Head>
     <HomeHeader/>
      <NotFound code={502} />
      </>
    );
  }
}

export default Error;
