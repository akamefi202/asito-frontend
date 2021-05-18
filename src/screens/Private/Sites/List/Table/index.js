import React from "react";
import { Table } from "shared/components";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";

const columns = (t) => [
  {
    title: t("LIST.COLUMNS.SITE_NAME"),
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
  },
  {
    title: t("LIST.COLUMNS.CLIENT_NAME"),
    dataIndex: "client",
    key: "client",
    render: (client) => client && client.name ? client.name : ''
  },
  {
    title: t("LIST.COLUMNS.LOCATION"),
    dataIndex: "location",
    key: "location",
    render: (_, record) => (
      <span>{`${record.city}, ${record.country}`}</span>
    ),
  },
  {
    title: t("LIST.COLUMNS.OPERATORS"),
    dataIndex: "numberOfOperatorsRequired",
    key: "numberOfOperatorsRequired",
    render: (number, record) => (
      <span>
        {`${record.operatorSites && record.operatorSites.length}/${number}`}
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

export default ({ t, sites, take, setTake, setSkip, total, page, setPage}) => {
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
      data={sites}
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
