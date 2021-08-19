import React from "react";
import { Row, Col } from "antd";
import { Card, Button, Spin } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import { REQUIRED_FIELD_SYMBOL } from "utils/constants";
import { InputFormControl } from "../../../../../shared/components/InputformControl/InputFormControl";


export default ({t, formik, loading}) => {

  return (
     <Card cardStyle="card--form">
       <Spin spinning={loading}>
         <h2 className="card--form--title">{t('FORM.MENU.ACCOUNT_INFORMATION')}</h2>

         <Row gutter={[16, 8]}>
           <Col xs={24} sm={24} md={12} lg={12}>
             <InputFormControl id='firstName'
                label={t('FORM.ACCOUNT_INFORMATION.FIRST_NAME') + ' ' + REQUIRED_FIELD_SYMBOL}
                placeholder={t('FORM.ACCOUNT_INFORMATION.FIRST_NAME_PLACEHOLDER')}
                {...bindInputProps({name: 'firstName', ...formik})}/>
           </Col>

           <Col xs={24} sm={24} md={12} lg={12}>
             <InputFormControl id='lastName'
                label={t('FORM.ACCOUNT_INFORMATION.LAST_NAME') + ' ' + REQUIRED_FIELD_SYMBOL}
                placeholder={t('FORM.ACCOUNT_INFORMATION.LAST_NAME_PLACEHOLDER')}
                {...bindInputProps({name: 'lastName', ...formik})}/>
           </Col>
         </Row>

         <Row gutter={[16, 8]}>
           <Col xs={24} sm={24} md={12} lg={12}>
             <InputFormControl id='email'
                label={t('FORM.ACCOUNT_INFORMATION.EMAIL_ADDRESS') + ' ' + REQUIRED_FIELD_SYMBOL}
                placeholder={t('FORM.ACCOUNT_INFORMATION.EMAIL_ADDRESS_PLACEHOLDER')}
                {...bindInputProps({name: 'email', ...formik})}/>
           </Col>
         </Row>

         <Row>
           <Col xs={24} sm={24} md={24} lg={24}>
             <div className="heading--area--buttons heading--area--buttons--end">
               <Button buttonStyle="btn--outline"
                  custom="heading--area--buttons--left"
                  disabled={!formik.dirty}
                  onClick={() => formik.resetForm()}>
                 {t('FORM.ACCOUNT_INFORMATION.REVERT_CHANGES')}
               </Button>

               <Button disabled={!formik.dirty} onClick={formik.handleSubmit}>
                 <span className="icon-Check btn--icon--right"/> {t('FORM.ACCOUNT_INFORMATION.SAVE_CHANGES')}
               </Button>
             </div>
           </Col>
         </Row>
       </Spin>
     </Card>
  );
};
