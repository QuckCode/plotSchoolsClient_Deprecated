import React from "react";
import { PrivateRoute } from "../../components/PrivateRoute";
import { Card } from "antd";
import ClassStatement from "../../components/Payment/classStatement";

const ClassStatementPage = () => {
   return (
      <Card
         title="Print Class Statement"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4">
            <ClassStatement loading={false} />
         </div>
      </Card>
   );
};

export default PrivateRoute(ClassStatementPage);
