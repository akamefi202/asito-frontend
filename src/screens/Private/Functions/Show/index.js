import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import GeneralInformation from "./GeneralInformation";
import Departments from "./Departments";
import Protocols from "./Protocols";
import Requirements from "./Requirements";
import Employees from "./Employees";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useLazyQuery } from "@apollo/react-hooks";
import { RoleQueries } from "shared/graphql/queries";
import { USER_ROLES } from "shared/constants/userRoles";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { messages } from "utils/helpers/message";

const {ROLE} = RoleQueries;

const menuItems = [
  {key: 'GENERAL_INFORMATION', href: 'general'},
  {key: 'DEPARTAMENT', href: 'departments'},
  {key: 'REQUIREMENTS', href: 'requirements'},
  {key: 'PROTOCOLS', href: 'protocols'},
  {key: 'EMPLOYEES', href: 'employees'},
];

export default () => {
  const {id} = useParams();
  const history = useHistory();
  const {t} = useTranslation(NAME_SPACES.ROLES);
  const [role, setRole] = useState({});

  const [getRole, {loading}] = useLazyQuery(ROLE, {
    variables: {where: {id}},
    onCompleted: ({role}) => setRole(role),
    onError: (error) => messages({data: error})
  });

  useEffect(() => {
    getRole()
  }, [])

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const setBreadcrumbsButtons = [
    {
      title: t('EDIT'),
      disabled: false,
      action: () => history.push(PATHS.ROLES.EDIT.replace(':id', id)),
      custom: "heading--area--buttons--left",
      buttonStyle: "btn--outline",
    },
  ];

  const setBreadcrumbsItem = [
    {
      title: t('ROLES'),
      className: "custom--breadcrumb--one",
      href: PATHS.ROLES.INDEX,
    },
    {title: role.name, className: "custom--breadcrumb--two"},
  ];

  const getScrollMenuItem = (t) => menuItems.map(item => ({...item, title: t(`SHOW.MENU.${item.key}`)}));

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || (userRole === USER_ROLES.TEST.key));

  return (
     <div className="wrapper--content">
       <Spin spinning={loading}>
         <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []}/>
         <div className="details--page">
           <Row>
             <Col xs={24} sm={24} md={6} lg={6}>
               <ScrollMenu menuItems={getScrollMenuItem(t)}/>
             </Col>

             <Col xs={24} sm={24} md={18} lg={18}>
               <section id='general'>
                 <GeneralInformation t={t} role={role}/>
               </section>
               <section id='departments'>
                 <Departments t={t} id={id}/>
               </section>
               <section id='requirements'>
                 <Requirements t={t} id={id}/>
               </section>
               <section id='protocols'>
                 <Protocols t={t} id={id}/>
               </section>
               <section id='employees'>
                 <Employees t={t} id={id}/>
               </section>
             </Col>
           </Row>
         </div>
       </Spin>
     </div>
  );
};
