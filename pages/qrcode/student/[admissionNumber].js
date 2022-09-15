import { Card, Dropdown } from "antd";
import { MoreHorizontal } from "react-feather";
import { theme } from "../../../components/styles/GlobalStyles";
import axios from "axios";
import { url } from "../../../redux/varables";
import NotFound from "../../../components/NotFound";
import ProfileCard from "../../../components/shared/ProfileCard";

const StudentQRPage = ({ error, data, message }) => {
   if (!error && data !== null) {
      return (
         <ProfileCard
            name={data.name}
            avatar={data.avatar}
            admissionNumber={data.admissionNumber}
            gender={data.gender == "M" ? "Male" : "Female"}
            className={data.class}
            phone={data.phone}
            school={data.school.name}
         />
      );
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
      console.log(error);
      return {
         props: { error: true, message: "This QRCode is invalid", data: null },
      };
   }
}

export default StudentQRPage;
