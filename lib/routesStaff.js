import { Icon } from "antd";
import {
   User,
   ShoppingBag,
   Home,
   FileText,
   Settings,
   Key,
   Briefcase,
   DollarSign,
   Airplay,
} from "react-feather";

export default [
   {
      name: "Dashboard",
      icon: <Home strokeWidth={1} size={16} />,
      path: "/dashboard/staff",
   },
   {
      name: "Manage Payment",
      icon: <DollarSign strokeWidth={1} size={16} />,
      children: [
         {
            path: "/payment/AddPayment",
            name: "Add Payment",
         },
         {
            path: "/payment/receipt",
            name: "Receipt",
         },
         {
            path: "/payment/statements",
            name: "Student Statements",
         },
         {
            path: "/payment/classStatement",
            name: "Class Statement",
         },
         {
            path: "/payment/armStatement",
            name: "Arm Statement",
         },
      ],
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
      name: "Test/Exam",
      icon: <Icon type="solution" style={{ margin: 0, fontSize: "15px" }} />,
      children: [
         {
            path: "/result/ValidateScoreBySubject",
            name: "Validate Score By Subject",
         },
         {
            path: "/test/staffs/addSubjectTestScore",
            name: "Add Score By Subject",
         },
         {
            path: "/test/staffs/printTestSheet",
            name: "Print All Test/ Exam Sheet",
         },
      ],
   },
   {
      name: "Behaviour",
      icon: <Icon type="meh" style={{ margin: 0, fontSize: "15px" }} />,
      children: [
         {
            path: "/behaviour/staffs/BehaviourScoreByStudent",
            name: "Behaviour Score By Student",
         },
      ],
   },
   {
      name: "Skills",
      icon: <Icon type="trophy" style={{ margin: 0, fontSize: "15px" }} />,
      children: [
         {
            path: "/skill/staffs/SkillScoreByStudent",
            name: "Skill Score By Student",
         },
      ],
   },
   {
      name: "Result",
      icon: <FileText strokeWidth={1} size={16} />,
      children: [
         {
            path: "/result/ValidateResultByClass",
            name: "Validate Result By Class",
         },
         {
            path: "/result/ValidateResultByArm",
            name: "Validate Result By Arm",
         },
      ],
   },
   {
      name: "Student",
      icon: <User strokeWidth={1} size={16} />,
      children: [
         {
            path: "/students/studentAttendance",
            name: "Set Student Attendance",
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
