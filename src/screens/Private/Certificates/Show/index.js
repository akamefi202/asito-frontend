import React from "react";
import { useHistory, useParams } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import IssuerInformation from "./IssuerInformation";
import Attachments from "./Attachments";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { AttachmentQueries, CertificateQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";
import { USER_ROLES } from "shared/constants/userRoles";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { ISSUERS } from "shared/graphql/queries/issuer";

const { CERTIFICATE } = CertificateQueries;
const { ATTACHMENTS } = AttachmentQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "ISSUER_INFORMATION", href: "issuer" },
  { key: "ATTACHMENTS", href: "attachments" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.CERTIFICATES);
  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const { data, loading, error } = useQuery(CERTIFICATE, {
    variables: { where: { id } },
    onError: (error) => messages({ data: error })
  });

  const { data: dataAttachments, loading: loadingAttachments, error: errorAttachments } = useQuery(ATTACHMENTS, {
    variables: { where: { certificate: { id } } },
    onError: (error) => messages({ data: error })
  });

  const { data: issuersData, loading: issuersLoading, error: issuersError } = useQuery(ISSUERS);

  if (error || errorAttachments || issuersError) messages({ data: error || errorAttachments });

  const certificate = get(data, "certificate", {}) || {};
  const attachments = get(dataAttachments, "attachments.data", []) || [];
  const issuers = get(issuersData, "issuers.data", []) || [];

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => ({ ...item, title: t(`SHOW.MENU.${item.key}`) }));
  };

  const editCertificate = () => history.push(PATHS.CERTIFICATES.EDIT.replace(":id", id));

  const setBreadcrumbsButtons = [
    {
      title: t("EDIT_CERTIFICATE"),
      disabled: false,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
      action: editCertificate,
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("CERTIFICATES"),
      className: "custom--breadcrumb--one",
      href: PATHS.CERTIFICATES.INDEX,
    },
    { title: certificate.number, className: "custom--breadcrumb--two" },
  ];

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || (userRole === USER_ROLES.TEST.key))

  return (
    <div className="wrapper--content">
      <Spin spinning={loading || loadingAttachments || issuersLoading}>
        <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []} />
        <div className="details--page">
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} certificate={certificate} issuers={issuers} />
              </section>
              <section id="issuer">
                <IssuerInformation t={t} certificate={certificate} issuers={issuers} />
              </section>
              <section id="attachments">
                <Attachments t={t} attachments={attachments} />
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
