import React, { useState } from "react";
import { Row, Col, Checkbox } from "antd";
import { Card, Input, Select, DatePicker } from "shared/components";
import { useQuery } from "@apollo/react-hooks";
import { EmployeeQueries } from "shared/graphql/queries";
import { messages } from "utils/helpers/message";
import { bindInputProps } from "utils/helpers/input";
import { withoutRepetitions } from "utils/helpers/array";
import { REQUIRED_FIELD_SYMBOL } from "utils/constants";
import { delay } from "utils/helpers/delay";

const { EMPLOYEES } = EmployeeQueries;

export default ({ t, formik, certificateTypes }) => {
  const [employeesSelect, setEmployeesSelect] = useState([]);
  const [scanSelect, setScanSelect] = useState("");
  const [pageSelect, setPageSelect] = useState(1);
  const [skipSelect, setSkipSelect] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);
  const [takeSelect, setTakeSelect] = useState(50);
  const [scanStatus, setScanStatus] = useState(false);
  const [isExpiringCertificate, setIsExpiringCertificate] = useState(formik?.values?.validUntil);

  const variablesSelect = { scan: scanSelect, skip: skipSelect, take: takeSelect };

  const { loading } = useQuery(EMPLOYEES, {
    variables: variablesSelect,
    onCompleted: ({ employees }) => {
      if (!employees || !employees.data) return;
      const select = employees.data.map((item) => ({
        key: item.id,
        value: `${item.firstName} ${item.lastName}`
      }));
      setTotalSelect(employees.count || 0);
      const selectAll = scanStatus ? select : withoutRepetitions([...employeesSelect, ...select]);
      setScanStatus(false);
      setEmployeesSelect(selectAll);
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
              {t("FORM.GENERAL_INFORMATION.ISSUED_TO")} { REQUIRED_FIELD_SYMBOL }
            </label>
            <Select
              placeholder={t("FORM.GENERAL_INFORMATION.ISSUED_TO_PLACEHOLDER")}
              {...bindInputProps({ prefix: true, name: "employee.id", ...formik })}
              items={employeesSelect}
              getSelect={getSelect}
              getScan={getScanSelect}
              loading={loading}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.CERTIFICATE_NUMBER")} { REQUIRED_FIELD_SYMBOL }
            </label>
            <Input
              {...bindInputProps({ name: "number", ...formik })}
              placeholder={t(
                "FORM.GENERAL_INFORMATION.CERTIFICATE_NUMBER_PLACEHOLDER"
              )}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.CERTIFICATE_TYPE")} { REQUIRED_FIELD_SYMBOL }
            </label>
            <Select
              placeholder={t("FORM.GENERAL_INFORMATION.CERTIFICATE_TYPE_PLACEHOLDER")}
              {...bindInputProps({ name: "type", ...formik })}
              items={certificateTypes.map(ct => ({key: ct.id, value: ct.type}))}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.ISSUED_ON")} { REQUIRED_FIELD_SYMBOL }
            </label>
            <DatePicker
              {...bindInputProps({ name: "issuedOn", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.ISSUED_ON_PLACEHOLDER")}
            />
          </div>
        </Col>

        <div className="card--form--item-checkbox">
          <Checkbox checked={isExpiringCertificate} onChange={event => setIsExpiringCertificate(event.target.checked)}>
            {t("FORM.GENERAL_INFORMATION.EXPIRATION_DATE")}
          </Checkbox>
        </div>

        {isExpiringCertificate && <Col xs={24} sm={24} md={12} lg={12}>
            <div className="card--form--item">
              <label className="card--form--item--label">
                {t("FORM.GENERAL_INFORMATION.VALID_MONTHS")}
              </label>
              <Input {...bindInputProps({ name: "validForMonths", ...formik })}
                  placeholder={t("FORM.GENERAL_INFORMATION.MONTHS_NUMBER_PLACEHOLDER")}
              />
            </div>
          </Col>}
        {isExpiringCertificate && <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.VALID_YEAR")}
            </label>
            <Input {...bindInputProps({ name: "validForYears", ...formik })}
                placeholder={t("FORM.GENERAL_INFORMATION.YEAR_NUMBER_PLACEHOLDER")}
            />
          </div>
        </Col>}
      </Row>
    </Card>
  );
};
