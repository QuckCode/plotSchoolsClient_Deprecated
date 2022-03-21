import React from "react";
import { wrapper } from "../../redux/store";
import { AuthToken } from "../../services/authToken";
import { loginSuccess } from "../../redux/actions/auth";
import { redirectError } from "../../services/redirectService";
import { getSchoolsSetting } from "../../redux/actions/school";
import StudentOverview from "../../components/StudentOverview";
import { getStudentClassAndArmRequest } from "../../redux/actions/student";

const DashboardStudentPage = ({
   user,
   userType,
   oldSchoolSettings,
   currentStudentClassAndArm,
}) => {
   return (
      <>
         <StudentOverview
            user={user}
            currentStudentClassAndArm={currentStudentClassAndArm}
            schoolSettings={oldSchoolSettings}
         />
      </>
   );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   try {
      const store = ctx.store;
      let data = await AuthToken.fromNext(ctx);
      await store.dispatch(
         loginSuccess(data.decodedToken, data.decodedToken.userType)
      );
      await store.dispatch(
         getStudentClassAndArmRequest(data.decodedToken.admissionNumber)
      );
      await store.dispatch(getSchoolsSetting(data.decodedToken.school));
      let propStore = await store.getState();
      return {
         props: {
            user: propStore.auth.user,
            oldSchoolSettings: propStore.schools.settings,
            currentStudentClassAndArm:
               propStore.student.currentStudentClassAndArm,
         },
      };
   } catch (error) {
      console.log(error, ctx);
      redirectError(ctx);
   }
});

export default DashboardStudentPage;
