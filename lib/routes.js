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
    icon: <Home strokeWidth={1} size={16} />,
    path:"/dashboard"
  },
  {
    name: ' Result Scratch Card',
    icon: <CreditCard strokeWidth={1} size={16} />,
    path:"/scratchcard"
  },
  // {
  //   name: "School",
  //   icon: <Book strokeWidth={1} size={16} />,
  //   children: [
  //     {
  //       path: '/school/add',
  //       name: 'Add New School'
  //     },
  //     {
  //       path: '/school/view',
  //       name: 'View Schools'
  //     },
  //   ]
  // },
  {
    name: 'Departments',
    icon: <Package strokeWidth={1} size={16} />,
    children: [
      {
        path: '/departments/add',
        name: 'Add New Department'
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
        path: '/designation/view',
        name: 'View School Designation'
      }
    ]
  },
  {
    name: "Section",
    icon: <Box strokeWidth={1} size={16} />,
    children: [
      {
        path: '/section/add',
        name: 'Add New Section'
      },
      {
        path: '/section/view',
        name: 'View Sections'
      },
    ]
  },
  {
    name: 'Class',
    icon: <Layers strokeWidth={1} size={16} />,
    children: [
      {
        path: '/classes/add',
        name: 'Add New Class'
      },
      {
        path: '/classes/view',
        name: 'View Class'
      }
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
        path: '/students/view',
        name: 'View Students'
      },
      {
        path: '/students/form',
        name: ' Student Form'
      },
    ]
  },
  {
    name: 'SMS',
    icon: <MessageSquare strokeWidth={1} size={16} />,
    children: [
      {
        path: '/store/add',
        name: 'Add New Arm'
      },
      {
        path: '/store/edit',
        name: 'Edit Store'
      },
      {
        path: '/store/permission',
        name: 'Change Sta Permissions'
      }
    ]
  },
  {
    name: 'Store',
    icon: <ShoppingBag strokeWidth={1} size={16} />,
    children: [
      {
        path: '/store/add',
        name: 'Add New Store'
      },
      {
        path: '/store/edit',
        name: 'Edit Store'
      },
      {
        path: '/store/permission',
        name: 'Change Sta Permissions'
      }
    ]
  },
  {
    name: 'Result',
    icon: <FileText strokeWidth={1} size={16} />,
    children: [
      {
        path: '/store/add',
        name: 'Add New Store'
      },
      {
        path: '/store/edit',
        name: 'Edit Store'
      },
      {
        path: '/store/permission',
        name: 'Change Sta Permissions'
      }
    ]
  },
  {
    name: 'Fee Payment',
    icon: <DollarSign strokeWidth={1} size={16} />,
    children: [
      {
        path: '/store/add',
        name: 'Add New Store'
      },
      {
        path: '/store/edit',
        name: 'Edit Store'
      },
      {
        path: '/store/permission',
        name: 'Change Sta Permissions'
      }
    ]
  },
  {
    name: 'Computer base test',
    icon: <Monitor strokeWidth={1} size={16} />,
    children: [
      {
        path: '/store/add',
        name: 'Add New Store'
      },
      {
        path: '/store/edit',
        name: 'Edit Store'
      },
      {
        path: '/store/permission',
        name: 'Change Sta Permissions'
      }
    ]
  },
  {
    name: 'School Setting',
    icon: <Settings strokeWidth={1} size={16} />,
    children: [
      {
        path: '/store/add',
        name: 'Add New Store'
      },
      {
        path: '/store/edit',
        name: 'Edit Store'
      },
      {
        path: '/store/permission',
        name: 'Change Sta Permissions'
      }
    ]
  },
  {
    name: "Apps",
    icon: <Smartphone strokeWidth={1} size={16} />,
    children: [
      {
        path: '/apps/calendar',
        name: 'Calendar'
      },
      {
        path: '/apps/messages',
        name: 'Messages'
      },
      {
        path: '/apps/chat',
        name: 'Chat'
      },
    ]
  },
];
