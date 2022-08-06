import React, { useState } from "react";
import { Row, Table, Col, Typography } from "antd";
import { Phone, Mail, MapPin } from "react-feather";
import {
   capitalize,
   handleEnumScore,
   nth,
   termTextToNUmbers,
   romanize,
   grade,
   collator,
} from "../../lib/helpers";
import { QRCodeSVG } from "qrcode.react";

export default function TermResult({
   schoolSettings,
   result,
   currentClassTests,
   totalStudent,
}) {
   const parseResultColumn = (data) => {
      let c = [];
      let d = {
         title: `${schoolSettings.term} Term Continuous Assessments`,
         children: [],
      };
      let z = { title: `${schoolSettings.term} Term Summary`, children: [] };
      z.children.push({
         title: "Grade",
         key: "total",
         dataIndex: "studentResults.total",
         render: (text) => <p className="center-text">{grade(text)} </p>,
      });
      z.children.push({
         title: "Position",
         key: "position",
         dataIndex: "studentResults.position",
         render: (text) => <p className="center-text">{text + nth(text)} </p>,
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
      d.children = d.children.sort((a, b) =>
         collator.compare(a.title, b.title)
      );
      d.children.push({
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

   const isPromoted = (term, avg, text) => {
      if (term == "Third") {
         if (avg >= 40) return "Promoted to Next Class";
         return "Advised To Repeat";
      }
      return "";
   };

   return (
      <div
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
                  {termTextToNUmbers(schoolSettings.term) +
                     nth(termTextToNUmbers(schoolSettings.term)) +
                     " "}
                  term {schoolSettings.section} Section
               </span>
            </Col>
         </Row>
         <Row style={{ height: 100 }} className="rowForm">
            <Col span={16}>
               <div style={{ textAlign: "start" }}>
                  <span>
                     Name of student : <u> {result.name} </u>
                  </span>
               </div>
               <div style={{ textAlign: "start", marginTop: "3%" }}>
                  <span>
                     Admission Number: <xu>{result.admissionNumber} </xu>
                  </span>
                  <span style={{ marginLeft: "10%" }}>
                     Class:
                     <u>
                        {result.class} {result.arm}
                     </u>
                  </span>

                  <span style={{ marginLeft: "10%" }}>
                     Gender: <u> {result.gender ? "Male" : "Female"} </u>
                  </span>
               </div>
            </Col>
            <Col span={8}>
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
                  dataSource={result.resultScores}
                  columns={parseResultColumn(currentClassTests)}
                  footer={() => (
                     <Row gutter={[16, 16]}>
                        <Col span={8}>
                           <span style={{ padding: "3rem" }}>
                              {schoolSettings.term} Term Avg :{result.avg}%
                           </span>
                        </Col>
                        <Col span={8}>
                           <span style={{ padding: "3rem" }}>
                              {schoolSettings.term} Term Total :
                              {result.totalScore}
                           </span>
                        </Col>
                        <Col span={8}>
                           <span style={{ padding: "3rem" }}>
                              Position :{result.position + nth(result.position)}
                           </span>
                        </Col>
                        <Col span={8}>
                           <span style={{ padding: "3rem" }}>
                              Total Student In Class :{totalStudent}
                           </span>
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
                  dataSource={result.resultBehaviours}
                  pagination={false}
                  bordered
                  columns={parseColumn("behaviour")}
               />
            </Col>
            <Col span={8}>
               <Table
                  size="small"
                  dataSource={result.resultSkills}
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
                        present: result.present,
                     },
                  ]}
                  size="small"
                  pagination={false}
                  bordered
                  columns={parseAttendanceColumn()}
               />
               <div>
                  <div style={{ marginTop: "10%", marginLeft: "30%" }}>
                     <QRCodeSVG
                        value={`https://plotschool.com/qrcode/student/${result.admissionNumber}`}
                     />
                  </div>
               </div>
            </Col>
         </Row>
         <br />
         <br />
         <br />
         <Row>
            <Col span={24}>
               <h3>{isPromoted(schoolSettings.term, result.avg)}</h3>
               <br />
               <br />
               <span>
                  <span> NOTICE: </span>
                  {schoolSettings.notice.map((x, no) => (
                     <span>
                        ({romanize(no + 1)}) {x}
                     </span>
                  ))}
               </span>
               <br />
               <br />
               <span>
                  <span> Signed: </span>
                  <span>
                     (i) Form Master: _________________________________
                  </span>
                  <span>
                     ` (ii) Principal :_________________________________
                  </span>
               </span>
            </Col>
         </Row>
      </div>
   );
}
