import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Sites from "./Sites";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { BsCheck } from "react-icons/bs";
import { useFormik } from "formik";
import cuid from "cuid";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { ClientMutations } from "shared/graphql/mutations";
import { ClientQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";

const { CREATE_UPDATE_CLIENT } = ClientMutations;
const { CLIENT } = ClientQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "SITES", href: "sites" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.CLIENTS)
  const [initialValues, setInitialValues] = useState({
    id: cuid(),
    name: "",
    number: "",
    registrationNumber: "",
    vat: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",
    phone: "",
    email: "",
    website:"",
    sites: [],
  });

  const { loading: loadingClient } = useQuery(CLIENT, {
    variables: {
      where: {
        id
      }
    },
    onCompleted: ({ client }) => {
      if (id === client.id) {
        setInitialValues({ ...removeTypename(client) });
      }
    },
    onError: (error) => {
      messages({data: error});
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
      saveChanges({ variables: { data } });
    },
  });

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      let quantity = "";
      if (item.key === "SITES") {
        quantity = " (2)";
      }
      return { ...item, title: t(`FORM.MENU.${item.key}`) + quantity };
    });
  };

  const [
    saveChanges,
    { loading }
  ] = useMutation(CREATE_UPDATE_CLIENT,
    {
      onCompleted: (data) => {
        history.push(PATHS.CLIENTS.INDEX);
      },
      onError: (error) => {
        messages({data: error});
      }
    }
  );

  const discardChanges = () => formik.resetForm();

  const setBreadcrumbsButtons = [
    {
      title: t("DISCARD_CHANGES"),
      disabled: false,
      action: discardChanges,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
    {
      title: t("SAVE_CHANGES"),
      icon: <BsCheck className="btn--icon--right" />,
      disabled: false,
      action: formik.handleSubmit,
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("CLIENTS"),
      className: "custom--breadcrumb--one",
      href: PATHS.CLIENTS.INDEX,
    },
    { title: id ? initialValues.name : t("NEW_CLIENT"), className: "custom--breadcrumb--two" },
  ];

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />
      <div className="details--page">
        <Spin spinning={loading || loadingClient}>
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} formik={formik} />
              </section>
              <section id="sites">
                <Sites t={t} formik={formik} />
              </section>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};
