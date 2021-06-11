import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { Row, Col } from "antd";
import { Card, Table } from "shared/components";

const columns = (t) => [
  {
    title: t("SHOW.ROLES.COLUMNS.NAME"),
    dataIndex: ["role", "name"],
    key: "name",
    sorter: (a, b) => a.role.name.localeCompare(b.role.name),
    render: (name, record) => (
      <Link 
        className="custom-link" 
        to={PATHS.ROLES.SHOW.replace(":id", record.role.id)}>
          {name}
      </Link>
    ),
  },
  {
    title: t("SHOW.ROLES.COLUMNS.PROTOCOLS"),
    dataIndex: ["role", "protocols"],
    key: "protocols",
    render: (protocols) => (
      <div className="access--type">
        <span className="icon icon-Check green"></span>
        <span>{t('SHOW.ROLES.COLUMNS.ACCEPTED')}</span>
      </div>
    )
  },
];

export default ({ t, roles }) => {
  const [page, setPage] = useState(1);

  const onPageChange = (page) => {
    setPage(page);
  };

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">
            {t("SHOW.MENU.ROLES")}
          </h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Table
            columns={columns(t)}
            className="custom--table"
            data={roles}
            page={page}
            total={roles.length}
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
