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
import {
   Menu,
   Row,
   Card,
   Dropdown,
   Table,
   Col,
   Avatar,
   Button,
   InputNumber,
   Result,
   Popconfirm,
} from "antd";
import { Edit, Trash, Save, Printer, MoreHorizontal } from "react-feather";
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
} from "../../lib/helpers";
import Axios from "axios";
import { school, url } from "../../redux/varables";
import { getSchoolsSetting } from "../../redux/actions/school";
import { PromotionTerm } from "../../lib/constants";
import StudentTable from "../../components/Student/StudentTable";

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

const getResult = async (classN, arm) => {
   try {
      let data = await (
         await Axios.post(`${url}/result/printResult/arm`, {
            classN: classN,
            arm: arm,
            school: school,
         })
      ).data;
      console.log(data);
      return data;
   } catch (error) {
      return [];
   }
};

const GraduatePage = ({
   showResult,
   classes,
   sections,
   arms,
   results,
   schoolSettings = {},
}) => {
   const [loading, setLoading] = useState(false);
   const [promote, setPromote] = useState(50.0);
   const [students, setStudents] = useState({ loading: true, students: [] });

   const handleSubmit = (value) => {
      setLoading(true);
      Axios.get(`${url}/arm/students/${value.arm}`)
         .then(({ data }) => {
            setStudents(data);
            Router.push({
               pathname: `/result/Graduate`,
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

   const graduate = (value, school) => {
      setLoading(true);
      Axios.post(`${url}/result/graduate`, {
         classN: value.classN,
         arm: value.arm,
         studentData: students,
         school,
      })
         .then(({ data }) => {
            setLoading(false);
            success(data.message);
            Router.push({ pathname: `/result/Graduate` });
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

   if (!showResult) {
      return (
         <Card
            title="Graduate Student "
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
      if (schoolSettings.term !== PromotionTerm) {
         return (
            <Card
               title="Graduate By Arm "
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
               <Result
                  status="warning"
                  title="You can not promote student when its not 3rd term "
                  subTitle={`Dear user you  can not promote student when it is  not 3rd term to solve this error call customer care  `}
               />
            </Card>
         );
      } else
         return (
            <Card
               title="Graduate student "
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
                  <Popconfirm
                     onConfirm={() =>
                        graduate(
                           {
                              classN: Router.query.classN,
                              arm: Router.query.arm,
                           },
                           schoolSettings._id
                        )
                     }
                     title="Are You sure you want to graduate students"
                  >
                     <Button type="primary" style={{ marginLeft: "1rem" }}>
                        Graduate
                     </Button>
                  </Popconfirm>
               </div>
               <div className="p-4">
                  <StudentTable student={{ loading, students }} />
               </div>
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
export default GraduatePage;
