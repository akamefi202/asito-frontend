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
    render: (validAtLeastUntil) => validAtLeastUntil ? dateToString(validAtLeastUntil) : t('SHOW.REQUIREMENTS.INFINITE'),
  },
];

export default ({ t, role, requirements }) => {
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
            data={requirements.map((x => ({validAtLeastUntil: x.validAtLeastUntil, type: x.requirement.type, id: x.id})))}
            rowKey={"id"}
            onPageChange={onPageChange}
            total={requirements.length}
            pageSize={take}
            page={page}
            onChange={onChange}
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
