import { Avatar, Badge, Layout, List, Menu } from "antd";
import {
   BarChart,
   Bell,
   ChevronsDown,
   Maximize,
   Minimize,
   Settings,
   Triangle,
   Grid,
} from "react-feather";
import DashHeader, { Notification } from "./styles/Header";

import Link from "next/link";
import MockNotifications from "../demos/mock/notifications";
import { useAppState } from "./shared/AppProvider";
import { useState } from "react";

const { SubMenu } = Menu;
const { Header } = Layout;

const HomeHeader = () => {
   const [state, dispatch] = useAppState();
   const [notifications] = useState(MockNotifications);
   return (
      <DashHeader>
         <Header>
            <Link href="/">
               <a className="brand">
                  <img src="../logo.svg" />
               </a>
            </Link>
            <span className="mr-auto" />
            <Menu mode="horizontal" className="menu-divider">
               {!state.mobile && (
                  <Menu.Item>
                     <Link href="/pricing">
                        <a>Pricing</a>
                     </Link>
                  </Menu.Item>
               )}
               {!state.mobile && (
                  <Menu.Item>
                     <Link href="/signin">
                        <a>Sign In</a>
                     </Link>
                  </Menu.Item>
               )}

               {!state.mobile && (
                  <Menu.Item>
                     <Link href="/contact">
                        <a>Contact us</a>
                     </Link>
                  </Menu.Item>
               )}

               {state.mobile && (
                  <SubMenu title={<ChevronsDown size={20} strokeWidth={1} />}>
                     <Menu.Item>
                        <Link href="/pricing">
                           <a>Pricing </a>
                        </Link>
                     </Menu.Item>
                     <Menu.Item>
                        <Link href="/contact">
                           <a>Contact us</a>
                        </Link>
                     </Menu.Item>
                     <Menu.Item>
                        <Link href="/signin">
                           <a>Sign In</a>
                        </Link>
                     </Menu.Item>
                  </SubMenu>
               )}
            </Menu>
            <span style={{ marginLeft: 30 }} />
         </Header>
      </DashHeader>
   );
};

export default HomeHeader;
