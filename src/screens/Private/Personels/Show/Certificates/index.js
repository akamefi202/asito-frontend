import React, { useState } from "react";
import { Row, Col } from "antd";
import { Card, Table, Spin } from "shared/components";
import { dateToString } from "utils/helpers/moment";
import { CERTIFICATES_TYPE } from "shared/constants/certificatesType";

const columns = (t) => [
  {
    title: t("SHOW.CERTIFICATES.COLUMNS.CERTIFICATE_NUMBER"),
    dataIndex: "number",
    key: "number",
    sorter: (a, b) => a.number.localeCompare(b.number),
    render: (number) => (<span className="custom-link">{number}</span>),
  },
  {
    title: t("SHOW.CERTIFICATES.COLUMNS.CERTIFICATE_TYPE"),
    dataIndex: ["requirement", "type"],
    key: "type",
    render: (type) => {
      const certificateType = CERTIFICATES_TYPE.find(item => item.key === type);
      return certificateType ? certificateType.value : "";
    },
  },
  {
    title: t("SHOW.CERTIFICATES.COLUMNS.ISSUED_ON"),
    dataIndex: "issuedOn",
    key: "issuedOn",
    render: (issuedOn) => (<span>{dateToString(issuedOn, "DD-MM-YYYY")}</span>)
  },
  {
    title: t("SHOW.CERTIFICATES.COLUMNS.VALID_UNTIL"),
    dataIndex: "validUntil",
    key: "validUntil",
    render: (validUntil) => (<span>{dateToString(validUntil, "DD-MM-YYYY")}</span>),
  },
];

export default ({ t, certificates, take, setTake, setSkip, total, loading }) => {
  const [page, setPage] = useState(1);

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onShowSizeChange = (current, size) => {
    setTake(size);
  }

  return (
    <Card cardStyle={"card--details"}>
      <Spin spinning={loading}>
        <Row>
          <Col xs={24}>
            <h2 className="card--details--title">
              {t('SHOW.MENU.CERTIFICATES')}
            </h2>
          </Col>
        </Row>
        <Row className="w-100-100">
          <Col xs={24} sm={24}>
            <Table
              columns={columns(t)}
              className="custom--table"
              data={certificates}
              page={page}
              total={total}
              pageSize={take}
              onPageChange={onPageChange}
              onShowSizeChange={onShowSizeChange}
              rowKey={"id"}
              onRow={(record) => {
                return {
                  onClick: () => { },
                };
              }}
            />
          </Col>
        </Row>
      </Spin>
    </Card>
  );
};

