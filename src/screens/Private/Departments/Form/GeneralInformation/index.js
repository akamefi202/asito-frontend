import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { Input } from "shared/components";
import Select from "shared/components/Select";
import { bindInputProps } from "utils/helpers/input";
import { COUNTRY_LIST } from "shared/constants/country";

const requiredFieldSymbol = String.fromCodePoint(parseInt('002A', 16));

export default ({ t, formik }) => (
  <Card cardStyle={"card--form"}>
    <Row>
      <Col xs={24}>
        <h2 className="card--form--title">
          {t("FORM.MENU.GENERAL_INFORMATION")}
        </h2>
      </Col>
    </Row>
    <Row gutter={[16, 8]}>
      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.NAME")} {requiredFieldSymbol}
          </label>
          <Input
            {...bindInputProps({ name: "name", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.NAME_PLACEHOLDER")}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.TYPE")} {requiredFieldSymbol}
          </label>
          <Input
            {...bindInputProps({ name: "number", ...formik })}
            placeholder={t(
              "FORM.GENERAL_INFORMATION.TYPE_PLACEHOLDER"
            )}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">{`${t(
            "FORM.GENERAL_INFORMATION.LOCATION"
          )}`} {requiredFieldSymbol}</label>
          <Input
            {...bindInputProps({ name: "location", ...formik })}
            placeholder={`${t(
              "FORM.GENERAL_INFORMATION.LOCATION_PLACEHOLDER"
            )}`}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">{`${t(
            "FORM.GENERAL_INFORMATION.ADDRESS"
          )}`} {requiredFieldSymbol}</label>
          <Input
            {...bindInputProps({ name: "address", ...formik })}
            placeholder={`${t(
              "FORM.GENERAL_INFORMATION.ADDRESS_PLACEHOLDER"
            )}`}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={6} lg={6}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.POSTCODE")} {requiredFieldSymbol}
          </label>
          <Input
            {...bindInputProps({ name: "zipCode", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.POSTCODE_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.CITY")} {requiredFieldSymbol}
          </label>
          <Input
            {...bindInputProps({ name: "city", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.CITY_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.GENERAL_INFORMATION.COUNTRY")} {requiredFieldSymbol}
          </label>
          <Select
            {...bindInputProps({ name: "country", ...formik })}
            placeholder={t("FORM.GENERAL_INFORMATION.COUNTRY_PLACEHOLDER")}
            items={COUNTRY_LIST}
          />
        </div>
      </Col>
    </Row>
  </Card>
);
