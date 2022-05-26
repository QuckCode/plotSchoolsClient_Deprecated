import React, { useState } from "react";
import Head from "next/head";
import { PrivateRoute } from "../../components/PrivateRoute";
import StudentByArmForm from "../../components/Student/StudentByArmForm";
import { wrapper } from "../../redux/store";
import { loginSuccess } from "../../redux/actions/auth";
import { getAllSection } from "../../redux/actions/section";
import {
   getAllClasses,
   getCurrentClassTests,
} from "../../redux/actions/classes";
import { getAllArms } from "../../redux/actions/arm";
import { redirectError } from "../../services/redirectService";
import { AuthToken } from "../../services/authToken";
import { Menu, Row, Card, Dropdown, Table, Col, Avatar, Button } from "antd";
import {
   Edit,
   Trash,
   Save,
   Printer,
   MoreHorizontal,
   Phone,
   Mail,
   MapPin,
} from "react-feather";
import { theme } from "../../components/styles/GlobalStyles";
import Router from "next/router";
import { error, success } from "../../components/modal";
import {
   capitalize,
   handleEnumScore,
   nth,
   printPDFMultiple,
   termTextToNUmbers,
   romanize,
   grade,
} from "../../lib/helpers";
import Axios from "axios";
import { school, url } from "../../redux/varables";
import { getSchoolsSetting } from "../../redux/actions/school";

const menu = (
   <Menu>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Edit size={16} strokeWidth={1} className="mr-3" />
            <span>Edit</span>
         </Row>
      </Menu.Item>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Trash size={16} strokeWidth={1} className="mr-3" />
            <span>Delete</span>
         </Row>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
         <Row type="flex" align="middle">
            <Save size={16} strokeWidth={1} className="mr-3" />
            <span>Save as</span>
         </Row>
      </Menu.Item>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Printer size={16} strokeWidth={1} className="mr-3" />
            <span>Print</span>
         </Row>
      </Menu.Item>
   </Menu>
);

const getResult = async (classN, arm) => {
   try {
      let data = await (
         await Axios.post(`${url}/result/printResult/arm`, {
            classN: classN,
            arm: arm,
            school: school,
         })
      ).data;
      return data;
   } catch (error) {
      return [];
   }
};

const PrintResultPage = ({
   showResult,
   classes,
   sections,
   arms,
   currentClassTests = [],
   results,
   schoolSettings = {},
}) => {
   const [loading, setLoading] = useState(false);

   const handleSubmit = (value) => {
      setLoading(true);
      Axios.post(`${url}/result/printResult/arm`, {
         classN: value.classN,
         arm: value.arm,
         school: school,
      })
         .then((data) => {
            Router.push({
               pathname: `/result/PrintResultAll`,
               query: { classN: value.classN, arm: value.arm, school: school },
            });
            setLoading(false);
         })
         .catch(({ response }) => {
            setLoading(false);
            if (response) {
               console.log(response);
               error(response.data.title, response.data.message);
            } else {
               error("Network Error", "Please an error occurred");
            }
         });
   };

   const parseResultColumn = (data) => {
      let c = [];
      let d = {
         title: `${schoolSettings.term} Term Continuous Assessments`,
         children: [],
      };
      let z = { title: `${schoolSettings.term} Term Summary`, children: [] };
      z.children.push({
         title: "Final Grade",
         key: "total",
         dataIndex: "studentResults.total",
         render: (text) => <p className="center-text">{grade(text)} </p>,
      });
      z.children.push({
         title: "Position",
         key: "position",
         dataIndex: "studentResults.position",
         render: (text) => <p className="center-text">{text} </p>,
      });
      c.push({
         title: "Class",
         children: [
            {
               title: "High",
               key: "high",
               dataIndex: "studentResults.high",
               render: (text) => <p className="center-text">{text} </p>,
            },
            {
               title: "Low",
               key: "low",
               dataIndex: "studentResults.low",
               render: (text) => <p className="center-text">{text} </p>,
            },
            {
               title: "Avg",
               key: "avg",
               dataIndex: "studentResults.avg",
               render: (text) => <p className="center-text">{text} </p>,
            },
         ],
      });
      c.push({
         title: "Total (100)%",
         key: "total",
         dataIndex: "studentResults.total",
         render: (text) => <p className="center-text">{text} </p>,
      });

      c.push(z);
      let v = data.map(({ name, marksObtainable }) => ({
         title: `${name}`,
         key: name,
         dataIndex: "studentResults.scores",
         render: (value, item, index) => {
            if (value) {
               let testScore = value.find((x) => x.test === name);
               return (
                  <p className="center-text">
                     {testScore ? testScore.score : " "}
                  </p>
               );
            }
            return <span> </span>;
         },
      }));

      let x = data.map(({ name, marksObtainable }) => ({
         title: `${name} ratio`,
         key: name,
         render: (value, item, index) => {
            return <span className="center-text">{marksObtainable}</span>;
         },
      }));
      x.map((data, i) => {
         d.children.push(v[i]);
      });
      d.children = d.children.reverse();
      d.children.push({
         title: "Total",
         key: "total",
         dataIndex: "studentResults.total",
         render: (text) => <p className="center-text">{text} </p>,
      });
      c.push(d);
      c.push({ title: "Subject", key: "subject", dataIndex: "subject" });
      return [{ title: "Record Of Student`s Result ", children: c.reverse() }];
   };

   const parseColumn = (name) => {
      return [
         {
            title: capitalize(name + " Records "),
            children: [
               { title: capitalize(name), key: name, dataIndex: name },
               {
                  title: "Grade",
                  key: "score",
                  dataIndex: "score",
                  render: (text) => <span>{handleEnumScore(text)} </span>,
               },
            ],
         },
      ];
   };

   const parseAttendanceColumn = () => {
      return [
         {
            title: capitalize("Attendance Record"),
            children: [
               {
                  title: capitalize("No of Times School Opened"),
                  key: "opened",
                  dataIndex: "opened",
               },
               {
                  title: capitalize("No of Times Present"),
                  key: "present",
                  dataIndex: "present",
               },
            ],
         },
      ];
   };

   if (!showResult) {
      return (
         <Card
            title="Compute Result "
            extra={
               <Dropdown overlay={menu}>
                  <MoreHorizontal
                     size={20}
                     strokeWidth={1}
                     fill={theme.textColor}
                  />
               </Dropdown>
            }
            bodyStyle={{ padding: "1rem" }}
            id="result"
            className="mb-4"
         >
            <div className="p-4">
               <StudentByArmForm
                  handleSubmit={handleSubmit}
                  loading={loading}
                  classes={classes}
                  sections={sections}
                  arms={arms}
               />
            </div>
         </Card>
      );
   } else {
      return (
         <div onKeyDown={(e) => console.log(e)} className="mb-4">
            <Button
               onClick={() => {
                  success("Print has started it might  take a while");
                  printPDFMultiple("result");
               }}
               type="primary"
               style={{ margin: "1rem" }}
            >
               Prints All Student Result
            </Button>
            {results.map((x, i) => (
               <div
                  key={i}
                  style={{
                     pageBreakInside: "avoid",
                     pageBreakAfter: "always",
                  }}
                  className="result"
               >
                  <Row className="rowForm">
                     <Col span={16}>
                        <img
                           style={{ width: "80%", height: 100 }}
                           className="banner"
                           src={schoolSettings.schoolImageAsBlob}
                        />
                     </Col>
                     <Col span={8}>
                        <div className="description-form">
                           <span>
                              <Phone size={10} /> {schoolSettings.phoneNumber}
                           </span>
                           <br />
                           <span>
                              <Mail size={10} /> {schoolSettings.email}
                           </span>
                           <br />
                           <span>
                              <MapPin size={10} />
                              {schoolSettings.address}
                           </span>
                        </div>
                     </Col>
                  </Row>
                  <Row>
                     <Col span={24}>
                        <br />
                        <span>
                           Termly Result :
                           {" " +
                              termTextToNUmbers(schoolSettings.term) +
                              nth(termTextToNUmbers(schoolSettings.term)) +
                              " "}
                           term {schoolSettings.section} Section
                        </span>
                     </Col>
                  </Row>
                  <Row style={{ height: 100 }} className="rowForm">
                     <Col span={12}>
                        <div style={{ textAlign: "start" }}>
                           <span> Name of student : {results[i].name} </span>
                           <span style={{ marginLeft: "10%" }}>
                              Class: {results[i].class} {results[i].arm}
                           </span>
                        </div>
                        <div style={{ textAlign: "start", marginTop: "3%" }}>
                           <span>
                              Admission Number: {results[i].admissionNumber}
                           </span>
                           <span style={{ marginLeft: "10%" }}>
                              Gender: {results[i].gender ? "Male" : "Female"}
                           </span>
                        </div>
                     </Col>
                     <Col span={12}>
                        <div style={{ textAlign: "end" }}></div>
                     </Col>
                  </Row>
                  <br />
                  <Row gutter={[16, 16]}>
                     <Col span={24}>
                        <Table
                           size="small"
                           pagination={false}
                           bordered
                           dataSource={results[i].resultScores}
                           columns={parseResultColumn(currentClassTests)}
                           footer={() => (
                              <Row gutter={[16, 16]}>
                                 <Col span={8}>
                                    <div
                                       style={{
                                          margin: "1rem",
                                          textAlign: "end",
                                       }}
                                    >
                                       <span>
                                          {schoolSettings.term} Term Avg :
                                          {results[i].avg}%
                                       </span>
                                       <br />
                                    </div>
                                 </Col>
                                 <Col span={8}>
                                    <div
                                       style={{
                                          margin: "1rem",
                                          textAlign: "end",
                                       }}
                                    >
                                       <span>
                                          {schoolSettings.term} Term Total :
                                          {results[i].totalScore}
                                       </span>
                                       <br />
                                    </div>
                                 </Col>
                                 <Col span={8}>
                                    <div
                                       style={{
                                          margin: "1rem",
                                          textAlign: "end",
                                       }}
                                    >
                                       <span>
                                          Position :
                                          {results[i].position +
                                             nth(results[i].position)}
                                       </span>
                                       <br />
                                    </div>
                                 </Col>
                              </Row>
                           )}
                        />
                     </Col>
                  </Row>
                  <br />
                  <Row gutter={[16, 16]}>
                     <Col span={8}>
                        <Table
                           size="small"
                           dataSource={results[i].resultBehaviours}
                           pagination={false}
                           bordered
                           columns={parseColumn("behaviour")}
                        />
                     </Col>
                     <Col span={8}>
                        <Table
                           size="small"
                           dataSource={results[i].resultSkills}
                           pagination={false}
                           bordered
                           columns={parseColumn("skill")}
                        />
                     </Col>
                     <Col span={8}>
                        <Table
                           dataSource={[
                              {
                                 opened: schoolSettings.openedDays,
                                 present: results[i].present,
                              },
                           ]}
                           size="small"
                           pagination={false}
                           bordered
                           columns={parseAttendanceColumn()}
                        />
                     </Col>
                  </Row>
                  <br />
                  <div>
                     <span> NOTICE: </span>
                     {schoolSettings.notice.map((x, no) => (
                        <p>
                           ({romanize(no + 1)}) {x}
                        </p>
                     ))}
                  </div>
                  <br />
                  <div>
                     <span> Signed </span>
                     <p> (i) Form Master: _________________________________ </p>
                     <br />
                     <p> (ii) Principal :_________________________________ </p>
                  </div>
                  <br />
                  <br />
                  <br />
                  <br />
               </div>
            ))}
         </div>
      );
   }
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   try {
      const store = ctx.store;
      let data = await AuthToken.fromNext(ctx);
      await store.dispatch(
         loginSuccess(data.decodedToken, data.decodedToken.userType)
      );
      await store.dispatch(getAllSection());
      await store.dispatch(getAllClasses());
      await store.dispatch(getAllArms());
      let propStore = await store.getState();
      if (ctx.query.arm && ctx.query.classN) {
         try {
            await store.dispatch(getCurrentClassTests(ctx.query.classN));
            let results = await getResult(ctx.query.classN, ctx.query.arm);
            await store.dispatch(getSchoolsSetting(data.decodedToken.school));
            propStore = await store.getState();
            return {
               props: {
                  classes: propStore.classes.classes,
                  currentClassTests: propStore.test.currentClassTests,
                  schoolSettings: propStore.schools.settings,
                  sections: propStore.section.section,
                  arms: propStore.arm.arms,
                  showResult: true,
                  results: results,
               },
            };
         } catch (error) {
            return {
               props: {
                  classes: propStore.classes.classes,
                  sections: propStore.section.section,
                  arms: propStore.arm.arms,
                  showResult: false,
               },
            };
         }
      } else
         return {
            props: {
               classes: propStore.classes.classes,
               sections: propStore.section.section,
               arms: propStore.arm.arms,
               showResult: false,
            },
         };
   } catch (error) {
      redirectError(ctx);
   }
});
export default PrintResultPage;
