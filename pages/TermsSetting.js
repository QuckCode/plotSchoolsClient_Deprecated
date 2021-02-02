import { Card, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { theme } from '../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { PrivateRoute } from '../components/PrivateRoute';
import EditSchool from '../components/School/EditSchool';
import { getSchoolsSetting } from '../redux/actions/school';
import { wrapper } from '../redux/store';
import { redirectError } from '../services/redirectService';
import { AuthToken } from '../services/authToken';
import { loginSuccess } from '../redux/actions/auth';
import Axios from 'axios';
import { url } from '../redux/varables';
import { useState } from 'react';
import { success, error } from '../components/modal';
import TermForm from '../components/School/Term';

const Title = Typography.Title

const Content = styled.div`
  max-width: 700px;
  z-index: 2;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const menu = (
  <Menu>
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

const TermSettingPage = ({oldSchoolSettings}) =>{
   const [loading, setLoading] = useState(false)

  const editSchool = (value)=>{
    setLoading(true)
    Axios.post(`${url}/school/setting`, value)
    .then(({data})=>{
      success(data.message, " ")
      setLoading(false)
    })
    .catch(({response})=>{
      setLoading(false)
      if(response){
        error (response.data.title, response.data.message)
      }
      else{
        error("Network Error", "Please an error occurred")
      }
    })
  }
  return (
        <Card 
        title="Edit School Setting "
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
            <Content>
              <TermForm loading={loading} editSchool={editSchool} oldSchoolSettings= {oldSchoolSettings}/>
            </Content>
          </div>
       </Card>
  )
};


export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    try {
      const store = ctx.store
      let data =  await AuthToken.fromNext(ctx)
      await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
      await store.dispatch(getSchoolsSetting(data.decodedToken.school))
      let propStore =  await store.getState()
      return {
        props:{
           oldSchoolSettings: propStore.schools.settings
        }
      } 
    } catch (error) {
        redirectError(ctx)
    }
  }
)

export default TermSettingPage;