import React from "react";
import Head from "next/head";
import { PrivateRoute } from "../../components/PrivateRoute";
import { Card } from "antd";
import CreateFee from "../../components/Fee/CreateFee";

const AddPaymentMethodPage = () => {
   return (
      <Card
         title="Add A Payment Item"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4">
            <CreateFee loading={true} />
         </div>
      </Card>
   );
};

export default PrivateRoute(AddPaymentMethodPage);
