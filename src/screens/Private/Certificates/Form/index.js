import React, {useEffect, useState} from "react";
import {useHistory, useParams} from "react-router-dom";
import {Col, Row} from "antd";
import {Header, ScrollMenu, Spin} from "shared/components";
import GeneralInformation from "./GeneralInformation";
import IssuerInformation from "./IssuerInformation";
import Attachments from "./Attachments";
import {NAME_SPACES} from "shared/locales/constants";
import {useTranslation} from "react-i18next";
import {PATHS} from "utils/constants";
import {useFormik} from "formik";
import cuid from "cuid";
import {useLazyQuery, useMutation, useQuery} from "@apollo/react-hooks";
import {CertificateMutations, RemoveAttachmentsMutations} from "shared/graphql/mutations";
import {CertificateQueries} from "shared/graphql/queries";
import validation from "./validation";
import {removeTypename} from "utils/helpers/removeTypename";
import {USER} from "shared/graphql/queries/user";
import {messages} from "utils/helpers/message";
import {timestampToDate} from "utils/helpers/moment";

const { CREATE_CERTIFICATE } = CertificateMutations;
const { REMOVE_ATTACHMENTS } = RemoveAttachmentsMutations;
const { CERTIFICATE, CERTIFICATE_TYPES } = CertificateQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "ISSUER_INFORMATION", href: "issuer" },
  { key: "ATTACHMENTS", href: "attachments" },
];

export default () => {
  const { id } = useParams();
  const [generatedId] = useState(cuid());
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.CERTIFICATES);
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [certificateTypes, setCertificateTypes] = useState([]);
  const [initialValues, setInitialValues] = useState({
    id: generatedId,
    signedBy: "",
    signerTitle: "",
    number: "",
    type: "",
    issuedOn: "",
    validForYear: "",
    validForMonths: "",
    attachments: [],
    employee: {
      id: ""
    }
  });
  const [issuer, setIssuer] = useState({
    id: "",
    name: "",
    number: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    country: "",
    kind: "",
    phone: "",
    email: "",
    website: "",
  });

  const { loading: loadingIssuer } = useQuery(USER, {
    onCompleted: ({ user }) => setIssuer({ ...removeTypename(user && user.issuer ? user.issuer : {}) }),
    onError: (error) => {
      messages({ data: error });
    }
  });

  const {loading: loadingCertificateTypes} = useQuery(CERTIFICATE_TYPES, {
    variables: {take: 1000},
    onCompleted: ({requirements: {data}}) => setCertificateTypes(data.map(x => ({...x, validAtLeastUntil: null}))),
    onError: (error) => messages({data: error})
  });

  const [getCertificate, { loading: loadingCertificate }] = useLazyQuery(CERTIFICATE, {
    variables: {
      where: {
        id
      }
    },
    onCompleted: ({ certificate }) => {
      if (id && id === certificate.id) {
        const newCertificate = { ...certificate };
        newCertificate.type = certificate.requirement && certificate.requirement.type || "";
        newCertificate.issuedOn = timestampToDate(newCertificate.issuedOn);
        newCertificate.validUntil = timestampToDate(newCertificate.validUntil);
        // newCertificate.attachments = timestampToDate(newCertificate.attachments);
        setInitialValues({ ...initialValues, ...removeTypename(newCertificate) });
        if (newCertificate.issuer) setIssuer({ ...newCertificate.issuer });
      }
    },
    onError: (error) => {
      messages({ data: error });
    }
  });

  useEffect(() => {
    if (!id) return;
    getCertificate();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validation(
      t('FORM.ERROR', {
        returnObjects: true,
      })
    ),
    onSubmit: data => {
      const newData = {...data};
      delete newData.type;
      if (newData.validForYear === '') delete newData.validForYear;
      if (newData.validForMonths === '') delete newData.validForMonths;
      newData.requirement = removeTypename(certificateTypes.find(c => c.id === data.type || c.type === data.type));
      newData.attachments = data.attachments.map(x =>
        ({ id: x.id, certificate: { id: id || generatedId }, url: x.url, name: x.name, type: x.type }));

      newData.issuer = issuer && issuer.id ? { id: issuer.id } : null;

      if (newData.attachments.length === 0) delete newData.attachments;

      Promise.all([
        saveChanges({ variables: { data: newData } }),
        deletedFiles.map(id => removeAttachments({ variables: { data: { id } } }))
      ])
        .then(() => history.push(PATHS.CERTIFICATES.INDEX))
        .catch(error => messages({ data: error }))
    },
  });

  const [saveChanges, { loading }] = useMutation(CREATE_CERTIFICATE);
  const [removeAttachments, { loading: loadingAttachments }] = useMutation(REMOVE_ATTACHMENTS);

  const discardChanges = () => formik.resetForm();

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      return { ...item, title: t(`FORM.MENU.${item.key}`) };
    });
  };

  const setBreadcrumbsButtons = [
    {
      title: t("DISCARD"),
      disabled: false,
      action: discardChanges,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
    {
      title: t("SAVE"),
      icon: <span className="icon-Check btn--icon--right" />,
      disabled: false,
      action: formik.handleSubmit,
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("CERTIFICATES"),
      className: "custom--breadcrumb--one",
      href: PATHS.CERTIFICATES.INDEX,
    },
    {
      title: id ? initialValues.number : t("NEW"),
      className: "custom--breadcrumb--two",
    },
  ];

  return (
    <div className="wrapper--content">
      <Spin spinning={loading || (loadingCertificate && loadingIssuer && loadingCertificateTypes) || loadingAttachments}>
        <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />
        <div className="details--page">
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} formik={formik} certificateTypes={certificateTypes} />
              </section>
              <section id="issuer">
                <IssuerInformation t={t} formik={formik} issuer={issuer} />
              </section>
              <section id="attachments">
                <Attachments t={t}
                  formik={formik}
                  certificateId={id || generatedId}
                  deletedFiles={deletedFiles}
                  setDeletedFiles={setDeletedFiles} />
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
