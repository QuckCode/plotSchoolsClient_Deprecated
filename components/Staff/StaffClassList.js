import React from "react";
import { List, Typography, Checkbox, Button } from "antd";

export default function StaffClassList({
   classes,
   onClassCheck,
   classList,
   type,
   onSave,
}) {
   return (
      <List
         header={
            <div>
               <Typography.Title level={4}>
                  {type === "add" ? "Add Class" : "Remove Class"}
               </Typography.Title>
            </div>
         }
         footer={
            <div>
               <Button
                  onClick={onSave}
                  disabled={classList.length == 0}
                  type={type == "add" ? "primary" : "danger"}
               >
                  {type === "add" ? "Add Class" : "Remove Class"}
               </Button>
            </div>
         }
         bordered
         dataSource={classes}
         renderItem={(classItem) => (
            <List.Item>
               <Checkbox
                  onChange={onClassCheck}
                  key={classItem._id}
                  value={classItem._id}
               >
                  {classItem.name}
               </Checkbox>
            </List.Item>
         )}
      />
   );
}
