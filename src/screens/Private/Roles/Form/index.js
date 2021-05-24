import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Protocols from "./Protocols";
import Requirements from "./Requirements";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useFormik } from "formik";
import cuid from "cuid";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { SiteMutations, RemoveAttachmentsMutations } from "shared/graphql/mutations";
import { SiteQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";
import { timestampToDate } from "utils/helpers/moment";

const { CREATE_UPDATE_SITE } = SiteMutations;
const { REMOVE_ATTACHMENTS } = RemoveAttachmentsMutations;
const { SITE } = SiteQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "REQUIREMENTS", href: "requirements" },
  { key: "PROTOCOLS", href: "protocols" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.ROLES);
  const [generatedId] = useState(cuid());
  const [deletedFiles, setDeletedFiles] = useState([]);
  const [initialValues, setInitialValues] = useState({
    id: generatedId,
    status: "ACTIVE",
    client: {
      id: ""
    },
    name: "",
    numberOfOperatorsRequired: "",
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

  const { loading: loadingSite } = useQuery(SITE, {
    variables: {
      where: {
        id
      }
    },
    onCompleted: ({ site }) => {
      if (id === site.id) {
        const newSite = { ...site };
        if (newSite.requirements && newSite.requirements.length) {
          newSite.requirements.map(item => {
            item.validAtLeastUntil = timestampToDate(item.validAtLeastUntil);
            return item;
          });
        }

        setInitialValues({ ...initialValues, ...removeTypename(site) });
      }
    },
    onError: (error) => {
      messages({ data: error });
    }
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validation(
      t('FORM.ERROR', {
        returnObjects: true,
      })
    ),
    onSubmit: data => {
      const newData = { ...data };
      delete newData.operatorSites;
      delete newData.protocols;

      Promise.all([
        saveChanges({ variables: { data: newData } }),
        deletedFiles.map(id => removeAttachments({ variables: { data: { id } } }))
      ])
        .then(() => history.push(PATHS.ROLES.INDEX))
        .catch(error => messages({ data: error }))
    },
  });

  const discardChanges = () => formik.resetForm();

  const [saveChanges, { loading }] = useMutation(CREATE_UPDATE_SITE);
  const [removeAttachments, { loading: loadingAttachments }] = useMutation(REMOVE_ATTACHMENTS);

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
      <Spin spinning={loading || loadingSite || loadingAttachments}>
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
              <section id="requirements">
                <Requirements t={t} formik={formik} />
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
