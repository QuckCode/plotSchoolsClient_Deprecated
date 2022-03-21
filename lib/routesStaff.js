import { Icon } from "antd";
import {
   User,
   ShoppingBag,
   Home,
   FileText,
   Settings,
   Key,
   Briefcase,
   Airplay,
} from "react-feather";

export default [
   {
      name: "Dashboard",
      icon: <Home strokeWidth={1} size={16} />,
      path: "/dashboard/staff",
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
      name: "Class",
      icon: <Icon type="team" style={{ margin: 0, fontSize: "15px" }} />,
      children: [
         {
            path: "/classes/add",
            name: "Add New Class",
         },
         {
            path: "/classes/view",
            name: "View Class",
         },
         {
            path: "/classes/classForm",
            name: "Class Form",
         },
         {
            path: "/classes/classSubjectsForm",
            name: "Class Subject form",
         },
      ],
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
            path: "/test/add",
            name: "Add a new Test/Exam",
         },
         {
            path: "/test/view",
            name: "View All Test/Exam",
         },
         {
            path: "/test/addSubjectTestScore",
            name: "Add Score By Subject",
         },
         {
            path: "/test/printTestSheet",
            name: "Print All Test/ Exam Sheet",
         },
      ],
   },
   {
      name: "Behaviour",
      icon: <Icon type="meh" style={{ margin: 0, fontSize: "15px" }} />,
      children: [
         {
            path: "/behaviour/add",
            name: "Add a new Behaviors",
         },
         {
            path: "/behaviour/view",
            name: "View All Behaviors",
         },
         // {
         //   path: '/behaviour/BehaviourScore',
         //   name: 'Add Behaviour Score'
         // },
         {
            path: "/behaviour/BehaviourScoreByStudent",
            name: "Behaviour Score By Student",
         },
      ],
   },
   {
      name: "Skills",
      icon: <Icon type="trophy" style={{ margin: 0, fontSize: "15px" }} />,
      children: [
         {
            path: "/skill/SkillScoreByStudent",
            name: "Skill Score By Student",
         },
      ],
   },
   {
      name: "Student",
      icon: <User strokeWidth={1} size={16} />,
      children: [
         {
            path: "/students/studentbyclass",
            name: "View Student In Class",
         },
         {
            path: "/students/studentbyarm",
            name: " View Student In Arm",
         },
         {
            path: "/students/form",
            name: " Student Form",
         },
      ],
   },
   {
      name: "Result",
      icon: <FileText strokeWidth={1} size={16} />,
      children: [
         {
            path: "/result/PromoteByResult",
            name: "Promote By Result",
         },
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
