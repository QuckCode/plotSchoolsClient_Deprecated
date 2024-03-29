import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from "antd";
import RegisterStaff from "../../components/Staff/RegisterStaff";
import styled from "styled-components";
import { theme } from "../../components/styles/GlobalStyles";
import { Edit, MoreHorizontal, Printer, Save, Trash } from "react-feather";
import StudentTable from "../../components/Student/StudentTable";
import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { PrivateRoute } from "../../components/PrivateRoute";
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

const Title = Typography.Title;

const Content = styled.div`
  z-index: 0;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

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

const StudentByArmPage = ({ classes, sections, arms }) => {
   const [loading, setLoading] = useState(false);
   const [hideTable, setHideTable] = useState(true);
   const [students, setStudents] = useState({ loading: true, students: [] });

   const handleSubmit = (value) => {
      setLoading(true);
      Axios.get(`${url}/arm/students/${value.arm}`)
         .then(({ data }) => {
            setLoading(false);
            setHideTable(false);
            setTimeout(() => {
               setStudents({ loading: false, students: data });
            }, 1000);
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

   const onDelete = async (id) => {
      try {
         await Axios.delete(`${url}/student/${id}`);
         setStudents({ loading: true, students: [] });
         let deletedList = students.students.filter((stu) => stu._id !== id);
         console.log(deletedList);
         setTimeout(() => {
            setStudents({ loading: false, students: deletedList });
         }, 1000);
         success("Deleted Student");
      } catch (err) {
         console.log(err);
         error("Delete  Failed", "error occurred");
      }
   };

   return (
      <Card
         title="View  Students By Arms"
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
                  <Typography.Text>
                     {" "}
                     Total Number of Student: {students.students.length}{" "}
                  </Typography.Text>
                  <br />
                  <br />
                  <Button type="primary" onClick={() => setHideTable(true)}>
                     {" "}
                     click here to go back to the form
                  </Button>
                  <br />
                  <br />
                  <StudentTable student={students} onDelete={onDelete} />
               </div>
            )}
         </div>
      </Card>
   );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   const store = ctx.store;
   let data = await AuthToken.fromNext(ctx);
   await store.dispatch(
      loginSuccess(data.decodedToken, data.decodedToken.userType)
   );
   await store.dispatch(getAllSection());
   await store.dispatch(getAllClasses());
   await store.dispatch(getAllArms());
   let propStore = await store.getState();
   return {
      props: {
         classes: propStore.classes.classes,
         sections: propStore.section.section,
         arms: propStore.arm.arms,
      },
   };
});

export default StudentByArmPage;
