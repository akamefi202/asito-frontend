import React, { useState } from "react";
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
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);
  const [skip, setSkip] = useState(0);

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onChange = (pagination, filters, sorter) => {
    if (pagination.current === page) onPageChange(1);
  }

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
            onPageChange={onPageChange}
            total={departments.length}
            pageSize={10}
            page={page}
            onChange={onChange}
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
