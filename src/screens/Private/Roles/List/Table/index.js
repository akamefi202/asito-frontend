import React from "react";
import { Table } from "shared/components";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";

const columns = (t) => [
  {
    title: t("LIST.COLUMNS.NAME"),
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: t("LIST.COLUMNS.DEPARTAMENT"),
    dataIndex: "departments",
    key: "departments",
    render: (departments) => departments ? departments.length : 0
  },
  {
    title: t("LIST.COLUMNS.REQUIREMENTS"),
    dataIndex: "requirements",
    key: "requirements",
    render: (requirements) => requirements ? requirements.length : 0,
  },
  {
    title: t("LIST.COLUMNS.EMPLOYEES"),
    dataIndex: "numberOfEmployeesRequired",
    key: "numberOfEmployeesRequired",
    render: (number, record) => (
      <span>
        {`${record.employeeRoles && record.employeeRoles.length || 0}/${number}`}
      </span>
    ),
  },
  {
    title: t("LIST.COLUMNS.STATUS"),
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <span className={text === "ACTIVE" ? "green" : "yellow"}>
        {t(`STATUS_CODE.${text}`)}
      </span>
    ),
  },
];

export default ({ t, roles, take, setTake, setSkip, total, page, setPage}) => {
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
      data={roles}
      total={total}
      pageSize={take}
      rowKey={"id"}
      page={page}
      onPageChange={onPageChange}
      onShowSizeChange={onShowSizeChange}
      onRow={(record) => {
        return {
          onClick: () =>
            history.push(PATHS.ROLES.SHOW.replace(":id", record.id)),
        };
      }}
    />
  );
};
