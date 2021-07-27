import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Departments from "./Departments";
import Protocols from "./Protocols";
import RequiredCertificates from "./RequiredCertificates";
import Employees from "./Employees";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { RoleQueries } from "shared/graphql/queries";
import { get } from "lodash";
import {USER_ROLES} from "shared/constants/userRoles";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import { messages } from "utils/helpers/message";

const { ROLE } = RoleQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "DEPARTAMENT", href: "departments" },
  { key: "REQUIREMENTS", href: "requirements" },
  { key: "PROTOCOLS", href: "protocols" },
  { key: "EMPLOYEES", href: "employees" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.ROLES);

  const { data, loading } = useQuery(ROLE, {
    variables: {where: {id}},
    onError: (error) => messages({ data: error })
  });

  const role = get(data, "role", {}) || {};
  const departments = get(data, "role.departments", []) || [];
  const protocols = get(data, "role.protocols", []) || [];

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const getScrollMenuItem = (t) => {
    return menuItems.map(item => ({ ...item, title: t(`SHOW.MENU.${item.key}`)}));
  };

  const edit = () => {
    history.push(PATHS.ROLES.EDIT.replace(":id", id));
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
      title: t("ROLES"),
      className: "custom--breadcrumb--one",
      href: PATHS.ROLES.INDEX,
    },
    { title: role.name, className: "custom--breadcrumb--two" },
  ];

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || ( userRole === USER_ROLES.TEST.key));

  return (
    <div className="wrapper--content">
      <Spin spinning={loading}>
        <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []} />
        <div className="details--page">
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} role={role} />
              </section>
              <section id="departments">
                <Departments t={t} departments={departments} />
              </section>
              <section id="requirements">
                <RequiredCertificates t={t} role={role} />
              </section>
              <section id="protocols">
                <Protocols t={t} protocols={protocols} />
              </section>
              <section id="employees">
                <Employees t={t} roleId={id} role={role} />
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
