import React, { useState } from "react";
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
import { Menu, Row, Card, Dropdown, Button, Typography } from "antd";
import { Edit, Trash, Save, Printer, MoreHorizontal } from "react-feather";
import { theme } from "../../components/styles/GlobalStyles";
import Router from "next/router";
import { error, success } from "../../components/modal";
import Axios from "axios";
import { school, url } from "../../redux/varables";
import { printPDF } from "../../lib/helpers";
import { getSchoolsSetting } from "../../redux/actions/school";
import TermResult from "../../components/Result/TermResult";

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
   const [position, setPosition] = useState(0);

   const handleSubmit = (value) => {
      setLoading(true);
      Axios.post(`${url}/result/printResult/arm`, {
         classN: value.classN,
         arm: value.arm,
         school: school,
      })
         .then((data) => {
            Router.push({
               pathname: `/result/PrintResult`,
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

   const printAll = () => {
      let url = `${window.location.origin}/result/PrintResultAll?classN=${Router.query.classN}&arm=${Router.query.arm}&school=${Router.query.school}`;
      window.open(url, "_blank");
   };

   const next = () => {
      if (position === results.length - 1) return setPosition(0);
      else return setPosition(position + 1);
   };

   const previous = () => {
      if (position === results.length - 1) return setPosition(0);
      if (position === 0) return setPosition(0);
      else return setPosition(position - 1);
   };

   if (!showResult) {
      return (
         <Card
            title="Compute Result  and save "
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
         <Card
            title="Print Result"
            bodyStyle={{ padding: "1rem" }}
            className="mb-4"
         >
            <TermResult
               result={results[position]}
               schoolSettings={schoolSettings}
               currentClassTests={currentClassTests}
            />
            <br />
            <Button
               disabled={position === results.length - 1 ? true : false}
               type="primary"
               onClick={next}
            >
               Next Student
            </Button>
            <Button
               disabled={position === 0 ? true : false}
               type="primary"
               onClick={previous}
               style={{ marginLeft: "1rem" }}
            >
               Previous Student
            </Button>
            <Button
               onClick={() => printPDF("result")}
               type="primary"
               style={{ marginLeft: "1rem" }}
            >
               Prints Student Result
            </Button>
            <Button
               onClick={printAll}
               type="primary"
               style={{ marginLeft: "1rem" }}
            >
               Prints All Student Result
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
      await store.dispatch(getAllSection());
      await store.dispatch(getAllClasses());
      await store.dispatch(getAllArms());
      let propStore = await store.getState();
      if (ctx.query.arm && ctx.query.classN) {
         try {
            await store.dispatch(getCurrentClassTests(ctx.query.classN));
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
