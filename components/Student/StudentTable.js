import React from "react";
import { Table, Button, Icon, Avatar, Input } from "antd";
import { useAppState } from "../shared/AppProvider";
import { filter } from "lodash";
import moment from "moment";
import Router from "next/router";
import axios from "axios";
const Search = Input.Search;

const StudentTable = ({ student, onDelete, hideActions = true }) => {
   //student.students student.loading
   const [tableHeight, setTableHeight] = React.useState(0);
   const [searchText, setSearchText] = React.useState("");
   const [data, setData] = React.useState([]);
   const [loading, setLoading] = React.useState(true);
   const [state] = useAppState();

   const columns = [
      {
         title: "Admission Number",
         width: state.mobile ? 150 : 163,
         dataIndex: "admissionNumber",
         key: "regNo",
         fixed: "left",
      },
      {
         title: "Name",
         width: state.mobile ? 100 : 150,
         dataIndex: "name",
         key: "name",
      },
      {
         title: "Address",
         width: state.mobile ? 100 : 150,
         dataIndex: "address",
         key: "address",
      },
      {
         title: "Passport",
         width: state.mobile ? 100 : 150,
         dataIndex: "passport",
         key: "age",
         render: (x) => (
            <div style={{ textAlign: "center" }}>
               <Avatar
                  style={{
                     width: state.mobile ? 50 : 70,
                     height: state.mobile ? 50 : 70,
                  }}
                  size="large"
                  src={x}
               />
            </div>
         ),
      },
      {
         title: "Class",
         dataIndex: "class",
         key: "1",
         width: state.mobile ? 100 : 150,
      },
      {
         title: "Arm",
         dataIndex: "arm",
         key: "2",
         width: state.mobile ? 100 : 150,
         render: (x, data) => <span> {data.class + " " + x}</span>,
      },
      {
         title: "State of Origin",
         dataIndex: "state",
         key: "3",
         width: state.mobile ? 100 : 150,
      },
      {
         title: "Gender",
         dataIndex: "gender",
         key: "5",
         width: state.mobile ? 100 : 150,
         render: (x) => <span> {x === true ? "Male" : "Female"}</span>,
      },
      {
         title: "Date of birth",
         dataIndex: "dob",
         key: "4",
         width: state.mobile ? 100 : 150,
         render: (x) => (
            <div style={{ textAlign: "center" }}>
               <span> {moment(x).format("DD/MM/YYYY")}</span>
            </div>
         ),
      },
      {
         title: "Action",
         key: "operation",
         fixed: "right",
         width: state.mobile ? 100 : 150,
         render: (x) =>
            hideActions && (
               <div>
                  {" "}
                  <Button
                     onClick={() => {
                        Router.push(
                           `/students/edit/${
                              !x.admissionNumber
                                 ? "empty"
                                 : x.admissionNumber.replaceAll("/", "-")
                           }`
                        );
                     }}
                     type="primary"
                     htmlType="submit"
                  >
                     <Icon type="edit" />
                  </Button>
                  <Button
                     onClick={() => {
                        onDelete(x._id);
                     }}
                     style={{ marginLeft: 10 }}
                     type="danger"
                  >
                     <Icon type="delete" />
                  </Button>
               </div>
            ),
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
            columns={columns}
            bordered
            size="default"
            pagination={{ pageSize: 30 }}
            loading={loading}
            dataSource={data}
            scroll={{ x: state.mobile ? 950 : 1500, y: tableHeight }}
         />
      </div>
   );
};

export default StudentTable;
