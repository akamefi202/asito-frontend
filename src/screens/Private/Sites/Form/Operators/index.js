import React from "react";
import { Col, Row, Form } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Card,
  Select,
  Input,
  Button,
} from "../../../../../shared/components";
import faker from "faker";
import { BsCheck } from "react-icons/bs";

export default ({ t }) => {
  const [form] = Form.useForm();

  const onFinish = () => { };

  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">{t("FORM.MENU.OPERATORS")}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={8} md={8}>
          <div className="card--form--head">
            <h4>{t("FORM.OPERATORS.COLUMNS.FULL_NAME")}</h4>
          </div>
        </Col>
        <Col xs={6} md={6}>
          <div className="card--form--head">
            <h4>{t("FORM.OPERATORS.COLUMNS.EMPLOYEE_NUMBER")}</h4>
          </div>
        </Col>
        <Col xs={6} md={10}>
          <div className="card--form--head">
            <h4>{t("FORM.OPERATORS.COLUMNS.CERTIFICATES")}</h4>
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
                      {t("FORM.OPERATORS.ADD_ROW")}
                    </Button>

                    <div className="search--input">
                      <Input
                        custom={"search--input--custom"}
                        placeholder={t("FORM.OPERATORS.SEARCH_OPERATOR")}
                      />
                    </div>
                  </Form.Item>
                  {fields.map((field) => (
                    <div key={field.key}>
                      <Row gutter={[16, 8]} align="middle" className="m-16">
                        <Col xs={8} md={8}>
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
                        <Col xs={6} md={6}>
                          <Form.Item {...field}>
                            {faker.random.number()}
                          </Form.Item>
                        </Col>
                        <Col xs={6} md={6}>
                          <Form.Item {...field}>
                          <div className="access--type">
                            <BsCheck className="green" />
                            <span>{faker.random.number()}</span>
                          </div>
                          </Form.Item>
                        </Col>
                        <Col xs={4} md={4}>
                          <div className="btn--icon">
                            <CloseOutlined
                              onClick={() => remove(field.name)}
                            />
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
