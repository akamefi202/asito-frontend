import React, { useState } from "react";
import { Row, Col } from "antd";
import { Card, Input, Select, DatePicker } from "shared/components";
import { CERTIFICATES_TYPE } from "shared/constants/certificatesType";
import { useQuery } from "@apollo/react-hooks";
import { OperatorQueries } from "shared/graphql/queries";
import { messages } from "utils/helpers/message";
import { bindInputProps } from "utils/helpers/input";
import { withoutRepetitions } from "utils/helpers/array";
import { delay } from "utils/helpers/delay";

const {OPERATORS} = OperatorQueries;

export default ({ t, formik }) => {
  const [operatorsSelect, setOperatorsSelect] = useState([]);
  const [scanSelect, setScanSelect] = useState("");
  const [pageSelect, setPageSelect] = useState(1);
  const [skipSelect, setSkipSelect] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);
  const [takeSelect, setTakeSelect] = useState(50);
  const [scanStatus, setScanStatus] = useState(false);

  const variablesSelect = { scan: scanSelect, skip: skipSelect, take: takeSelect };

  const { loading } = useQuery(OPERATORS, {
    variables: variablesSelect,
    onCompleted: ({operators}) => {
      if (!operators || !operators.data) return;
      const select = operators.data.map((item) => ({ 
        key: item.id, 
        value: `${item.firstName} ${item.lastName}` 
      }));
      setTotalSelect(operators.count || 0);
      const selectAll = scanStatus ? select : withoutRepetitions([...operatorsSelect, ...select]);
      setScanStatus(false);
      setOperatorsSelect(selectAll);
    },
    onError: (error) => {
        messages({data: error});
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
              {t("FORM.GENERAL_INFORMATION.ISSUED_TO")}
            </label>
            <Select
              placeholder={t("FORM.GENERAL_INFORMATION.ISSUED_TO_PLACEHOLDER")}
              {...bindInputProps({ prefix: true, name: "operator.id", ...formik })}
              items={operatorsSelect}
              getSelect={getSelect}
              getScan={getScanSelect}
              loading={loading}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.CERTIFICATE_NUMBER")}
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
              {t("FORM.GENERAL_INFORMATION.CERTIFICATE_TYPE")}
            </label>
            <Select
              {...bindInputProps({ name: "type", ...formik })}
              items={CERTIFICATES_TYPE}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.ISSUED_ON")}
            </label>
            <DatePicker
              {...bindInputProps({ name: "issuedOn", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.ISSUED_ON_PLACEHOLDER")}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.VALID_UNTIL")}
            </label>
            <DatePicker
              {...bindInputProps({ name: "validUntil", ...formik })}
              placeholder={t(
                "FORM.GENERAL_INFORMATION.VALID_UNTIL_PLACEHOLDER"
              )}
            />
          </div>
        </Col>
      </Row>
    </Card>
  );
};
