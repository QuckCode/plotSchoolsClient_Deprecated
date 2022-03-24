import React from "react";
import { List, Typography, Checkbox, Button } from "antd";

export default function StaffSubjectList({
   subjects,
   onSubjectCheck,
   subjectList,
   type,
   onSave,
}) {
   return (
      <List
         header={
            <div>
               <Typography.Title level={4}>
                  {type === "add" ? "Add Subjects" : "Remove Subjects"}
               </Typography.Title>
            </div>
         }
         footer={
            <div>
               <Button
                  onClick={onSave}
                  disabled={subjectList.length == 0}
                  type={type == "add" ? "primary" : "danger"}
               >
                  {type == "add" ? "Add Subjects" : "Remove Subjects"}
               </Button>
            </div>
         }
         bordered
         dataSource={subjects}
         renderItem={(subject) => (
            <List.Item>
               <Checkbox
                  onChange={onSubjectCheck}
                  key={subject._id}
                  value={subject._id}
               >
                  {subject.name}
               </Checkbox>
            </List.Item>
         )}
      />
   );
}
