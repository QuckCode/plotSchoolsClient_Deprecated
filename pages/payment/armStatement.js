import React from "react";
import { PrivateRoute } from "../../components/PrivateRoute";
import { Card } from "antd";
import ArmStatement from "../../components/Payment/armStatement";

const ArmStatementPage = () => {
   return (
      <Card
         title="Print Arm statement"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4">
            <ArmStatement loading={false} />
         </div>
      </Card>
   );
};

export default PrivateRoute(ArmStatementPage);
