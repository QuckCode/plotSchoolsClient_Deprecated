import { Activity, Gitlab, Pocket, Server } from 'react-feather';

export default [
  {
    icon: <Pocket size={64} strokeWidth={0.5} />,
    title: 'Basic Licence',
    subtitle: 'Basic account',
    description:
      'Perfect for  plan for new schools with less than 100 users',
    price: 0,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '100 user'
      },
      {
        title: 'Basic '
      }
    ]
  },
  {
    icon: <Server size={64} strokeWidth={0.5} />,
    title: 'Basic License',
    subtitle: 'Freelancer',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 100,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '2 users'
      },
      {
        title: 'Analytics'
      }
    ]
  },
  {
    icon: <Activity size={64} strokeWidth={0.5} />,
    title: 'Managed License',
    subtitle: 'Small business',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 5,
    features: [
      {
        title: 'Secure'
      },
      {
        title: '3 users'
      },
      {
        title: 'Analytics'
      }
    ]
  },
  {
    icon: <Gitlab size={64} strokeWidth={0.5} />,
    title: 'Extended License',
    subtitle: 'Corporate',
    description:
      'Perfect for small startups that have less than 10 team members',
    price: 10,
    features: [
      {
        title: 'Secure'
      },
      {
        title: 'Unlimited'
      },
      {
        title: 'Analytics'
      }
    ]
  }
];
