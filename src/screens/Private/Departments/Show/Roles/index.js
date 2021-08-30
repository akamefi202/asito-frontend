import React, {useState} from "react";
import { Row, Col } from "antd";
import { useQuery } from "@apollo/react-hooks";
import { DepartmentQueries } from "shared/graphql/queries";
import { messages } from "utils/helpers/message";
import Card from "shared/components/Card";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { TableFormControl } from "shared/components/TableFormControl/TableFormControl";

const columns = (t) => [
  {
    title: t("SHOW.ROLES.COLUMNS.NAME"),
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (text, record) => (
      <Link 
        className="custom-link" 
        to={PATHS.ROLES.SHOW.replace(":id", record?.id)}>
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

const { ROLE_DEPARTMENTS } = DepartmentQueries;

export default ({ t, departmentId: id }) => {
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState([{name: 'updatedAt', type: 'DESC'}]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [roles, setRoles] = useState([]);
  const [total, setTotal] = useState(0);

  const {loading: loadingData } = useQuery(ROLE_DEPARTMENTS, {
    variables: {roleDepartmentsWhere: {department: {id}}, skip, take, orderBy: sortType },
    onCompleted: ({roleDepartments}) => {
      const roles = roleDepartments.data.map(x => x.role);
      setRoles(roles);
      setTotal(roleDepartments.count)
    },
    onError: (error) => {
      messages({ data: error });
    }
  });

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onChange = (pagination, filters, sorter) => {
    if (pagination.current !== page) return;
    onPageChange(1);

    setSortType([sorter.order
       ? {name: 'role.name', type: sorter.order === 'descend' ? 'DESC' : 'ASC'}
       : {name: 'updatedAt', type: 'DESC'}]);
  }

  const onShowSizeChange = (current, size) => setTake(size);

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
          <TableFormControl
            columns={columns(t)}
            loading={loadingData}
            className="custom--table"
            dataSource={roles}
            rowKey={"id"}
            onPageChange={onPageChange}
            onShowSizeChange={onShowSizeChange}
            total={total}
            pageSize={take}
            page={page}
            onChange={onChange}
            onRow={() => ({
              onClick: () => {},
            })}
          />
        </Col>
      </Row>
    </Card>
  );
};
