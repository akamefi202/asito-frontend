import React, {useState} from "react";
import { Row, Col } from "antd";
import { Table } from "shared/components";
import Card from "shared/components/Card";
import {COUNTRY_LIST} from "shared/constants/country";

const columns = (t) => [
  {
    title: t("SHOW.SITES.COLUMNS.SITE_NAME"),
    dataIndex: "name",
    key: "name",
  },
  {
    title: t("SHOW.SITES.COLUMNS.LOCATION"),
    dataIndex: "location",
    key: "location",
    render: (_, record) => {
      const findCountry = COUNTRY_LIST.find(c => c.key === record.country);
      const country = findCountry ? findCountry.value : '';
      return(<span>{`${record.city} ${country}`}</span>)},
  },
  {
    title: t("SHOW.SITES.COLUMNS.OPERATORS"),
    dataIndex: "operatorSites",
    key: "operatorSites",
    render: (operatorSites, record) => {
      const operatorAmount = operatorSites ? operatorSites.length : 0;
      const maxAmount = record && record.numberOfOperatorsRequired ? record.numberOfOperatorsRequired : 0;
      return [operatorAmount, '/', maxAmount].join('')
    }
  }
];

export default ({ t, sites, take, setTake, setSkip, total }) => {
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
      <Row>
        <Col xs={24}>
          <h2 className="card--details--title">
            {t("SHOW.MENU.SITES")} {`(${total})`}
          </h2>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Table
            columns={columns(t)}
            className="custom--table"
            data={sites}
            page={page}
            total={total}
            pageSize={take}
            onPageChange={onPageChange}
            onShowSizeChange={onShowSizeChange}
            rowKey={"id"}
            onRow={() => ({
              onClick: () => {},
            })}
          />
        </Col>
      </Row>
    </Card>
  );
};
