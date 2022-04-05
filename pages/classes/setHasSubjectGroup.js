import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from "antd";
import { theme } from "../../components/styles/GlobalStyles";
import { Edit, MoreHorizontal, Printer, Save, Trash } from "react-feather";
import { getAllClasses } from "../../redux/actions/classes";
import { connect } from "react-redux";
import { useEffect } from "react";
import { PrivateRoute } from "../../components/PrivateRoute";
import ClassTableSubjectGroup from "../../components/Classes/ClassTableSubjectGroup";
import axios from "axios";
import { success, error } from "../../components/modal";
import { url } from "../../redux/varables";

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

const SetHasSubjectGroup = ({ classes, getAllClasses }) => {
   const setHasSubjectGroup = async (hasSubjectGroup, classId) => {
      try {
         await axios.post(`${url}/class/hasSubjectGroup`, {
            hasSubjectGroup,
            classId,
         });
         await getAllClasses();
         success("Set Class Has Subjects");
      } catch (err) {
         error(error.title || " Error Occurred", error.message);
      }
   };
   useEffect(() => {
      getAllClasses();
      return () => {
         getAllClasses();
      };
   }, []);

   return (
      <Card
         title="View  Classes"
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
         className="mb-10"
      >
         <div className="p-4">
            <ClassTableSubjectGroup
               classes={classes}
               setHasSubjectGroup={setHasSubjectGroup}
            />
         </div>
      </Card>
   );
};

const mapStateToProps = (state) => ({
   classes: state.classes,
});

const mapDispatchToProps = {
   getAllClasses: getAllClasses,
};

export default PrivateRoute(
   connect(mapStateToProps, mapDispatchToProps)(SetHasSubjectGroup)
);
