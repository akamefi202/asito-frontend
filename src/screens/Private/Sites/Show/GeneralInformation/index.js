import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";

export default ({ t, site }) => (
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
            {t("SHOW.GENERAL_INFORMATION.STATUS")}
          </h5>
          <h4 className={`card--details--item--value ${site.status === "ACTIVE" ? "green" : "yellow"}`}>{site.status && t(`STATUS_CODE.${site.status}`)}</h4>
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.CLIENT")}
          </h5>
          <h4 className="card--details--item--value custom-link">
            {site.client && site.client.name}
          </h4>
        </div>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.SITE_NAME")}
          </h5>
          <h4 className="card--details--item--value">
            {site.name}
          </h4>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.OPERATIRS_REQUIRED")}
          </h5>
          <h4 className="card--details--item--value">
            {site.numberOfOperatorsRequired}
          </h4>
        </div>
      </Col>

    </Row>
  </Card>
);
