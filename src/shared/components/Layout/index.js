/* eslint-disable */
import React, { useState } from "react";
import { Layout } from "antd";
import { PATHS } from "utils/constants";
import { FiUsers } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { BiSitemap } from "react-icons/bi";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { ImOffice } from "react-icons/im";

import NavBar from "./NavBar";
import SideBar from "./SideBar";
import TopicMenu from "./TopicMenu";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "../../store/UserStore";
import {USER_ROLES} from "../../constants/userRoles";

const { Content } = Layout;

const menus = [
    {
        title: "OPERATORS",
        url: PATHS.OPERATORS.INDEX,
        key: "Operators",
        icon: FiUsers,
        type: "simple",
    },
    {
        title: "CERTIFICATES",
        url: PATHS.CERTIFICATES.INDEX,
        key: "certificates",
        icon: AiOutlineSafetyCertificate,
        type: "simple",
    },
    {
        title: "CLIENTS",
        url: PATHS.CLIENTS.INDEX,
        key: "clients",
        icon: BsBuilding,
        type: "simple",
    },
    {
        title: "SITES",
        url: PATHS.SITES.INDEX,
        key: "sites",
        icon: BiSitemap,
        type: "simple",
    },
    {
        title: "MYCOMPANY",
        url: PATHS.MYCOMPANY.INDEX,
        key: "mycompany",
        icon: ImOffice,
        type: "simple",
    },
];

export default ({ component }) => {
  const WrappedComponent = component;
  const topics = ["ONE", "Second ", "Third "];
  const [contentIndex, setContentIndex] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const changeSelectedKey = (event) => {
    const key = event.key;
    setSelectedKey(key);
    setContentIndex(+key);
  };

  const getMenu = () => {
    return user && USER_ROLES[userRole]
        ? menus.filter(item => USER_ROLES[userRole].access.some(route => route === item.url))
        : [];
  }

  const Menu = (
    <TopicMenu
      topics={getMenu()}
      selectedKey={selectedKey}
      changeSelectedKey={changeSelectedKey}
    />
  );

  return (props) => {
    return (
      <Layout className="container--layout">
        {/* <Sider /> */}
        <NavBar menu={Menu} />
        <SideBar menu={Menu} />
        <Content className="container--antd">
          <WrappedComponent {...props} />
        </Content>
      </Layout>
    );
  };
};
