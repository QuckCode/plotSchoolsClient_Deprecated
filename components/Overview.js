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
 Spin
} from 'antd';

import {
  DiscreteColorLegend,
  FlexibleWidthXYPlot,
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  YAxis,
  
} from 'react-vis';

import NoSSR from 'react-no-ssr';


import StatCard from './shared/StatCard';
import { theme } from './styles/GlobalStyles';
import styled from 'styled-components';

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

const Overview = ({staffs, classes ,students, graphStudentClassTotal=[], smsBalance, smsSent, schoolSettings}) => {
  return (
    <div>
      <Row gutter={16}>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
            title="Currrent School Section"
            value={schoolSettings.section}
            icon={<Home size={20} strokeWidth={1} />}
            color={theme.darkColor}
            clickHandler={() => message.info(`This term is currently ${schoolSettings.section}`)}
          />
        </Col>
      <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
            title="Current School term"
            value={schoolSettings.term+" Term"}
            icon={<Icon type="heat-map" size={20} strokeWidth={1} />}
            color={theme.warningColor}
            clickHandler={() => message.info(`This term is currently ${schoolSettings.term}`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
            title="Airtime balance"
            value={`Units ${smsBalance}`}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.primaryColor}
            clickHandler={() => message.info(`You have ${smsBalance} Sms Units `)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
             title="School fees payment"
            value={10}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${10} School fees payments for this term`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Students"
            value={students}
            icon={<User size={20} strokeWidth={1} />}
            color={theme.primaryColor}
            clickHandler={() => message.info(`You have ${students} students`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Staff"
            value={staffs}
            icon={<User size={20} strokeWidth={1} />}
            color={theme.darkColor}
            clickHandler={() => message.info(`You have ${staffs} staffs`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Classes"
            value={classes}
            icon={<Icon type="team" style={{margin:0, color:'rgba(255, 255,255 ,1)',fontSize: '20px' }}  />}
            color={theme.warningColor}
            clickHandler={() => message.info(`You have ${classes} classes`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            type="fill"
            title="Scratch Card"
            value={870}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${0} Scratch Card`)}
          />
        </Col>
      </Row>
      <Card
        title="Total Student Per Class"
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

        <NoSSR>
          <Legend>
            <DiscreteColorLegend  width={400} height={20} items={[{title:"Student", color:"#007bff"}]} />
          </Legend>
          <div className="chat">
          <FlexibleWidthXYPlot xType="ordinal"   style ={{width:"500rem"}} height={300}>
            <VerticalGridLines style={{ strokeWidth: 0.5 }} />
            <HorizontalGridLines style={{ strokeWidth: 0.5 }} />
            <XAxis style={{ strokeWidth: 0.5 }} />
            <YAxis style={{ strokeWidth: 0.5 }} />
            <VerticalBarSeries  className="verticalBarSeries" color="#007bff" xDistance={600} style={{padding:"10rem"}} data={graphStudentClassTotal} />
          </FlexibleWidthXYPlot>
          </div>
        </NoSSR>
      </Card>
    </div>
  );
};

export default Overview;
