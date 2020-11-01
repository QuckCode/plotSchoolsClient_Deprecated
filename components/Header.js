import { Avatar, Badge, Layout, List, Menu } from 'antd';
import {
  BarChart,
  Bell,
  Maximize,
  Minimize,
  Settings,
 Grid
} from 'react-feather';
import DashHeader, { Notification } from './styles/Header';

import Link from 'next/link';
import MockNotifications from '../demos/mock/notifications';
import { useAppState } from './shared/AppProvider';
import { useState } from 'react';

const { SubMenu } = Menu;
const { Header } = Layout;

const MainHeader = ({
  user
}
) => {
  const [state, dispatch] = useAppState();
  const [notifications] = useState(MockNotifications);
  return (
    <DashHeader>
      <Header>
        {state.mobile && (
          <a
            onClick={() => dispatch({ type: 'mobileDrawer' })}
            className="trigger"
          >
            <BarChart size={20} strokeWidth={1} />
          </a>
        )}
        <Link href="/">
          <a className="brand">
            <Grid size={24} strokeWidth={1} />
            <span  className="mx-1" css={`display: inline; `} style={{ color:"#595959"}} > Plot Schools </span>
          </a>
        </Link>
        
        <span className="mr-auto" />

        <Menu mode="horizontal">
          {!state.mobile && (
            <Menu.Item onClick={() => dispatch({ type: 'fullscreen' })}>
              {!state.fullscreen ? (
                <Maximize size={20} strokeWidth={1} />
              ) : (
                <Minimize size={20} strokeWidth={1} />
              )}
            </Menu.Item>
          )}
          <Menu.Item onClick={() => dispatch({ type: 'options' })}>
            <Settings size={20} strokeWidth={1} />
          </Menu.Item>
          <SubMenu
            title={
              <Badge count={5}>
                <span className="submenu-title-wrapper">
                  <Bell size={20} strokeWidth={1} />
                </span>
              </Badge>
            }
          >
            <Menu.Item
              className="p-0 bg-transparent"
              style={{ height: 'auto' }}
            >
              <List
                className="header-notifications"
                itemLayout="horizontal"
                dataSource={notifications}
                footer={<div>5 Notifications</div>}
                renderItem={item => (
                  <Notification>
                    <List.Item>
                      <List.Item.Meta
                        avatar={item.avatar}
                        title={<a href="javascript:;">{item.title}</a>}
                        description={<small>{item.description}</small>}
                      />
                    </List.Item>
                  </Notification>
                )}
              />
            </Menu.Item>
          </SubMenu>

          <SubMenu title={<Avatar   src={user.passport} />}>
            <Menu.Item>Settings</Menu.Item>
            <Menu.Item>Profile</Menu.Item>
            <Menu.Item>Notifications</Menu.Item>
            <Menu.Divider />
            <Menu.Item>
              <Link href="https://one-readme.fusepx.com">
                <a>Help?</a>
              </Link>
            </Menu.Item>
            <Menu.Item>Signout</Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
    </DashHeader>
  );
};

export default MainHeader;
