import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { dateToString, timestampToDate } from "utils/helpers/moment";
import moment from "moment";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";

const today = moment();

export default ({ t, certificate }) => {
  const validUntil = timestampToDate(certificate.validUntil);
  const isValid = validUntil && validUntil.isValid() && today.isSameOrBefore(validUntil);

  const getCertificateEmployee = (id = false) => {
    const firstName = certificate.employee && certificate.employee.firstName ? certificate.employee.firstName : '';
    const lastName = certificate.employee && certificate.employee.lastName ? certificate.employee.lastName : '';

    if (id) {
      return certificate.employee && certificate.employee.id ? certificate.employee.id : '';
    }

    return [firstName, lastName].join(' ');
  }

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">{t("SHOW.MENU.GENERAL_INFORMATION")}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t("SHOW.GENERAL_INFORMATION.ISSUED_TO")}</h5>
            <h4 className="card--details--item--value">
              <Link
                className="custom-link"
                to={PATHS.EMPLOYEES.SHOW.replace(":id", getCertificateEmployee(true))}>
                  {getCertificateEmployee()}
              </Link>
            </h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t("SHOW.GENERAL_INFORMATION.CERTIFICATE_NUMBER")}</h5>
            <h4 className="card--details--item--value">{certificate.number}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t("SHOW.GENERAL_INFORMATION.CERTIFICATE_TYPE")}</h5>
            <h4 className="card--details--item--value">{certificate?.requirement?.type || ''}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t('SHOW.GENERAL_INFORMATION.ISSUED_ON')}</h5>
            <h4 className="card--details--item--value">{dateToString(certificate.issuedOn)}</h4>
          </div>
        </Col>
        {certificate?.validUntil && <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t('SHOW.GENERAL_INFORMATION.VALID_UNTIL')}</h5>
            <h4 className="card--details--item--value access--type">
              {isValid
                  ? certificate.validUntil && <span className="icon icon-Check green"/>
                  : certificate.validUntil && <span className="icon icon-Close red"/>
              }
              <span className={isValid ? "" : "red"}>{dateToString(certificate.validUntil)}</span>
            </h4>
          </div>
        </Col>}
      </Row>
    </Card>
  );
}
