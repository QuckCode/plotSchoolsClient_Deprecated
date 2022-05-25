import { Card, Dropdown } from "antd";
import { MoreHorizontal } from "react-feather";
import { theme } from "../../../components/styles/GlobalStyles";
import { useState } from "react";
import axios from "axios";

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

export async function getServerSideProps() {
   try {
      const data = await axios.get(
         `${url}/qrcode/students//${admissionNumber}`
      );

      // Pass data to the page via props
      return { props: { data, error: false, message: "" } };
   } catch (error) {
      return { props: { data, error: true, message: "" } };
   }
}

export default StaffQRPage;
