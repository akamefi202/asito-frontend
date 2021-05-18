import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";

export default ({ t , certificate, issuers }) => {

  const getIssuerName = () => {
      const issuer = issuers.find(i => i.id === certificate.signedBy);
      return issuer ? issuer.name : certificate.signedBy;
  }

  return (
      <Card cardStyle={"card--details"}>
        <Row>
          <Col xs={24}>
            <h2 className="card--details--title">{t("SHOW.MENU.ISSUER_INFORMATION")}</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.SIGNED_BY")}</h5>
              <h4 className="card--details--item--value">{getIssuerName()}</h4>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.SIGNERS_TITLE")}</h5>
              <h4 className="card--details--item--value">{certificate.signerTitle}</h4>
            </div>
          </Col>
        </Row>
      </Card>
  );
}
