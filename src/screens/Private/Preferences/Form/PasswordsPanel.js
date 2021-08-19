import React from "react";
import { Row, Col } from "antd";
import { Card, Button, Spin } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import { REQUIRED_FIELD_SYMBOL } from "utils/constants";
import { InputFormControl } from "../../../../shared/components/InputformControl/InputFormControl";

export const PasswordsPanel = ({t, formik, loading}) => {

  return (
     <Card cardStyle="card--form">
       <Spin spinning={loading}>
         <h2 className="card--form--title">{t('FORM.MENU.CHANGE_PASSWORD')}</h2>

         <Row gutter={[16, 8]}>
           <Col xs={24} sm={24} md={12} lg={12}>
             <InputFormControl id='password'
                type='password'
                label={t('FORM.CHANGE_PASSWORD.CURRENT_PASSWORD') + ' ' + REQUIRED_FIELD_SYMBOL}
                placeholder={t('FORM.CHANGE_PASSWORD.CURRENT_PASSWORD_PLACEHOLDER')}
                {...bindInputProps({name: 'password', ...formik})}/>
           </Col>
         </Row>

         <Row gutter={[16, 8]}>
           <Col xs={24} sm={24} md={12} lg={12}>
             <InputFormControl id='newPassword'
                type='password'
                label={t('FORM.CHANGE_PASSWORD.NEW_PASSWORD') + ' ' + REQUIRED_FIELD_SYMBOL}
                placeholder={t('FORM.CHANGE_PASSWORD.NEW_PASSWORD_PLACEHOLDER')}
                {...bindInputProps({name: 'newPassword', ...formik})}/>
           </Col>

           <Col xs={24} sm={24} md={12} lg={12}>
             <InputFormControl id='confirmPassword'
                type='password'
                label={t('FORM.CHANGE_PASSWORD.REPEAT_NEW_PASSWORD') + ' ' + REQUIRED_FIELD_SYMBOL}
                placeholder={t('FORM.CHANGE_PASSWORD.REPEAT_NEW_PASSWORD_PLACEHOLDER')}
                {...bindInputProps({name: 'confirmPassword', ...formik})}/>
           </Col>
         </Row>

         <Row gutter={[16, 8]}>
           <Col xs={24} sm={24} md={24} lg={24}>
             <div className="heading--area--buttons heading--area--buttons--end">
               <Button type='submit' disabled={!formik.dirty} onClick={formik.handleSubmit}>
                 <span className="icon-Key btn--icon--right"/> {t('FORM.CHANGE_PASSWORD.CHANGE_PASSWORD')}
               </Button>
             </div>
           </Col>
         </Row>
       </Spin>
     </Card>
  );
};
