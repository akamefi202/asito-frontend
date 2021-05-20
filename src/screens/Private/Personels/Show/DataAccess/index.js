import React, { useState } from "react";
import { Row, Col } from "antd";
import { Card, Table, Spin } from "shared/components";
import { dateToString } from "utils/helpers/moment";

const columns = (t) => [
  {
    title: t("SHOW.DATA_ACCESS.COLUMNS.CLIENT"),
    dataIndex: "client",
    key: "client",
    sorter: (a, b) => a.client.localeCompare(b.client),
    render: (client) => {
      const name = client && client.name ? client.name : '';
      return <span className="custom-link">{name}</span>
    },
  },
  {
    title: t("SHOW.DATA_ACCESS.COLUMNS.SHARED_ON"),
    dataIndex: "sharedOn",
    key: "sharedOn",
    render: (sharedOn) => (<span>{dateToString(sharedOn, "DD-MM-YYYY")}</span>)
  },
  {
    title: t("SHOW.DATA_ACCESS.COLUMNS.SHARED_UNTIL"),
    dataIndex: "sharedUntil",
    key: "sharedUntil",
    render: (sharedOUntil) => (<span>{dateToString(sharedOUntil, "DD-MM-YYYY")}</span>)
  },
];

export default ({ t, accesses, take, setTake, setSkip, total, loading }) => {
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
              {t("SHOW.MENU.DATA_ACCESS")}
            </h2>
          </Col>
        </Row>
        <Row className="w-100-100">
          <Col xs={24} sm={24}>
            <Table
              columns={columns(t)}
              className="custom--table"
              data={accesses}
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
