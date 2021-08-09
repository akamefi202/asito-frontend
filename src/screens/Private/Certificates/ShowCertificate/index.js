import React from "react";
import {useParams} from "react-router-dom";
import {Row, Col} from "antd";
import {Header, ScrollMenu, Spin} from "shared/components";
import GeneralInformation from "./GeneralInformation";
import IssuerInformation from "./IssuerInformation";
import Attachments from "./Attachments";
import {NAME_SPACES} from "shared/locales/constants";
import {useTranslation} from "react-i18next";
import {PATHS} from "utils/constants";
import {useQuery} from "@apollo/react-hooks";
import {AttachmentQueries, CertificateQueries} from "shared/graphql/queries";
import {get} from "lodash";
import {messages} from "utils/helpers/message";

const {CERTIFICATE} = CertificateQueries;
const {ATTACHMENTS} = AttachmentQueries;

const menuItems = [
  {key: "GENERAL_INFORMATION", href: "general"},
  {key: "ISSUER_INFORMATION", href: "issuer"},
  {key: "ATTACHMENTS", href: "attachments"},
];

export const ShowCertificate = () => {
  const {id} = useParams();
  const {t} = useTranslation(NAME_SPACES.CERTIFICATES);

  const {data, loading} = useQuery(CERTIFICATE, {
    variables: {where: {id}},
    onError: (error) => messages({data: error})
  });

  const {data: dataAttachments, loading: loadingAttachments} = useQuery(ATTACHMENTS, {
    variables: {where: {certificate: {id}}},
    onError: (error) => messages({data: error})
  });

  const certificate = get(data, "certificate", {}) || {};
  const attachments = get(dataAttachments, "attachments.data", []) || [];

  const getScrollMenuItem = () => menuItems.map((item) => ({...item, title: t(`SHOW.MENU.${item.key}`)}));

  const setBreadcrumbsItem = [
    {title: t('CERTIFICATES'), className: 'custom--breadcrumb--one', href: PATHS.CERTIFICATES.INDEX},
    {title: certificate.number, className: 'custom--breadcrumb--two'}
  ];

  return (
    <div className="wrapper--content">
      <Spin spinning={loading || loadingAttachments}>
        <Header items={setBreadcrumbsItem}/>
        <div className="details--page">
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)}/>
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} certificate={certificate}/>
              </section>
              <section id="issuer">
                <IssuerInformation t={t} certificate={certificate}/>
              </section>
              <section id="attachments">
                <Attachments t={t} attachments={attachments}/>
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
