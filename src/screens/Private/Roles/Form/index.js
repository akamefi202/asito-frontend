import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Departments from "./Departments";
import Protocols from "./Protocols";
import Requirements from "./Requirements";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useFormik } from "formik";
import cuid from "cuid";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { RoleMutations, RoleRequirementMutations } from "shared/graphql/mutations";
import { RoleQueries, RoleRequirementQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";

const {CREATE_UPDATE_ROLE} = RoleMutations;
const {ROLE} = RoleQueries;
const {CREATE_ROLE_REQUIREMENT, REMOVE_ROLE_REQUIREMENT} = RoleRequirementMutations;
const {ROLE_REQUIREMENTS} = RoleRequirementQueries;

const menuItems = [
  {key: 'GENERAL_INFORMATION', href: 'general'},
  {key: 'DEPARTAMENT', href: 'departments'},
  {key: 'REQUIREMENTS', href: 'requirements'},
  {key: 'PROTOCOLS', href: 'protocols'},
];

export default () => {
  const {id} = useParams();
  const history = useHistory();
  const {t} = useTranslation(NAME_SPACES.ROLES);
  const [generatedId] = useState(cuid());

  const [deletedFiles, setDeletedFiles] = useState([]);
  const [removedRequirements, setRemovedRequirements] = useState([]);
  const [initialValues, setInitialValues] = useState({
    id: generatedId,
    status: 'ACTIVE',
    departments: [],
    requirements: [],
    protocols: []
  });

  const [getRole, {loading: loadingRole}] = useLazyQuery(ROLE, {
    variables: {where: {id}},
    onCompleted: ({role}) => setInitialValues({...initialValues, ...removeTypename(role)}),
    onError: (error) => messages({data: error})
  });

  const [getRoleRequirements, {loading: loadingRoleRequirement}] = useLazyQuery(ROLE_REQUIREMENTS, {
    variables: {roleRequirementsWhere: {role: {id: id}}},
    onCompleted: ({roleRequirements: {data}}) => setInitialValues({
      ...initialValues,
      requirements: data.map(r => removeTypename(r))
    }),
    onError: (error) => messages({data: error})
  });

  const [saveChanges, {loading}] = useMutation(CREATE_UPDATE_ROLE);
  const [createRole, {loading: loadingCreatingRole}] = useMutation(CREATE_ROLE_REQUIREMENT);
  const [removeRoleRequirement] = useMutation(REMOVE_ROLE_REQUIREMENT);

  useEffect(() => {
    if (id) Promise.all([getRole(), getRoleRequirements()]).then();
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validation(t('FORM.ERROR', {returnObjects: true})),
    onSubmit: data => {
      const newData = {...data};
      const {requirements} = newData;

      delete newData.requirements;
      delete newData.employeeRoles;

      Promise.all([
        saveChanges({variables: {data: newData}}),
        ...requirements.map(r => createRole({variables: {createRoleRequirementData: r}})),
        ...removedRequirements.map(r => removeRoleRequirement({variables: {data: {id: r}}})),
      ]).then(() => history.push(id ? PATHS.ROLES.SHOW.replace(':id', id) : PATHS.ROLES.INDEX))
    }
  });

  const discardChanges = () => formik.dirty ? formik.resetForm() : history.goBack();

  const getScrollMenuItem = (t) => menuItems.map(item => ({...item, title: t(`FORM.MENU.${item.key}`)}));

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
      icon: <span className="icon-Check btn--icon--right"/>,
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
       <Spin spinning={loading || loadingRole || loadingRoleRequirement || loadingCreatingRole}>
         <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons}/>
         <div className="details--page">
           <Row>
             <Col xs={24} sm={24} md={6} lg={6}>
               <ScrollMenu menuItems={getScrollMenuItem(t)}/>
             </Col>
             <Col xs={24} sm={24} md={18} lg={18}>
               <section id='general'>
                 <GeneralInformation t={t} formik={formik}/>
               </section>
               <section id='departments'>
                 <Departments t={t} formik={formik}/>
               </section>
               <section id='requirements'>
                 <Requirements t={t}
                    formik={formik}
                    id={id || generatedId}
                    removedRequirements={removedRequirements}
                    setRemovedRequirements={setRemovedRequirements}/>
               </section>
               <section id='protocols'>
                 <Protocols t={t}
                    formik={formik}
                    id={id || generatedId}
                    deletedFiles={deletedFiles}
                    setDeletedFiles={setDeletedFiles}/>
               </section>
             </Col>
           </Row>
         </div>
       </Spin>
     </div>
  );
};
