import Head from 'next/head';
import HomeHeader from '../components/HomeHeader';
import Overview from '../components/Overview';
import Demo from '../demos/antd/carousel/demo';


const OverviewPage = () => (
  <>
    <Head>
      <link rel="stylesheet" href="/static/react-vis.css" />
    </Head>
     <HomeHeader/>
     <Demo/>
     
  </>
);

export default OverviewPage;
