import React from "react";
import Head from "next/head";
import Overview from "../../components/Overview";
import { wrapper } from "../../redux/store";
import { getAllClasses } from "../../redux/actions/classes";
import {
   getAllStudents,
   getGraphStudentClassTotal,
} from "../../redux/actions/student";
import { getAllStaffs } from "../../redux/actions/staff";
import { AuthToken } from "../../services/authToken";
import { loginSuccess } from "../../redux/actions/auth";
import {
   getSmsBalanceRequest,
   getSmsOutBoxRequest,
} from "../../redux/actions/sms";
import { redirectError } from "../../services/redirectService";
import { getSchoolsSetting } from "../../redux/actions/school";

const DashboardPage = ({
   students,
   classes,
   scratchCard,
   staffs,
   graphStudentClassTotal,
   loading,
   userType,
   smsBalance,
   smsSent,
   oldSchoolSettings,
}) => {
   return (
      <>
         <Overview
            students={students}
            classes={classes}
            scratchCard={scratchCard}
            staffs={staffs}
            graphStudentClassTotal={graphStudentClassTotal}
            loadingTotalGraph={loading}
            smsBalance={smsBalance}
            smsSent={smsSent}
            schoolSettings={oldSchoolSettings}
         />
      </>
   );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   try {
      const store = ctx.store;
      let data = await AuthToken.fromNext(ctx);
      console.log(data);
      await store.dispatch(
         loginSuccess(data.decodedToken, data.decodedToken.userType)
      );
      await store.dispatch(getAllClasses());
      await store.dispatch(getAllStudents());
      await store.dispatch(getAllStaffs());
      await store.dispatch(getGraphStudentClassTotal());
      await store.dispatch(getSmsOutBoxRequest());
      await store.dispatch(getSmsBalanceRequest());
      await store.dispatch(getSchoolsSetting(data.decodedToken.school));
      let propStore = await store.getState();
      return {
         props: {
            students: propStore.student.students.length,
            user: propStore.auth.user,
            classes: propStore.classes.classes.length,
            scratchCard: 100,
            staffs: propStore.staff.staffs.length,
            graphStudentClassTotal: propStore.student.graphOfTotalParClass,
            loading: propStore.student.loading,
            userType: propStore.auth.user.userType,
            smsBalance: propStore.sms.balance,
            smsSent: propStore.sms.messages.length,
            oldSchoolSettings: propStore.schools.settings,
         },
      };
   } catch (error) {
      // redirectError(ctx)
   }
});

export default DashboardPage;
