import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useFormik } from "formik";
import cuid from "cuid";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { DepartmentMutations } from "shared/graphql/mutations";
import { DepartmentQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";

const { CREATE_UPDATE_DEPARTMENT } = DepartmentMutations;
const { DEPARTMENT } = DepartmentQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.DEPARTMENTS)
  const [initialValues, setInitialValues] = useState({
    id: cuid(),
    name: "",
    number: "",
    location: "",
    address: "",
    zipCode: "",
    city: "",
    country: "",

    registrationNumber: "",
    vat: "",
    phone: "",
    email: "",
    webrole: "",
  });

  const [getDepartment, { loading: loadingDepartment }] = useLazyQuery(DEPARTMENT, {
    variables: {
      where: {
        id
      }
    },
    onCompleted: ({ department }) => {
      if (id === department.id) {
        setInitialValues({ ...initialValues, ...removeTypename(department) });
      }
    },
    onError: (error) => {
      messages({ data: error });
    }
  });

  useEffect(() => {
    if (!id) return;
    getDepartment();
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
      saveChanges({ variables: { data } });
    },
  });

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      return { ...item, title: t(`FORM.MENU.${item.key}`) };
    });
  };

  const [saveChanges, { loading }] = useMutation(CREATE_UPDATE_DEPARTMENT,
    {
      onCompleted: (data) => {
        history.push(PATHS.DEPARTMENTS.INDEX);
      },
      onError: (error) => {
        messages({ data: error });
      }
    }
  );

  const discardChanges = () => formik.resetForm();

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
      title: t("DEPARTMENTS"),
      className: "custom--breadcrumb--one",
      href: PATHS.DEPARTMENTS.INDEX,
    },
    { title: id ? initialValues.name : t("NEW"), className: "custom--breadcrumb--two" },
  ];

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />
      <div className="details--page">
        <Spin spinning={loading || loadingDepartment}>
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>

            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="general">
                <GeneralInformation t={t} formik={formik} />
              </section>
            </Col>
          </Row>
        </Spin>
      </div>
    </div>
  );
};
