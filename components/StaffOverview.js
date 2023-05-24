import {
   Archive,
   Edit,
   Printer,
   Save,
   Trash,
   User,
   CreditCard,
   MessageCircle,
   Home,
   MoreHorizontal,
   DollarSign,
   MapPin,
   Layers,
   Calendar,
} from "react-feather";
import {
   Col,
   Menu,
   message,
   Row,
   Icon,
   DatePicker,
   Card,
   Dropdown,
   Spin,
   Avatar,
} from "antd";

import StatCard from "./shared/StatCard";
import { theme } from "./styles/GlobalStyles";
import styled from "styled-components";
import { useState } from "react";
import { success } from "./modal";
import moment from "moment";

const { MonthPicker } = DatePicker;

const axes = Array.from(Array(12).keys());

const Legend = styled.div`
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 0.5rem 0;
   .rv-discrete-color-legend {
      display: inline-block;
      width: auto !important;
   }
   .rv-discrete-color-legend-item {
      padding-top: 0;
      padding-bottom: 0;
   }
`;

const menu = (
   <Menu>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Archive size={16} strokeWidth={1} classtitle="mr-3" />{" "}
            <span>Archive</span>
         </Row>
      </Menu.Item>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Edit size={16} strokeWidth={1} classtitle="mr-3" />{" "}
            <span>Edit</span>
         </Row>
      </Menu.Item>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Trash size={16} strokeWidth={1} classtitle="mr-3" />{" "}
            <span>Delete</span>
         </Row>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item>
         <Row type="flex" align="middle">
            <Save size={16} strokeWidth={1} classtitle="mr-3" />{" "}
            <span>Save as</span>
         </Row>
      </Menu.Item>
      <Menu.Item>
         <Row type="flex" align="middle">
            <Printer size={16} strokeWidth={1} classtitle="mr-3" />{" "}
            <span>Print</span>
         </Row>
      </Menu.Item>
   </Menu>
);

const StaffOverview = ({
   active,
   term,
   employeeDate,
   section,
   regNumber,
   classes,
   subjects,
}) => {
   const [value, setValue] = useState({});

   return (
      <div>
         <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  type="fill"
                  title="Current School Section"
                  value={section + " Section"}
                  icon={<Icon type="heat-map" size={20} strokeWidth={1} />}
                  color={theme.darkColor}
                  clickHandler={() =>
                     message.info(`This current section  is  ${section}`)
                  }
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  type="fill"
                  title="Current School term"
                  value={term + " Term"}
                  icon={<Icon type="heat-map" size={20} strokeWidth={1} />}
                  color={theme.warningColor}
                  clickHandler={() =>
                     message.info(`This term is currently ${term}`)
                  }
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  type="fill"
                  title="Staff Status"
                  value={active ? "Active" : " Not Active"}
                  icon={<MapPin size={20} strokeWidth={1} />}
                  color={theme.primaryColor}
                  clickHandler={() => message.info(`You are an active staff`)}
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  type="fill"
                  title="Number of Staff Classes"
                  value={classes}
                  icon={<Calendar size={20} strokeWidth={1} />}
                  color={theme.errorColor}
                  clickHandler={() =>
                     message.info(`You  are teacher for ${classes} `)
                  }
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  title="Number Of Staff Subjects"
                  value={subjects}
                  icon={<Calendar size={20} strokeWidth={1} />}
                  color={theme.errorColor}
                  clickHandler={() =>
                     message.info(`You  are teacher for ${subjects} `)
                  }
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  title="Registration  Number"
                  value={regNumber}
                  notCapital={true}
                  icon={<User size={20} strokeWidth={1} />}
                  color={theme.darkColor}
                  clickHandler={() =>
                     message.info(`Your registration  number  is ${regNumber}`)
                  }
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  title="Year Of Employment"
                  value={moment(employeeDate).format("YYYY")}
                  icon={<Calendar size={20} strokeWidth={1} />}
                  color={theme.errorColor}
                  clickHandler={() =>
                     message.info(
                        `You have ${10} School fees payments for this term`
                     )
                  }
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  title="Number Of Assignment"
                  value={0}
                  icon={<Calendar size={20} strokeWidth={1} />}
                  color={theme.errorColor}
                  clickHandler={() =>
                     message.info(
                        `You have ${10} School fees payments for this term`
                     )
                  }
               />
            </Col>
         </Row>
         <Card
            title="Staff Details"
            extra={
               <Dropdown overlay={menu}>
                  <MoreHorizontal
                     size={20}
                     strokeWidth={1}
                     fill={theme.textColor}
                  />
               </Dropdown>
            }
            bodyStyle={{
               maxHeight: "500rem",
               overflow: "auto",
            }}
            classtitle="mb-4"
         >
            <Row justify="space-around" gutter={[24, 24]}>
               <Col lg={6} md={8} xs={12}>
                  <Avatar
                     shape="square"
                     className="userImage"
                     alt="userImage"
                     src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
                  />
               </Col>
            </Row>
         </Card>
      </div>
   );
};

export default StaffOverview;
