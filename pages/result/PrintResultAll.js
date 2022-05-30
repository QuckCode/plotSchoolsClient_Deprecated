import React, { useState } from "react";
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
import { Button } from "antd";
import Router from "next/router";
import { success } from "../../components/modal";
import { printPDFMultiple } from "../../lib/helpers";
import Axios from "axios";
import { school, url } from "../../redux/varables";
import { getSchoolsSetting } from "../../redux/actions/school";
import TermResult from "../../components/Result/TermResult";

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
   currentClassTests = [],
   results,
   schoolSettings = {},
}) => {
   if (!showResult) {
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
               <div>
                  <TermResult
                     key={i}
                     result={x}
                     currentClassTests={currentClassTests}
                     schoolSettings={schoolSettings}
                  />
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
