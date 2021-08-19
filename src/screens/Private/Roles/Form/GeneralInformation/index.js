import React from "react";
import {Row, Col, Radio} from "antd";
import {Card} from "shared/components";
import {bindInputProps} from "utils/helpers/input";
import {REQUIRED_FIELD_SYMBOL} from "utils/constants";
import {RadioGroup} from "../../../../../shared/components/RadioGroup/RadioGroup";
import {InputFormControl} from "../../../../../shared/components/InputformControl/InputFormControl";

export default ({t, formik}) => {
  return (
    <Card cardStyle='card--form'>
      <h2 className="card--form--title">{t('FORM.MENU.GENERAL_INFORMATION')}</h2>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <RadioGroup id='status'
            label={t('FORM.GENERAL_INFORMATION.STATUS')}
            {...bindInputProps({name: 'status', ...formik})}>

            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Radio style={{width: '100%'}} value='ACTIVE'>{t('STATUS_CODE.ACTIVE')}</Radio>
              </Col>
              <Col span={12}>
                <Radio style={{width: '100%'}} value='INACTIVE'>{t('STATUS_CODE.INACTIVE')}</Radio>
              </Col>
            </Row>
          </RadioGroup>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <InputFormControl id='name'
            label={t('FORM.GENERAL_INFORMATION.ROLE_NAME') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.ROLE_NAME_PLACEHOLDER')}
            {...bindInputProps({name: 'name', ...formik})}/>
        </Col>


        <Col xs={24} sm={24} md={12} lg={12}>
          <InputFormControl id='numberOfEmployeesRequired'
            label={t('FORM.GENERAL_INFORMATION.EMPLOYEE_REQUIRED') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.ROLE_NAME_PLACEHOLDER')}
            {...bindInputProps({name: 'numberOfEmployeesRequired', ...formik})}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <InputFormControl id='roleDescription'
            label={t('FORM.GENERAL_INFORMATION.ROLE_DESCRIPTION')}
            placeholder={t('FORM.GENERAL_INFORMATION.ROLE_DESCRIPTION_PLACEHOLDER')}
            {...bindInputProps({name: 'roleDescription', ...formik})}/>
        </Col>
      </Row>
    </Card>
  );
};
