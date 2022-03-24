import React from "react";
import { Table, Button, Icon, Avatar, Input } from "antd";
import { useAppState } from "../shared/AppProvider";
import { filter } from "lodash";

const Search = Input.Search;

const StaffTableSetting = ({ staffs, loading, onSettingClick }) => {
   const [tableHeight, setTableHeight] = React.useState(0);
   const [state] = useAppState();
   const [data, setData] = React.useState([]);
   const [searchText, setSearchText] = React.useState("");
   const [localLoading, setLoading] = React.useState(true);

   React.useEffect(() => {
      setTableHeight(window.innerHeight - 280);
      setData(staffs);
      setLoading(loading);
   }, [staffs, loading]);

   const columns = [
      {
         title: "Reg Number",
         width: state.mobile ? 100 : 150,
         dataIndex: "regNumber",
         key: "regNumber",
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
         render: (staff) => (
            <div>
               <Button
                  onClick={() => onSettingClick(staff)}
                  type="default"
                  htmlType="submit"
               >
                  <Icon type="setting" />
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
         return (
            userFullName.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
         );
      });
      setTimeout(() => {
         setLoading(false);
      }, 1000);

      setData(e.target.value ? filteredData : staffs);
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
            loading={localLoading}
            scroll={{ x: state.mobile ? 600 : 800, y: tableHeight }}
         />
      </div>
   );
};

export default StaffTableSetting;
