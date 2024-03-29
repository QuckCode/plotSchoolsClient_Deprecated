import { Container, Inner } from "./styles/Page";
import { Layout, Spin } from "antd";
import { useEffect, useState } from "react";

import Header from "./Header";
import SidebarMenu from "./SidebarMenu";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/GlobalStyles";
import { useAppState } from "./shared/AppProvider";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import { useRouter } from "next/router";
import { loginSuccess, logOut } from "../redux/actions/auth";
import { TOKEN_LOCATION } from "../redux/varables";
import routes from "../lib/routes";
import routesStudent from "../lib/routesStudent";
import routesStaff from "../lib/routesStaff";

const { Content } = Layout;
let NonDashboardRoutes = [
   "/departments/edit/[id]",
   "/designation/edit/[id]",
   "/students/edit/[id]",
];
routes.forEach((x) => {
   if (x.path) {
      NonDashboardRoutes.push(x.path);
   }
   if (x.children) {
      x.children.map((child) => {
         NonDashboardRoutes.push(child.path);
      });
   }
});

routesStaff.forEach((x) => {
   if (x.path) {
      NonDashboardRoutes.push(x.path);
   }
   if (x.children) {
      x.children.map((child) => {
         NonDashboardRoutes.push(child.path);
      });
   }
});

routesStudent.forEach((x) => {
   if (x.path) {
      NonDashboardRoutes.push(x.path);
   }
   if (x.children) {
      x.children.map((child) => {
         NonDashboardRoutes.push(child.path);
      });
   }
});

const Page = ({ router, children, auth, loginSuccess, logOut }) => {
   const [loading, setLoading] = useState(true);
   const [state] = useAppState();
   let isNotDashboard = !NonDashboardRoutes.includes(router.pathname);
   useEffect(() => {
      setLoading(false);
   }, [loading]);

   return (
      <Spin indicator={true} tip="Loading..." size="large" spinning={loading}>
         <ThemeProvider theme={theme}>
            <Container
               className={`${state.weakColor ? "weakColor" : ""} ${
                  state.boxed ? "boxed shadow-sm" : ""
               }`}
            >
               {!isNotDashboard && <Header user={auth.user} />}
               <Layout className="workspace">
                  {!isNotDashboard && (
                     <SidebarMenu
                        user={auth.user}
                        sidebarTheme={state.darkSidebar ? "dark" : "light"}
                        sidebarMode={state.sidebarPopup ? "vertical" : "inline"}
                        sidebarIcons={state.sidebarIcons}
                        collapsed={state.collapsed}
                        logOut={logOut}
                     />
                  )}

                  <Layout>
                     <Content>
                        {!isNotDashboard ? <Inner>{children}</Inner> : children}
                     </Content>
                  </Layout>
               </Layout>
            </Container>
         </ThemeProvider>
      </Spin>
   );
};

const mapStateToProps = (state) => ({
   auth: state.auth,
});

const mapDispatchToProps = {
   loginSuccess: loginSuccess,
   logOut: logOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));
