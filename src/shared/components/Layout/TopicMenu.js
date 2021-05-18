import React, { useEffect, useState } from "react";
import { Menu } from "antd";
import Logo from "shared/assets/images/Logo.svg";
import { Link } from "react-router-dom";
import { BsBell } from "react-icons/bs";
import { AiOutlineLogout, AiOutlineSetting } from "react-icons/ai";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import {useLazyQuery, useSubscription} from "@apollo/react-hooks";
import {NotificationQueries} from "../../graphql/queries";

const {SUBSCRIBE_NOTIFICATION, NOTIFICATIONS} = NotificationQueries;

const TopicMenu = ({ topics, selectedKey }) => {
  const { t } = useTranslation(NAME_SPACES.NAV_BAR);
  const history = useHistory();
  const [activeLink, setActiveLink] = useState("");
  const user = useReactiveVar(UserStore);
  const element = document.getElementById('counter-id');
  const [count, setCount] = useState(0);

  const [getNotification] = useLazyQuery(NOTIFICATIONS, {
    variables: {where: {read: false}},
    onCompleted: ({notifications}) => setCount(notifications.count)
  });

  useSubscription(SUBSCRIBE_NOTIFICATION, {
    variables: {where: {}},
    onSubscriptionData: () => getNotification()
  });

  useEffect(() => {
    const oldCounter = element && element.innerText ? parseInt(element.innerText, 10) : 0;
    if (oldCounter === 0) getNotification();
    else setCount(oldCounter);
    const activeLink = history.location.pathname.substr(1).split("/")[0];
    setActiveLink(activeLink);
  }, []);

  const activeClassLink = (url) => activeLink === url.replace("/", "") ? "active" : "";

  const menus = topics.map(({ icon: Icon, key, url, title, onClick }) => (
    <Menu.Item key={key} onClick={onClick} className={`item--li ${activeClassLink(url)}`}>
      <Link to={url} className="main--sider--menu--item">
        <span className="icon">
          <Icon />
        </span>
        <span>{t(title)}</span>
      </Link>
    </Menu.Item>
  ));

  return (
    <div className="topic--menu">
      <div className="main--sider--top">
        <div className="main--sider--top--logo">
          <img src={Logo} alt={"Mammoet"} />
        </div>
        <div className="main--sider--top--links">
          <ul>
            <li>
              {" "}
              <Link to={PATHS.HOME}>{user && `${user.firstName} ${user.lastName}`}</Link>
            </li>
            <li>
              {" "}
              <Link to={PATHS.HOME}>{user && user.issuer && user.issuer.name}</Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="topic--menu--scroll">
        <div className="main--sider--notifications">
          <Link
            to={PATHS.NOTIFICATIONS.INDEX}
            className={activeClassLink(PATHS.NOTIFICATIONS.INDEX)}
          >
            <BsBell />
            <div className="main--sider--notifications--text">
              <span className="txt">{t("NOTIFICATIONS")}</span>
              {count !== 0 && <span id={'counter-id'} className="main--sider--notifications--count">{count}</span>}
            </div>
          </Link>
        </div>

        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          className={"main--sider--menu"}
        >
          {menus}
        </Menu>

        <div className="main--sider--setting">
          <Link to={PATHS.PREFERENCES} className={activeClassLink(PATHS.PREFERENCES)}>
            <AiOutlineSetting />
            <div className="main--sider--setting--text">
              <span className="txt">{t("PREFERENCES")}</span>
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
              <span className="txt">{t("LOGOUT")}</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopicMenu;
