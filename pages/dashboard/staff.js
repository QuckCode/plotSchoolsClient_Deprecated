import React from "react";
import { wrapper } from "../../redux/store";
import { AuthToken } from "../../services/authToken";
import { loginSuccess } from "../../redux/actions/auth";
import { redirectError } from "../../services/redirectService";
import { getSchoolsSetting } from "../../redux/actions/school";
import StudentOverview from "../../components/StudentOverview";
import { getStudentClassAndArmRequest } from "../../redux/actions/student";

const DashboardStaffPage = ({
   user,
   userType,
   oldSchoolSettings,
   currentStudentClassAndArm,
}) => {
   return <> sjdjjd</>;
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   try {
   } catch (error) {
      console.log(error, ctx);
      redirectError(ctx);
   }
});

export default DashboardStaffPage;
