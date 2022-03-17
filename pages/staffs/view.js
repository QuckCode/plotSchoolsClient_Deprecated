import { Card, Divider, Row, Typography, Button, Menu, Dropdown } from "antd";
import styled from "styled-components";
import { theme } from "../../components/styles/GlobalStyles";
import { Edit, MoreHorizontal, Printer, Save, Trash } from "react-feather";
import StaffTable from "../../components/Staff/StaffTable";
import { getAllStaffs } from "../../redux/actions/staff";
import { connect } from "react-redux";
import React from "react";
import { PrivateRoute } from "../../components/PrivateRoute";

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

const FetchStaffPage = (props) => {
   React.useEffect(() => {
      props.getAllStaffs();
      return () => {
         // Anything in here is fired on component unmount.
         props.getAllStaffs();
      };
   }, []);
   console.log(props);
   return (
      <Card
         title="View  Staffs"
         extra={
            <Dropdown overlay={menu}>
               <MoreHorizontal
                  size={20}
                  strokeWidth={1}
                  fill={theme.textColor}
               />
            </Dropdown>
         }
         bodyStyle={{ padding: 10, height: "100%" }}
         className="mb-10"
      >
         <Content>
            <StaffTable staff={props.staff} />
         </Content>
      </Card>
   );
};

const mapStateToProps = (state) => ({
   staff: state.staff,
});

const mapDispatchToProps = {
   getAllStaffs: getAllStaffs,
};

export default PrivateRoute(
   connect(mapStateToProps, mapDispatchToProps)(FetchStaffPage)
);
