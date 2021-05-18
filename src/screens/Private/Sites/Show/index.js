import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import LocationInformation from "./LocationInformation";
import Requirements from "./Requirements";
import Operators from "./Operators";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { SiteQueries } from "shared/graphql/queries";
import { get } from "lodash";
import {USER_ROLES} from "shared/constants/userRoles";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import { messages } from "utils/helpers/message";

const { SITE } = SiteQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "LOCATION_INFORMATION", href: "location" },
  { key: "REQUIREMENTS", href: "requirements" },
  { key: "OPERATORS", href: "operators" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const [site, setSite] = useState({});
  const [totalOperatorSites, setTotalOperatorSites] = useState(0);
  const { t } = useTranslation(NAME_SPACES.ROLES);

  const { loading } = useQuery(SITE, {
    variables: {
      where: {
        id
      }
    },
    onCompleted: ({ site }) => {
      site && setSite(site);
    },
    onError: (error) => {
      messages({ data: error });
    }
  });

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      let quantity = "";
      if (site) {
        if (item.key === "REQUIREMENTS" && site.requirements) {
          quantity = ` (${site.requirements.length})`;
        }
        if (item.key === "OPERATORS" && site.operatorSites) {
          quantity = ` (${totalOperatorSites}/${site.numberOfOperatorsRequired})`;
        }
        return { ...item, title: t(`SHOW.MENU.${item.key}`) + quantity };
      }
    });
  };

  const editSites = () => {
    history.push(PATHS.ROLES.EDIT.replace(":id", id));
  };

  const setBreadcrumbsButtons = [
    {
      title: t("EDIT_SITE"),
      disabled: false,
      action: editSites,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("SITES"),
      className: "custom--breadcrumb--one",
      href: PATHS.ROLES.INDEX,
    },
    { title: site.name, className: "custom--breadcrumb--two" },
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
                <GeneralInformation t={t} site={site} />
              </section>
              <section id="location">
                <LocationInformation t={t} site={site} />
              </section>
              <section id="requirements">
                <Requirements t={t} site={site} />
              </section>
              <section id="operators">
                <Operators siteId={id} t={t} site={site} total={totalOperatorSites} setTotal={setTotalOperatorSites}/>
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
