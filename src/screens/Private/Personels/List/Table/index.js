import React from "react";
import { Table } from "shared/components";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

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
    title: t("LIST.COLUMNS.DEPARTMENT"),
    dataIndex: "operatorSites",
    key: "assigned_sites",
    render: (operatorSites) => operatorSites ? operatorSites.length : 0
  },
  {
    title: t("LIST.COLUMNS.ROLE"),
    dataIndex: "DATA_ACCESS",
    key: "DATA_ACCESS",
    render: (text) => {
      if (!text) return;
      return (
        <div className={`access--type ${text.class}`}>
          {text.class === "green" ? <AiOutlineEye className="icon" /> : <AiOutlineEyeInvisible className="icon" />}
          <span>{text.value}</span>
        </div>
      )
    },
  },
];

const dataTables = (data) => (
  data.map(personnel => {
    personnel.DATA_ACCESS = {
      value: `Authorized (${personnel.operatorSites ? personnel.operatorSites.length : 0})`,
      class: "green"
    };
    return personnel;
  })
);

export default ({ t, personnels, take, setTake, setSkip, page, setPage, total }) => {
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
      data={dataTables(personnels)}
      total={total}
      rowKey={"id"}
      page={page}
      pageSize={take}
      onPageChange={onPageChange}
      onShowSizeChange={onShowSizeChange}
      onRow={(record) => {
        return {
          onClick: () =>
            history.push(`${PATHS.PERSONNELS.SHOW.replace(":id", record.id)}`),
        };
      }}
    />
  );
};
