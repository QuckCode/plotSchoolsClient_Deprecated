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
} from "antd";

import {
   DiscreteColorLegend,
   FlexibleWidthXYPlot,
   HorizontalGridLines,
   VerticalBarSeries,
   VerticalGridLines,
   XAxis,
   YAxis,
   Hint,
} from "react-vis";

import NoSSR from "react-no-ssr";

import StatCard from "../shared/StatCard";
import { theme } from "../styles/GlobalStyles";
import styled from "styled-components";
import { useState } from "react";

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

const FeeOverView = ({
   staffs,
   classes,
   students,
   graphStudentClassTotal = [],
   smsBalance,
   smsSent,
   section,
   term,
}) => {
   const [value, setValue] = useState({});

   const onBarOver = (val) => {
      setValue(val);
   };

   return (
      <div>
         <Row gutter={16}>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  type="fill"
                  title="Expected Payment"
                  value={0}
                  icon={"₦"}
                  color={theme.primaryColor}
                  clickHandler={() => message.info(`You have made 0 naira `)}
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  type="fill"
                  title="Generated Revenue"
                  value={staffs}
                  icon={"₦"}
                  color={theme.warningColor}
                  clickHandler={() => message.info(`You have ${staffs} staffs`)}
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  type="fill"
                  title="Outstanding fees"
                  value={classes}
                  icon={"₦"}
                  color={theme.errorColor}
                  clickHandler={() =>
                     message.info(`You have ${classes} classes`)
                  }
               />
            </Col>
            <Col xs={24} sm={12} md={6}>
               <StatCard
                  type="fill"
                  title="Payments"
                  value={870}
                  icon={<CreditCard size={20} strokeWidth={1} />}
                  color={theme.darkColor}
                  clickHandler={() =>
                     message.info(`You have ${0} Scratch Card`)
                  }
               />
            </Col>
         </Row>
         <Card
            title="Total Income Per Class"
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
            <NoSSR>
               <Legend>
                  <DiscreteColorLegend
                     width={400}
                     height={20}
                     items={[{ title: "Payments", color: "#007bff" }]}
                  />
               </Legend>
               <div className="chat">
                  <FlexibleWidthXYPlot
                     xType="ordinal"
                     style={{ width: "500rem" }}
                     height={300}
                  >
                     <VerticalGridLines style={{ strokeWidth: 0.5 }} />
                     <HorizontalGridLines style={{ strokeWidth: 0.5 }} />
                     <XAxis style={{ strokeWidth: 0.5 }} />
                     <YAxis style={{ strokeWidth: 0.5 }} />
                     <VerticalBarSeries
                        onValueMouseOver={onBarOver}
                        onValueClick={() =>
                           message.info(`${value.x} has ${value.y} payments`)
                        }
                        className="verticalBarSeries"
                        color="#007bff"
                        xDistance={600}
                        style={{ padding: "10rem" }}
                        data={graphStudentClassTotal}
                     />
                     <Hint value={value}>
                        <div
                           style={{
                              background: "#2b2b2b",
                              padding: "1rem",
                              borderRadius: "1rem",
                              width: 150,
                           }}
                        >
                           <span style={{ fontSize: 11, padding: "2%" }}>
                              {" "}
                              Class:{"  " + value.x}
                           </span>
                           <br />
                           <span style={{ fontSize: 11, padding: "2%" }}>
                              {" "}
                              Total Payments: {value.y}
                           </span>
                        </div>
                     </Hint>
                  </FlexibleWidthXYPlot>
               </div>
            </NoSSR>
         </Card>
      </div>
   );
};

export default FeeOverView;
