import React, {useState} from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Sites from "./Sites";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import {ClientQueries, SiteQueries} from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";

const { CLIENT } = ClientQueries;
const { SITES } = SiteQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "SITES", href: "sites" },
];

export default () => {
  const { id } = useParams();
  const { t } = useTranslation(NAME_SPACES.CLIENTS);
  const [skipSites, setSkipSites] = useState(0);
  const [totalSites, setTotalSites] = useState(0);
  const [takeSites, setTakeSites] = useState(5);

  const variables = {where: {id}};
  const variablesSites = {where: {client: {id}}, skip: skipSites, take: takeSites};

  const {data, loading, error} = useQuery(CLIENT, {variables});
  const {data: dataSites, loading: loadingSites, error: errorSites} = useQuery(SITES, {
    variables: variablesSites,
    onCompleted: ({sites}) => setTotalSites(sites.count || 0)
  });

  if (error || errorSites) messages({data: error});

  const client = get(data, "client", {}) || {};
  const sites = get(dataSites, "sites.data", []) || [];

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      let quantity = "";
      if (client && item.key === "SITES") quantity = ` (${totalSites})`;
      return { ...item, title: t(`SHOW.MENU.${item.key}`) + quantity };
    });
  };

  const setBreadcrumbsItem = [
    {
      title: t("CLIENTS"),
      className: "custom--breadcrumb--one",
      href: PATHS.CLIENTS.INDEX,
    },
    { title: client.name, className: "custom--breadcrumb--two" },
  ];

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem}/>
      <div className="details--page">
        <Spin spinning={loading || loadingSites}>
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} client={client} />
              </section>
              <section id="sites">
                <Sites t={t}
                       sites={sites}
                       take={takeSites}
                       setTake={setTakeSites}
                       setSkip={setSkipSites}
                       total={totalSites}/>
              </section>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};
