import { Card, Row, Menu, Dropdown, Input } from "antd";
import { theme } from "../../components/styles/GlobalStyles";
import { Edit, MoreHorizontal, Printer, Save, Trash } from "react-feather";
import StudentTable from "../../components/Student/StudentTable";
import { getAllStudents } from "../../redux/actions/student";
import { connect } from "react-redux";
import React from "react";
import { PrivateRoute } from "../../components/PrivateRoute";
import { printPDF } from "../../lib/helpers";

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
      <Menu.Item onClick={() => printPDF("content")}>
         <Row type="flex" align="middle">
            <Printer size={16} strokeWidth={1} className="mr-3" />{" "}
            <span>Print</span>
         </Row>
      </Menu.Item>
   </Menu>
);

const ViewStaffPage = ({ getAllStudents, student }) => {
   React.useEffect(() => {
      getAllStudents();
      return () => {
         // Anything in here is fired on component unmount.
         getAllStudents();
      };
   }, []);
   return (
      <Card
         title="View  Students"
         extra={
            <Dropdown overlay={menu}>
               <MoreHorizontal
                  size={20}
                  strokeWidth={1}
                  fill={theme.textColor}
               />
            </Dropdown>
         }
         bodyStyle={{ padding: 0, height: "100%" }}
         id="content"
         className="mb-10"
      >
         <div className="p-4">
            <StudentTable student={student} />
         </div>
      </Card>
   );
};

const mapStateToProps = (state) => ({
   student: state.student,
});

const mapDispatchToProps = {
   getAllStudents: getAllStudents,
};
export default PrivateRoute(
   connect(mapStateToProps, mapDispatchToProps)(ViewStaffPage)
);
