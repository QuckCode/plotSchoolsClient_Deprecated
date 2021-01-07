import { Card, Row, Typography, Button, Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { theme } from '../../../components/styles/GlobalStyles';
import {
  Edit,MoreHorizontal,
  Printer,
  Save,
  Trash,
} from 'react-feather';
import { connect } from 'react-redux';
import {  editDesignation} from '../../../redux/actions/designation';
import RegisterDesignation from '../../../components/Designation/RegisterDesignation';
import { PrivateRoute } from '../../../components/PrivateRoute';
import { useState, useEffect } from 'react';
import  Router  from 'next/router';
import EditDesignation from '../../../components/Designation/EditDesignation';

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

const EditDesignationPage = props =>{
   const [designation, setDesignation] = useState({loading:true, name:""})
   useEffect(()=>{
    if(props.query.id && props.designation.designations.length >0){
      let index= props.designation.designations.findIndex(x=>{
        return (x._id===props.query.id)
      })
      let designationId =  props.designation.designations[index]._id
      setDesignation({...props.designation.designations[index], loading:false})
    }
    else{
      Router.push("/designation/view")
    }
 }, [props.query.id])
  return (
        <Card 
        title="Edit Designations"
        extra={
          <Dropdown overlay={menu}>
            <MoreHorizontal size={20} strokeWidth={1} fill={theme.textColor} />
          </Dropdown>
        }
        bodyStyle={{ padding: '1rem' }}
        className="mb-4"> 
          <div className="p-4">
             <EditDesignation  designation={designation} editDesignation={props.editDesignation} />
          </div>
       </Card>
  )
};

const mapStateToProps = state => ({
 designation:state.designation
});

const mapDispatchToProps = {
// createDesignation : createDesignation,
  editDesignation
};

export default PrivateRoute(connect(mapStateToProps, mapDispatchToProps)(EditDesignationPage));