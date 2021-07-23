import React from "react";
import { Table } from "shared/components";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";

const columns = (t) => [
  {
    title: t("LIST.COLUMNS.NAME"),
    dataIndex: "full_mame",
    key: "full_mame",
    sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    render: (_, column) => (
      <span>{`${column.firstName} ${column.lastName}`}</span>
    ),
  },
  {
    title: t("LIST.COLUMNS.NUMBER"),
    dataIndex: "number",
    key: "number",
  },
  {
    title: t("LIST.COLUMNS.CERTIFICATES"),
    dataIndex: "certificates",
    key: "certificates",
    render: (certificates) => certificates ? certificates.length : 0
  },
  {
    title: t("LIST.COLUMNS.ROLE"),
    dataIndex: ["employeeRoles"],
    key: "employeeRoles",
    render: (employeeRoles) => employeeRoles && employeeRoles.length || 0,
  },
];

export default ({ t, employees, take, setTake, setSkip, page, setPage, total }) => {
  const history = useHistory();

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onShowSizeChange = (current, size) => {
    setTake(size);
  }

  return (
    <Table
      columns={columns(t)}
      className="table--custom"
      data={employees}
      total={total}
      rowKey={"id"}
      page={page}
      pageSize={take}
      onPageChange={onPageChange}
      onShowSizeChange={onShowSizeChange}
      onRow={(record) => {
        return {
          onClick: () =>
            history.push(`${PATHS.EMPLOYEES.SHOW.replace(":id", record.id)}`),
        };
      }}
    />
  );
};
