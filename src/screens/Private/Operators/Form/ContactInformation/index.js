import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { Input } from "shared/components";
import { bindInputProps } from "utils/helpers/input";

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
    </Row>
  </Card>
);
