import React from "react";
import { Table, Button, Icon, Avatar } from "antd";
import { useAppState } from "../shared/AppProvider";

const ArmTable = ({ arm }) => {
   const [tableHeight, setTableHeight] = React.useState(0);
   const [state] = useAppState();
   const columns = [
      {
         title: "Arms",
         width: state.mobile ? 100 : 150,
         dataIndex: "arm",
         key: "arm",
         render: (x, a) => <span>{`${a.class} ${x}`}</span>,
      },
      {
         title: "Class",
         width: state.mobile ? 100 : 150,
         dataIndex: "class",
         key: "class",
      },
      {
         title: "Section",
         width: state.mobile ? 100 : 150,
         dataIndex: "section",
         key: "section",
      },
      {
         title: "Action",
         key: "operation",
         width: state.mobile ? 100 : 150,
         render: () => (
            <div>
               <Button type="primary" htmlType="submit">
                  <Icon type="edit" />
                  Edit
               </Button>
               <Button
                  style={{ background: "red", color: "#fff", marginLeft: 10 }}
               >
                  <Icon type="delete" />
                  Delete
               </Button>
            </div>
         ),
      },
   ];

   const data = [];
   React.useEffect(() => {
      setTableHeight(window.innerHeight - 280);
   }, []);
   return (
      <Table
         columns={columns}
         bordered
         size="default"
         pagination={false}
         loading={arm.loading}
         dataSource={arm.arms}
         scroll={{ x: state.mobile ? 200 : 300, y: tableHeight }}
      />
   );
};

export default ArmTable;
