import React from "react";
import { Row, Col } from "antd";
import { Table } from "shared/components";
import Card from "shared/components/Card";
import { dateToString } from "utils/helpers/moment";

const columns = (t) => [
  {
    title: t("SHOW.ATTACHMENTS.COLUMNS.FILE_NAME"),
    dataIndex: "name",
    key: "name",
    render: (name, record) => (<a href={record.url} target="_blank" rel="noreferrer" className="custom-link">{name}</a>)
  },
  {
    title: t("SHOW.ATTACHMENTS.COLUMNS.FILE_TYPE"),
    dataIndex: "type",
    key: "type",
  },
  {
    title: t("SHOW.ATTACHMENTS.COLUMNS.UPLOAD_DATE"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt) => (<span>{dateToString(updatedAt, "DD-MM-YYYY")}</span>),
  },
];

export default ({ t, attachments }) => {

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">{t("SHOW.MENU.ATTACHMENTS")}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Table
            columns={columns(t)}
            className="custom--table"
            data={attachments}
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
