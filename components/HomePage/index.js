import React from "react";
import Head from "next/head";
import HomeHeader from "../HomeHeader";
import { Row, Col, Button, Typography } from "antd";
import styles from "./HomePage.module.css";
import AppFooter from "../Footer";

const { Title, Text } = Typography;

const HomePage = () => {
   return (
      <div className={styles.wrapper}>
         <HomeHeader />
         <Row>
            <Col xs={24} sm={24} md={14} span={14}>
               <div className={styles.rightBox}>
                  <div className={styles.textWrapper}>
                     <Title className={styles.plotSchool}> Plot School</Title>
                     <Text className={styles.plotSchoolExplained}>
                        Plot School gives you the best result compilation
                        experience with all the features you need for managing
                        your school, From staff management , student management
                        , cbt exam soft ware etc.
                        <br />
                        <br />
                        Plot School gives you the best result compilation
                        experience with all the features you need for managing
                        your school, From staff management , student management
                        , cbt exam soft ware etc .
                     </Text>
                  </div>
                  <div className={styles.buttonWrapper}>
                     <Button size="large" className={styles.contactUs}>
                        Contact Us
                     </Button>
                  </div>
               </div>
            </Col>
            <Col xs={0} sm={0} md={10} span={10}>
               <div className={styles.leftBox}>
                  <img className={styles.boxImage} src="./image.svg" />
               </div>
            </Col>
         </Row>
         <Row>
            <Col span={24}>
               <div className={styles.features}>
                  <Title className={styles.plotSchool}>Features </Title>
                  <div className={styles.featuresList}>ncnd</div>
               </div>
            </Col>
         </Row>
         <AppFooter />
      </div>
   );
};

export default HomePage;
