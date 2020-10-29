import { Container, Inner } from './styles/Page';
import { Layout, Spin } from 'antd';
import { useEffect, useState } from 'react';

import Header from './Header';
import SidebarMenu from './SidebarMenu';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/GlobalStyles';
import { useAppState } from './shared/AppProvider';
import { withRouter } from 'next/router';
import {connect} from 'react-redux'
import {getAllSchools} from '../redux/actions/school'
import  Router  from 'next/router';
import { loginStudent, loginStaff } from '../redux/actions/auth';


const { Content } = Layout;

const NonDashboardRoutes = [
  '/signin',
  '/signup',
  '/forgot',
  '/lockscreen',
  '/',
  '/pricing'
];

const Page = ({ router, children, auth }) => {
  const [loading, setLoading] = useState(true);
  const [state] = useAppState();
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  useEffect(() => {
    setTimeout(() => {
      
      console.log(isNotDashboard, auth.isAuth)
      setLoading(false);
    }, 1000);
  }, [loading]);

  return (
    <Spin indicator={true} tip="Loading..." size="large" spinning={loading}>
      <ThemeProvider theme={theme}>
        <Container
          className={`${state.weakColor ? 'weakColor' : ''} ${ state.boxed ? 'boxed shadow-sm' : ''}`}
        >
          {!isNotDashboard && <Header />}
          <Layout className="workspace">
            {!isNotDashboard && (
              <SidebarMenu
                sidebarTheme={state.darkSidebar ? 'dark' : 'light'}
                sidebarMode={state.sidebarPopup ? 'vertical' : 'inline'}
                sidebarIcons={state.sidebarIcons}
                collapsed={state.collapsed}
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

const mapStateToProps = state => ({
  auth:state.auth
});

const mapDispatchToProps = {
getSchools:getAllSchools,
loginStudent: loginStudent,
loginStaff:loginStaff

};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));
