import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";

export default ({ t, operator }) => {

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
              {operator.phone}
            </h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">
              {t("SHOW.CONTACT_INFORMATION.EMAIL_ADDRESS")}
            </h5>
            <h4 className="card--details--item--value">
              {operator.email}
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
