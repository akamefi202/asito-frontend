import React from "react";
import { Row, Col } from "antd";
import Card from "shared/components/Card";
import { Input, Select } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import {COUNTRY_LIST} from "shared/constants/country";

export default ({ t, formik }) => (
  <Card cardStyle={"card--form"}>
    <Row>
      <Col xs={24}>
        <h2 className="card--form--title">
          {t("FORM.MENU.LOCATION_INFORMATION")}
        </h2>
      </Col>
    </Row>
    <Row gutter={[16, 8]}>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.LOCATION_INFORMATION.LATITUDE")}
          </label>
          <Input
            {...bindInputProps({ name: "latitude", ...formik })}
            placeholder={t("FORM.LOCATION_INFORMATION.LATITUDE_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.LOCATION_INFORMATION.LONGITUDE")}
          </label>
          <Input
            {...bindInputProps({ name: "longitude", ...formik })}
            placeholder={t(
              "FORM.LOCATION_INFORMATION.LONGITUDE_PLACEHOLDER"
            )}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.LOCATION_INFORMATION.ADDRESS_LINE")} 1
          </label>
          <Input
            {...bindInputProps({ name: "address1", ...formik })}
            placeholder={`${t(
              "FORM.LOCATION_INFORMATION.ADDRESS_LINE_PLACEHOLDER"
            )} 1`}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={24} lg={24}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.LOCATION_INFORMATION.ADDRESS_LINE")} 2
          </label>
          <Input
            {...bindInputProps({ name: "address2", ...formik })}
            placeholder={`${t(
              "FORM.LOCATION_INFORMATION.ADDRESS_LINE_PLACEHOLDER"
            )} 2`}
          />
        </div>
      </Col>

      <Col xs={24} sm={24} md={6} lg={6}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.LOCATION_INFORMATION.POSTCODE")}
          </label>
          <Input
            {...bindInputProps({ name: "zipCode", ...formik })}
            placeholder={t("FORM.LOCATION_INFORMATION.POSTCODE_PLACEHOLDER")}
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={6} lg={6}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.LOCATION_INFORMATION.CITY")}
          </label>
          <Input
            {...bindInputProps({ name: "city", ...formik })}
            placeholder={t("FORM.LOCATION_INFORMATION.CITY_PLACEHOLDER")} 
          />
        </div>
      </Col>
      <Col xs={24} sm={24} md={12} lg={12}>
        <div className="card--form--item">
          <label className="card--form--item--label">
            {t("FORM.LOCATION_INFORMATION.COUNTRY")}
          </label>
          <Select 
            {...bindInputProps({ name: "country", ...formik })}
            items={COUNTRY_LIST}
          />
        </div>
      </Col>
    </Row>
  </Card>
);
