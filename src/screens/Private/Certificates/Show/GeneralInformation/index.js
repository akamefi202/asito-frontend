import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { dateToString, timestampToDate } from "utils/helpers/moment";
import { CERTIFICATES_TYPE } from "shared/constants/certificatesType";
import moment from "moment";

const today = moment();

export default ({ t, certificate, issuers}) => {
  const validUntil = timestampToDate(certificate.validUntil);
  const isValid = validUntil && validUntil.isValid() && today.isSameOrBefore(validUntil);

  const getCertificateOperator = () => {
    const firstName = certificate.operator && certificate.operator.firstName ? certificate.operator.firstName : '';
    const lastName = certificate.operator && certificate.operator.lastName ? certificate.operator.lastName : '';
    return [firstName, lastName].join(' ');
  }

  const getType = () => {
    const certificateType = certificate && certificate.requirement
      && CERTIFICATES_TYPE.find(item => item.key === certificate.requirement.type);
    return certificateType ? certificateType.value : "";
  }

  const getIssuerName = () => {
    const issuer = issuers.find(i => i.id === certificate.signedBy);
    return issuer ? issuer.name : certificate.signedBy;
  }

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">{t("SHOW.MENU.GENERAL_INFORMATION")}</h2>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t("SHOW.GENERAL_INFORMATION.ISSUED_TO")}</h5>
            <h4 className="card--details--item--value custom-link">{getCertificateOperator()}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t("SHOW.GENERAL_INFORMATION.ISSUED_BY")}</h5>
            <h4 className="card--details--item--value">{getIssuerName()}</h4>
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
            <h4 className="card--details--item--value">{getType()}</h4>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t('SHOW.GENERAL_INFORMATION.ISSUED_ON')}</h5>
            <h4 className="card--details--item--value">{dateToString(certificate.issuedOn)}</h4>
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--details--item">
            <h5 className="card--details--item--key">{t('SHOW.GENERAL_INFORMATION.VALID_UNTIL')}</h5>
            <h4 className="card--details--item--value access--type">
              { isValid
                ? certificate.validUntil && <CheckOutlined className="green" />
                : certificate.validUntil && <CloseOutlined className="red" />
              }
              <span className={isValid ? "" : "red"}>{dateToString(certificate.validUntil)}</span>
            </h4>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
