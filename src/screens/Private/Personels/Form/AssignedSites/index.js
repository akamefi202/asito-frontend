import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Select, DatePicker, Button, } from "shared/components";
import { SiteQueries } from "shared/graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { bindInputProps } from "utils/helpers/input";
import { messages } from "utils/helpers/message";
import { withoutRepetitions } from "utils/helpers/array";
import { delay } from "utils/helpers/delay";

const { SITES } = SiteQueries;

export default ({ t, formik, deletedObjects, setDeletedObjects }) => {
  const [form] = Form.useForm();
  const [sitesSelect, setSitesSelect] = useState([]);
  const [scanSelect, setScanSelect] = useState("");
  const [pageSelect, setPageSelect] = useState(1);
  const [skipSelect, setSkipSelect] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);
  const [takeSelect, setTakeSelect] = useState(50);
  const [scanStatus, setScanStatus] = useState(false);
  const operatorSites = formik.values.operatorSites;

  const variablesSelect = { scan: scanSelect, skip: skipSelect, take: takeSelect };

  useEffect(() => {
    form.setFieldsValue({ operatorSites });
  }, [operatorSites])

  const { loading } = useQuery(SITES, {
    variables: variablesSelect,
    onCompleted: ({ sites }) => {
      if (!sites || !sites.data) return;
      const select = sites.data.map((item) => ({ key: item.id, value: item.name }));
      setTotalSelect(sites.count || 0);
      const selectAll = scanStatus ? select : withoutRepetitions([...sitesSelect, ...select]);
      setScanStatus(false);
      setSitesSelect(selectAll);
    },
    onError: (error) => messages({ data: error })
  });

  const getSelect = () => {
    if ((totalSelect <= skipSelect) || (takeSelect >= totalSelect)) return;
    const page = pageSelect;
    setPageSelect(page + 1);
    setSkipSelect(takeSelect * page);
  }

  const getScanSelect = (value) => {
    delay(() => {
      setPageSelect(1);
      setSkipSelect(0);
      setScanSelect(value);
      setScanStatus(true);
    }, 500);
  }

  const onValuesChange = (currentData, data) => {
    const changedItemIndex = currentData.operatorSites.findIndex(site => !!site);
    const operatorSites = data.operatorSites.map((site, index) => ({
      id: site.id || '',
      old: changedItemIndex !== -1 && changedItemIndex === index ? false : site.old,
      siteId: site.siteId || '',
      assignedFrom: site.assignedFrom || '',
      assignedUntil: site.assignedUntil || '',
    }));
    formik.setFieldValue("operatorSites", operatorSites);
  };

  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">{t("FORM.MENU.ASSIGNED_SITES")}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={8} md={8}>
          <div className="card--form--head">
            <h4>{t("FORM.ASSIGNED_SITES.COLUMNS.SITE_NAME")}</h4>
          </div>
        </Col>
        <Col xs={6} md={6}>
          <div className="card--form--head">
            <h4>{t("FORM.ASSIGNED_SITES.COLUMNS.ASSIGNED_FROM")}</h4>
          </div>
        </Col>
        <Col xs={6} md={10}>
          <div className="card--form--head">
            <h4>{t("FORM.ASSIGNED_SITES.COLUMNS.ASSIGNED_UNTIL")}</h4>
          </div>
        </Col>
      </Row>
      <Row className="w-100-100 card--form--list">
        <Col xs={24} sm={24}>
          <Form
            form={form}
            name="dynamic_form_nest_item-2"
            onValuesChange={onValuesChange}
            autoComplete="off"
          >
            <Form.List name="operatorSites">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div className="card--form--list--field" key={field.key}>
                      <Row gutter={[16, 8]} align="middle" className="m-16">
                        <Col xs={8} md={8}>
                          <Form.Item noStyle
                            shouldUpdate={(prevValues, curValues) =>
                              prevValues.area !== curValues.area ||
                              prevValues.sights !== curValues.sights
                            }>
                            {() => (
                              <Form.Item {...field}
                                name={[field.name, 'siteId']}
                                fieldKey={[field.fieldKey, 'siteId']}>
                                <Select placeholder={t("FORM.ASSIGNED_SITES.SITES_PLACEHOLDER")}
                                  {...bindInputProps({ prefix: true, name: `operatorSites.${field.name}.siteId`, ...formik })}
                                  items={sitesSelect}
                                  getSelect={getSelect}
                                  getScan={getScanSelect}
                                  loading={loading} />
                              </Form.Item>
                            )}
                          </Form.Item>
                        </Col>
                        <Col xs={6} md={6}>
                          <Form.Item {...field}
                            name={[field.name, 'assignedFrom']}
                            fieldKey={[field.fieldKey, 'assignedFrom']}>
                            <DatePicker 
                              {...bindInputProps({ prefix: true, name: `operatorSites.${field.name}.assignedFrom`, ...formik })}
                              placeholder={t("FORM.ASSIGNED_SITES.COLUMNS.ASSIGNED_FROM_PLACEHOLDER")} />
                          </Form.Item>
                        </Col>
                        <Col xs={6} md={6}>
                          <Form.Item {...field}
                            name={[field.name, 'assignedUntil']}
                            fieldKey={[field.fieldKey, 'assignedUntil']}>
                            <DatePicker 
                            {...bindInputProps({ prefix: true, name: `operatorSites.${field.name}.assignedUntil`, ...formik })}
                            placeholder={t("FORM.ASSIGNED_SITES.COLUMNS.ASSIGNED_UNTIL_PLACEHOLDER")} />
                          </Form.Item>
                        </Col>
                        <Col xs={4} md={4}>
                          <div className="btn--icon">
                            <CloseOutlined onClick={() => {
                              const id = formik.values.operatorSites[field.name].id;
                              if (id) setDeletedObjects([...deletedObjects, id]);
                              remove(field.name)
                            }} />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Form.Item>
                    <Button onClick={add} icon={<PlusOutlined className="btn--icon--right" />} buttonStyle={"btn--outline"}>
                      {t("FORM.ASSIGNED_SITES.ADD_ROW")}
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
