import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Roles from "./Roles";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { ClientQueries } from "shared/graphql/queries";
import { get } from "lodash";
import {USER_ROLES} from "shared/constants/userRoles";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import { messages } from "utils/helpers/message";

const { CLIENT } = ClientQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "ROLES", href: "roles" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.DEPARTMENTS);

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variables = { where: { id } };

  const { data, loading } = useQuery(CLIENT, {
    variables,
    onError: (error) => {
      messages({ data: error });
    }
  });

  const department = get(data, "client", {}) || {};
  const roles = get(data, "client.sites", []) || [];

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      return { ...item, title: t(`SHOW.MENU.${item.key}`) };
    });
  };

  const edit = () => {
    history.push(PATHS.DEPARTMENTS.EDIT.replace(":id", id));
  };

  const setBreadcrumbsButtons = [
    {
      title: t("EDIT"),
      disabled: false,
      action: edit,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("DEPARTMENTS"),
      className: "custom--breadcrumb--one",
      href: PATHS.DEPARTMENTS.INDEX,
    },
    { title: department.name, className: "custom--breadcrumb--two" },
  ];

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || ( userRole === USER_ROLES.TEST.key));

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []} />
      <div className="details--page">
        <Spin spinning={loading}>
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} department={department} />
              </section>
              <section id="roles">
                <Roles t={t} roles={roles} />
              </section>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};
