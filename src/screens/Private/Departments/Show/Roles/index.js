import React, {useState} from "react";
import { Row, Col } from "antd";
import { Table } from "shared/components";
import Card from "shared/components/Card";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";

const columns = (t) => [
  {
    title: t("SHOW.ROLES.COLUMNS.NAME"),
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text, record) => (
      <Link 
        className="custom-link" 
        to={PATHS.ROLES.SHOW.replace(":id", record.id)}>
          {text}
      </Link>
    ),
  },
  {
    title: t("SHOW.ROLES.COLUMNS.EMPLOYEE"),
    dataIndex: "employeeRoles",
    key: "employeeRoles",
    render: (employeeRoles, record) => {
      const operatorAmount = employeeRoles ? employeeRoles.length : 0;
      const maxAmount = record && record.numberOfEmployeesRequired ? record.numberOfEmployeesRequired : 0;
      return [operatorAmount, '/', maxAmount].join('')
    }
  }
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
            onRow={() => ({
              onClick: () => {},
            })}
          />
        </Col>
      </Row>
    </Card>
  );
};
