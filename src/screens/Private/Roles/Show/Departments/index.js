import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { Row, Col } from "antd";
import { Table } from "shared/components";
import Card from "shared/components/Card";

const columns = (t) => [
  {
    title: t("SHOW.DEPARTAMENT.COLUMNS.NAME"),
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (name, record) => (
      <Link className="custom-link" to={PATHS.DEPARTMENTS.SHOW.replace(":id", record.id)}>
        {name}
      </Link>
    ),
  },
  {
    title: t("SHOW.DEPARTAMENT.COLUMNS.TYPE"),
    dataIndex: "type",
    key: "type",
  },
  {
    title: t("SHOW.DEPARTAMENT.COLUMNS.LOCATION"),
    dataIndex: "location",
    key: "location"
  },
];

export default ({ t, departments }) => {
  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">{t("SHOW.MENU.DEPARTAMENT")}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Table
            columns={columns(t)}
            className="custom--table"
            data={departments}
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
