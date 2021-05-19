/* eslint-disable */
import React from "react";
import { Layout } from "antd";
import { PATHS } from "utils/constants";
import { FiUsers } from "react-icons/fi";
import { BsBuilding } from "react-icons/bs";
import { AiOutlineIdcard, AiOutlineSafetyCertificate } from "react-icons/ai";

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
        topics: 1,
        url: PATHS.OPERATORS.INDEX,
        key: "Operators",
        icon: <FiUsers className="icon" />,
        type: "simple",
    },
    {
        title: "CERTIFICATES",
        topics: 1,
        url: PATHS.CERTIFICATES.INDEX,
        key: "certificates",
        icon: <AiOutlineSafetyCertificate className="icon" />,
        type: "simple",
    },
    {
        title: "DEPARTAMENTS",
        topics: 1,
        url: PATHS.DEPARTAMENTS.INDEX,
        key: "departments",
        icon: <span className="icon icon-Office" />,
        type: "simple",
    },
    {
        title: "ROLES",
        topics: 1,
        url: PATHS.ROLES.INDEX,
        key: "roles",
        icon: <AiOutlineIdcard className="icon" />,
        type: "simple",
    },
    {
      title: "MYCOMPANY",
      topics: 2,
      url: PATHS.MYCOMPANY.INDEX,
      key: "mycompany",
      icon: <span className="icon icon-Office" />,
      type: "simple",
    },
    {
      title: "PREFERENCES",
      topics: 2,
      url: PATHS.PREFERENCES,
      key: "preferences",
      icon: <span className="icon icon-Settings" />,
      type: "simple",
  },
];

export default ({ component }) => {
  const WrappedComponent = component;
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const getMenu = () => {
    return user && USER_ROLES[userRole]
        ? menus.filter(item => USER_ROLES[userRole].access.some(route => route === item.url))
        : [];
  }

  const Menu = (
    <TopicMenu
      topics={getMenu()}
    />
  );

  return (props) => {
    return (
      <Layout className="container--layout">
        <NavBar menu={Menu} />
        <SideBar menu={Menu} />
        <Content className="container--antd">
          <WrappedComponent {...props} />
        </Content>
      </Layout>
    );
  };
};
