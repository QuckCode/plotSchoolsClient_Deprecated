import React, { useState } from "react";
import { Table, Input, Select, Button } from "antd";
import { useAppState } from "../shared/AppProvider";
import { filter } from "lodash";
const { Search } = Input;
const { Option } = Select;

const StudentSubjectGroup = ({
   student,
   subjectsGroup,
   onSubjectSelected,
   onSave,
}) => {
   const [tableHeight, setTableHeight] = useState(0);
   const [searchText, setSearchText] = useState("");
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(true);

   const columns = [
      {
         title: "Admission Number",
         dataIndex: "admissionNumber",
      },
      {
         title: "Name",
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Arm",
         dataIndex: "arm",
         render: (x, data) => <span> {data.class + " " + x}</span>,
      },
      {
         title: "Subject Group",
         render: (student) => {
            let { subjectGroup } = student;
            return (
               <Select
                  key={student.id}
                  style={{ width: "100%" }}
                  placeholder="Search to Select"
                  defaultValue={subjectGroup || ""}
                  onSelect={(value) => onSubjectSelected(student._id, value)}
               >
                  <Option value={""}>None</Option>
                  {subjectsGroup.map((subjectGroup) => (
                     <Option hey={subjectGroup._id} value={subjectGroup._id}>
                        {subjectGroup.name}
                     </Option>
                  ))}
               </Select>
            );
         },
      },
   ];

   const onSearchTextChange = (e) => {
      setSearchText(e.target.value);
      onSearch(e);
   };

   const onSearch = (e) => {
      setData([]);
      setLoading(true);
      const filteredData = filter(data, (record) => {
         return (
            record.name.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
         );
      });
      setTimeout(() => {
         setLoading(false);
      }, 1000);

      setData(e.target.value ? filteredData : student.students);
   };

   React.useEffect(() => {
      setTableHeight(window.innerHeight - 280);
      setData(student.students);
      setLoading(student.loading);
   }, [student.students, student.loading]);

   return (
      <div>
         <Search
            size="large"
            onChange={onSearchTextChange}
            placeholder="Search Records"
            value={searchText}
            onPressEnter={onSearch}
         />
         <br />
         <br />
         <Table
            rowKey={"_id"}
            columns={columns}
            bordered
            size="small"
            loading={loading}
            pagination={false}
            dataSource={data}
            scroll={{ x: 700 }}
            footer={() => {
               return <Button onClick={onSave}> Save Students Data</Button>;
            }}
         />
      </div>
   );
};

export default StudentSubjectGroup;
