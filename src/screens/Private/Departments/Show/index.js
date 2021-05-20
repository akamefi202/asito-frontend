import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Roles from "./Roles";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { ClientQueries, SiteQueries } from "shared/graphql/queries";
import { get } from "lodash";
import {USER_ROLES} from "shared/constants/userRoles";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import { messages } from "utils/helpers/message";

const { CLIENT } = ClientQueries;
const { SITES } = SiteQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "ROLES", href: "roles" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.DEPARTMENTS);
  const [skipSites, setSkipSites] = useState(0);
  const [totalSites, setTotalSites] = useState(0);
  const [takeSites, setTakeSites] = useState(5);

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variables = { where: { id } };
  const variablesSites = { where: { client: { id } }, skip: skipSites, take: takeSites };

  const { data, loading, error } = useQuery(CLIENT, { variables });
  const { data: dataSites, loading: loadingSites, error: errorSites } = useQuery(SITES, {
    variables: variablesSites,
    onCompleted: ({ sites }) => setTotalSites(sites.count || 0)
  });

  if (error || errorSites) messages({ data: error });

  const department = get(data, "client", {}) || {};
  const sites = get(dataSites, "sites.data", []) || [];

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
        <Spin spinning={loading || loadingSites}>
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} department={department} />
              </section>
              <section id="roles">
                <Roles t={t}
                  sites={sites}
                  take={takeSites}
                  setTake={setTakeSites}
                  setSkip={setSkipSites}
                  total={totalSites} />
              </section>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};
