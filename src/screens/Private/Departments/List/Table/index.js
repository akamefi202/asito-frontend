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
    title: t("LIST.COLUMNS.TYPE"),
    dataIndex: "number",
    key: "number",
  },
  {
    title: t("LIST.COLUMNS.LOCATION"),
    dataIndex: "address",
    key: "address",
  },
  {
    title: t("LIST.COLUMNS.ROLES"),
    dataIndex: "roles",
    key: "roles",
    render: (roles) =>  roles ? roles.length : 0
  },
];

export default ({ t, departments, take, setTake, setSkip, total, page, setPage}) => {
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
      data={departments}
      rowKey={"id"}
      className="table--custom"
      total={total}
      page={page}
      pageSize={take}
      onPageChange={onPageChange}
      onShowSizeChange={onShowSizeChange}
      onRow={(record) => {
        return {
          onClick: () =>
            history.push(`${PATHS.DEPARTMENTS.SHOW.replace(":id", record.id)}`),
        };
      }}
    />
  );
};
