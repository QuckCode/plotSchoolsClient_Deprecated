import React from "react";
import { List, Typography, Checkbox, Button } from "antd";

export default function SubjectList({ subjects, onSubjectCheck }) {
   return (
      <div
         style={{
            marginTop: 10,
            padding: 20,
            borderWidth: subjects.length !== 0 ? 1 : 0,
            borderStyle: "solid",
         }}
      >
         <div>
            <Typography.Text> </Typography.Text>
         </div>
         {subjects.map((subject) => {
            return (
               <Checkbox
                  onChange={() => onSubjectCheck(subject._id)}
                  key={subject._id}
                  style={{ paddingTop: 10 }}
               >
                  {subject.name}
               </Checkbox>
            );
         })}
      </div>
   );
}
