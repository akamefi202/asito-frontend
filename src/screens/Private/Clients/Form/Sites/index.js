import React from "react";
import { Col, Row, Form } from "antd";

import Card from "shared/components/Card";
import Select from "shared/components/Select";
import Input from "shared/components/Input";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import Button from "shared/components/Button";

export default ({ t }) => {
  const [form] = Form.useForm();

  const onFinish = () => {};

  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">{t("FORM.MENU.SITES")}</h2>
        </Col>
      </Row>

      <Row className="w-100-100">
        <Col xs={12} md={12}>
          <div className="card--form--head">
            <h4>{t("FORM.SITES.COLUMNS.SITE_NAME")}</h4>
          </div>
        </Col>
        <Col xs={12} md={12}>
          <div className="card--form--head">
            <h4>{t("FORM.SITES.COLUMNS.LOCATION")}</h4>
          </div>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.List name="sights">
              {(fields, { add, remove }) => (
                <>
                  <Form.Item>
                    <Button
                      onClick={() => add()}
                      icon={<PlusOutlined className="btn--icon--right" />}
                      buttonStyle={"btn--outline"}
                    >
                      {t("FORM.SITES.ADD_ROW")}
                    </Button>
                  </Form.Item>
                  {fields.map((field) => (
                    <div key={field.key}>
                      <Row
                        gutter={[8]}
                        align="middle"
                        className="m-16"
                        justify="space-between"
                      >
                        <Col xs={11} sm={12} md={12}>
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                              prevValues.area !== curValues.area ||
                              prevValues.sights !== curValues.sights
                            }
                          >
                            {() => (
                              <Form.Item {...field}>
                                <Select />
                              </Form.Item>
                            )}
                          </Form.Item>
                        </Col>
                        <Col xs={11} sm={8} md={8}>
                          <Form.Item {...field}>
                            <Input />
                          </Form.Item>
                        </Col>
                        <Col xs={1} sm={1} md={2}>
                          <div className="btn--icon">
                            <CloseOutlined onClick={() => remove(field.name)} />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                </>
              )}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
