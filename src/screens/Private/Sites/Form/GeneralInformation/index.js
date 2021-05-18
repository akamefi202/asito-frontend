import React, { useState } from "react";
import { Row, Col, Radio } from "antd";
import { Card, Input, Select } from "shared/components";
import { bindInputProps } from "utils/helpers/input";
import { useQuery } from "@apollo/react-hooks";
import { ClientQueries } from "shared/graphql/queries";
import { messages } from "utils/helpers/message";
import { withoutRepetitions } from "utils/helpers/array";
import { delay } from "utils/helpers/delay";

const { CLIENTS } = ClientQueries;

export default ({ t, formik }) => {
  const [clientsSelect, setClientsSelect] = useState([]);
  const [scanSelect, setScanSelect] = useState("");
  const [pageSelect, setPageSelect] = useState(1);
  const [skipSelect, setSkipSelect] = useState(0);
  const [totalSelect, setTotalSelect] = useState(0);
  const [takeSelect, setTakeSelect] = useState(50);
  const [scanStatus, setScanStatus] = useState(false);

  const variablesSelect = { scan: scanSelect, skip: skipSelect, take: takeSelect };

  const { loading } = useQuery(CLIENTS, {
    variables: variablesSelect,
    onCompleted: ({ clients }) => {
      if (!clients || !clients.data) return;
      const select = clients.data.map((item) => ({key: item.id, value: item.name}));
      setTotalSelect(clients.count || 0);
      const selectAll = scanStatus ? select : withoutRepetitions([...clientsSelect, ...select]);
      setScanStatus(false);
      setClientsSelect(selectAll);
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

        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.CLIENT")}
            </label>
            <Select 
              {...bindInputProps({ prefix: true, name: "client.id", ...formik })}
              items={clientsSelect}
              getSelect={getSelect}
              getScan={getScanSelect}
              loading={loading}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.SITE_NAME")}
            </label>
            <Input
              {...bindInputProps({ name: "name", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.SITE_NAME_PLACEHOLDER")}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.OPERATIRS_REQUIRED")}
            </label>
            <Input
              {...bindInputProps({ name: "numberOfOperatorsRequired", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.OPERATIRS_REQUIRED_PLACEHOLDER")}
            />
          </div>
        </Col>

      </Row>
    </Card>
  );
};
