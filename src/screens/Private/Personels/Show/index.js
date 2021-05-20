import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import DataAccess from "./DataAccess";
import GeneralInformation from "./GeneralInformation";
import ContactInformation from "./ContactInformation";
import Certificates from "./Certificates";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useLazyQuery } from "@apollo/react-hooks";
import { AccessQueries, CertificateQueries, OperatorQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";

const { OPERATOR } = OperatorQueries;
const { CERTIFICATES } = CertificateQueries;
const { ACCESSES } = AccessQueries;

const menuItems = [
  { key: "DATA_ACCESS", href: "dataAccess" },
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "CONTACT_INFORMATION", href: "contact" },
  { key: "CERTIFICATES", href: "certificates" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.PERSONNELS);
  const [skipAccess, setSkipAccess] = useState(0);
  const [totalAccess, setTotalAccess] = useState(0);
  const [takeAccess, setTakeAccess] = useState(5);
  const [skipCertificates, setSkipCertificates] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [takeCertificates, setTakeCertificates] = useState(5);

  const variablesAccess = { where: { operator: { id } }, skip: skipAccess, take: takeAccess };
  const variablesCertificates = { where: { operator: { id } }, skip: skipCertificates, take: takeCertificates };

  const [requestOperator, { data, loading }] = useLazyQuery(OPERATOR, {
    variables: { where: { id } },
    onError: (error) => messages({ data: error })
  });

  const [requestAccesses, { data: dataAccesses, loading: loadingAccesses }] = useLazyQuery(ACCESSES, {
    variables: variablesAccess,
    onCompleted: ({ accesses }) => setTotalAccess(accesses.count || 0),
    onError: (error) => messages({ data: error })
  });

  const [requestCertificates, { data: dataCertificates, loading: loadingCertificates }] = useLazyQuery(CERTIFICATES, {
    variables: variablesCertificates,
    onCompleted: ({ certificates }) => setTotalCertificates(certificates.count || 0),
    onError: (error) => messages({ data: error })
  });

  useEffect(() => {
    requestOperator();
    requestAccesses();
    requestCertificates();
  }, [])

  const personel = get(data, "operator", {}) || {};
  const accesses = get(dataAccesses, "accesses.data", []) || [];
  const certificates = get(dataCertificates, "certificates.data", []) || [];

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

  return (
    <div className="wrapper--content">
      <Spin spinning={loading}>
        <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />
        <div className="details--page">
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="dataAccess">
                <DataAccess t={t}
                  loading={!loading && loadingAccesses}
                  accesses={accesses}
                  take={takeAccess}
                  setTake={setTakeAccess}
                  setSkip={setSkipAccess}
                  total={totalAccess} />
              </section>
              <section id="general">
                <GeneralInformation t={t} personel={personel} />
              </section>
              <section id="contact">
                <ContactInformation t={t} personel={personel} />
              </section>
              <section id="certificates">
                <Certificates t={t}
                  loading={!loading && loadingCertificates}
                  certificates={certificates}
                  take={takeCertificates}
                  setTake={setTakeCertificates}
                  setSkip={setSkipCertificates}
                  total={totalCertificates} />
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
