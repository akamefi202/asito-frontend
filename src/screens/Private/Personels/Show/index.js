import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import Roles from "./Roles";
import GeneralInformation from "./GeneralInformation";
import ContactInformation from "./ContactInformation";
import Certificates from "./Certificates";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { OperatorQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { USER_ROLES } from "shared/constants/userRoles";
import { messages } from "utils/helpers/message";

const { OPERATOR } = OperatorQueries;

const menuItems = [
  { key: "ROLES", href: "roles" },
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "CONTACT_INFORMATION", href: "contact" },
  { key: "CERTIFICATES", href: "certificates" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.PERSONNELS);

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;


  const { data, loading } = useQuery(OPERATOR, {
    variables: { where: { id } },
    onError: (error) => messages({ data: error })
  });

  const personel = get(data, "operator", {}) || {};
  const roles = get(data, "operator.operatorSites", []) || [];
  const certificates = get(data, "operator.certificates", []) || [];

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      return { ...item, title: t(`SHOW.MENU.${item.key}`) };
    });
  };

  const editOperators = () => {
    history.push(PATHS.PERSONNELS.EDIT.replace(":id", id));
  };

  const setBreadcrumbsButtons = [
    {
      title: t("EDIT"),
      disabled: false,
      action: editOperators,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("PERSONNELS"),
      className: "custom--breadcrumb--one",
      href: PATHS.PERSONNELS.INDEX,
    },
    {
      title: `${personel.firstName} ${personel.lastName}`,
      className: "custom--breadcrumb--two"
    },
  ];

  const isAccess = () => userRole && ((userRole === USER_ROLES.PLANER.key) || (userRole === USER_ROLES.TEST.key));

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
              <section id="roles">
                <Roles t={t} roles={roles} />
              </section>
              <section id="general">
                <GeneralInformation t={t} personel={personel} />
              </section>
              <section id="contact">
                <ContactInformation t={t} personel={personel} />
              </section>
              <section id="certificates">
                <Certificates t={t} certificates={certificates} />
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
