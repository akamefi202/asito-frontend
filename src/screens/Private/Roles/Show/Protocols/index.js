import React from "react";
import { Row, Col } from "antd";
import { Table } from "shared/components";
import Card from "shared/components/Card";
import {dateToString} from "utils/helpers/moment";

const columns = (t) => [
  {
    title: t("SHOW.PROTOCOLS.COLUMNS.FILE_NAME"),
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (name, record) => (<a className="custom-link" href={record.url} target="_blank" rel="noreferrer">{name}</a>),
  },
  {
    title: t("SHOW.PROTOCOLS.COLUMNS.FILE_TYPE"),
    dataIndex: "type",
    key: "type",
  },
  {
    title: t("SHOW.PROTOCOLS.COLUMNS.UPLOAD_DATE"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt) => (<span>{dateToString(updatedAt, "DD-MM-YYYY")}</span>),
  },
];

export default ({ t, protocols }) => {
  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">{t("SHOW.MENU.PROTOCOLS")}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Table
            columns={columns(t)}
            className="custom--table"
            data={protocols}
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
