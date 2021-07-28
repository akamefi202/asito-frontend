import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Departments from "./Departments";
import Protocols from "./Protocols";
import RequiredCertificates from "./RequiredCertificates";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useFormik } from "formik";
import cuid from "cuid";
import {useMutation, useLazyQuery, useQuery} from "@apollo/react-hooks";
import { RoleMutations, RemoveAttachmentsMutations } from "shared/graphql/mutations";
import { RoleQueries, CertificateQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";
import { timestampToDate } from "utils/helpers/moment";

const { CREATE_UPDATE_ROLE } = RoleMutations;
const { REMOVE_ATTACHMENTS } = RemoveAttachmentsMutations;
const { ROLE } = RoleQueries;
const { CERTIFICATE_TYPES } = CertificateQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "DEPARTAMENT", href: "departments" },
  { key: "REQUIREMENTS", href: "requirements" },
  { key: "PROTOCOLS", href: "protocols" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.ROLES);
  const [generatedId] = useState(cuid());
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [certificateTypes, setCertificateTypes] = useState([]);
  const [initialValues, setInitialValues] = useState({
    id: generatedId,
    status: "ACTIVE",
    name: "",
    departments: [],
    roleDescription: "",
    numberOfEmployeesRequired: "",
    latitude: "",
    longitude: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    country: "",
    protocols: [],
    requirements: []
  });

  const {loading: loadingCertificateTypes} = useQuery(CERTIFICATE_TYPES, {
    variables: {take: 1000},
    onCompleted: ({requirements: {data}}) => setCertificateTypes(data.map(ct => ({key: ct.id, value: ct.type}))),
    onError: (error) => messages({data: error})
  });

  const [getRole, { loading: loadingRole }] = useLazyQuery(ROLE, {
    variables: {where: {id}},
    onCompleted: ({role}) => {
      const newRole = {...role};
      if (newRole.requirements && newRole.requirements.length) {
        newRole.requirements.map(item => {
          item.validAtLeastUntil = timestampToDate(item.validAtLeastUntil);
          return item;
        });
      }
      setInitialValues({...initialValues, ...removeTypename(newRole)});
    },
    onError: (error) => messages({ data: error })
  });

  useEffect(() => {
    if (id) getRole();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validation(t('FORM.ERROR', {returnObjects: true})),
    onSubmit: data => {
      const newData = { ...data };
      delete newData.employeeRoles;
      newData.protocols = data.protocols.map(x =>
          ({id: x.id, role: {id: id || generatedId}, url: x.url, name: x.name, type: x.type}));

      saveChanges({variables: {data: newData}})
          .then(() => history.push(id ? PATHS.ROLES.SHOW.replace(":id", id) : PATHS.ROLES.INDEX))
          .catch(error => messages({data: error}))
    },
  });

  const discardChanges = () => formik.dirty ? formik.resetForm() : history.goBack();

  const [saveChanges, { loading }] = useMutation(CREATE_UPDATE_ROLE);
  const [removeAttachments, { loading: loadingAttachments }] = useMutation(REMOVE_ATTACHMENTS);

  const getScrollMenuItem = (t) => {
    return menuItems.map(item => ({...item, title: t(`FORM.MENU.${item.key}`)}));
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
      title: t("ROLES"),
      className: "custom--breadcrumb--one",
      href: PATHS.ROLES.INDEX,
    },
    {
      title: id ? initialValues.name : t("NEW"),
      className: "custom--breadcrumb--two",
    },
  ];

  return (
    <div className="wrapper--content">
      <Spin spinning={loading || loadingRole || loadingAttachments || loadingCertificateTypes}>
        <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />
        <div className="details--page">
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} formik={formik} />
              </section>
              <section id="departments">
                <Departments t={t} formik={formik} />
              </section>
              <section id="requirements">
                <RequiredCertificates t={t} formik={formik} certificateTypes={certificateTypes}/>
              </section>
              <section id="protocols">
                <Protocols
                  t={t}
                  formik={formik}
                  roleId={id || generatedId}
                  deletedFiles={deletedFiles}
                  setDeletedFiles={setDeletedFiles}
                />
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
