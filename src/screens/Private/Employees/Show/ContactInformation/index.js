import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { COUNTRY_LIST } from "shared/constants/country";

export default ({ t, employee }) => {
  const getCountryName = () => {
    const country = COUNTRY_LIST.find(item => item.key === employee.country);
    return country ? country.value : '';
  }

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">
            {t("SHOW.MENU.CONTACT_INFORMATION")}
          </h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.CONTACT_INFORMATION.PHONE_NUMBER")}
            </h5>
            <h4 className="card--details--item--value">
              {employee.phone}
            </h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.CONTACT_INFORMATION.EMAIL_ADDRESS")}
            </h5>
            <h4 className="card--details--item--value">
              {employee.email}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.CONTACT_INFORMATION.ADDRESS_LINE")}
          </h5>
            <h4 className="card--details--item--value">
              {employee.address1}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.CONTACT_INFORMATION.POSTCODE")}
            </h5>
            <h4 className="card--details--item--value">
              {employee.zipCode}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.CONTACT_INFORMATION.CITY")}
            </h5>
            <h4 className="card--details--item--value">{employee.city}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.CONTACT_INFORMATION.COUNTRY")}
            </h5>
            <h4 className="card--details--item--value">
              {getCountryName()}
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
