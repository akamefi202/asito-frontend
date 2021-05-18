import React from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { UserQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";
import {USER_ROLES} from "shared/constants/userRoles";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";

const { USER } = UserQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
];

export default () => {
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.MYCOMPANY);
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const { data, loading, error } = useQuery(USER);

  if (error) messages({data: error});

  const issuer = get(data, "user.issuer", {}) || {};

  const getScrollMenuItem = (t) => {
    return menuItems.map(item => ({...item, title: t(`SHOW.MENU.${item.key}`)}));
  };

  const editIssuer = () => history.push(PATHS.MYCOMPANY.EDIT);

  const setBreadcrumbsButtons = [
    {
      title: t("EDIT_DETAILS"),
      disabled: false,
      action: editIssuer,
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("MYCOMPANY"),
      className: "custom--breadcrumb--one",
      href: PATHS.MYCOMPANY.INDEX,
    },
  ];

  const isAccess = () => userRole && ((userRole === USER_ROLES.ISSUER.key) || ( userRole === USER_ROLES.TEST.key))

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />
      <div className="details--page">
        <Spin spinning={loading}>
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} issuer={issuer} modeRole={isAccess()} />
              </section>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};
