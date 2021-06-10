import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { COUNTRY_LIST } from "shared/constants/country";

export default ({ t, issuer }) => {
  const country = issuer.country
    ? (COUNTRY_LIST.find(item => item.key === issuer.country)) || {}
    : "";

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">
            {t("SHOW.MENU.GENERAL_INFORMATION")}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION_ISSUER.NAME")}
            </h5>
            <h4 className="card--details--item--value">{issuer.name}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION_ISSUER.NUMBER")}
            </h5>
            <h4 className="card--details--item--value">{issuer.number}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.ADDRESS")}
            </h5>
            <h4 className="card--details--item--value">
              {issuer.address1}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.POSTCODE")}
            </h5>
            <h4 className="card--details--item--value">
              {issuer.zipCode}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.CITY")}
            </h5>
            <h4 className="card--details--item--value">{issuer.city}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.COUNTRY")}
            </h5>
            <h4 className="card--details--item--value">
              {country.value}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.PHONE_NUMBER")}
            </h5>
            <h4 className="card--details--item--value">
              {issuer.phone}
            </h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.EMAIL_ADDRESS")}
            </h5>
            <h4 className="card--details--item--value">
              {issuer.email}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.WEBSITE")}
            </h5>
            <h4 className="card--details--item--value">
              <a className="custom-link" target="_blank" href={issuer.website}>{issuer.website}</a>
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
