import  React, { useState } from 'react'
import Head from 'next/head';
import { PrivateRoute } from '../../components/PrivateRoute';
import StudentByArmForm from '../../components/Student/StudentByArmForm';
import { wrapper } from '../../redux/store';
import { loginSuccess } from '../../redux/actions/auth';
import { getAllSection } from '../../redux/actions/section';
import { getAllClasses, getCurrentClassTests } from '../../redux/actions/classes';
import { getAllArms } from '../../redux/actions/arm';
import { redirectError } from '../../services/redirectService';
import { AuthToken } from '../../services/authToken';
import { Menu, Row, Card, Dropdown, Table, Col,Avatar, Button, InputNumber, Result, Popconfirm } from 'antd';
import { Edit, Trash,Save, Printer, MoreHorizontal} from 'react-feather';
import { theme } from '../../components/styles/GlobalStyles';


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

const RequestTranscriptPage = ({showResult,classes, sections,  arms, results, schoolSettings={}}) => {
    return (
      <Card 
      title="Compute Result "
       extra={
        <Dropdown overlay={menu}>
          <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      id="result"
      className="mb-4"> 
        <div className="p-4">
         
        </div>
      </Card>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
  async (ctx ) => {
    try {
      const store = ctx.store
      let data =  await AuthToken.fromNext(ctx)
      await store.dispatch(loginSuccess(data.decodedToken, data.decodedToken.userType))
      let propStore =  await store.getState()  
      return {
        props:{ 
          userType:propStore.auth.user.userType
        }
      }  
    }
    catch(error){
       redirectError(ctx)
    }
   }
)

export default RequestTranscriptPage;