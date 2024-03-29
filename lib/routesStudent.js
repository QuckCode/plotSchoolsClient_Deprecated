import { Icon } from "antd";
import {
   User,
   Briefcase,
   ShoppingBag,
   Home,
   FileText,
   DollarSign,
   Settings,
   Airplay,
   Key,
} from "react-feather";

export default [
   {
      name: "Dashboard",
      icon: <Home strokeWidth={1} size={16} />,
      path: "/dashboard/student",
   },
   {
      name: "Store",
      icon: <ShoppingBag strokeWidth={1} size={16} />,
      path: "/store",
   },
   {
      name: "Assignments",
      icon: <Briefcase strokeWidth={1} size={16} />,
      path: "/assignment",
   },
   {
      name: "Computer Based Test",
      icon: <Airplay strokeWidth={1} size={16} />,
      path: "/cbt",
   },
   {
      name: "Fee Management",
      icon: <DollarSign strokeWidth={1} size={16} />,
      children: [
         {
            path: "/fee/MakePayment",
            name: "Make Payment",
         },
         {
            path: "/fee/PreviousPayment",
            name: "View Previous Payment",
         },
         {
            path: "/fee/RequestRefund",
            name: "Request Refund",
         },
      ],
   },
   {
      name: "Result",
      icon: <FileText strokeWidth={1} size={16} />,
      children: [
         {
            path: "/result/PrintStudentResult",
            name: "Print Result ",
         },
         {
            path: "/result/RequestTranscript",
            name: "Request Transcript",
         },
      ],
   },
   {
      name: "User Setting",
      icon: <Settings strokeWidth={1} size={16} />,
      path: "/settings",
   },
   {
      name: "Reset Password",
      icon: <Key strokeWidth={1} size={16} />,
      path: "/resetPassword",
   },
];
