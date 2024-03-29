import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from "antd";
import { useEffect, useState } from "react";
import { getAllClasses } from "../../redux/actions/classes";
import { getAllSection } from "../../redux/actions/section";
import { AuthToken } from "../../services/authToken";
import { loginSuccess } from "../../redux/actions/auth";
import { wrapper } from "../../redux/store";
import { getAllArms } from "../../redux/actions/arm";
import StudentByArmForm from "../../components/Student/StudentByArmForm";
import Axios from "axios";
import { error, success } from "../../components/modal";
import { url } from "../../redux/varables";
import StudentSubjectGroup from "../../components/Student/StudentSubjectGroup";
import { getAllSubjectGroup } from "../../redux/actions/subject";

const SubjectGroupByArm = ({ classes, sections, arms, subjectsGroup }) => {
   const [loading, setLoading] = useState(false);
   const [hideTable, setHideTable] = useState(true);
   const [students, setStudents] = useState({ loading: true, students: [] });
   const [updateData, setUpdateData] = useState([]);

   const onSubjectSelected = (studentId, subjectGroupId) => {
      if (subjectGroupId === "")
         return setUpdateData([
            ...updateData,
            { studentId, subjectGroupId: null },
         ]);
      return setUpdateData([...updateData, { studentId, subjectGroupId }]);
   };

   const handleSave = async () => {
      try {
         setLoading(true);
         if (updateData.length == 0)
            return error(
               "Subject Group Error",
               " User did not edit subject group"
            );
         await Axios.post(`${url}/student/subjectGroup`, {
            studentData: updateData,
         });
         success("Saved student Information ");
         setHideTable(true);
         setLoading(false);
      } catch (error) {
         console.log(error);
         setLoading(false);
         error("User Error", "Please an error occurred");
      }
   };

   const handleSubmit = (value) => {
      setLoading(true);
      Axios.get(`${url}/class/hasSubjectGroup/${value.classN}`)
         .then(() => {
            Axios.get(`${url}/arm/students/${value.arm}`).then(({ data }) => {
               setHideTable(false);
               setStudents({ loading: false, students: data }),
                  setLoading(false);
            });
         })
         .catch((err) => {
            let { title, message } = err.response.data;
            setLoading(false);
            error(title, message);
         });
   };

   return (
      <Card
         title="Set Students Subject Group"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4">
            {hideTable ? (
               <StudentByArmForm
                  handleSubmit={handleSubmit}
                  loading={loading}
                  arms={arms}
                  sections={sections}
                  classes={classes}
               />
            ) : (
               <div>
                  <div
                     style={{
                        paddingBottom: 10,
                        display: "flex",
                        justifyContent: "space-between",
                     }}
                  >
                     <Button type="primary" onClick={() => setHideTable(true)}>
                        click here to go back to the form
                     </Button>
                     <Typography.Text>
                        Total Number of Student: {students.students.length}
                     </Typography.Text>
                  </div>
                  <StudentSubjectGroup
                     student={students}
                     subjectsGroup={subjectsGroup}
                     onSubjectSelected={onSubjectSelected}
                     onSave={handleSave}
                  />
               </div>
            )}
         </div>
      </Card>
   );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   const store = ctx.store;
   let { decodedToken } = await AuthToken.fromNext(ctx);
   await store.dispatch(loginSuccess(decodedToken, decodedToken.userType));
   await store.dispatch(getAllSection());
   await store.dispatch(getAllClasses());
   await store.dispatch(getAllArms());
   await store.dispatch(getAllSubjectGroup());

   let propStore = await store.getState();
   return {
      props: {
         classes: propStore.classes.classes,
         sections: propStore.section.section,
         arms: propStore.arm.arms,
         subjectsGroup: propStore.subject.subjectsGroup,
      },
   };
});

export default SubjectGroupByArm;
