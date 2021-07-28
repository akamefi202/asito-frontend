import React, { useState, useEffect } from "react";
import { Col, Row, Form } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Card, Select, Button } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import { useQuery } from "@apollo/react-hooks";
import { DepartmentQueries } from "shared/graphql/queries";
import { messages } from "utils/helpers/message";
import { withoutRepetitions } from "utils/helpers/array";
import { delay } from "utils/helpers/delay";

const { DEPARTMENTS } = DepartmentQueries;

export default ({ t, formik }) => {
  const [form] = Form.useForm();
  const [departmentsSelect, setDepartmentsSelect] = useState([]);
  const [scanSelect, setScanSelect] = useState("");
  const [pageSelect, setPageSelect] = useState(1);
  const [skipSelect, setSkipSelect] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);
  const [takeSelect, setTakeSelect] = useState(50);
  const [scanStatus, setScanStatus] = useState(false);

  const departments = formik.values.departments;

  const variablesSelect = { scan: scanSelect, skip: skipSelect, take: takeSelect };

  useEffect(() => {
    form.setFieldsValue({ departments });
  }, [departments])

  const { loading } = useQuery(DEPARTMENTS, {
    variables: variablesSelect,
    onCompleted: ({ departments }) => {
      if (!departments || !departments.data) return;
      const select = departments.data.map((item) => ({ key: item.id, value: item.name }))
        .sort((a,b) => a.value.localeCompare(b.value));
      setTotalSelect(departments.count || 0);
      const selectAll = scanStatus ? select : withoutRepetitions([...departmentsSelect, ...select]);
      setScanStatus(false);
      setDepartmentsSelect(selectAll);
    },
    onError: (error) => {
      messages({ data: error });
    }
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
    const departments = data.departments.map(department => ({
      id: department && department.id || '',
    }));

    formik.setFieldValue("departments", departments);
  };

  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">{t("FORM.MENU.DEPARTAMENT")}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} md={24}>
          <div className="card--form--head">
            <h4>{t("FORM.DEPARTAMENT.COLUMNS.NAME")}</h4>
          </div>
        </Col>
      </Row>
      <Row className="w-100-100 card--form--list">
        <Col xs={24} sm={24}>
          <Form form={form}
                name="dynamic_form_nest_item"
                onValuesChange={onValuesChange}
                autoComplete="off">

            <Form.List name="departments">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(field => (
                      <div className="card--form--list--field" key={field.key}>
                        <Row gutter={[16, 8]} align="middle" className="m-16">
                          <Col xs={10} md={10}>
                            <Select placeholder={t("FORM.DEPARTAMENT.COLUMNS.NAME_PLACEHOLDER")}
                                    items={departmentsSelect}
                                    {...bindInputProps({prefix: true, name: `departments.${field.name}.id`, ...formik})}
                                    getSelect={getSelect}
                                    getScan={getScanSelect}
                                    loading={loading}/>
                          </Col>
                          <Col xs={10} md={10}/>
                          <Col xs={4} md={4}>
                            <div className="btn--icon">
                              <CloseOutlined onClick={() => remove(field.name)}/>
                            </div>
                          </Col>
                        </Row>
                      </div>
                  ))}
                    <Button buttonStyle={"btn--outline"}
                            icon={<span className="icon-Add-New btn--icon--right"/>}
                            onClick={() => add()}>
                        {t("FORM.DEPARTAMENT.ADD_ROW")}
                    </Button>
                </>
              )}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
