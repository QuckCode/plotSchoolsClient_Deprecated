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
} from 'react-feather';
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
} from 'antd';



import StatCard from './shared/StatCard';
import { theme } from './styles/GlobalStyles';
import styled from 'styled-components';
import { useState } from 'react';
import { success } from './modal';

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
        <Archive size={16} strokeWidth={1} classtitle="mr-3" />{' '}
        <span>Archive</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Edit size={16} strokeWidth={1} classtitle="mr-3" /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Trash size={16} strokeWidth={1} classtitle="mr-3" /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <Save size={16} strokeWidth={1} classtitle="mr-3" /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Printer size={16} strokeWidth={1} classtitle="mr-3" />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const StudentOverview = ({staffs, classes ,students, graphStudentClassTotal=[], smsBalance, smsSent, schoolSettings}) => {
   const [value, setValue] = useState({})



  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Currrent School Section"
            value={schoolSettings.section}
            icon={<Home size={20} strokeWidth={1} />}
            color={theme.darkColor}
            clickHandler={() => message.info(`This term is currently ${schoolSettings.section}`)}
          />
        </Col>
      <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Current School term"
            value={schoolSettings.term+" Term"}
            icon={<Icon type="heat-map" size={20} strokeWidth={1} />}
            color={theme.warningColor}
            clickHandler={() => message.info(`This term is currently ${schoolSettings.term}`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Outstanding Dept"
            value={`₦ ${10000}`}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.primaryColor}
            clickHandler={() => message.info(`You have ${10000} outstanding dept `)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
             title="Current Class"
            value={"JSS 1 A"}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
             title="Current Class"
            value={"JSS 1 A"}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
             title="Current Class"
            value={"JSS 1 A"}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
             title="Current Class"
            value={"JSS 1 A"}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
             title="Current Class"
            value={"JSS 1 A"}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
        </Col>
      </Row>
      <Card
        title="Student Details"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
         bodyStyle={{
          maxHeight: "500rem",
          overflow: "auto"
         }}
        classtitle="mb-4"
      >
      </Card>
    </div>
  );
};

export default StudentOverview;
