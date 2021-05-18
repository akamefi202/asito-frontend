import React, { useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import LocationInformation from "./LocationInformation";
import Requirements from "./Requirements";
// import Operators from "./Operators";
import { BsCheck } from "react-icons/bs";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useFormik } from "formik";
import cuid from "cuid";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { SiteMutations } from "shared/graphql/mutations";
import { SiteQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";
import { timestampToDate } from "utils/helpers/moment";

const { CREATE_UPDATE_SITE } = SiteMutations;
const { SITE } = SiteQueries;

const menuItems = [
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "LOCATION_INFORMATION", href: "location" },
  { key: "REQUIREMENTS", href: "requirements" },
  // { key: "OPERATORS", href: "operators" },
];

export default () => {
  const { id } = useParams();
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.ROLES);
  const [initialValues, setInitialValues] = useState({
    id: cuid(),
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
        const newSite = {...site};
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
      const newData = {...data};
      delete newData.operatorSites;

      saveChanges({ variables: { data: newData } });
    },
  });

  const cancel = () => history.push(PATHS.ROLES.INDEX);

  const [
    saveChanges,
    { loading }
  ] = useMutation(CREATE_UPDATE_SITE,
    {
      onCompleted: (data) => {
        history.push(PATHS.ROLES.INDEX);
      },
      onError: (error) => {
        messages({data: error});
      }
    }
  );

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      return { ...item, title: t(`FORM.MENU.${item.key}`) };
    });
  };

  const setBreadcrumbsButtons = [
    {
      title: t("CANCEL"),
      disabled: false,
      action: cancel,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
    {
      title: t("SAVE_SITE"),
      icon: <BsCheck className="btn--icon--right" />,
      disabled: false,
      action: formik.handleSubmit,
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("SITES"),
      className: "custom--breadcrumb--one",
      href: PATHS.ROLES.INDEX,
    },
    {
      title: id ? initialValues.name : t("NEW_SITE"),
      className: "custom--breadcrumb--two",
    },
  ];

  return (
    <div className="wrapper--content">
      <Spin spinning={loading || loadingSite}>
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
              <section id="location">
                <LocationInformation t={t} formik={formik} />
              </section>
              <section id="requirements">
                <Requirements t={t} formik={formik} />
              </section>
              {/* <section id="operators">
                <Operators t={t} formik={formik} />
              </section> */}
            </Col>
          </Row>
        </div>
      </Spin>
    </div>
  );
};
