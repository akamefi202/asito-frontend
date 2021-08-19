import React, { useState } from "react";
import { Row, Col } from "antd";
import { Header, ScrollMenu, Spin } from "shared/components";
import AccountInformation from "./AccountInformation";
import ChangePassword from "./ChangePassword";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@apollo/react-hooks";
import { UserQueries } from "shared/graphql/queries";
import { messages } from "utils/helpers/message";
import { useFormik } from "formik";
import { info, passwords } from "./validation";
import { AuthMutations, UserMutations } from "../../../../shared/graphql/mutations";

const {USER} = UserQueries;
const {CREATE_UPDATE_USER} = UserMutations;
const {UPDATE_USER} = AuthMutations;

const menuItems = [
  {key: 'ACCOUNT_INFORMATION', href: 'account'},
  {key: 'CHANGE_PASSWORD', href: 'changePassword'},
];

export default () => {
  const {t} = useTranslation(NAME_SPACES.PREFERENCES);
  const [infoValues, setInfoValues] = useState({});
  const [passwordsValues] = useState({});

  const {loading} = useQuery(USER, {
    onCompleted: ({user}) => setInfoValues({firstName: user?.firstName, lastName: user?.lastName, email: user?.email}),
    onError: error => messages({data: error})
  });

  const infoFormik = useFormik({
    enableReinitialize: true,
    initialValues: infoValues,
    validationSchema: info(t('FORM.ERROR', {returnObjects: true})),
    onSubmit: data => saveInfo({variables: {data}})
  });

  const passwordsFormik = useFormik({
    enableReinitialize: true,
    initialValues: passwordsValues,
    validationSchema: passwords(t('FORM.ERROR', {returnObjects: true})),
    onSubmit: data => changePassword({variables: {data}})
  });

  const [saveInfo, {loading: saveInfoLoading}] = useMutation(CREATE_UPDATE_USER, {
    onCompleted: () => messages({msg: t('FORM.ACCOUNT_INFORMATION.SUCCESS'), type: 'success'}),
    onError: (error) => messages({data: error})
  });

  const [changePassword, {loading: savePasswordLoading}] = useMutation(UPDATE_USER, {
    onCompleted: () => messages({msg: t('FORM.CHANGE_PASSWORD.PASSWORD_CHANGED'), type: 'success'}),
    onError: (error) => messages({data: error})
  });

  const getScrollMenuItem = (t) => menuItems.map(item => ({...item, title: t(`FORM.MENU.${item.key}`)}));

  const setBreadcrumbsItem = [{title: t('PREFERENCES'), className: "heading--area--title"}];

  return (
     <div className="wrapper--content">
       <Header items={setBreadcrumbsItem}/>

       <div className="details--page">
         <Spin spinning={loading}>
           <Row gutter={[16]}>
             <Col xs={24} sm={24} md={6} lg={6}>
               <ScrollMenu menuItems={getScrollMenuItem(t)}/>
             </Col>
             <Col xs={24} sm={24} md={18} lg={18}>
               <section id="account">
                 <AccountInformation t={t} formik={infoFormik} loading={saveInfoLoading}/>
               </section>
               <section id="changePassword">
                 <ChangePassword t={t} formik={passwordsFormik} loading={savePasswordLoading}/>
               </section>
             </Col>
           </Row>
         </Spin>
       </div>
     </div>
  );
};
