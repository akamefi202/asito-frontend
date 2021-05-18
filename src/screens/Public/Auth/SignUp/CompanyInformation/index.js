import React from "react";
import { Row, Col } from "antd";
import { Input, Select } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import { COUNTRY_LIST } from "shared/constants/country";

export default ({ t, formik }) => (
  <Row gutter={[16, 8]}>
    <Col xs={24} sm={24} md={24} lg={24}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.NAME")}
        </label>
        <Input
          {...bindInputProps({ name: "name", ...formik })}
          placeholder={t("FORM.COMPANY_INFORMATION.NAME_PLACEHOLDER")}
        />
      </div>
    </Col>

    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.NUMBER")}
        </label>
        <Input
          {...bindInputProps({ name: "registrationNumber", ...formik })}
          placeholder={t("FORM.COMPANY_INFORMATION.NUMBER_PLACEHOLDER")}
        />
      </div>
    </Col>
    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.VAT_ID")}
        </label>
        <Input
          {...bindInputProps({ name: "vat", ...formik })}
          placeholder={t("FORM.COMPANY_INFORMATION.VAT_ID_PLACEHOLDER")}
        />
      </div>
    </Col>

    <Col xs={24} sm={24} md={24} lg={24}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.ADDRESS")} 1
        </label>
        <Input
          {...bindInputProps({ name: "address1", ...formik })}
          placeholder={`${t("FORM.COMPANY_INFORMATION.ADDRESS_PLACEHOLDER")} 1`}
        />
      </div>
    </Col>

    <Col xs={24} sm={24} md={24} lg={24}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.ADDRESS")} 2
        </label>
        <Input
          {...bindInputProps({ name: "address2", ...formik })}
          placeholder={`${t("FORM.COMPANY_INFORMATION.ADDRESS_PLACEHOLDER")} 2`}
        />
      </div>
    </Col>

    <Col xs={24} sm={24} md={6} lg={6}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.POSTCODE")}
        </label>
        <Input
          {...bindInputProps({ name: "zipCode", ...formik })}
          placeholder={t("FORM.COMPANY_INFORMATION.POSTCODE_PLACEHOLDER")}
        />
      </div>
    </Col>
    <Col xs={24} sm={24} md={6} lg={6}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.CITY")}
        </label>
        <Input
          {...bindInputProps({ name: "city", ...formik })}
          placeholder={t("FORM.COMPANY_INFORMATION.CITY_PLACEHOLDER")}
        />
      </div>
    </Col>
    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.COUNTRY")}
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
          {t("FORM.COMPANY_INFORMATION.PHONE_NUMBER")}
        </label>
        <Input
          {...bindInputProps({ name: "phone", ...formik })}
          placeholder={t("FORM.COMPANY_INFORMATION.PHONE_NUMBER_PLACEHOLDER")}
        />
      </div>
    </Col>
    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.EMAIL_ADDRESS")}
        </label>
        <Input
          {...bindInputProps({ name: "email", ...formik })}
          placeholder={t("FORM.COMPANY_INFORMATION.EMAIL_ADDRESS_PLACEHOLDER")}
        />
      </div>
    </Col>

    <Col xs={24} sm={24} md={24} lg={24}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.COMPANY_INFORMATION.WEBSITE")}
        </label>
        <Input
          {...bindInputProps({ name: "website", ...formik })}
          placeholder={t("FORM.COMPANY_INFORMATION.WEBSITE_PLACEHOLDER")}
        />
      </div>
    </Col>
  </Row>
);
