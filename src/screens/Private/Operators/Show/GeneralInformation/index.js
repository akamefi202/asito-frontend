import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { dateToString } from "utils/helpers/moment";

export default ({ t, operator }) => (
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
            {t("SHOW.GENERAL_INFORMATION.EMPLOYEE_NUMBER")}
          </h5>
          <h4 className="card--details--item--value">{operator.number}</h4>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.FIRST_NAME")}
          </h5>
          <h4 className="card--details--item--value">
            {operator.firstName}
          </h4>
        </div>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.LAST_NAME")}
          </h5>
          <h4 className="card--details--item--value">
            {operator.lastName}
          </h4>
        </div>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("Role")}
          </h5>
          <h4 className="card--details--item--value">Operator</h4>
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}/>

      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.DATE_OF_BIRTH")}
          </h5>
          <h4 className="card--details--item--value">
            {dateToString(operator.dateOfBirth)}
          </h4>
        </div>
      </Col>

      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--details--item">
          <h5 className="card--details--item--key">
            {t("SHOW.GENERAL_INFORMATION.GENDER")}
          </h5>
          <h4 className="card--details--item--value">{t(`GENDER.${operator.gender}`)}</h4>
        </div>
      </Col>
    </Row>
  </Card>
);
