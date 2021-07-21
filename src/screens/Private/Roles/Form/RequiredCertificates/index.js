import React, { useEffect } from "react";
import { Col, Row, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Card, Select, DatePicker, Button } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import cuid from "cuid";

export default ({ t, formik, certificateTypes }) => {
  const [form] = Form.useForm();

  const requirements = formik.values.requirements;

  useEffect(() => {
    form.setFieldsValue({requirements});
  }, [requirements])

  const onValuesChange = (_, data) => {
    const requirements = data.requirements.map(requirement => ({
      id: requirement && requirement.id || '',
      validAtLeastUntil: requirement && requirement.validAtLeastUntil || '',
    }));

    formik.setFieldValue("requirements", requirements);
  };

  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">{t("FORM.MENU.REQUIREMENTS")}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={10} md={10}>
          <div className="card--form--head">
            <h4>{t("FORM.REQUIREMENTS.COLUMNS.CERTIFICATE_TYPE")}</h4>
          </div>
        </Col>
        <Col xs={14} md={14}>
          <div className="card--form--head">
            <h4>{t("FORM.REQUIREMENTS.COLUMNS.VALID_UNTIL")}</h4>
          </div>
        </Col>
      </Row>
      <Row className="w-100-100 card--form--list">
        <Col xs={24} sm={24}>
          <Form
            form={form}
            name="dynamic_form_nest_item"
            onValuesChange={onValuesChange}
            autoComplete="off"
          >
            <Form.List name="requirements">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div className="card--form--list--field" key={field.key}>
                      <Row gutter={[16, 8]} align="middle" className="m-16">
                        <Col xs={10} md={10}>
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                              prevValues.area !== curValues.area ||
                              prevValues.sights !== curValues.sights
                            }
                          >
                            {() => (
                              <Form.Item
                                {...field}
                                name={[field.name, 'id']}
                                fieldKey={[field.fieldKey, 'id']}
                              >
                                <Select
                                  placeholder={t("FORM.REQUIREMENTS.COLUMNS.CERTIFICATE_TYPE_PLACEHOLDER")}
                                  {...bindInputProps({ prefix: true, name: `requirements.${field.name}.id`, ...formik })}
                                  items={certificateTypes}
                                />
                              </Form.Item>
                            )}
                          </Form.Item>
                        </Col>
                        <Col xs={10} md={10}>
                          <Form.Item
                            {...field}
                            name={[field.name, 'validAtLeastUntil']}
                            fieldKey={[field.fieldKey, 'validAtLeastUntil']}
                          >
                            <DatePicker
                              {...bindInputProps({ prefix: true, name: `requirements.${field.name}.validAtLeastUntil`, ...formik })}
                              placeholder={t(
                                "FORM.REQUIREMENTS.COLUMNS.VALID_UNTIL_PLACEHOLDER"
                              )}
                            />
                          </Form.Item>
                        </Col>
                        <Col xs={4} md={4}>
                          <div className="btn--icon">
                            <CloseOutlined onClick={() => remove(field.name)} />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}

                  <Form.Item>
                    <Button
                      onClick={() => add()}
                      icon={<span className="icon-Add-New btn--icon--right" />}
                      buttonStyle={"btn--outline"}
                    >
                      {t("FORM.REQUIREMENTS.ADD_ROW")}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
