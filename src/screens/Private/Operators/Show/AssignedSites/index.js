import React from "react";
import { Row, Col } from "antd";
import { Card, Table } from "shared/components";
import {dateToString} from "utils/helpers/moment";

const columns = (t) => [
  {
    title: t("SHOW.ASSIGNED_SITES.COLUMNS.SITE_NAME"),
    dataIndex: "site",
    key: "name",
    render: (site) => {
      if (!site || !site.name) return '';
      return (<span className="custom-link">{site.name}</span>)
    }
  },
  {
    title: t("SHOW.ASSIGNED_SITES.COLUMNS.CLIENT"),
    dataIndex: "site",
    key: "client",
    render: (site) => {
      if (!site || !site.client || !site.client.name) return '';
      return site && site.client && site.client.name ? site.client.name : '';
    }
  },
  {
    title: t("SHOW.ASSIGNED_SITES.COLUMNS.ASSIGNED_FROM"),
    dataIndex: "assignedFrom",
    key: "assignedFrom",
    render: (assignedFrom) => {
      if (!assignedFrom) return;
      return (<span>{dateToString(assignedFrom, "DD-MM-YYYY")}</span>);
    }
  },
  {
    title: t("SHOW.ASSIGNED_SITES.COLUMNS.ASSIGNED_UNTIL"),
    dataIndex: "assignedUntil",
    key: "assignedUntil",
    render: (assignedFrom) => {
      if (!assignedFrom) return;
      return (<span>{dateToString(assignedFrom, "DD-MM-YYYY")}</span>);
    }
  },
];

export default ({ t, sites, total }) => {

  return (
    <Card cardStyle={"card--details"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">
            {t("SHOW.MENU.ASSIGNED_SITES")} {`(${total})`}
          </h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Table
            columns={columns(t)}
            className="custom--table"
            data={sites}
            rowKey={"id"}
            onRow={(record) => {
              return {
                onClick: () => {},
              };
            }}
          />
        </Col>
      </Row>
    </Card>
  );
};
