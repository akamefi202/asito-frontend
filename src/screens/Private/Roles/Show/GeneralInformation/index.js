import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";

export default ({ t, role }) => (
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
          <h4 className={`card--details--item--value ${role.status === "ACTIVE" ? "green" : "yellow"}`}>{role.status && t(`STATUS_CODE.${role.status}`)}</h4>
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.DEPARTAMENT")}
          </h5>
          <h4 className="card--details--item--value">
            {role.client && (
              <Link 
                className="custom-link" 
                to={PATHS.DEPARTMENTS.SHOW.replace(":id", role.client.id)}>
                  {role.client.name}
              </Link>
            )}
          </h4>
        </div>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.ROLE_NAME")}
          </h5>
          <h4 className="card--details--item--value">
            {role.name}
          </h4>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.ROLE_DESCRIPTION")}
          </h5>
          <h4 className="card--details--item--value">
            {role.numberOfOperatorsRequired}
          </h4>
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.ROLE_DESCRIPTION")}
          </h5>
          <h4 className="card--details--item--value">
            ROLE_DESCRIPTION
          </h4>
        </div>
      </Col>

    </Row>
  </Card>
);
