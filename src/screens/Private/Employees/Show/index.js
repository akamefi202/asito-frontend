import React, { useState, useEffect } from "react";
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
import { useQuery, useLazyQuery} from "@apollo/react-hooks";
import { EmployeeQueries, CertificateQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { USER_ROLES } from "shared/constants/userRoles";
import { messages } from "utils/helpers/message";
import { QrcodeOutlined } from "@ant-design/icons";
import SignUpModal from "../../../Public/Auth/SignIn/Form/signUpModal";
import QRCodeModal from "./QRCodeModal";

const { EMPLOYEE } = EmployeeQueries;
const { CERTIFICATES } = CertificateQueries;

const menuItems = [
  { key: "ROLES", href: "roles" },
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "CONTACT_INFORMATION", href: "contact" },
  { key: "CERTIFICATES", href: "certificates" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.EMPLOYEES);
  const [qrCodeModalVisible, setQRCodeModalVisible] = useState(false);
  const [skipCertificates, setSkipCertificates] = useState(0);
  const [totalCertificates, setTotalCertificates] = useState(0);
  const [takeCertificates, setTakeCertificates] = useState(5);

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variablesCertificates = {where: {employee: {id}}, skip: skipCertificates, take: takeCertificates};

  const [requestCertificates, {data: dataCertificates, loading: loadingCertificates, error: errorCertificates}] = useLazyQuery(CERTIFICATES, {
    variables: variablesCertificates,
    onCompleted: ({certificates}) =>  setTotalCertificates(certificates.count || 0)
  });

  useEffect(() => {
    requestCertificates();
  }, [])

  if (errorCertificates) messages({data: errorCertificates})


  const { data, loading } = useQuery(EMPLOYEE, {
    variables: { where: { id } },
    onError: (error) => messages({ data: error })
  });

  const employee = get(data, "employee", {}) || {};
  const roles = get(data, "employee.employeeRoles", []) || [];
  const certificates = get(dataCertificates, "certificates.data", []) || [];

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      return { ...item, title: t(`SHOW.MENU.${item.key}`) };
    });
  };

  const edit = () => {
    history.push(PATHS.EMPLOYEES.EDIT.replace(":id", id));
  };

  const setBreadcrumbsButtons = [
    {
      title: t("SHOW_QR_CODE"),
      disabled: false,
      action: () => setQRCodeModalVisible(true),
      custom: "heading--area--buttons--left",
      icon: <QrcodeOutlined className="btn--icon--right"/>
    },
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
      title: t("EMPLOYEES"),
      className: "custom--breadcrumb--one",
      href: PATHS.EMPLOYEES.INDEX,
    },
    {
      title: `${employee.firstName} ${employee.lastName}`,
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
                <GeneralInformation t={t} employee={employee} />
              </section>
              <section id="contact">
                <ContactInformation t={t} employee={employee} />
              </section>
              <section id="certificates">
                <Certificates t={t} certificates={certificates} />
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
      <QRCodeModal id={id} t={t} visible={qrCodeModalVisible} handleCancel={() => setQRCodeModalVisible(false)} />
    </div>
  );
};
