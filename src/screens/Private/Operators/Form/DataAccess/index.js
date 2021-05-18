import React, { useEffect, useState } from "react";
import { Col, Row, Form } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, Select, DatePicker, Button } from "shared/components";
import { ClientQueries } from "shared/graphql/queries";
import { useQuery } from "@apollo/react-hooks";
import { messages } from "utils/helpers/message";
import { bindInputProps } from "utils/helpers/input";
import { withoutRepetitions } from "utils/helpers/array";
import { delay } from "utils/helpers/delay";

const { CLIENTS } = ClientQueries;

export default ({ t, formik, deletedObjects, setDeletedObjects }) => {
  const [form] = Form.useForm();
  const [clientsSelect, setClientsSelect] = useState([]);
  const [scanSelect, setScanSelect] = useState("");
  const [pageSelect, setPageSelect] = useState(1);
  const [skipSelect, setSkipSelect] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);
  const [takeSelect, setTakeSelect] = useState(50);
  const [scanStatus, setScanStatus] = useState(false);
  const accesses = formik.values.accesses;

  const variablesSelect = { scan: scanSelect, skip: skipSelect, take: takeSelect };

  useEffect(() => {
    form.setFieldsValue({ accesses });
  }, [accesses])

  const { loading } = useQuery(CLIENTS, {
    variables: variablesSelect,
    onCompleted: ({ clients }) => {
      if (!clients || !clients.data) return;
      const select = clients.data.map((item) => ({ key: item.id, value: item.name }));
      setTotalSelect(clients.count || 0);
      const selectAll = scanStatus ? select : withoutRepetitions([...clientsSelect, ...select]);
      setScanStatus(false);
      setClientsSelect(selectAll);
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

  const onValuesChange = (_, data) => {
    const accesses = data.accesses.map(access => ({
      id: access.id || '',
      old: access.old || false,
      clientId: access.clientId || '',
      sharedOn: access.sharedOn || '',
      sharedUntil: access.sharedUntil || ''
    }));
    formik.setFieldValue("accesses", accesses);
  };

  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">{t("FORM.MENU.DATA_ACCESS")}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={8} md={8}>
          <div className="card--form--head">
            <h4>{t("FORM.DATA_ACCESS.COLUMNS.CLIENT")}</h4>
          </div>
        </Col>
        <Col xs={6} md={6}>
          <div className="card--form--head">
            <h4>{t("FORM.DATA_ACCESS.COLUMNS.SHARED_ON")}</h4>
          </div>
        </Col>
        <Col xs={6} md={10}>
          <div className="card--form--head">
            <h4>{t("FORM.DATA_ACCESS.COLUMNS.SHARED_UNTIL")}</h4>
          </div>
        </Col>
      </Row>
      <Row className="w-100-100 card--form--list">
        <Col xs={24} sm={24}>
          <Form form={form}
                name="dynamic_form_nest_item-1"
                onValuesChange={onValuesChange}
                autoComplete="off">
            <Form.List name="accesses">
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
                                                 name={[field.name, 'clientId']}
                                                 fieldKey={[field.fieldKey, 'clientId']}>
                                        <Select placeholder={t("FORM.DATA_ACCESS.ACCESS_PLACEHOLDER")}
                                                {...bindInputProps({ prefix: true, name: `accesses.${field.name}.clientId`, ...formik })}
                                                items={clientsSelect}
                                                getSelect={getSelect}
                                                getScan={getScanSelect}
                                                loading={loading}/>
                                      </Form.Item>
                                  )}
                                </Form.Item>
                              </Col>
                              <Col xs={6} md={6}>
                                <Form.Item {...field}
                                           name={[field.name, 'sharedOn']}
                                           fieldKey={[field.fieldKey, 'sharedOn']}>
                                  <DatePicker 
                                    {...bindInputProps({ prefix: true, name: `accesses.${field.name}.sharedOn`, ...formik })}
                                    placeholder={t("FORM.DATA_ACCESS.COLUMNS.SHARED_ON_PLACEHOLDER")}/>
                                </Form.Item>
                              </Col>
                              <Col xs={6} md={6}>
                                <Form.Item {...field}
                                           name={[field.name, 'sharedUntil']}
                                           fieldKey={[field.fieldKey, 'sharedUntil']}>
                                  <DatePicker 
                                    {...bindInputProps({ prefix: true, name: `accesses.${field.name}.sharedUntil`, ...formik })}
                                    placeholder={t("FORM.DATA_ACCESS.COLUMNS.SHARED_UNTIL_PLACEHOLDER")}/>
                                </Form.Item>
                              </Col>
                              <Col xs={4} md={4}>
                                <div className="btn--icon">
                                  <DeleteOutlined onClick={() => {
                                    const id = formik.values.accesses[field.name].id;
                                    if (id) setDeletedObjects([...deletedObjects, id]);
                                    remove(field.name);
                                  }}/>
                                </div>
                              </Col>
                            </Row>
                          </div>)
                      )}
                      <Form.Item>
                        <Button onClick={add} icon={<PlusOutlined className="btn--icon--right" />} buttonStyle={"btn--outline"}>
                          {t("FORM.DATA_ACCESS.ADD_ROW")}
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
