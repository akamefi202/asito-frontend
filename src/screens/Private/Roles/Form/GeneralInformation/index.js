import React from "react";
import { Row, Col, Radio } from "antd";
import { Card, Input } from "shared/components";
import { bindInputProps } from "utils/helpers/input";

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
              {t("FORM.GENERAL_INFORMATION.STATUS")}
            </label>
            <Radio.Group
              className="custom-radio custom-input"
              {...bindInputProps({ name: "status", ...formik })}
            >
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  <Radio className="input-wrapper" value={"ACTIVE"}>
                    {t("STATUS_CODE.ACTIVE")}
                  </Radio>
                </Col>
                <Col span={12}>
                  <Radio className="input-wrapper" value={"INACTIVE"}>
                    {t("STATUS_CODE.INACTIVE")}
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.ROLE_NAME")}
            </label>
            <Input
              {...bindInputProps({ name: "name", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.ROLE_NAME_PLACEHOLDER")}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.EMPLOYEE_REQUIRED")}
            </label>
            <Input
              {...bindInputProps({ name: "numberOfEmployeesRequired", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.EMPLOYEE_REQUIRED_PLACEHOLDER")}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.ROLE_DESCRIPTION")}
            </label>
            <Input
              {...bindInputProps({ prefix: true, name: "roleDescription", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.ROLE_DESCRIPTION_PLACEHOLDER")}
            />
          </div>
        </Col>

      </Row>
    </Card>
  );
};
