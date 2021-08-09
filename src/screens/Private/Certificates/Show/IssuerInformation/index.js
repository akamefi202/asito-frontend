import React from "react";
import {Col, Row} from "antd";
import Card from "shared/components/Card";
import {COUNTRY_LIST} from "shared/constants/country";
import {useTranslation} from "react-i18next";
import {NAME_SPACES} from "../../../../../shared/locales/constants";
import {Field} from "../../../../../shared/components/Field/Field";

export default ({t, certificate}) => {
  const translationCountry = useTranslation(NAME_SPACES.COUNTRIES);

  const getField = (name) => certificate?.issuer?.[name] || '';

  const getCountryName = () => COUNTRY_LIST.find(item => item.key === certificate?.issuer?.country)?.value || '';

  return (
    <Card cardStyle={"card--details"}>
      <h2 className="card--details--title">{t("SHOW.MENU.ISSUER_INFORMATION")}</h2>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='signedBy'
            label={t('SHOW.ISSUER_INFORMATION.SIGNED_BY')}
            value={certificate.signedBy}/>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='signerTitle'
            label={t('SHOW.ISSUER_INFORMATION.SIGNERS_TITLE')}
            value={certificate.signerTitle}/>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='name'
            label={t('SHOW.ISSUER_INFORMATION.REGISTERED_NAME')}
            value={getField('name')}/>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='number'
            label={t('SHOW.ISSUER_INFORMATION.ISSUER_NUMBER')}
            value={getField('number')}/>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Field id='address1'
            label={t('SHOW.ISSUER_INFORMATION.ADDRESS')}
            value={getField('address1')}/>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Field id='zipCode'
            label={t('SHOW.ISSUER_INFORMATION.POSTCODE')}
            value={getField('zipCode')}/>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Field id='city'
            label={t('SHOW.ISSUER_INFORMATION.CITY')}
            value={getField('city')}/>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='country'
            label={t('SHOW.ISSUER_INFORMATION.COUNTRY')}
            value={translationCountry.t(`${getCountryName()}`)}/>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='phone'
            label={t('SHOW.ISSUER_INFORMATION.PHONE_NUMBER')}
            value={getField('phone')}/>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='email'
            label={t('SHOW.ISSUER_INFORMATION.EMAIL_ADDRESS')}
            value={getField('email')}/>
        </Col>
      </Row>

      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='email'
            label={t('SHOW.ISSUER_INFORMATION.WEBSITE')}
            target='_blank'
            href={getField('website')}
            value={getField('website')}/>
        </Col>
      </Row>
    </Card>
  );
}
