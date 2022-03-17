import React from "react";
import { Table, Button, Icon, Avatar, Input } from "antd";
import { useAppState } from "../../components/shared/AppProvider";
import { filter } from "lodash";

const Search = Input.Search;

const StaffTable = ({ staff }) => {
   const [tableHeight, setTableHeight] = React.useState(0);
   const [state] = useAppState();
   const [data, setData] = React.useState([]);
   const [searchText, setSearchText] = React.useState("");
   const [loading, setLoading] = React.useState(true);

   React.useEffect(() => {
      setTableHeight(window.innerHeight - 280);
      setData(staff.staffs);
      setLoading(staff.loading);
   }, [staff.staffs, staff.loading]);

   const columns = [
      {
         title: "Reg Number",
         width: state.mobile ? 100 : 150,
         dataIndex: "regNumber",
         key: "regNumber",
         // fixed: 'left',
      },
      {
         title: "Name",
         width: state.mobile ? 100 : 150,
         dataIndex: "name",
         key: "name",
         render: (name) => (
            <span>
               {" "}
               {`${name.firstName} ${name.middleName ? name.middleName : ""} ${
                  name.srnName
               } `}
            </span>
         ),
      },
      {
         title: "Gender",
         dataIndex: "gender",
         key: "5",
         width: state.mobile ? 100 : 150,
         render: (x) => <span> {x === true ? "Male" : "Female"}</span>,
      },
      {
         title: "Passport",
         width: state.mobile ? 100 : 150,
         dataIndex: "passport",
         key: "passport",
         render: (passport) => (
            <div style={{ textAlign: "center" }}>
               <Avatar
                  style={{
                     width: state.mobile ? 50 : 70,
                     height: state.mobile ? 50 : 70,
                  }}
                  size="large"
                  src={passport}
               />
            </div>
         ),
      },
      {
         title: "Staff Active",
         dataIndex: "active",
         key: "active",
         width: state.mobile ? 100 : 150,
         render: (x) => <span> {x === true ? "Active" : "Not Active"}</span>,
      },
      {
         title: "Action",
         key: "operation",
         // fixed: 'right',
         width: state.mobile ? 100 : 150,
         render: () => (
            <div>
               <Button type="primary" htmlType="submit">
                  <Icon type="edit" />
               </Button>
               <Button
                  style={{ marginLeft: 20 }}
                  type="danger"
                  htmlType="submit"
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
      const filteredData = filter(data, ({ name }) => {
         let userFullName = name.firstName + name.srnName;
         return userFullName.toLowerCase().indexOf(searchText) !== -1;
      });
      setTimeout(() => {
         setLoading(false);
      }, 1000);

      setData(e.target.value ? filteredData : staff.staffs);
   };

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
            pagination={{ pageSize: 10 }}
            dataSource={data}
            loading={loading}
            scroll={{ x: state.mobile ? 600 : 800, y: tableHeight }}
         />
      </div>
   );
};

export default StaffTable;
