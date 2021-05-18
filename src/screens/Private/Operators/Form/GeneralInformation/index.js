import React from "react";
import { Row, Col, Radio } from "antd";
import {Card, Input, DatePicker, Select} from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import { OPERATOR_ROLES } from "shared/constants/operatorRoles";

export default ({ t, formik }) => {
  return (
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
              {t("FORM.GENERAL_INFORMATION.EMPLOYEE_NUMBER")}
            </label>
            <Input
              {...bindInputProps({ name: "number", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.EMPLOYEE_NUMBER_PLACEHOLDER")}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.FIRST_NAME")}
            </label>
            <Input
              {...bindInputProps({ name: "firstName", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.FIRST_NAME_PLACEHOLDER")}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.LAST_NAME")}
            </label>
            <Input
              {...bindInputProps({ name: "lastName", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.LAST_NAME_PLACEHOLDER")}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("Role")}
            </label>
            <Select placeholder={t("Select role")} items={OPERATOR_ROLES} />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}/>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.DATE_OF_BIRTH")}
            </label>
            <DatePicker
              {...bindInputProps({ name: "dateOfBirth", ...formik })}
              placeholder={t(
                "FORM.GENERAL_INFORMATION.DATE_OF_BIRTH_PLACEHOLDER"
              )}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.GENDER")}
            </label>
            <Radio.Group
              className="custom-radio custom-input"
              {...bindInputProps({ name: "gender", ...formik })}
            >
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Radio className="input-wrapper" value={"male"}>
                    {t("FORM.GENERAL_INFORMATION.MALE")}
                  </Radio>
                </Col>
                <Col span={12}>
                  <Radio className="input-wrapper" value={"female"}>
                    {t("FORM.GENERAL_INFORMATION.FEMALE")}
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
