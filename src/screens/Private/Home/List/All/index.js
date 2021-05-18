import React from "react";
import { Input, Table } from "shared/components";
import faker from "faker";
import { sample } from "lodash";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { AiOutlineEye } from "react-icons/ai";

const t = {
  LIST: {
    COLUMNS: {
      FULL_NAME: "Full Name",
      EMPLOYEE_NUMBER: "Employee number",
      CERTIFICATES: "Certificates",
      ASSIGNED_SITES: "Assigned Sites",
      DATA_ACCESS: "Data Access",
    },
  },
};

const columns = [
  {
    title: t.LIST.COLUMNS.FULL_NAME,
    dataIndex: "FULL_NAME",
    key: "FULL_NAME",
  },
  {
    title: t.LIST.COLUMNS.EMPLOYEE_NUMBER,
    dataIndex: "EMPLOYEE_NUMBER",
    key: "EMPLOYEE_NUMBER",
  },
  {
    title: t.LIST.COLUMNS.CERTIFICATES,
    dataIndex: "CERTIFICATES",
    key: "CERTIFICATES",
  },
  {
    title: t.LIST.COLUMNS.ASSIGNED_SITES,
    dataIndex: "ASSIGNED_SITES",
    key: "ASSIGNED_SITES",
  },
  {
    title: t.LIST.COLUMNS.DATA_ACCESS,
    dataIndex: "DATA_ACCESS",
    key: "DATA_ACCESS",
    render: (text) => (
      <div className="access--type green">
        <AiOutlineEye />
        <span>{text}</span>
      </div>
    ),
  },
];

const data = [...Array(5)].map((_) => ({
  id: faker.random.uuid(),
  FULL_NAME: `${faker.name.firstName()} ${faker.name.lastName()}`,
  EMPLOYEE_NUMBER: sample(["Forklist", "SPMT", "SPMT Basic"]),
  CERTIFICATES: `39339303`,
  ASSIGNED_SITES: `39339303`,
  DATA_ACCESS:  sample(["Authorized (3)", "Pending authorization", "No authorization"]),
}));



export default () => {
  const history = useHistory();
  return (
    <>
      <div className="search--input">
        <Input 
          custom={"search--input--custom"}
          placeholder={"Search for an operator..."}
        />
      </div>
      <Table
        columns={columns}
        className="table--custom"
        data={data}
        rowKey={"id"}
        onRow={(record) => {
          return {
            onClick: () =>
              history.push(
                `${PATHS.CERTIFICATES.SHOW.replace(":id", record.id)}`
              ),
          };
        }}
      />

    </>
  );
};
