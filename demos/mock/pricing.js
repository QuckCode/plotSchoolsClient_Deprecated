import { Activity, Gitlab, Pocket, Server } from "react-feather";

export default [
   {
      icon: <Pocket size={64} strokeWidth={0.5} />,
      title: "Basic License",
      subtitle: "Basic account",
      description:
         "Perfect for  plan for new schools with less than 400 Student",
      price: 0,
      features: [
         {
            title: "400 Students",
         },
         {
            title: "30 Staff ",
         },
         {
            title: "Result Calculation",
         },
      ],
   },
   {
      icon: <Server size={64} strokeWidth={0.5} />,
      title: "Standard License",
      subtitle: "Standard License",
      description:
         "Perfect for  plan for new schools with less than 2000 Student",
      price: 100000,
      features: [
         {
            title: "2000 Students",
         },
         {
            title: "100 Staff",
         },
         {
            title: "Fully Featured",
         },
      ],
   },
   {
      icon: <Gitlab size={64} strokeWidth={0.5} />,
      title: "Extended License",
      subtitle: "Cooperate",
      description: "Perfect for large schools ",
      price: 200000,
      features: [
         {
            title: "Unlimited Students",
         },
         {
            title: "Unlimited Staffs",
         },
         {
            title: "Fully Featured",
         },
      ],
   },
];
