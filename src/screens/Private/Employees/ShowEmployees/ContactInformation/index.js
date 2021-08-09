import React from "react";
import {Row, Col} from "antd";
import Card from "shared/components/Card";
import {COUNTRY_LIST} from "shared/constants/country";
import {useTranslation} from "react-i18next";
import {NAME_SPACES} from "../../../../../shared/locales/constants";
import {Field} from "../../../../../shared/components/Field/Field";

export default ({t, employee}) => {
  const translationCountry = useTranslation(NAME_SPACES.COUNTRIES);

  const getCountryName = () => {
    const country = COUNTRY_LIST.find(item => item.key === employee.country);
    return country ? country.value : '';
  }

  return (
    <Card cardStyle={"card--details"}>
      <h2 className="card--details--title">{t('SHOW.MENU.CONTACT_INFORMATION')}</h2>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='phone'
            label={t('SHOW.CONTACT_INFORMATION.PHONE_NUMBER')}
            value={employee.phone}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='email'
            label={t('SHOW.CONTACT_INFORMATION.EMAIL_ADDRESS')}
            value={employee.email}/>
        </Col>
      </Row>


      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <Field id='address1'
            label={t('SHOW.CONTACT_INFORMATION.ADDRESS_LINE')}
            value={employee.address1}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <Field id='zipCode'
            label={t('SHOW.CONTACT_INFORMATION.POSTCODE')}
            value={employee.zipCode}/>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <Field id='city'
            label={t('SHOW.CONTACT_INFORMATION.CITY')}
            value={employee.city}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <Field id='country'
            label={t('SHOW.CONTACT_INFORMATION.COUNTRY')}
            value={translationCountry.t(`${getCountryName()}`)}/>
        </Col>
      </Row>
    </Card>
  );
}
