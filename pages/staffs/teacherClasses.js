import React, { useState } from "react";
import { wrapper } from "../../redux/store";
import { AuthToken } from "../../services/authToken";
import { loginSuccess } from "../../redux/actions/auth";
import { redirectError } from "../../services/redirectService";
import { getSchoolsSetting } from "../../redux/actions/school";
import { getAllStaffs } from "../../redux/actions/staff";
import StaffTableSetting from "../../components/Staff/StaffTableSetting";
import { Button, Card, Col, Divider, Row, Typography } from "antd";
import axios from "axios";
import StaffClassList from "../../components/Staff/StaffClassList";
import { url } from "../../redux/varables";
import { error } from "../../components/modal";
import { getAllClasses } from "../../redux/actions/classes";

const TeacherClassesPage = ({ staffs, classes, loading }) => {
   let [staff, setStaff] = useState(null);
   let [showList, setShowList] = useState(false);
   let [name, setName] = useState("");
   let [addClassesIds, setAddClassesIds] = useState([]);
   let [removeClassesIds, setRemoveClassesIds] = useState([]);
   let [staffClasses, setStaffClasses] = useState([]);

   const onAddClassCheck = (e) => {
      let value = e.target.value;
      if (!e.target.checked) {
         let list = addClassesIds.filter((id) => id !== value);
         return setAddClassesIds(list);
      }
      return setAddClassesIds([...addClassesIds, value]);
   };

   const onRemoveClassCheck = (e) => {
      let value = e.target.value;
      if (!e.target.checked) {
         let list = removeClassesIds.filter((id) => id !== value);
         return setRemoveClassesIds(list);
      }
      return setRemoveClassesIds([...removeClassesIds, value]);
   };

   const onSettingClick = async (staff) => {
      try {
         if (staff !== null) {
            setStaff(staff);
            setShowList(true);
            setName(`${staff.name.firstName} ${staff.name.srnName}`);
            let getLink = `${url}/staff/classes/${staff._id}`;
            let staffClassesResponse = await axios.get(getLink);
            setStaffClasses(staffClassesResponse.data);
         }
      } catch (err) {
         error(err.title, err.message);
      }
   };

   const handleRemoveClasses = async () => {
      try {
         const { regNumber, _id } = staff;
         let postData = {
            userId: _id,
            regNumber,
            classes: removeClassesIds,
         };
         await axios.patch(`${url}/staff/remove/class`, postData);
         setRemoveClassesIds([]);
         onSettingClick(staff);
      } catch (err) {
         error(err.title, err.message);
      }
   };

   const handleAddClasses = async () => {
      try {
         const { regNumber, _id } = staff;
         let postData = {
            userId: _id,
            regNumber,
            classes: addClassesIds,
         };
         await axios.patch(`${url}/staff/add/class`, postData);
         setAddClassesIds([]);
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
         title="Set Teacher Classes"
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
                     <StaffClassList
                        classes={classes}
                        onSave={handleAddClasses}
                        classList={addClassesIds}
                        onClassCheck={onAddClassCheck}
                        type="add"
                     />
                  </Col>
                  <Col span={12}>
                     <StaffClassList
                        classes={staffClasses}
                        onSave={handleRemoveClasses}
                        classList={removeClassesIds}
                        onClassCheck={onRemoveClassCheck}
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
      await store.dispatch(getAllClasses());
      await store.dispatch(getSchoolsSetting(decodedToken.school));
      let propStore = await store.getState();
      return {
         props: {
            staffs: propStore.staff.staffs,
            classes: propStore.classes.classes,
            loading: false,
         },
      };
   } catch (error) {
      console.log(error);
      redirectError(ctx);
   }
});

export default TeacherClassesPage;
