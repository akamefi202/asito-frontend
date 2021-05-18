import React from "react";
import { Layout } from "antd";
import "./style.css";
const SideBar = ({ menu }) => {
  return (
    <Layout.Sider
      className="main--sider"
      breakpoint={"lg"}
      theme="light"
      collapsedWidth={0}
      trigger={null}
      width={220}
    >
        {menu}
    </Layout.Sider>
  );
};

export default SideBar;