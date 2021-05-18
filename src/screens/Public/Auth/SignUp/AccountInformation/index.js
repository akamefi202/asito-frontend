import React from "react";
import { Row, Col } from "antd";
import { Input } from "shared/components";
import { bindInputProps } from "utils/helpers/input";

export default ({ t, formik }) => (
  <Row gutter={[16, 8]}>
    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.ACCOUNT_INFORMATION.FIRST_NAME")}
        </label>
        <Input
          {...bindInputProps({ name: "firstName", ...formik })}
          placeholder={t("FORM.ACCOUNT_INFORMATION.FIRST_NAME_PLACEHOLDER")}
        />
      </div>
    </Col>
    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.ACCOUNT_INFORMATION.LAST_NAME")}
        </label>
        <Input
          {...bindInputProps({ name: "lastName", ...formik })}
          placeholder={t("FORM.ACCOUNT_INFORMATION.LAST_NAME_PLACEHOLDER")}
        />
      </div>
    </Col>

    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.ACCOUNT_INFORMATION.EMAIL_ADDRESS")}
        </label>
        <Input
          {...bindInputProps({ name: "email", ...formik })}
          placeholder={t("FORM.ACCOUNT_INFORMATION.EMAIL_ADDRESS_PLACEHOLDER")}
        />
      </div>
    </Col>
    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.ACCOUNT_INFORMATION.PHONE_NUMBER")}
        </label>
        <Input
          {...bindInputProps({ name: "phone", ...formik })}
          placeholder={t("FORM.ACCOUNT_INFORMATION.PHONE_NUMBER_PLACEHOLDER")}
        />
      </div>
    </Col>

    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.ACCOUNT_INFORMATION.PASSWORD")}
        </label>
        <Input
          {...bindInputProps({ name: "password", ...formik })}
          type="password"
          placeholder={t("FORM.ACCOUNT_INFORMATION.PASSWORD_PLACEHOLDER")}
        />
      </div>
    </Col>
    <Col xs={24} sm={24} md={12} lg={12}>
      <div className="card--form--item">
        <label className="card--form--item--label">
          {t("FORM.ACCOUNT_INFORMATION.REPEAT_PASSWORD")}
        </label>
        <Input
          {...bindInputProps({ name: "repetPassword", ...formik })}
          type="password"
          placeholder={t("FORM.ACCOUNT_INFORMATION.REPEAT_PASSWORD_PLACEHOLDER")}
        />
      </div>
    </Col>
  </Row>
);
