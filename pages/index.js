import Head from "next/head";
import HomeHeader from "../components/HomeHeader";
import { Row, Col } from "antd";
import "../node_modules/react-vis/dist/style.css";
import HomePage from "../components/HomePage";

const IndexPage = () => {
   return (
      <>
         <Head>
            <link rel="stylesheet" href="/static/react-vis.css" />
         </Head>
         <HomePage />
      </>
   );
};

export default IndexPage;
