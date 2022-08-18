import React from "react";
import Head from "next/head";
import { PrivateRoute } from "../../components/PrivateRoute";

const PreviousPaymentPage = () => {
   return (
      <Card
         title="Prev Method"
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      >
         <div className="p-4"></div>
      </Card>
   );
};

export default PrivateRoute(PreviousPaymentPage);
