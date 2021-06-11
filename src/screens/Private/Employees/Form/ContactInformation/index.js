import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { Input, Select } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import { COUNTRY_LIST } from "shared/constants/country";

export default ({ t, formik }) => (
  <Card cardStyle={"card--form"}>
    <Row>
      <Col xs={24}>
        <h2 className="card--form--title">
          {t("FORM.MENU.CONTACT_INFORMATION")}
        </h2>
      </Col>
    </Row>
    <Row gutter={[16, 8]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.CONTACT_INFORMATION.PHONE_NUMBER")}
          </label>
          <Input
            {...bindInputProps({ name: "phone", ...formik })}
            placeholder={t("FORM.CONTACT_INFORMATION.PHONE_NUMBER_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.CONTACT_INFORMATION.EMAIL_ADDRESS")}
          </label>
          <Input
            {...bindInputProps({ name: "email", ...formik })}
            placeholder={t(
              "FORM.CONTACT_INFORMATION.EMAIL_ADDRESS_PLACEHOLDER"
            )}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.CONTACT_INFORMATION.ADDRESS_LINE")}
          </label>
          <Input
            {...bindInputProps({ name: "address1", ...formik })}
            placeholder={t(
              "FORM.CONTACT_INFORMATION.ADDRESS_LINE_PLACEHOLDER"
            )}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={6} lg={6}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.CONTACT_INFORMATION.POSTCODE")}
          </label>
          <Input
            {...bindInputProps({ name: "zipCode", ...formik })}
            placeholder={t("FORM.CONTACT_INFORMATION.POSTCODE_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.CONTACT_INFORMATION.CITY")}
          </label>
          <Input
            {...bindInputProps({ name: "city", ...formik })}
            placeholder={t("FORM.CONTACT_INFORMATION.CITY_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.CONTACT_INFORMATION.COUNTRY")}
          </label>
          <Select
            placeholder={t("FORM.CONTACT_INFORMATION.COUNTRY_PLACEHOLDER")}
            {...bindInputProps({ name: "country", ...formik })}
            items={COUNTRY_LIST}
          />
        </div>
      </Col>
    </Row>
  </Card>
);
