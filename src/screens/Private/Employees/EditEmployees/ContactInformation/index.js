import React, {useState} from "react";
import {Row, Col} from "antd";
import Card from "shared/components/Card";
import {bindInputProps} from "utils/helpers/input";
import {COUNTRY_LIST} from "shared/constants/country";
import {REQUIRED_FIELD_SYMBOL} from "utils/constants";
import {InputFormControl} from "../../../../../shared/components/InputformControl/InputFormControl";
import {SelectFormControl} from "../../../../../shared/components/SelectFormControl/SelectFormControl";
import {useTranslation} from "react-i18next";
import {NAME_SPACES} from "../../../../../shared/locales/constants";

export default ({t, formik}) => {
    const countryTranslate = useTranslation(NAME_SPACES.COUNTRIES);
    const [countries, setCountries] = useState(COUNTRY_LIST);

    const searchCountry = (value) => {
        setCountries(COUNTRY_LIST.filter(c => countryTranslate.t(c.value).toLowerCase().includes(value)));
    }

   return (
    <Card cardStyle={"card--form"}>
      <h2 className="card--form--title">{t('FORM.MENU.CONTACT_INFORMATION')}</h2>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <InputFormControl id='phone'
            label={t('FORM.CONTACT_INFORMATION.PHONE_NUMBER') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.CONTACT_INFORMATION.PHONE_NUMBER_PLACEHOLDER')}
            {...bindInputProps({name: 'phone', ...formik})}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <InputFormControl id='email'
            label={t('FORM.CONTACT_INFORMATION.EMAIL_ADDRESS') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.CONTACT_INFORMATION.EMAIL_ADDRESS_PLACEHOLDER')}
            {...bindInputProps({name: 'email', ...formik})}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <InputFormControl id='address1'
            label={t('FORM.CONTACT_INFORMATION.ADDRESS_LINE') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.CONTACT_INFORMATION.ADDRESS_LINE_PLACEHOLDER')}
            {...bindInputProps({name: 'address1', ...formik})}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={6} lg={6}>
          <InputFormControl id='zipCode'
            label={t('FORM.CONTACT_INFORMATION.POSTCODE') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.CONTACT_INFORMATION.POSTCODE_PLACEHOLDER')}
            {...bindInputProps({name: 'zipCode', ...formik})}/>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <InputFormControl id='city'
            label={t('FORM.CONTACT_INFORMATION.CITY') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.CONTACT_INFORMATION.CITY_PLACEHOLDER')}
            {...bindInputProps({name: 'city', ...formik})}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <SelectFormControl id='country'
            label={t('FORM.CONTACT_INFORMATION.COUNTRY') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.CONTACT_INFORMATION.COUNTRY_PLACEHOLDER')}
            {...bindInputProps({name: 'country', ...formik})}
            items={countries}
            optionValue='key'
            searchDelay={0}
            onSearch={searchCountry}/>
        </Col>
      </Row>
    </Card>)
};
