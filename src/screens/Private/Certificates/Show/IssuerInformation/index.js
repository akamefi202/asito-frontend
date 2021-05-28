import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { COUNTRY_LIST } from "shared/constants/country";

export default ({ t, certificate, issuers }) => {

  const getIssuerName = () => {
    const issuer = issuers.find(i => i.id === certificate.signedBy);
    return issuer ? issuer.name : certificate.signedBy;
  }

  const getField = (name) => {
    let field = certificate && certificate.issuer ? certificate.issuer[name] : "";
    return field;
  }

  const getCountryName = () => {
    let country = '';
    if (certificate && certificate.issuer) {
      country = COUNTRY_LIST.find(item => item.key === certificate.issuer.country);
    }
    return country ? country.value : '';
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

        <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.REGISTERED_NAME")}</h5>
              <h4 className="card--details--item--value">{getField('name')}</h4>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.ISSUER_NUMBER")}</h5>
              <h4 className="card--details--item--value">{getField('number')}</h4>
            </div>
          </Col>

          <Col xs={24} sm={24} md={24} lg={24}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.ADDRESS") + ' 1'}</h5>
              <h4 className="card--details--item--value">{getField('address1')}</h4>
            </div>
          </Col>

          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.POSTCODE")}</h5>
              <h4 className="card--details--item--value">{getField('zipCode')}</h4>
            </div>
          </Col>
          <Col xs={24} sm={24} md={6} lg={6}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.CITY")}</h5>
              <h4 className="card--details--item--value">{getField('city')}</h4>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.COUNTRY")}</h5>
              <h4 className="card--details--item--value">{getCountryName()}</h4>
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.PHONE_NUMBER")}</h5>
              <h4 className="card--details--item--value">{getField('phone')}</h4>
            </div>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.EMAIL_ADDRESS")}</h5>
              <h4 className="card--details--item--value">{getField('email')}</h4>
            </div>
          </Col>

          <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--details--item">
              <h5 className="card--details--item--key">{t("SHOW.ISSUER_INFORMATION.WEBSITE")}</h5>
              <h4 className="card--details--item--value">
                <a className="custom-link" target="_blank" href={getField('website')}>{getField('website')}</a>
              </h4>
            </div>
          </Col>
      </Row>
    </Card>
  );
}
