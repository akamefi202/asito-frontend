import React from "react";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import AccountInformation from "./AccountInformation";
import ChangePassword from "./ChangePassword";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { useQuery } from "@apollo/react-hooks";
import { UserQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";

const { USER } = UserQueries;

const menuItems = [
  { key: "ACCOUNT_INFORMATION", href: "account" },
  { key: "CHANGE_PASSWORD", href: "changePassword" },
];

export default () => {
  const { t } = useTranslation(NAME_SPACES.PREFERENCES);

  const { data, loading, error } = useQuery(USER);

  if (error) messages({data: error});

  const user = get(data, "user", {});

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => ({...item, title: t(`FORM.MENU.${item.key}`)}));
  };

  const setBreadcrumbsItem = [
    {
      title: t("PREFERENCES"),
      className: "heading--area--title",
    }
  ];

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} />

      <div className="details--page">
        <Spin spinning={loading}>
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="account">
                <AccountInformation t={t} user={user} />
              </section>
              <section id="changePassword">
                <ChangePassword t={t} user={user} />
              </section>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};
