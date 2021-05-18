import React, {useState, useEffect} from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import DataAccess from "./DataAccess";
import GeneralInformation from "./GeneralInformation";
import ContactInformation from "./ContactInformation";
import Certificates from "./Certificates";
import AssignedSites from "./AssignedSites";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import {useLazyQuery} from "@apollo/react-hooks";
import {AccessQueries, CertificateQueries, OperatorQueries} from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";

const { OPERATOR } = OperatorQueries;
const { CERTIFICATES } = CertificateQueries;
const {ACCESSES} = AccessQueries;

const menuItems = [
  { key: "DATA_ACCESS", href: "dataAccess" },
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "CONTACT_INFORMATION", href: "contact" },
  { key: "CERTIFICATES", href: "certificates" },
  { key: "ASSIGNED_SITES", href: "assignedSites" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.OPERATORS);
  const [skipAccess, setSkipAccess] = useState(0);
  const [totalAccess, setTotalAccess] = useState(0);
  const [takeAccess, setTakeAccess] = useState(5);
  const [skipCertificates, setSkipCertificates] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [takeCertificates, setTakeCertificates] = useState(5);

  const variablesAccess = {where: {operator: {id}}, skip: skipAccess, take: takeAccess};
  const variablesCertificates = {where: {operator: {id}}, skip: skipCertificates, take: takeCertificates};

  const [requestOperator, {data, loading, error}] = useLazyQuery(OPERATOR, {variables: {where: {id}}});

  const [requestAccesses, {data: dataAccesses, loading: loadingAccesses, error: errorAccess}] = useLazyQuery(ACCESSES, {
    variables: variablesAccess,
    onCompleted: ({accesses}) => setTotalAccess(accesses.count || 0)
  });

  const [requestCertificates, {data: dataCertificates, loading: loadingCertificates, error: errorCertificates}] = useLazyQuery(CERTIFICATES, {
    variables: variablesCertificates,
    onCompleted: ({certificates}) =>  setTotalCertificates(certificates.count || 0)
  });

  useEffect(() => {
    requestOperator();
    requestAccesses();
    requestCertificates();
  }, [])

  if (error || errorAccess || errorCertificates) {
    messages({data: error || errorAccess});
  }

  const operator = get(data, "operator", {}) || {};
  const sites = get(data, "operator.operatorSites", []) || [];
  const accesses = get(dataAccesses, "accesses.data", []) || [];
  const certificates = get(dataCertificates, "certificates.data", []) || [];

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      let quantity = "";
      if (operator) {
        if (item.key === "DATA_ACCESS") quantity = ` (${totalAccess})`;
        if (item.key === "CERTIFICATES") quantity = ` (${totalCertificates})`;
        if (item.key === "ASSIGNED_SITES") quantity = ` (${sites ? sites.length : 0})`;
      }
      return { ...item, title: t(`SHOW.MENU.${item.key}`) + quantity };
    });
  };

  const editOperators = () => {
    history.push(PATHS.OPERATORS.EDIT.replace(":id", id));
  };

  const setBreadcrumbsButtons = [
    {
      title: t("EDIT_OPERATOR"),
      disabled: false,
      action: editOperators,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("OPERATORS"),
      className: "custom--breadcrumb--one",
      href: PATHS.OPERATORS.INDEX,
    },
    {
      title: `${operator.firstName} ${operator.lastName}`,
      className: "custom--breadcrumb--two"
    },
  ];

  return (
    <div className="wrapper--content">
      <Spin spinning={loading || loadingAccesses || loadingCertificates}>
        <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />
        <div className="details--page">
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="dataAccess">
                <DataAccess t={t}
                            accesses={accesses}
                            take={takeAccess}
                            setTake={setTakeAccess}
                            setSkip={setSkipAccess}
                            total={totalAccess}/>
              </section>
              <section id="general">
                <GeneralInformation t={t} operator={operator} />
              </section>
              <section id="contact">
                <ContactInformation t={t} operator={operator} />
              </section>
              <section id="certificates">
                <Certificates t={t}
                              certificates={certificates}
                              take={takeCertificates}
                              setTake={setTakeCertificates}
                              setSkip={setSkipCertificates}
                              total={totalCertificates}/>
              </section>
              <section id="assignedSites">
                <AssignedSites t={t}
                               sites={sites}
                               total={sites.length || 0}/>
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
