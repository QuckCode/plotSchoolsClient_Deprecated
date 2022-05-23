import { Card, Dropdown } from "antd";
import { MoreHorizontal } from "react-feather";
import { theme } from "../../../components/styles/GlobalStyles";
import { useState } from "react";

const StaffQRPage = () => {
   return (
      <Card
         title="Edit Student "
         extra={
            <Dropdown>
               <MoreHorizontal
                  size={20}
                  strokeWidth={1}
                  fill={theme.textColor}
               />
            </Dropdown>
         }
         bodyStyle={{ padding: "1rem" }}
         className="mb-4"
      ></Card>
   );
};

export default StaffQRPage;
