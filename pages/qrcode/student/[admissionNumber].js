import { Card, Dropdown } from "antd";
import { MoreHorizontal } from "react-feather";
import { theme } from "../../../components/styles/GlobalStyles";
import axios from "axios";
import { url } from "../../../redux/varables";
import NotFound from "../../../components/NotFound";

const StudentQRPage = ({ error, data, message }) => {
   console.log(error, data);
   if (!error && data !== null) {
      console.log(data);
      return <div> hchdhdc</div>;
   } else {
      return <NotFound code={404} message={message} />;
   }
};

export async function getServerSideProps(context) {
   let { admissionNumber } = context.query;
   try {
      const { data } = await axios.get(
         `${url}/qrcode/students/${admissionNumber}`
      );
      return {
         props: { error: false, message: "Found the QRcode", data: data },
      };
   } catch (error) {
      return {
         props: { error: true, message: "This QRCode is invalid", data: null },
      };
   }
}

export default StudentQRPage;
