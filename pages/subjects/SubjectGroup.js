import React, { useState } from "react";
import { Button, Card, Table, Tag, Modal, Input, Col, Row } from "antd";
import styled from "styled-components";
import { wrapper } from "../../redux/store";
import { loginSuccess } from "../../redux/actions/auth";
import { getSchoolsSetting } from "../../redux/actions/school";
import { redirectError } from "../../services/redirectService";
import { AuthToken } from "../../services/authToken";
import {
   getAllSubjectGroup,
   getAllSubjects,
} from "../../redux/actions/subject";
import SubjectList from "../../components/Subject/SubjectList";
import { error, success } from "../../components/modal";
import axios from "axios";
import { school, url } from "../../redux/varables";

const Content = styled.div`
  z-index: 0;
  min-width: 300px;,
  backgroundColor:'#f0f0f0'
`;

const SubjectGroupPage = ({ subjectsGroup, subjects }) => {
   const [addModelVisible, setAddModelVisible] = useState(false);
   const [groupName, setGroupName] = useState("");
   const [addSubjectList, setAddSubjectList] = useState([]);
   const [editModelVisible, setEditModalVisible] = useState(false);

   const columns = [
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Subjects",
         dataIndex: "subjects",
         key: "subjects",
         render: (list) => (
            <span>
               <Tag> {list.length}</Tag>
            </span>
         ),
      },
   ];

   const saveAddSubjectGroup = async () => {
      if (!groupName) return error("Subject group does  not have a name");
      if (addSubjectList.length == 0)
         return error("Subject group does not have any subjects");
      try {
         await axios.post(`${url}/subject/subjectGroup`, {
            name: groupName,
            subjects: addSubjectList,
            school: school,
         });
         success("Saved Subject Group");
      } catch (err) {
         return error(err.title, err.message);
      }
   };

   const cancelAddSubjectGroup = () => {
      setGroupName("");
      setAddModelVisible(false);
   };

   const onAddSubjectCheck = (subjectId) => {
      if (addSubjectList.includes(subjectId) == true) {
         let filteredSubjects = addSubjectList.filter((id) => subjectId !== id);
         return setAddSubjectList(filteredSubjects);
      }
      return setAddSubjectList([...addSubjectList, subjectId]);
   };

   return (
      <Card title="View Subjects Group">
         <Content>
            <Button onClick={() => setAddModelVisible(true)} type="primary">
               Add Subject Group
            </Button>

            <Modal
               onOk={saveAddSubjectGroup}
               onCancel={cancelAddSubjectGroup}
               visible={addModelVisible}
               title="Add Subject Group"
               width={1000}
               okText="Save"
            >
               <Input
                  value={groupName}
                  size="large"
                  placeholder="Subject Group Name"
                  onChange={(e) => setGroupName(e.target.value)}
               />
               <SubjectList
                  onSubjectCheck={onAddSubjectCheck}
                  subjects={subjects}
               />
            </Modal>
            <Table
               style={{ marginTop: 20 }}
               bordered
               columns={columns}
               dataSource={subjectsGroup}
            />
         </Content>
      </Card>
   );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
   try {
      const store = ctx.store;
      let { decodedToken } = await AuthToken.fromNext(ctx);
      await store.dispatch(loginSuccess(decodedToken, decodedToken.userType));
      await store.dispatch(getAllSubjects());
      await store.dispatch(getSchoolsSetting(decodedToken.school));
      await store.dispatch(getAllSubjectGroup(decodedToken.school));
      let propStore = await store.getState();
      return {
         props: {
            oldSchoolSettings: propStore.schools.settings,
            subjectsGroup: propStore.subject.subjectsGroup,
            subjects: propStore.subject.subjects,
         },
      };
   } catch (error) {
      console.log(error);
      redirectError(ctx);
   }
});

export default SubjectGroupPage;
