import React, { useState, useEffect } from "react";
import { Table, Button, Icon } from "antd";
import { useAppState } from "../shared/AppProvider";

const BehaviourTable = ({ behaviour }) => {
   const [tableHeight, setTableHeight] = useState(0);
   const [state] = useAppState();
   const { loading, behaviors } = behaviour;

   const columns = [
      {
         title: "Behavior",
         width: state.mobile ? 100 : 150,
         dataIndex: "name",
         key: "_id",
      },
      {
         title: "Action",
         key: "operation",
         width: state.mobile ? 100 : 150,
         render: () => (
            <Button type="primary" htmlType="submit">
               <Icon type="edit" />
               Edit
            </Button>
         ),
      },
   ];

   useEffect(() => {
      setTableHeight(window.innerHeight - 280);
   }, []);

   return (
      <Table
         rowKey={"_id"}
         columns={columns}
         loading={loading}
         bordered
         size="default"
         pagination={true}
         dataSource={behaviors}
         scroll={{ x: state.mobile ? 200 : 300, y: tableHeight }}
      />
   );
};

export default BehaviourTable;
