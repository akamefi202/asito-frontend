import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useFormik } from "formik";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { IssuerMutations } from "shared/graphql/mutations";
import { UserQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";

const { CREATE_UPDATE_ISSUER } = IssuerMutations;
const { USER } = UserQueries;

const menuItems = [{ key: "GENERAL_INFORMATION", href: "general" }];

export default () => {
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.MYCOMPANY);
  const [initialValues, setInitialValues] = useState({
    id: "",
    name: "",
    number: "",
    address1: "",
    zipCode: "",
    city: "",
    country: "",
    kind: "",
    phone: "",
    email: "",
    website: "",
  });

  const {loading: loadingIssuer} = useQuery(USER, {
    onCompleted: ({user}) => {
      if (!user) return
      const data = removeTypename(user.issuer);
      setInitialValues({...data});
    }
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validation(t('FORM.ERROR', {returnObjects: true})),
    onSubmit: (data) => saveChanges({ variables: { data } })
  });

  const [saveChanges, {loading}] = useMutation(CREATE_UPDATE_ISSUER, {
    onCompleted: () => history.push(PATHS.MYCOMPANY.INDEX),
    onError: (error) => messages({data: error})
  });

  const discardChanges = () => formik.dirty ? formik.resetForm() : history.goBack();

  const getScrollMenuItem = (t) => {
    return menuItems.map(item => ({...item, title: t(`FORM.MENU.${item.key}`)}));
  };

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
      icon: <span className="icon-Check btn--icon--right" />,
      disabled: false,
      action: formik.handleSubmit,
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("MYCOMPANY"),
      className: "custom--breadcrumb--one",
      href: PATHS.MYCOMPANY.INDEX,
    }
  ];

  return (
    <div className="wrapper--content">
      <Spin spinning={loading || loadingIssuer}>
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
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
