import {
  Archive,
  Edit,
  Printer,
  Save,
  Trash,
  User,
  CreditCard,
  MessageCircle,
  Home

} from 'react-feather';
import {
  Col,
  Menu,
  message,
  Row,
  Icon
} from 'antd';


import StatCard from './shared/StatCard';
import { theme } from './styles/GlobalStyles';


const menu = (
  <Menu>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Archive size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Archive</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Edit size={16} strokeWidth={1} className="mr-3" /> <span>Edit</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Trash size={16} strokeWidth={1} className="mr-3" /> <span>Delete</span>
      </Row>
    </Menu.Item>
    <Menu.Divider />
    <Menu.Item>
      <Row type="flex" align="middle">
        <Save size={16} strokeWidth={1} className="mr-3" /> <span>Save as</span>
      </Row>
    </Menu.Item>
    <Menu.Item>
      <Row type="flex" align="middle">
        <Printer size={16} strokeWidth={1} className="mr-3" />{' '}
        <span>Print</span>
      </Row>
    </Menu.Item>
  </Menu>
);

const Overview = ({staffs, classes ,students}) => {
  return (
    <div>
      <Row gutter={16}>
      <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
            title="Current School term"
            value={" First Term"}
            icon={<Home size={20} strokeWidth={1} />}
            color={theme.warningColor}
            clickHandler={() => message.info(`You have ${0} Scratch Card`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
            title="Airtime balance"
            value={"NGN 1000.00"}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.primaryColor}
            clickHandler={() => message.info(`You have ${0} Scratch Card`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
            title="Total message received"
            value={"10"}
            icon={<MessageCircle size={20} strokeWidth={1} />}
            color={theme.darkColor}
            clickHandler={() => message.info(`You have ${10} Message`)}
          />
        </Col>
        <Col xs={24} sm={12} md={6}>
          <StatCard
            // type="fill"
             title="School fees payment"
            value={10}
            icon={<CreditCard size={20} strokeWidth={1} />}
            color={theme.errorColor}
            clickHandler={() => message.info(`You have ${0} Scratch Card`)}
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
    </div>
  );
};

export default Overview;
