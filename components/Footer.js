import React from "react";
import { Layout } from "antd";
const { Footer } = Layout;

export default function AppFooter() {
   return (
      <Footer style={{ color: "white", background: "#000" }}>
         Plot School ©{new Date().getFullYear()} Created by Quantum Cube{" "}
      </Footer>
   );
}
