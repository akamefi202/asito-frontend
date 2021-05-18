import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import DataAccess from "./DataAccess";
import GeneralInformation from "./GeneralInformation";
import ContactInformation from "./ContactInformation";
import { BsCheck } from "react-icons/bs";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useFormik } from "formik";
import cuid from "cuid";
import {useLazyQuery, useMutation} from "@apollo/react-hooks";
import { OperatorMutations, AccessMutations } from "shared/graphql/mutations";
import { OperatorQueries, AccessQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";
import moment from "moment";

const {CREATE_OPERATOR, UPDATE_OPERATOR} = OperatorMutations;
const { OPERATOR } = OperatorQueries;

const {CREATE_UPDATE_ACCESSES, REMOVE_ACCESS} = AccessMutations;
const {ACCESSES} = AccessQueries;

const menuItems = [
  { key: "DATA_ACCESS", href: "dataAccess" },
  { key: "GENERAL_INFORMATION", href: "general" },
  { key: "CONTACT_INFORMATION", href: "contact" },
];

export default () => {
  const { id } = useParams();
  const [generatedId] = useState(cuid());
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.OPERATORS);
  const [deletedObjects, setDeletedObjects] = useState([]);
  const [initialValues, setInitialValues] = useState({
    id: generatedId,
    number: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    country: "",
    accesses: []
  });
  const [cloneValues, setCloneValues] = useState({
    id: "",
    number: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "male",
    phone: "",
    email: "",
    address1: "",
    address2: "",
    zipCode: "",
    city: "",
    country: "",
    accesses: []
  });

  const formatDate = (date) => isNaN(date) ? moment(date) : moment(parseInt(date, 10));

  const [getOperators, {loading: loadingOperator}] = useLazyQuery(OPERATOR, {
     variables: {where: {id}},
     onCompleted: ({operator}) => {
       setInitialValues({...initialValues, ...removeTypename(operator)})
       setCloneValues({...initialValues, ...removeTypename(operator)})
     },
     onError: (error) => messages({data: error})
  });

  const [getAccesses, {loading: loadingAccesses}] = useLazyQuery(ACCESSES, {
    variables: {where: {operator: {id}}},
    onCompleted: ({accesses}) => {
      const data = accesses.data.map(access => {
        if (access.sharedOn) access.sharedOn = formatDate(access.sharedOn).format();
        if (access.sharedUntil) access.sharedUntil = formatDate(access.sharedUntil).format();
        if (access.client) {
          access.client = {...removeTypename(access.client)}
          access.clientId = access.client.id;
        }
        access.old = true;
        return {...removeTypename(access)};
      });
      setInitialValues({...initialValues, accesses: data});
      setCloneValues({...initialValues, accesses: data});
    },
    onError: (error) => messages({data: error})
  });


  useEffect(() => {
      if (!id) return;
      getOperators();
      getAccesses();
  }, [])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validation(t('FORM.ERROR', {returnObjects: true})),
    onSubmit: data => {
      const newData = {...data};
      const accesses = newData.accesses.filter(access => !access.old).map(access => {
        access.client = {id: access.clientId};
        delete access.clientId;
        delete access.old;
        return {...access, id: access.id || cuid(), operator: {id: id ? id : generatedId}}
      });
      delete newData.accesses;
      delete newData.certificates;

      Promise.all([
          saveChanges({variables: {data: newData}}),
          ...deletedObjects.map(object => removeAccesses({variables: {data: {id: object}}})),
          ...accesses.map(access => saveAccesses({variables: {data: access}})),
      ])
          .then(() => history.push(PATHS.OPERATORS.INDEX))
          .catch(error => messages({data: error}));
    }
  });

  const [saveChanges, {loading}] = useMutation(id ? UPDATE_OPERATOR : CREATE_OPERATOR);
  const [saveAccesses, {loading: loadingSaveAccesses}] = useMutation(CREATE_UPDATE_ACCESSES);
  const [removeAccesses, {loading: loadingRemoveAccesses}] = useMutation(REMOVE_ACCESS);

  const discardChanges = () => {
    setInitialValues(cloneValues);
    setDeletedObjects([]);
    formik.resetForm();
  }

  const getScrollMenuItem = (t) => {
    return menuItems.map((item) => {
      let quantity = "";
      return { ...item, title: t(`FORM.MENU.${item.key}`) + quantity };
    });
  };

  const setBreadcrumbsButtons = [
    {
      title: t("DISCARD_CHANGES"),
      type: 'submit',
      disabled: false,
      action: discardChanges,
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
    {
      title: t("SAVE_CHANGES"),
      type: 'submit',
      icon: <BsCheck className="btn--icon--right" />,
      disabled: false,
      action: formik.handleSubmit,
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t("OPERATORS"),
      className: "custom--breadcrumb--one",
      href: PATHS.OPERATORS.INDEX,
    },
    {
      title: id ? `${initialValues.firstName} ${initialValues.lastName}` : t("NEW_OPERATOR"),
      className: "custom--breadcrumb--two",
    },
  ];

  return (
    <div className="wrapper--content">
      <Spin spinning={loading
                      || loadingOperator
                      || loadingAccesses
                      || loadingSaveAccesses
                      || loadingRemoveAccesses}>
        <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />
        <div className="details--page">
          <Row gutter={[16]}>
            <Col xs={24} sm={24} md={6} lg={6}>
              <ScrollMenu menuItems={getScrollMenuItem(t)} />
            </Col>
            <Col xs={24} sm={24} md={18} lg={18}>
              <section id="dataAccess">
                <DataAccess t={t} formik={formik} deletedObjects={deletedObjects} setDeletedObjects={setDeletedObjects} />
              </section>
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
