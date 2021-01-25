import { Icon } from 'antd';
import {
  User,
  ShoppingBag,
  Package,
  Layers,
  Grid,
  MessageSquare,
  Home,
  FileText,
  DollarSign,
  Settings,
  Monitor,
  Smartphone,
  CreditCard,
  Box,
  GitCommit,
  GitPullRequest
} from 'react-feather';



export default [
  {
    name: 'Dashboard',
    icon: <Home strokeWidth={1} size={16}  />,
    path:"/dashboard"
  },
  {
    name: ' Result Scratch Card',
    icon: <CreditCard strokeWidth={1} size={16} />,
    path:"/scratchcard"
  },
  {
    name: 'SMS',
    icon: <MessageSquare strokeWidth={1} size={16} />,
    path:"/sms"
  },
  {
    name: 'School Setting',
    icon: <Settings strokeWidth={1} size={16} />,
    children:[
      { 
        path: '/schoolSetting',
        name: 'General Settings'
      },
      {
        path: '/section/sectionBehaviors',
        name: 'Section Behaviors Settings'
      },
      {
        path: '/section/sectionSkills',
        name: 'Section Skill Settings'
      },
      {
        path: '/classes/classSubjects',
        name: 'Class Subject Settings'
      },
      {
        path: '/classes/classTest',
        name: 'Class Test Settings'
      },
    ]
  },
  {
    name: 'Departments',
    icon: <Package strokeWidth={1} size={16} />,
    children: [
      {
        path: '/departments/add',
        name: 'Add New Department'
      },
      {
        path: '/departments/form',
        name: 'School Department Form'
      },
      {
        path: '/departments/view',
        name: 'View School Department'
      }
    ]
  },
  {
    name: 'Designations',
    icon: <GitPullRequest  strokeWidth={1} size={20} />,
    children: [
      {
        path: '/designation/add',
        name: 'Add New Designation'
      },
      {
        path: '/designation/form',
        name: 'School Designation Form'
      },
      {
        path: '/designation/view',
        name: 'View School Designation'
      }
    ]
  },
  {
    name: "Section",
    icon: <Box strokeWidth={1} size={15} />,
    children: [
      {
        path: '/section/add',
        name: 'Add New Section'
      },
      {
        path: '/section/view',
        name: 'View Sections',
      }
    ]
  },
  {
    name: 'Class',
    icon: <Icon type="team" style={{margin:0,fontSize: '15px' }}  />,
    children: [
      {
        path: '/classes/add',
        name: 'Add New Class'
      },
      {
        path: '/classes/view',
        name: 'View Class'
      },
      {
        path: '/classes/classForm',
        name: 'Class Form'
      },
      {
        path: '/classes/classSubjectsForm',
        name: 'Class Subject form'
      },
    ]
  },
  {
    name: "Test/Exam",
    icon: <Icon type="solution" style={{margin:0,fontSize: '15px' }}  />,
    children: [
      {
        path: '/result/ValidateScoreBySubject',
        name: 'Validate Score By Subject'
      },
      {
        path: '/test/add',
        name: 'Add a new Test/Exam'
      },
      {
        path: '/test/view',
        name: 'View All Test/Exam'
      },
      {
        path: '/test/addSubjectTestScore',
        name: 'Add Score By Subject'
      },
    ]
  },
  {
    name: "Behaviour",
    icon: <Icon type="meh" style={{margin:0,fontSize: '15px' }}  />,
    children: [
      {
        path: '/behaviour/add',
        name: 'Add a new Behaviors'
      },
      {
        path: '/behaviour/view',
        name: 'View All Behaviors'
      },
      {
        path: '/behaviour/BehaviourScore',
        name: 'Add Behaviour Score'
      },
      {
        path: '/behaviour/BehaviourScoreByStudent',
        name: 'Behaviour Score By Student'
      },
    ]
  },
  {
    name: "Skills",
    icon: <Icon type="trophy" style={{margin:0,fontSize: '15px' }}  />,
    children: [
      {
        path: '/skill/add',
        name: 'Add a new Skills'
      },
      {
        path: '/skill/view',
        name: 'View All Skills'
      },
      {
        path: '/skill/SkillScore',
        name: 'Add Skills Score'
      },
      {
        path: '/skill/SkillScoreByStudent',
        name: 'Skill Score By Student'
      },
    ]
  },
  {
    name: 'Arms',
    icon: <Grid strokeWidth={1} size={16} />,
    children: [
      {
        path: '/arm/add',
        name: 'Add New Arm'
      },
      {
        path: '/arm/view',
        name: 'View Arm'
      }
    ]
  },  
  {
    name: 'Subject',
    icon: <Grid strokeWidth={1} size={16} />,
    children: [
      {
        path: '/subjects/add',
        name: 'Add New Subjects'
      },
      {
        path: '/subjects/view',
        name: 'View Subjects'
      }
    ]
  },
  {
    name: 'Staff',
    icon: <User strokeWidth={1} size={16} />,
    children: [
      {
        path: '/staffs/add',
        name: 'Add new Staff'
      },
      {
        path: '/staffs/view',
        name: 'View Staffs'
      },
      {
        path: '/staffs/form',
        name: ' Staff Form'
      },
      {
        path: '/staffs/capture',
        name: 'Capture Staff Passport'
      },
    ]
  },
  {
    name: 'Student',
    icon: <User strokeWidth={1} size={16} />,
    children: [
      {
        path: '/students/add',
        name: 'Add New Students'
      },
      {
        path: '/students/capture',
        name: 'Capture Student Passport '
      },
      {
        path: '/students/view',
        name: 'View Students'
      },
      {
        path: '/students/studentbyclass',
        name: 'View Student In Class'
      },
      {
        path: '/students/studentbyarm',
        name: ' View Student In Arm'
      },
      {
        path: '/students/form',
        name: ' Student Form'
      }
    ]
  },
  {
    name: 'Store',
    icon: <ShoppingBag strokeWidth={1} size={16} />,
    children: [
      {
        path: '/store',
        name: 'View Store'
      },
      {
        path: '/store/add',
        name: 'Add Store Items'
      },
      {
        path: '/store/edit',
        name: 'Edit Store'
      },
    ]
  },
  {
    name: 'Result',
    icon: <FileText strokeWidth={1} size={16} />,
    children: [
      {
        path: '/result/ComputeResult',
        name: 'Compute Result'
      },
      {
        path: '/result/PromoteByResult',
        name: 'Promote By Result'
      },
      {
        path: '/result/ValidateResultByClass',
        name: 'Validate Result By Class'
      },
      {
        path: '/result/ValidateResultByArm',
        name: 'Validate Result By Arm'
      },
    ]
  },
  {
    name: 'Fee Management',
    icon: <DollarSign strokeWidth={1} size={16} />,
    children: [
      {
        path: '/fee/AddPaymentMethod',
        name: 'Add Payment Method'
      },
      {
        path: '/fee/ReversePayment',
        name: 'Reverse Payment'
      },
      {
        path: '/fee/StudentPayment',
        name: 'Enter Payment'
      }
    ]
  },
  {
    name: 'User Setting',
    icon: <Settings strokeWidth={1} size={16} />,
    path:"/setting"
  },
];
