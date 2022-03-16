import React from "react";
import {
   Card,
   Row,
   Typography,
   Menu,
   Dropdown,
   Table,
   Avatar,
   Input,
   Button,
   Popconfirm,
   Modal,
   Icon,
   Divider,
} from "antd";
import styled from "styled-components";
import { theme } from "../../components/styles/GlobalStyles";
import { Edit, MoreHorizontal, Printer, Save, Trash } from "react-feather";
import { getAllTest } from "../../redux/actions/test";
import { getAllClasses } from "../../redux/actions/classes";
import { getAllSection } from "../../redux/actions/section";
import { getAllSubjects } from "../../redux/actions/subject";
import { getAllArms } from "../../redux/actions/arm";
import { getStudentTestScore } from "../../redux/actions/test";
import { connect } from "react-redux";
import { useEffect } from "react";
import { wrapper } from "../../redux/store";
import { useAppState } from "../../components/shared/AppProvider";
import { useState } from "react";
import axios from "axios";
import { url } from "../../redux/varables";
import {
   capitalize,
   termTextToNUmbers,
   nth,
   printPDF,
   printPDFMultiple,
   jsonToCsvConvertor,
} from "../../lib/helpers";
import { AuthToken } from "../../services/authToken";
import { loginSuccess } from "../../redux/actions/auth";
import PrintScoreSheetForm from "../../components/Test/PrintScoreSheetForm";

const { Text, Title } = Typography;

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const menu = (
   <Menu>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Edit size={16} strokeWidth={1} className="mr-3" />{" "}
            <span>Edit</span>
         </Row>
      </Menu.Item>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Trash size={16} strokeWidth={1} className="mr-3" />{" "}
            <span>Delete</span>
         </Row>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
         <Row type="flex" align="middle">
            <Save size={16} strokeWidth={1} className="mr-3" />{" "}
            <span>Save as</span>
         </Row>
      </Menu.Item>
      <Menu.Item onClick={() => printPDFMultiple("mb-4")}>
         <Row type="flex" align="middle">
            <Printer size={16} strokeWidth={1} className="mr-3" />{" "}
            <span>Print</span>
         </Row>
      </Menu.Item>
   </Menu>
);
const PrintTestSheetPage = (props) => {
   const [loading, setLoading] = useState(false);
   const [state] = useAppState();
   const [tableHeight, setTableHeight] = React.useState(0);
   const [hiddenTable, setHiddenTable] = useState(true);
   const [scoreSheet, setScoreSheet] = useState([]);
   const [columns, setColumns] = useState([
      {
         title: "Admission Number",
         render: (record) => {
            return <span> {record.admissionNumber}</span>;
         },
         width: state.mobile ? 150 : 150,
      },
      {
         title: "Name",
         render: (record) => {
            return <span> {record.name}</span>;
         },
         width: state.mobile ? 150 : 300,
      },
   ]);

   const handlePrint = () => {
      if (scoreSheet.length === 1) return printPDF(`scoreSheet0`);
      return printPDFMultiple("scoreSheet");
   };

   const handleGetScoreSheetAll = (value) => {
      axios
         .post(`${url}/result/caSheet/all/subject`, value)
         .then(({ data }) => {
            setScoreSheet(data);
            setHiddenTable(false);
         });
   };

   const handleGetScoreSheetSingle = (value) => {
      axios
         .post(`${url}/result/caSheet/single/subject`, value)
         .then(({ data }) => {
            setScoreSheet(data);
            setHiddenTable(false);
         });
   };

   const handleExportToExcel = () => {
      let tests = {};
      scoreSheet[0].tests.map((x) => {
         tests[x.name] = 0;
      });

      let data = scoreSheet[0].students.map((student) => {
         return {
            ...student,
            ...tests,
         };
      });
      jsonToCsvConvertor(data, "Data", true);
   };

   React.useEffect(() => {
      setTableHeight(window.innerHeight - 280);
      props.test.tests.map((x, i) => {
         columns.push({
            title: x.name,
            width: 50,
            dataIndex: i,
            key: i,
         });
      });
   }, [props.test.tests]);

   return (
      <>
         <Card
            title="Print Test/ Exam Sheet"
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
            <div className="p-2">
               {!hiddenTable ? (
                  <div>
                     <Button
                        style={{ margin: 5 }}
                        type="primary"
                        icon="print"
                        onClick={() => handlePrint()}
                     >
                        {scoreSheet.length > 1
                           ? " Print All Sheet Ca Sheet"
                           : " Print Ca Sheet"}
                     </Button>

                     <Button
                        style={{ margin: 5 }}
                        type="primary"
                        onClick={() => handleExportToExcel(true)}
                     >
                        Export to Excel
                     </Button>
                  </div>
               ) : (
                  <></>
               )}
               {!hiddenTable ? (
                  scoreSheet.map((data, i) => (
                     <div key={i} id={`scoreSheet${i}`} className="scoreSheet">
                        <br />
                        <br />
                        <Table
                           title={() => (
                              <div
                                 style={{ width: "100%", textAlign: "center" }}
                              >
                                 <Typography.Title
                                    level={4}
                                    strong
                                    style={{ padding: 10, margin: 0 }}
                                 >
                                    {capitalize(data.school.name)}
                                 </Typography.Title>
                                 <Divider style={{ padding: 0, margin: 0 }} />
                                 <Typography.Title
                                    level={4}
                                    strong
                                    style={{ padding: 10, margin: 0 }}
                                 >
                                    {`${
                                       termTextToNUmbers(data.school.term) +
                                       nth(termTextToNUmbers(data.school.term))
                                    } Term ${
                                       data.school.section
                                    } Continuos Assessment Sheet`}
                                 </Typography.Title>
                                 <Divider style={{ padding: 0, margin: 0 }} />
                                 <Typography.Title
                                    level={4}
                                    strong
                                    style={{ padding: 10, margin: 0 }}
                                 >
                                    {`${data.class}  ${data.arm}   ${data.subjects.name}  `}
                                 </Typography.Title>
                              </div>
                           )}
                           bordered
                           pagination={false}
                           size="large"
                           dataSource={data.students}
                           columns={columns}
                           scroll={true}
                        />
                     </div>
                  ))
               ) : (
                  <PrintScoreSheetForm
                     disable={!hiddenTable}
                     getScoreSheetSingle={handleGetScoreSheetSingle}
                     getScoreSheetAll={handleGetScoreSheetAll}
                     sections={props.section.section}
                     classes={props.classes.classes}
                     arms={props.arm.arms}
                     subjects={props.subject.subjects}
                  />
               )}
               {!hiddenTable ? (
                  <Button
                     style={{ margin: 10 }}
                     icon="arrow-left"
                     onClick={() => setHiddenTable(true)}
                  >
                     {" "}
                     Back To form
                  </Button>
               ) : (
                  <></>
               )}
            </div>
         </Card>
      </>
   );
};

const mapStateToProps = (state) => ({
   testBySubject: state.test.testBySubject,
});

const mapDispatchToProps = {
   getStudentTestScore: getStudentTestScore,
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   const store = ctx.store;
   let data = await AuthToken.fromNext(ctx);
   await store.dispatch(
      loginSuccess(data.decodedToken, data.decodedToken.userType)
   );
   await store.dispatch(getAllTest());
   await store.dispatch(getAllArms());
   await store.dispatch(getAllSection());
   await store.dispatch(getAllSubjects());
   await store.dispatch(getAllClasses());
   let propStore = await store.getState();
   return {
      props: {
         section: propStore.section,
         classes: propStore.classes,
         arm: propStore.arm,
         subject: propStore.subject,
         test: propStore.test,
      },
   };
});

export default connect(mapStateToProps, mapDispatchToProps)(PrintTestSheetPage);
