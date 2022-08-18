import React from "react";
import Head from "next/head";
import { PrivateRoute } from "../../components/PrivateRoute";
import { Card } from "antd";

const ReversePaymentPage = () => {
   return (
      <Card
         title="Add A Payment Method"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4"></div>
      </Card>
   );
};

export default PrivateRoute(ReversePaymentPage);
