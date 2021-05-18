import { Layout, Menu } from "antd";
import {
  LogoutOutlined,
  BellOutlined
} from "@ant-design/icons";
import { FiUsers } from "react-icons/fi";
import { BsBuilding, BsBell } from "react-icons/bs";
import { BiSitemap } from "react-icons/bi";
import { AiOutlineSafetyCertificate, AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";

import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { useWindowSize } from "utils/hooks/resize";
import Logo from "../../assets/images/Logo-.svg"

const { Sider } = Layout;

export default () => {
  const menus = [
    {
      title: "Operators",
      url: PATHS.HOME,
      key: "home",
      icon: FiUsers,
      type: "simple",
    },
    {
      title: "Certificates",
      url: PATHS.CERTIFICATES.INDEX,
      key: "certificates",
      icon: AiOutlineSafetyCertificate,
      type: "simple",
    },
    {
      title: "Clients",
      url: PATHS.CLIENTS.INDEX,
      key: "clients",
      icon: BsBuilding,
      type: "simple",
    },
    {
      title: "Sites",
      url: PATHS.SITES.INDEX,
      key: "sites",
      icon: BiSitemap,
      type: "simple",
    },
  ];
  const [_, height] = useWindowSize();
  return (

    <Sider
      className="main--sider"
      breakpoint="lg"
      collapsedWidth="0"
      onBreakpoint={broken => {
        console.log(broken);
      }}
      onCollapse={(collapsed, type) => {
        console.log(collapsed, type);
      }}
      width={220}
      defaultCollapsed={false}
    >
      <div className="main--sider--top">
        <div className="main--sider--top--logo">
          <img src={Logo} alt={'Mammoet'} />
        </div>
        <div className="main--sider--top--links">
          <ul>
            <li> <Link to={'/'}>Arjan de Groot</Link></li>
            <li> <Link to={'/'}>Mammoet</Link></li>
          </ul>
        </div>
      </div>

      <div className="main--sider--notifications">
        <Link to={''}>
          <BsBell />
          <div className="main--sider--notifications--text">
            <span className="txt">Notifications </span>
            <span className="main--sider--notifications--count">0</span>
          </div>
        </Link>
      </div>


      <Menu
        className={"main--sider--menu"}
        theme="light"
        mode="inline"
        defaultSelectedKeys={['4']}
      >

        {menus.map(({ icon: Icon, key, url, title, onClick }) => (
          <Menu.Item key={key} onClick={onClick} className="item--li">
            <Link to={url} className="main--sider--menu--item">
              <span className="icon"><Icon /></span>
              <span>{title}</span>
            </Link>
          </Menu.Item>
        ))}


        <Menu.Item
          key="settings"
          className="main--sider--menu--item main--sider--middel"
        >
          <a
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
            className="main--sider--menu--item"
          >
            <span className="icon"><AiOutlineLogout /></span>
            <span>Logout</span>
          </a>

        </Menu.Item>
      </Menu>

      <div className="main--sider--setting">
        <Link to={''}>
          <AiOutlineSetting />
          <div className="main--sider--setting--text">
            <span className="txt">Preferences </span>
          </div>
        </Link>
      </div>

      <div className="main--sider--logout">
          <a
            onClick={() => {
              window.localStorage.clear();
              window.location.reload();
            }}
            className="main--sider--menu--item"
          >
            <AiOutlineLogout />
            <div className="main--sider--setting--text">
            <span className="txt">Logout </span>
          </div>
          </a>
      </div>
    </Sider>

  );
};
