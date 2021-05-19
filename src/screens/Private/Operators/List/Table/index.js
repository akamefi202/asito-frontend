import React from "react";
import { Table } from "shared/components";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ASSESS_STATUSES } from "shared/constants/accessStatuses";

const columns = (t) => [
  {
    title: t("LIST.COLUMNS.FULL_NAME"),
    dataIndex: "full_mame",
    key: "full_mame",
    sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    render: (_, column) => (
      <span>{`${column.firstName} ${column.lastName}`}</span>
    ),
  },
  {
    title: t("LIST.COLUMNS.EMPLOYEE_NUMBER"),
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
    title: t("LIST.COLUMNS.ASSIGNED_SITES"),
    dataIndex: "operatorSites",
    key: "assigned_sites",
    render: (operatorSites) => operatorSites ? operatorSites.length : 0
  },
  {
    title: t("LIST.COLUMNS.DATA_ACCESS"),
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
  data.map(operator => {
    // operator.DATA_ACCESS = getStatus(operator.accesses || []);
    operator.DATA_ACCESS = {
      value: `Authorized (${operator.operatorSites ? operator.operatorSites.length : 0})`,
      class: "green"
    };
    return operator;
  })
);

// const getStatus = (accesses) => {
// let pending = 0;
// let authorized = 0;
// let noAuthorized = 0;

// accesses.forEach(access => {
//   switch (access.status) {
//     case ASSESS_STATUSES.PENDING:
//       pending += 1;
//       break;
//     case ASSESS_STATUSES.AUTHORIZED:
//       authorized += 1;
//       break;
//     default:
//       noAuthorized += 1;
//   }
// });

// if (authorized !== 0 && authorized >= pending && authorized >= noAuthorized) {
//   return {value: `Authorized (${authorized})`, class: "green"};
// }
// if (pending !== 0 && pending >= noAuthorized) {
//   return {value: `Pending authorization (${pending})`, class: "yellow"};
// }
// return {value: 'No authorization', class: "red"}
// }

export default ({ t, operators, take, setTake, setSkip, page, setPage, total }) => {
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
      data={dataTables(operators)}
      total={total}
      rowKey={"id"}
      page={page}
      pageSize={take}
      onPageChange={onPageChange}
      onShowSizeChange={onShowSizeChange}
      onRow={(record) => {
        return {
          onClick: () =>
            history.push(`${PATHS.OPERATORS.SHOW.replace(":id", record.id)}`),
        };
      }}
    />
  );
};
