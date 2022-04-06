import React, { useState, useEffect } from "react";
import Head from "next/head";
import { PrivateRoute } from "../../components/PrivateRoute";
import StudentByArmForm from "../../components/Student/StudentByArmForm";
import { wrapper } from "../../redux/store";
import { loginSuccess } from "../../redux/actions/auth";
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
import Router, { useRouter } from "next/router";
import { error, success } from "../../components/modal";
import {
   capitalize,
   handleEnumScore,
   nth,
   printPDF,
   termTextToNUmbers,
   romanize,
} from "../../lib/helpers";
import Axios from "axios";
import { school, url } from "../../redux/varables";
import { getSchoolsSetting } from "../../redux/actions/school";
import PreviousResultForm from "../../components/Result/PreviousResultForm";
import { getAllTest } from "../../redux/actions/test";

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

const getPreviousResult = async (term, section, admissionNumber) => {
   try {
      let data = await (
         await Axios.post(`${url}/result/previous`, {
            term: term,
            section: section,
            admissionNumber: admissionNumber,
         })
      ).data;
      return data;
   } catch (error) {
      return [];
   }
};

const PrintPreviousResultPage = ({
   showResult,
   schoolSettings = {},
   results = [],
   tests = [],
}) => {
   const [loading, setLoading] = useState(false);
   const [term, setTerm] = useState("");
   const [section, setSection] = useState("");
   const [admissionNumber, setAdmissionNumber] = useState("");
   const query = useRouter().query;

   useEffect(() => {
      if (query.term && query.section && query.admissionNumber) {
         setTerm(query.term);
         setSection(query.section);
         setAdmissionNumber(query.admissionNumber);
      }
      return {};
   }, []);

   const handleSubmit = (value) => {
      setLoading(true);
      Axios.post(`${url}/result/previous`, {
         term: value.term,
         section: value.section,
         admissionNumber: value.admissionNumber,
      })
         .then((data) => {
            Router.push({
               pathname: `/result/PrintPreviousResult`,
               query: {
                  term: value.term,
                  section: value.section,
                  admissionNumber: value.admissionNumber,
               },
            });
            setLoading(false);
         })
         .catch(({ response }) => {
            setLoading(false);
            if (response) {
               error(response.data.title, response.data.message);
            } else {
               error("Network Error", "Please an error occurred");
            }
         });
   };

   const parseResultColumn = (data) => {
      let c = [];
      c.push({
         title: "Position",
         key: "position",
         dataIndex: "position",
         render: (text) => <span>{text + nth(text)} </span>,
      });
      c.push({
         title: "Class",
         children: [
            { title: "High", key: "high", dataIndex: "high" },
            { title: "Low", key: "low", dataIndex: "low" },
            { title: "Avg", key: "avg", dataIndex: "avg" },
         ],
      });
      c.push({ title: "Total (100)%", key: "total", dataIndex: "total" });
      let v = data.reverse().map(({ name, marksObtainable }) => ({
         title: `${name + " (" + marksObtainable + ")%"}`,
         key: name,
         dataIndex: "scores",
         render: (value, item, index) => {
            let testScore = value.find((x) => x.test === name);
            return <span> {testScore ? testScore.score : " "} </span>;
         },
      }));
      c.push(...v);
      c.push({ title: "Subject", key: "subject", dataIndex: "subject" });
      c.push({
         title: "S/No",
         key: "index",
         render: (value, item, index) => <span>{index + 1}</span>,
      });
      return [{ title: "Student Result Records", children: c.reverse() }];
   };

   const parseColumn = (name) => {
      return [
         {
            title: capitalize(name + " Records "),
            children: [
               {
                  title: "S/No",
                  key: "index",
                  render: (value, item, index) => <span>{index + 1}</span>,
               },
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
            title="Print Previous Result "
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
            <div className="p-5">
               <PreviousResultForm
                  submit={handleSubmit}
                  previousSections={schoolSettings.previousSchoolSection}
               />
            </div>
         </Card>
      );
   } else {
      return (
         <Card
            title="Previous  Result"
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
            className="mb-4"
         >
            <div id="result" className="p-4">
               <Row className="rowForm">
                  <Col span={12}>
                     <img
                        style={{ width: "30%", height: 100 }}
                        className="banner"
                        src={schoolSettings.schoolImageAsBlob}
                     />
                  </Col>
                  <Col span={12}>
                     <div className="description-form">
                        <span className="textForm">
                           <Phone /> {schoolSettings.phoneNumber}
                        </span>
                        <span className="textForm">
                           <Mail /> {schoolSettings.email}
                        </span>
                        <span className="textForm">
                           <MapPin />
                           {schoolSettings.address}
                        </span>
                     </div>
                  </Col>
               </Row>
               <br />
               <Row className="rowForm">
                  <Col span={12}>
                     <div style={{ textAlign: "start" }}>
                        <span>
                           Name of student :
                           {results.Student[0].firstName +
                              " " +
                              results.Student[0].middleName +
                              " " +
                              results.Student[0].srnName}
                        </span>
                     </div>
                     <div style={{ textAlign: "start", marginTop: "5%" }}>
                        <span>
                           Admission Number:
                           {results.Student[0].admissionNumber}
                        </span>
                        <span style={{ marginLeft: "12%" }}>
                           Gender:
                           {results.Student[0].gender ? "Male" : "Female"}
                        </span>
                     </div>
                  </Col>
                  <Col span={12}>
                     <div style={{ textAlign: "end" }}>
                        <Avatar
                           shape="square"
                           size={100}
                           src={results.Student[0].passport}
                        />
                     </div>
                  </Col>
               </Row>
               <Row>
                  <Col span={24}>
                     <br />
                     <span className="textForm">
                        Term Result for
                        {termTextToNUmbers(term) + nth(termTextToNUmbers(term))}
                        term {section} Section
                     </span>
                  </Col>
               </Row>
               <br />
               <Row gutter={[16, 16]}>
                  <Col span={24}>
                     <Table
                        size="small"
                        pagination={false}
                        bordered
                        pagination={false}
                        bordered
                        pagination={false}
                        bordered
                        dataSource={results.resultScore}
                        columns={parseResultColumn(tests.reverse())}
                     />
                  </Col>
               </Row>
               <br />
               <Row gutter={[16, 16]}>
                  <Col span={8}>
                     <Table
                        size="small"
                        dataSource={results.resultBehaviour[0].behaviourScores}
                        pagination={false}
                        bordered
                        columns={parseColumn("behaviour")}
                     />
                  </Col>
                  <Col span={8}>
                     <Table
                        size="small"
                        dataSource={results.resultSkill[0].skillScores}
                        pagination={false}
                        bordered
                        columns={parseColumn("skill")}
                     />
                  </Col>
                  <Col span={8}>
                     <Table
                        dataSource={[{ opened: 100, present: 10, absent: 90 }]}
                        size="small"
                        pagination={false}
                        bordered
                        columns={parseAttendanceColumn()}
                     />
                  </Col>
               </Row>
               <br />

               <br />
               <div>
                  <span> Signators</span>
                  <p> (i) Form Master: _________________________________ </p>
                  <p> (ii) Prinicipal :_________________________________ </p>
               </div>
            </div>
            <Button
               onClick={() => printPDF("result")}
               type="primary"
               style={{ marginLeft: "1rem" }}
            >
               Prints Student Result
            </Button>
         </Card>
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
      await store.dispatch(getSchoolsSetting(data.decodedToken.school));
      await store.dispatch(getAllTest(school));
      let propStore = await store.getState();
      if (!ctx.query.term && !ctx.query.section && !ctx.query.admissionNumber)
         return {
            props: {
               showResult: false,
               schoolSettings: propStore.schools.settings,
            },
         };
      else {
         let results = await getPreviousResult(
            ctx.query.term,
            ctx.query.section,
            ctx.query.admissionNumber
         );
         return {
            props: {
               showResult: true,
               schoolSettings: propStore.schools.settings,
               results: results,
               tests: propStore.test.tests,
            },
         };
      }
   } catch (error) {
      redirectError(ctx);
   }
});

export default PrintPreviousResultPage;
