import React from "react";
import { PrivateRoute } from "../../components/PrivateRoute";
import { Card } from "antd";
import StudentStatement from "../../components/Payment/studentStatement";

const StatementPage = () => {
   return (
      <Card
         title="Print Statement for student"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4">
            <StudentStatement loading={false} />
         </div>
      </Card>
   );
};

export default PrivateRoute(StatementPage);
