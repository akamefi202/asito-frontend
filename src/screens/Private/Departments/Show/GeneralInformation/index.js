import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { COUNTRY_LIST } from "shared/constants/country";

export default ({ t, department }) => {

  const getCountryName = () => {
    const country = COUNTRY_LIST.find(item => item.key === department.country);
    return country ? country.value : '';
  }

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
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.NAME")}
            </h5>
            <h4 className="card--details--item--value">{department.name}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.TYPE")}
            </h5>
            <h4 className="card--details--item--value">{department.type}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.NUMBER")}
            </h5>
            <h4 className="card--details--item--value">{department.number}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.LOCATION")}
            </h5>
            <h4 className="card--details--item--value">
              {department.location}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.ADDRESS")}
            </h5>
            <h4 className="card--details--item--value">
              {department.address}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.POSTCODE")}
            </h5>
            <h4 className="card--details--item--value">
              {department.zipCode}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.CITY")}
            </h5>
            <h4 className="card--details--item--value">{department.city}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.COUNTRY")}
            </h5>
            <h4 className="card--details--item--value">
              {getCountryName()}
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
