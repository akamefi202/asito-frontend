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
import {
  DepartmentMutations,
  ProtocolMutations,
  RoleMutations,
  RoleRequirementMutations
} from "shared/graphql/mutations";
import { DepartmentQueries, ProtocolQueries, RoleQueries, RoleRequirementQueries } from "shared/graphql/queries";
import validation from "./validation";
import { removeTypename } from "utils/helpers/removeTypename";
import { messages } from "utils/helpers/message";

const {ROLE} = RoleQueries;
const {ROLE_DEPARTMENTS} = DepartmentQueries;
const {ROLE_REQUIREMENTS} = RoleRequirementQueries;
const {ROLE_PROTOCOLS} = ProtocolQueries;

const {CREATE_UPDATE_ROLE} = RoleMutations;
const {CREATE_ROLE_DEPARTMENT, REMOVE_ROLE_DEPARTMENT} = DepartmentMutations
const {CREATE_ROLE_REQUIREMENT, REMOVE_ROLE_REQUIREMENT} = RoleRequirementMutations;
const {CREATE_ROLE_PROTOCOL, REMOVE_ROLE_PROTOCOL} = ProtocolMutations

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

  const [removedRequirements, setRemovedRequirements] = useState([]);
  const [removedDepartments, setRemovedDepartments] = useState([]);
  const [removedProtocols, setRemovedProtocols] = useState([]);

  const [initialValues, setInitialValues] = useState({
    id: generatedId,
    status: 'ACTIVE',
    departments: [],
    requirements: [],
    protocols: []
  });

  const [getRole, {loading: lRole}] = useLazyQuery(ROLE, {
    variables: {where: {id}},
    onCompleted: ({role}) => setInitialValues({...initialValues, ...removeTypename(role)}),
    onError: (error) => messages({data: error})
  });

  const [getRoleDepartments, {loading: lRoleDepartments}] = useLazyQuery(ROLE_DEPARTMENTS, {
    variables: {roleDepartmentsWhere: {role: {id}}, skip: 0, take: 1000},
    onCompleted: ({roleDepartments}) => setInitialValues({
      ...initialValues,
      departments: roleDepartments.data.map(d => removeTypename(d))
    }),
    onError: (error) => messages({data: error})
  });

  const [getRoleRequirements, {loading: lRoleRequirement}] = useLazyQuery(ROLE_REQUIREMENTS, {
    variables: {roleRequirementsWhere: {role: {id: id}}},
    onCompleted: ({roleRequirements: {data}}) => setInitialValues({
      ...initialValues,
      requirements: data.map(r => removeTypename(r))
    }),
    onError: (error) => messages({data: error})
  });

  const [getRoleProtocols, {loading: lRoleProtocols}] = useLazyQuery(ROLE_PROTOCOLS, {
    variables: {roleProtocolsWhere: {role: {id}}, skip: 0, take: 1000},
    onCompleted: ({roleProtocols}) => setInitialValues({
      ...initialValues,
      protocols: roleProtocols.data.map(d => removeTypename(d))
    }),
    onError: (error) => messages({data: error})
  });

  useEffect(() => {
    if (!id) return;
    Promise.all([getRole(), getRoleDepartments(), getRoleRequirements(), getRoleProtocols()]).then();
  }, []);

  const [saveChanges, {loading}] = useMutation(CREATE_UPDATE_ROLE);

  const [createRole, {loading: lCreateRole}] = useMutation(CREATE_ROLE_REQUIREMENT);
  const [removeRoleRequirement, {loading: lRemoveRole}] = useMutation(REMOVE_ROLE_REQUIREMENT);

  const [createDepartment, {loading: lCreateDepartment}] = useMutation(CREATE_ROLE_DEPARTMENT);
  const [removeDepartment, {loading: lRemoveDepartment}] = useMutation(REMOVE_ROLE_DEPARTMENT);

  const [createProtocol, {loading: lCreateProtocol}] = useMutation(CREATE_ROLE_PROTOCOL);
  const [removeProtocol, {loading: lRemoveProtocol}] = useMutation(REMOVE_ROLE_PROTOCOL);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: validation(t('FORM.ERROR', {returnObjects: true})),
    onSubmit: data => {
      const newData = {...data};

      const departments = getNewArrayItems(newData?.departments, 'departments');
      const requirements = getNewArrayItems(newData?.requirements, 'requirements');
      const protocols = getNewArrayItems(newData?.protocols, 'protocols');

      delete newData.departments;
      delete newData.requirements;
      delete newData.protocols;
      delete newData.employeeRoles;

      Promise.all([
        saveChanges({variables: {data: newData}}),
        ...departments.map(d => createDepartment({variables: {createRoleDepartmentData: d}})),
        ...removedDepartments.map(d => removeDepartment({variables: {data: {id: d}}})),

        ...requirements.map(r => createRole({variables: {createRoleRequirementData: r}})),
        ...removedRequirements.map(r => removeRoleRequirement({variables: {data: {id: r}}})),

        ...protocols.map(p => createProtocol({variables: {createRoleProtocolData: p}})),
        ...removedProtocols.map(p => removeProtocol({variables: {data: {id: p}}})),
      ]).then(() => history.push(id ? PATHS.ROLES.SHOW.replace(':id', id) : PATHS.ROLES.INDEX))
    }
  });

  const getNewArrayItems = (array = [], arrayName) => {
    return array.filter(i => !formik.initialValues?.[arrayName].some(iv => iv.id === i.id)).map(i => ({id: i.id}));
  }

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

  const isLoading = () => {
    return lRole || lRoleDepartments || lRoleRequirement || lRoleProtocols
       || loading || lCreateDepartment || lCreateRole || lCreateProtocol
       || lRemoveDepartment || lRemoveRole || lRemoveProtocol
  }

  return (
     <div className="wrapper--content">
       <Spin spinning={isLoading()}>
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
                 <Departments t={t}
                    formik={formik}
                    removedDepartments={removedDepartments}
                    setRemovedDepartments={setRemovedDepartments}/>
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
                    removedProtocols={removedProtocols}
                    setRemovedProtocols={setRemovedProtocols}/>
               </section>
             </Col>
           </Row>
         </div>
       </Spin>
     </div>
  );
};
