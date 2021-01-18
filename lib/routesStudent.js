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
    name: 'Store',
    icon: <ShoppingBag strokeWidth={1} size={16} />,
    path:"/store"
  },
];
