import React, { useState } from "react";
import { wrapper } from "../../redux/store";
import { AuthToken } from "../../services/authToken";
import { loginSuccess } from "../../redux/actions/auth";
import { redirectError } from "../../services/redirectService";
import { getSchoolsSetting } from "../../redux/actions/school";
import { getAllStaffs } from "../../redux/actions/staff";
import { getAllSubjects } from "../../redux/actions/subject";
import StaffTableSetting from "../../components/Staff/StaffTableSetting";
import { Button, Card, Col, Divider, Row, Typography } from "antd";
import axios from "axios";
import StaffSubjectList from "../../components/Staff/StaffSubjectList";
import { url } from "../../redux/varables";
import { error } from "../../components/modal";

const TeacherSubjectsPage = ({ staffs, subjects, loading }) => {
   let [staff, setStaff] = useState(null);
   let [showList, setShowList] = useState(false);
   let [name, setName] = useState("");
   let [addSubjectsIds, setAddSubjectIds] = useState([]);
   let [removeSubjectsIds, setRemoveSubjectIds] = useState([]);
   let [staffSubjects, setStaffSubjects] = useState([]);

   const onAddSubjectCheck = (e) => {
      let value = e.target.value;
      if (!e.target.checked) {
         let list = addSubjectsIds.filter((id) => id !== value);
         return setAddSubjectIds(list);
      }
      return setAddSubjectIds([...addSubjectsIds, value]);
   };

   const onRemoveSubjectCheck = (e) => {
      let value = e.target.value;
      if (!e.target.checked) {
         let list = removeSubjectsIds.filter((id) => id !== value);
         return setRemoveSubjectIds(list);
      }
      return setRemoveSubjectIds([...removeSubjectsIds, value]);
   };

   const onSettingClick = async (staff) => {
      try {
         if (staff !== null) {
            setStaff(staff);
            setShowList(true);
            setName(`${staff.name.firstName} ${staff.name.srnName}`);
            let getLink = `${url}/staff/subjects/${staff._id}`;
            let staffSubjectResponse = await axios.get(getLink);
            setStaffSubjects(staffSubjectResponse.data);
         }
      } catch (err) {
         error(err.title, err.message);
      }
   };

   const handleRemoveSubjects = async () => {
      try {
         const { regNumber, _id } = staff;
         let postData = {
            userId: _id,
            regNumber,
            subjects: removeSubjectsIds,
         };
         await axios.patch(`${url}/staff/remove/subjects`, postData);
         setRemoveSubjectIds([]);
         onSettingClick(staff);
      } catch (err) {
         error(err.title, err.message);
      }
   };

   const handleAddSubjects = async () => {
      try {
         const { regNumber, _id } = staff;
         let postData = {
            userId: _id,
            regNumber,
            subjects: addSubjectsIds,
         };
         await axios.patch(`${url}/staff/add/subjects`, postData);
         setAddSubjectIds([]);
         onSettingClick(staff);
      } catch (err) {
         error(err.title, err.message);
      }
   };

   const goBack = () => {
      setShowList(false);
      setStaff(null);
      setName("");
   };

   return (
      <Card
         title="Set Teacher Subjects"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         {!showList ? (
            <StaffTableSetting
               staffs={staffs}
               loading={loading}
               onSettingClick={onSettingClick}
            />
         ) : (
            <div>
               <div
                  style={{
                     padding: 10,
                     height: 150,
                     border: 10,
                     marginBottom: 10,
                  }}
               >
                  <Typography.Text level={4}> Name : {name}</Typography.Text>
                  <br />
                  <br />
                  <Typography.Text level={4}>
                     Reg Number : {staff.regNumber}
                  </Typography.Text>
                  <div style={{ marginTop: 20 }}>
                     <Button onClick={goBack}> Go Back The Staff Table</Button>
                  </div>
                  <br />
                  <br />
                  <Divider />
               </div>
               <Row gutter={15}>
                  <Col span={12}>
                     <StaffSubjectList
                        subjects={subjects}
                        onSave={handleAddSubjects}
                        subjectList={addSubjectsIds}
                        onSubjectCheck={onAddSubjectCheck}
                        type="add"
                     />
                  </Col>
                  <Col span={12}>
                     <StaffSubjectList
                        subjects={staffSubjects}
                        onSave={handleRemoveSubjects}
                        subjectList={removeSubjectsIds}
                        onSubjectCheck={onRemoveSubjectCheck}
                        type="remove"
                     />
                  </Col>
               </Row>
            </div>
         )}
      </Card>
   );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   try {
      const store = ctx.store;
      let { decodedToken } = await AuthToken.fromNext(ctx);
      await store.dispatch(loginSuccess(decodedToken, decodedToken.userType));
      await store.dispatch(getAllStaffs());
      await store.dispatch(getAllSubjects());
      await store.dispatch(getSchoolsSetting(decodedToken.school));
      let propStore = await store.getState();
      return {
         props: {
            staffs: propStore.staff.staffs,
            subjects: propStore.subject.subjects,
            staffSubjects: [],
            loading: false,
         },
      };
   } catch (error) {
      console.log(error);
      redirectError(ctx);
   }
});

export default TeacherSubjectsPage;
