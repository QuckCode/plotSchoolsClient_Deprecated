import React from "react";
import { wrapper } from "../../redux/store";
import { AuthToken } from "../../services/authToken";
import { loginSuccess } from "../../redux/actions/auth";
import { redirectError } from "../../services/redirectService";
import StaffOverview from "../../components/StaffOverview";
import { getSchoolsSetting } from "../../redux/actions/school";

const DashboardStaffPage = ({ user, subjects, classes, term, section }) => {
   console.log(user, subjects, classes, term, section);
   return (
      <>
         <StaffOverview
            employeeDate={user.employeeDate}
            active={user.active}
            section={section}
            term={term}
            regNumber={user.regNumber}
            classes={classes}
            subjects={subjects}
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
      await store.dispatch(getSchoolsSetting(data.decodedToken.school));
      let propStore = await store.getState();
      console.log(propStore.auth);
      return {
         props: {
            user: propStore.auth.user,
            subjects: propStore.auth?.user.subjects.length,
            classes: propStore.auth?.user.classes.length,
            section: propStore.schools.settings?.section,
            term: propStore.schools.settings?.term,
         },
      };
   } catch (error) {
      console.log(error);
      redirectError(ctx);
   }
});

export default DashboardStaffPage;
