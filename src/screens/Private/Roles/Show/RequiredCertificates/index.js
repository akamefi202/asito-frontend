import React, { useState } from "react";
import { Row, Col } from "antd";
import { Card, Table } from "shared/components";
import { dateToString } from "utils/helpers/moment";

const columns = (t) => [
  {
    title: t('SHOW.REQUIREMENTS.COLUMNS.CERTIFICATE_TYPE'),
    dataIndex: "type",
    key: "type",
    sorter: (a, b) => a.type.localeCompare(b.type),
  },
  {
    title: t('SHOW.REQUIREMENTS.COLUMNS.VALID_UNTIL'),
    dataIndex: "validAtLeastUntil",
    key: "validAtLeastUntil",
    render: (validAtLeastUntil) => dateToString(validAtLeastUntil),
  },
];

export default ({ t, role }) => {
  const requirements = role && role.requirements ? role.requirements : [];
  const [page, setPage] = useState(1);
  const [take, setTake] = useState(10);

  const onPageChange = (page) => {
    setPage(page);
  };

  const onShowSizeChange = (current, size) => {
    setTake(size);
  }

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">{t('SHOW.MENU.REQUIREMENTS')}</h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Table
            columns={columns(t)}
            className="custom--table"
            data={requirements}
            rowKey={"id"}
            total={requirements.length}
            page={page}
            pageSize={take}
            onPageChange={onPageChange}
            onShowSizeChange={onShowSizeChange}
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
