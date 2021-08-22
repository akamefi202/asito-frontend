import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { bindInputProps } from "utils/helpers/input";
import { REQUIRED_FIELD_SYMBOL } from "utils/constants";
import { COUNTRY_LIST } from "shared/constants/country";
import { InputFormControl } from "../../../../../shared/components/InputformControl/InputFormControl";
import { SelectFormControl } from "../../../../../shared/components/SelectFormControl/SelectFormControl";

export default ({t, formik}) => (
   <Card cardStyle="card--form">
     <h2 className="card--form--title">{t('FORM.MENU.GENERAL_INFORMATION')}</h2>

     <Row gutter={[16, 8]}>
       <Col xs={24} sm={24} md={24} lg={24}>
         <InputFormControl id='name'
            label={t('FORM.GENERAL_INFORMATION.NAME') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.NAME_PLACEHOLDER')}
            {...bindInputProps({name: 'name', ...formik})}/>
       </Col>
     </Row>


     <Row gutter={[16, 8]}>
       <Col xs={24} sm={24} md={24} lg={24}>
         <InputFormControl id='type'
            label={t('FORM.GENERAL_INFORMATION.TYPE') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.TYPE_PLACEHOLDER')}
            {...bindInputProps({name: 'type', ...formik})}/>
       </Col>
     </Row>

     <Row gutter={[16, 8]}>
       <Col xs={24} sm={24} md={24} lg={24}>
         <InputFormControl id='number'
            label={t('FORM.GENERAL_INFORMATION.NUMBER') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.NUMBER_PLACEHOLDER')}
            {...bindInputProps({name: 'number', ...formik})}/>
       </Col>
     </Row>

     <Row gutter={[16, 8]}>
       <Col xs={24} sm={24} md={24} lg={24}>
         <InputFormControl id='location'
            label={t('FORM.GENERAL_INFORMATION.LOCATION') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.LOCATION_PLACEHOLDER')}
            {...bindInputProps({name: 'location', ...formik})}/>
       </Col>
     </Row>

     <Row gutter={[16, 8]}>
       <Col xs={24} sm={24} md={24} lg={24}>
         <InputFormControl id='address'
            label={t('FORM.GENERAL_INFORMATION.ADDRESS') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.ADDRESS_PLACEHOLDER')}
            {...bindInputProps({name: 'address', ...formik})}/>
       </Col>
     </Row>

     <Row gutter={[16, 8]}>
       <Col xs={24} sm={24} md={6} lg={6}>
         <InputFormControl id='zipCode'
            label={t('FORM.GENERAL_INFORMATION.POSTCODE') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.POSTCODE_PLACEHOLDER')}
            {...bindInputProps({name: 'zipCode', ...formik})}/>
       </Col>

       <Col xs={24} sm={24} md={6} lg={6}>
         <InputFormControl id='city'
            label={t('FORM.GENERAL_INFORMATION.CITY') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.CITY_PLACEHOLDER')}
            {...bindInputProps({name: 'city', ...formik})}/>
       </Col>

       <Col xs={24} sm={24} md={12} lg={12}>
         <SelectFormControl id='country'
            label={t('FORM.GENERAL_INFORMATION.COUNTRY') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.COUNTRY_PLACEHOLDER')}
            items={COUNTRY_LIST}
            optionValue='key'
            {...bindInputProps({name: 'country', ...formik})}/>
       </Col>
     </Row>
   </Card>
);
