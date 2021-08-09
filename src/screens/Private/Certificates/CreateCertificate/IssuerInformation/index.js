import React from "react";
import {Row, Col} from "antd";
import Card from "shared/components/Card";
import {bindInputProps} from "utils/helpers/input";
import {REQUIRED_FIELD_SYMBOL} from "utils/constants";
import {useTranslation} from "react-i18next";
import {NAME_SPACES} from "../../../../../shared/locales/constants";
import {COUNTRY_LIST} from "../../../../../shared/constants/country";
import {InputFormControl} from "../../../../../shared/components/InputformControl/InputFormControl";
import {Field} from "../../../../../shared/components/Field/Field";

export default ({t, formik, issuer}) => {
  const translationCountry = useTranslation(NAME_SPACES.COUNTRIES);

  const getCountryName = () => COUNTRY_LIST.find(item => item.key === issuer?.country)?.value || '';

  return (
    <Card cardStyle='card--form'>
      <h2 className='card--form--title'>{t('FORM.MENU.ISSUER_INFORMATION')}</h2>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <InputFormControl id="number"
            label={t('FORM.ISSUER_INFORMATION.SIGNED_BY') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.ISSUER_INFORMATION.SIGNED_BY_PLACEHOLDER')}
            {...bindInputProps({name: 'signedBy', ...formik})}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <InputFormControl id="number"
            label={t('FORM.ISSUER_INFORMATION.SIGNERS_TITLE') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.ISSUER_INFORMATION.SIGNERS_TITLE_PLACEHOLDER')}
            {...bindInputProps({name: 'signerTitle', ...formik})}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='name' label={t('FORM.ISSUER_INFORMATION.REGISTERED_NAME')} value={issuer.name}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='number' label={t('FORM.ISSUER_INFORMATION.ISSUER_NUMBER')} value={issuer.number}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='address1' label={t('FORM.ISSUER_INFORMATION.ADDRESS')} value={issuer.address1}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='address2' label={t('FORM.ISSUER_INFORMATION.ADDRESS')} value={issuer.address2}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Field id='zipCode' label={t('FORM.ISSUER_INFORMATION.POSTCODE')} value={issuer.zipCode}/>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <Field id='city' label={t('FORM.ISSUER_INFORMATION.CITY')} value={issuer.city}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='country' label={t('FORM.ISSUER_INFORMATION.COUNTRY')}
            value={translationCountry.t(`${getCountryName()}`)}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='phone' label={t('FORM.ISSUER_INFORMATION.PHONE_NUMBER')} value={issuer.phone}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='email' label={t('FORM.ISSUER_INFORMATION.EMAIL_ADDRESS')} value={issuer.email}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='email' label={t('FORM.ISSUER_INFORMATION.WEBSITE')}
            target='_blank'
            href={issuer.website}
            value={issuer.website}/>
        </Col>
      </Row>
    </Card>
  );
}
