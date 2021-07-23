import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { Row, Col } from "antd";
import { Card, Table } from "shared/components";
import { dateToString } from "utils/helpers/moment";
import { CERTIFICATES_TYPE } from "shared/constants/certificatesType";

const columns = (t) => [
  {
    title: t("SHOW.CERTIFICATES.COLUMNS.CERTIFICATE_NUMBER"),
    dataIndex: "number",
    key: "number",
    sorter: (a, b) => a.number.localeCompare(b.number),
    render: (number, record) => (
      <Link 
        className="custom-link" 
        to={PATHS.CERTIFICATES.SHOW.replace(":id", record.id)}>
          {number}
      </Link>
    ),
  },
  {
    title: t("SHOW.CERTIFICATES.COLUMNS.CERTIFICATE_TYPE"),
    dataIndex: ["requirement", "type"],
    key: "type",
    render: (type) => type
  },
  {
    title: t("SHOW.CERTIFICATES.COLUMNS.VALID_UNTIL"),
    dataIndex: "validUntil",
    key: "validUntil",
    render: (validUntil) => (<span>{dateToString(validUntil, "DD-MM-YYYY")}</span>),
  },
];

export default ({ t, certificates }) => {
  const [page, setPage] = useState(1);

  const onPageChange = (page) => {
    setPage(page);
  };

  return (
    <Card cardStyle={"card--details"}>
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
            total={certificates.length}
            onPageChange={onPageChange}
            rowKey={"id"}
            onRow={(record) => {
              return {
                onClick: () => { },
              };
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};

