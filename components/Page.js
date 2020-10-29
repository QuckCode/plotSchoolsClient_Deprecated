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
import  { useRouter }  from 'next/router';
import {  loginSuccess, logOut } from '../redux/actions/auth';
import { TOKEN_LOCATION } from '../redux/varables';
import jwt from 'jsonwebtoken';


const { Content } = Layout;

const NonDashboardRoutes = [
  '/signin',
  '/signup',
  '/forgot',
  '/lockscreen',
  '/',
  '/pricing'
];

const Page = ({ router, children, auth , loginSuccess , logOut,  }) => {
  const [loading, setLoading] = useState(true);
  const [state] = useAppState();
  const isNotDashboard = NonDashboardRoutes.includes(router.pathname);

  useEffect(() => {
    let userData= localStorage.getItem(TOKEN_LOCATION)
    if(userData){
       let user= jwt.decode(userData,'BIU_WEB_APP')
        loginSuccess( user, user.userType )
        router.push('/dashboard')
        setLoading(false);
    }
    else {
      if(!isNotDashboard){
        router.push('/')
        setLoading(false);
      }
      setLoading(false);
    }
  }, [loading]);

  return (
    <Spin indicator={true} tip="Loading..." size="large" spinning={loading}>
      <ThemeProvider theme={theme}>
        <Container
          className={`${state.weakColor ? 'weakColor' : ''} ${ state.boxed ? 'boxed shadow-sm' : ''}`}
        >
          {!isNotDashboard && <Header  user= {auth.user}/>}
          <Layout className="workspace">
            {!isNotDashboard && (
              <SidebarMenu
                user= {auth.user}
                sidebarTheme={state.darkSidebar ? 'dark' : 'light'}
                sidebarMode={state.sidebarPopup ? 'vertical' : 'inline'}
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

const mapStateToProps = state => ({
  auth:state.auth
});

const mapDispatchToProps = {
 loginSuccess: loginSuccess,
 logOut:logOut
};



export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Page));
