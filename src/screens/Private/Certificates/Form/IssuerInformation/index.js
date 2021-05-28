import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { Input } from "shared/components";
import { bindInputProps } from "utils/helpers/input";

export default ({ t, formik, issuer }) => {
  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">
            {t("FORM.MENU.ISSUER_INFORMATION")}
          </h2>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.SIGNED_BY")}
            </label>
            <Input
              placeholder={t("FORM.ISSUER_INFORMATION.SIGNED_BY_PLACEHOLDER")}
              {...bindInputProps({ name: "signedBy", ...formik })}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.SIGNERS_TITLE")}
            </label>
            <Input
              placeholder={t("FORM.ISSUER_INFORMATION.SIGNERS_TITLE_PLACEHOLDER")}
              {...bindInputProps({ name: "signerTitle", ...formik })}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.REGISTERED_NAME")}
            </label>
            <h4 className="card--details--item--value">{issuer.name}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.ISSUER_NUMBER")}
            </label>
            <h4 className="card--details--item--value">{issuer.number}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.ADDRESS")} 1
                        </label>
            <h4 className="card--details--item--value">{issuer.address1}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.ADDRESS")} 2
                        </label>
            <h4 className="card--details--item--value">{issuer.address2}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.POSTCODE")}
            </label>
            <h4 className="card--details--item--value">{issuer.zipCode}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.CITY")}
            </label>
            <h4 className="card--details--item--value">{issuer.city}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.COUNTRY")}
            </label>
            <h4 className="card--details--item--value">{issuer.country}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.PHONE_NUMBER")}
            </label>
            <h4 className="card--details--item--value">{issuer.phone}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.EMAIL_ADDRESS")}
            </label>
            <h4 className="card--details--item--value">{issuer.email}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.ISSUER_INFORMATION.WEBSITE")}
            </label>
            <h4 className="card--details--item--value">
              <a className="custom-link" target="_blank" href={issuer.website}>{issuer.website}</a>
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
