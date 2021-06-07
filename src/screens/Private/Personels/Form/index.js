import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import ContactInformation from "./ContactInformation";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useFormik } from "formik";
import cuid from "cuid";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { OperatorMutations } from "shared/graphql/mutations";
import { OperatorQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";

const { CREATE_UPDATE_OPERATOR } = OperatorMutations;
const { OPERATOR } = OperatorQueries;


const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "CONTACT_INFORMATION", href: "contact" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.PERSONNELS);
  const [initialValues, setInitialValues] = useState({
    id: cuid(),
    number: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    phone: "",
    email: "",
    address1: "",
    zipCode: "",
    city: "",
    country: "",
  });

  const [getOperators, { loading: loadingOperator }] = useLazyQuery(OPERATOR, {
    variables: { where: { id } },
    onCompleted: ({ operator }) => {
      const newOperator = { ...operator };
      delete newOperator.accesses;
      delete newOperator.certificates;
      delete newOperator.operatorSites;
      
      setInitialValues({ ...initialValues, ...removeTypename(newOperator) })
    },
    onError: (error) => messages({ data: error })
  });


  useEffect(() => {
    if (!id) return;
    getOperators();
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validation(t('FORM.ERROR', { returnObjects: true })),
    onSubmit: data => {
      const newData = { ...data };
      

      saveChanges({ variables: { data: newData } });
    }
  });

  const [saveChanges, { loading }] = useMutation(CREATE_UPDATE_OPERATOR, {
    onCompleted: () => history.push(PATHS.PERSONNELS.INDEX),
    onError: (error) => messages({data: error})
  });

  const discardChanges = () => {
    formik.resetForm();
  }

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      return { ...item, title: t(`FORM.MENU.${item.key}`) };
    });
  };

  const setBreadcrumbsButtons = [
    {
      title: t("DISCARD"),
      type: 'submit',
      disabled: false,
      action: discardChanges,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
    {
      title: t("SAVE"),
      type: 'submit',
      icon: <span className="icon-Check btn--icon--right" />,
      disabled: false,
      action: formik.handleSubmit,
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("PERSONNELS"),
      className: "custom--breadcrumb--one",
      href: PATHS.PERSONNELS.INDEX,
    },
    {
      title: id ? `${initialValues.firstName} ${initialValues.lastName}` : t("NEW"),
      className: "custom--breadcrumb--two",
    },
  ];

  return (
    <div className="wrapper--content">
      <Spin spinning={loading || loadingOperator}>
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
              <section id="contact">
                <ContactInformation t={t} formik={formik} />
              </section>
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
