import React from "react";
import { PrivateRoute } from "../../components/PrivateRoute";
import { Card } from "antd";
import CreatePayment from "../../components/Payment/addPayment";

const AddPaymentMethodPage = () => {
   return (
      <Card
         title="Add A Payment Item"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4">
            <CreatePayment loading={false} />
         </div>
      </Card>
   );
};

export default PrivateRoute(AddPaymentMethodPage);
