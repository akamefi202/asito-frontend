import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { COUNTRY_LIST } from "shared/constants/country";

export default ({ t, client }) => {

  const getCountryName = () => {
    const country = COUNTRY_LIST.find(item => item.key === client.country);
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
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.CLIENT_NAME")}
            </h5>
            <h4 className="card--details--item--value">{client.name}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.CLIENT_NUMBER")}
            </h5>
            <h4 className="card--details--item--value">{client.number}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.REGISTRATION_NUMBER")}
            </h5>
            <h4 className="card--details--item--value">{client.registrationNumber}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.VAT")}
            </h5>
            <h4 className="card--details--item--value">{client.vat}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.ADDRESS")}
            </h5>
            <h4 className="card--details--item--value">
              {client.address}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.POSTCODE")}
            </h5>
            <h4 className="card--details--item--value">
              {client.zipCode}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={6} lg={6}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.CITY")}
            </h5>
            <h4 className="card--details--item--value">{client.city}</h4>
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

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.PHONE_NUMBER")}
            </h5>
            <h4 className="card--details--item--value">
              {client.phone}
            </h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.EMAIL_ADDRESS")}
            </h5>
            <h4 className="card--details--item--value">
              {client.email}
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.GENERAL_INFORMATION.WEBSITE")}
            </h5>
            <h4 className="card--details--item--value custom-link">
              {client.website}
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
