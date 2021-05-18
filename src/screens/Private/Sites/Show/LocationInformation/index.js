import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { COUNTRY_LIST } from "shared/constants/country";

export default ({ t, site }) => {
  const country = site.country
    ? (COUNTRY_LIST.find(item => item.key === site.country)) || {}
    : {};

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">
            {t("SHOW.MENU.LOCATION_INFORMATION")}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.LOCATION_INFORMATION.LATITUDE")}
            </h5>
            <h4 className="card--details--item--value">
              {site.latitude}
            </h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.LOCATION_INFORMATION.LONGITUDE")}
            </h5>
            <h4 className="card--details--item--value">
              {site.longitude}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.LOCATION_INFORMATION.ADDRESS_LINE")} 1
          </h5>
            <h4 className="card--details--item--value">
              {site.address1}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.LOCATION_INFORMATION.ADDRESS_LINE")} 2
          </h5>
            <h4 className="card--details--item--value">
              {site.address2}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.LOCATION_INFORMATION.POSTCODE")}
            </h5>
            <h4 className="card--details--item--value">
              {site.zipCode}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.LOCATION_INFORMATION.CITY")}
            </h5>
            <h4 className="card--details--item--value">{site.city}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.LOCATION_INFORMATION.COUNTRY")}
            </h5>
            <h4 className="card--details--item--value">
              {country.value}
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
