import React, { useEffect } from "react";
import { Table, Button, Icon, Avatar, Checkbox } from "antd";
import { useAppState } from "../shared/AppProvider";

const ClassTableSubjectGroup = ({ classes, setHasSubjectGroup }) => {
   const [tableHeight, setTableHeight] = React.useState(0);
   const [state] = useAppState();

   const onHasSubjectGroupClicked = async (e, data) => {
      let hasSubjectGroup = !e.target.checked;
      await setHasSubjectGroup(hasSubjectGroup, data._id);
   };

   const columns = [
      {
         title: "Class",
         width: state.mobile ? 100 : 150,
         dataIndex: "name",
         key: "_id",
      },
      {
         title: "Section",
         width: state.mobile ? 100 : 150,
         dataIndex: "section",
         key: "section",
      },
      {
         title: "Has Subject Groups",
         key: "hasSubjectGroup",
         width: state.mobile ? 100 : 150,
         render: (currentClass) => {
            let isChecked = currentClass?.hasSubjectGroup ? true : false;
            return (
               <Checkbox
                  data-testid={`checkbox-${currentClass._id}`}
                  onClick={(e) => onHasSubjectGroupClicked(e, currentClass)}
                  checked={isChecked}
                  type="checkbox"
                  htmlType="submit"
                  key={currentClass._id}
               />
            );
         },
      },
   ];

   useEffect(() => {
      setTableHeight(window.innerHeight - 280);
   }, []);

   return (
      <Table
         rowKey={"_id"}
         columns={columns}
         bordered
         size="default"
         pagination={false}
         dataSource={classes.classes}
         loading={classes.loading}
         scroll={{ x: state.mobile ? 200 : 300 }}
      />
   );
};

export default ClassTableSubjectGroup;
