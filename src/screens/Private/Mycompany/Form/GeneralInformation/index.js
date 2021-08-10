import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { Input, Select } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import {COUNTRY_LIST} from "shared/constants/country";
import { REQUIRED_FIELD_SYMBOL } from 'utils/constants';

export default ({ t, formik }) => (
  <Card cardStyle={"card--form"}>
    <Row>
      <Col xs={24}>
        <h2 className="card--form--title">
          {t("FORM.MENU.GENERAL_INFORMATION")}
        </h2>
      </Col>
    </Row>
    <Row gutter={[16, 8]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("SHOW.GENERAL_INFORMATION_ISSUER.NAME")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Input
            {...bindInputProps({ name: "name", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.NAME_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("SHOW.GENERAL_INFORMATION_ISSUER.NUMBER")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Input
            {...bindInputProps({ name: "number", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.NUMBER_PLACEHOLDER")}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.ADDRESS")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Input
            {...bindInputProps({ name: "address1", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.ADDRESS_PLACEHOLDER")}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={6} lg={6}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.POSTCODE")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Input
            {...bindInputProps({ name: "zipCode", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.POSTCODE_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.CITY")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Input
            {...bindInputProps({ name: "city", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.CITY_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.COUNTRY")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Select
            {...bindInputProps({ name: "country", ...formik })}
            items={COUNTRY_LIST}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.PHONE_NUMBER")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Input
            {...bindInputProps({ name: "phone", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.PHONE_NUMBER_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.EMAIL_ADDRESS")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Input
            {...bindInputProps({ name: "email", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.EMAIL_ADDRESS_PLACEHOLDER")}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.WEBSITE")} { REQUIRED_FIELD_SYMBOL }
          </label>
          <Input
            {...bindInputProps({ name: "website", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.WEBSITE_PLACEHOLDER")}
          />
        </div>
      </Col>
    </Row>
  </Card>
);
