import React from "react";
import {
   Card,
   Row,
   Typography,
   Menu,
   Dropdown,
   Table,
   Tag,
   Divider,
   Col,
   Avatar,
   Input,
   Button,
   Modal,
   Pagination,
   Popconfirm,
   Select,
   Spin,
} from "antd";
import styled from "styled-components";
import { theme } from "../../../components/styles/GlobalStyles";
import { Edit, MoreHorizontal, Printer, Save, Trash } from "react-feather";
import { getStaffClasses } from "../../../redux/actions/classes";
import { getAllSection } from "../../../redux/actions/section";
import { getAllArms } from "../../../redux/actions/arm";
import {
   getAllSkill,
   fetchStudentSkillScore,
} from "../../../redux/actions/skill";
import { connect } from "react-redux";
import { useEffect } from "react";
import { wrapper } from "../../../redux/store";
import { useAppState } from "../../../components/shared/AppProvider";
import { useState } from "react";
import BehaviourScoreForm from "../../../components/Behaviour/BehaviourScoreForm";
import { PrivateRoute } from "../../../components/PrivateRoute";
import { success, error } from "../../../components/modal";
import Axios from "axios";
import { url } from "../../../redux/varables";
import { loginSuccess } from "../../../redux/actions/auth";
import { AuthToken } from "../../../services/authToken";

const Title = Typography.Title;

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;
const Search = Input.Search;
const Option = Select.Option;

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
      <Menu.Item>
         <Row type="flex" align="middle">
            <Printer size={16} strokeWidth={1} className="mr-3" />{" "}
            <span>Print</span>
         </Row>
      </Menu.Item>
   </Menu>
);

const SkillScoreByStudent = (props) => {
   const [state] = useAppState();
   const [hiddenTable, setHiddenTable] = useState(true);
   const [loading, setLoading] = useState(false);
   const [position, setPosition] = useState(1);
   const [dataSource, setDataSource] = useState(
      props.skillScoreByStudent.skillScores
   );

   const onSearch = () => {};

   const onConfirm = () => {
      Axios.post(
         `${url}/student/arm/skill/score/save`,
         dataSource[position - 1]
      )
         .then((data) => {
            success("Save Students scores");
         })
         .catch((err) => {
            error(
               "Something went wrong",
               "Please check your connection and fill all the fields"
            );
         });
   };

   const handleScoreChange = (e, c) => {
      if (e == 0) {
         let scoreIndex = dataSource[position - 1].skills.findIndex(
            (a) => a._id === c._id
         );
         let scoreList = dataSource.slice();
         scoreList[position - 1].skills[scoreIndex] = {
            ...scoreList[position - 1].skills[scoreIndex],
            score: parseInt(e),
            hasScore: false,
         };
         setDataSource(scoreList);
         return;
      }
      let scoreIndex = dataSource[position - 1].skills.findIndex(
         (a) => a._id === c._id
      );
      let scoreList = dataSource.slice();
      scoreList[position - 1].skills[scoreIndex] = {
         ...scoreList[position - 1].skills[scoreIndex],
         score: parseInt(e),
         hasScore: true,
      };
      setDataSource(scoreList);
      return;
   };

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: `Score`,
         dataIndex: "score",
         key: "score",
         render: (x, c) => {
            return (
               <div style={{ textAlign: "center" }}>
                  <Select
                     onChange={(e) => handleScoreChange(e, c)}
                     value={x}
                     style={{ width: 120 }}
                  >
                     <Option style={{ background: "#fecd34" }} value={0}>
                        No Score
                     </Option>
                     <Option value={1}>Very Poor</Option>
                     <Option value={2}>Poor</Option>
                     <Option value={3}> Good </Option>
                     <Option value={4}>Very Good</Option>
                     <Option value={5}>Excellent</Option>
                  </Select>
               </div>
            );
         },
      },
   ];

   const nextPosition = (number) => {
      setLoading(true);
      setTimeout(() => {
         setLoading(false);
      }, 1000);
      if (dataSource.length === number) {
         setPosition(1);
      } else {
         setPosition(number + 1);
      }
   };

   useEffect(() => {
      if (props.skillScoreByStudent.skillScores.length == 0) {
         setHiddenTable(true);
      }
      setDataSource(props.skillScoreByStudent.skillScores);
   }, [props.skillScoreByStudent.skillScores]);

   const getStudentSkillsScore = (value) => {
      return props
         .fetchStudentSkillScore(value)
         .then((x) => {
            setHiddenTable(false);
            return Modal.success({
               title: "Successfully  Found Users ",
            });
         })
         .catch((err) => {
            return Modal.error({
               title: err.title,
               content: err.message,
            });
         });
   };

   return (
      <>
         <Card
            title="Add Behaviour Score By Students"
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
               {hiddenTable ? (
                  <BehaviourScoreForm
                     getScore={getStudentSkillsScore}
                     sections={props.section.section}
                     classes={props.classes.classes}
                     arms={props.arm.arms}
                  />
               ) : (
                  <div>
                     <Spin spinning={loading} size="large">
                        <Row gutter={[48, 0]}>
                           <Col
                              xs={24}
                              lg={9}
                              style={{ paddingBottom: 20 }}
                              span={9}
                           >
                              <Search
                                 placeholder="Admission Number"
                                 enterButton="Search"
                                 size="large"
                                 onSearch={onSearch}
                              />
                           </Col>
                           <Col
                              xs={12}
                              lg={8}
                              style={{ paddingBottom: 20 }}
                              span={8}
                           >
                              <Pagination
                                 onChange={(e) => nextPosition(e - 1)}
                                 simple
                                 current={position}
                                 defaultCurrent={1}
                                 total={dataSource.length * 10}
                              />
                           </Col>
                           <Col
                              xs={12}
                              lg={7}
                              style={{ paddingBottom: 20 }}
                              span={7}
                           >
                              <Typography.Text strong level={4}>
                                 {" "}
                                 Student {position} of {dataSource.length}{" "}
                              </Typography.Text>
                           </Col>
                        </Row>
                        <Divider />
                        <Row gutter={[48, 48]}>
                           <Col span={16}>
                              <Typography.Text strong level={4}>
                                 {" "}
                                 Name Of Student:{" "}
                                 {dataSource[position - 1]
                                    ? dataSource[position - 1].name
                                    : ""}{" "}
                              </Typography.Text>
                              <br />
                              <br />
                              <Typography.Text strong level={4}>
                                 {" "}
                                 Admission Number:{" "}
                                 {dataSource[position - 1]
                                    ? dataSource[position - 1].admissionNumber
                                    : ""}{" "}
                              </Typography.Text>
                           </Col>
                           <Col span={7}>
                              <Avatar
                                 style={{ width: 100, height: 100 }}
                                 shape="square"
                                 size="large"
                                 src={
                                    dataSource[position - 1]
                                       ? dataSource[position - 1].passport
                                       : ""
                                 }
                              />
                           </Col>
                        </Row>
                        <Row gutter={[48, 48]}>
                           <Col xs={24} lg={12} span={12}>
                              <Table
                                 size="small"
                                 footer={() => (
                                    <div>
                                       <Popconfirm
                                          placement="topLeft"
                                          onConfirm={onConfirm}
                                          title={
                                             "Are you sure you want to submit this student score sheet"
                                          }
                                          okText="Yes"
                                          cancelText="No"
                                       >
                                          <Button type="primary">
                                             {" "}
                                             Submit Student Score{" "}
                                          </Button>
                                       </Popconfirm>
                                       <Button
                                          onClick={() => nextPosition(position)}
                                          style={{ marginLeft: 10 }}
                                          type="primary"
                                       >
                                          {" "}
                                          {dataSource.length === position
                                             ? "Start Again"
                                             : "Next Student"}{" "}
                                       </Button>
                                    </div>
                                 )}
                                 pagination={false}
                                 bordered
                                 columns={columns}
                                 dataSource={
                                    dataSource.length > 0
                                       ? dataSource[position - 1].skills
                                       : []
                                 }
                              />
                           </Col>
                        </Row>
                     </Spin>
                  </div>
               )}
               <Row>
                  {hiddenTable ? (
                     <></>
                  ) : (
                     <Button
                        style={{ margin: 10 }}
                        icon="arrow-left"
                        onClick={() => setHiddenTable(true)}
                     >
                        {" "}
                        Go Back To Form
                     </Button>
                  )}
               </Row>
            </div>
         </Card>
      </>
   );
};

const mapStateToProps = (state) => ({
   skillScoreByStudent: state.skill.skillScoreByStudent,
});

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   const store = ctx.store;
   let data = await AuthToken.fromNext(ctx);
   await store.dispatch(
      loginSuccess(data.decodedToken, data.decodedToken.userType)
   );
   let staffId = data.decodedToken._id;
   await store.dispatch(getAllSkill());
   await store.dispatch(getAllArms());
   await store.dispatch(getAllSection());
   await store.dispatch(getStaffClasses(staffId));
   let propStore = await store.getState();
   return {
      props: {
         section: propStore.section,
         classes: propStore.classes,
         arm: propStore.arm,
         behaviour: propStore.behavior,
      },
   };
});

const mapDispatchToProps = {
   fetchStudentSkillScore,
};

export default connect(
   mapStateToProps,
   mapDispatchToProps
)(SkillScoreByStudent);
