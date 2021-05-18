import React, { useState } from "react";
import { Row, Col } from "antd";
import { Card, Table } from "shared/components";
import { dateToString } from "utils/helpers/moment";
import { CERTIFICATES_TYPE } from "shared/constants/certificatesType";

const columns = (t) => [
  {
    title: t('SHOW.REQUIREMENTS.COLUMNS.CERTIFICATE_TYPE'),
    dataIndex: "type",
    key: "type",
    render: (type) => {
      const certificateType = CERTIFICATES_TYPE.find(item => item.key === type);
      return certificateType ? certificateType.value : "";
    },
  },
  {
    title: t('SHOW.REQUIREMENTS.COLUMNS.VALID_UNTIL'),
    dataIndex: "validAtLeastUntil",
    key: "validAtLeastUntil",
    render: (validAtLeastUntil) => dateToString(validAtLeastUntil),
  },
];

export default ({ t, site }) => {
  const requirements = site && site.requirements ? site.requirements : [];
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
          <h2 className="card--details--title">{t('SHOW.MENU.REQUIREMENTS') + ' (' + requirements.length + ')'}</h2>
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
