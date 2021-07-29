import React from "react";
import { Table } from "shared/components";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { dateToString, timestampToDate } from "utils/helpers/moment";
import moment from "moment";

const today = moment();

const columns = (t) => [
  {
    title: t("LIST.COLUMNS.CERTIFICATE_NUMBER"),
    dataIndex: "number",
    key: "number",
    sorter: (a, b) => a.number.localeCompare(b.number),
  },
  {
    title: t("LIST.COLUMNS.CERTIFICATE_TYPE"),
    dataIndex: ["requirement", "type"],
    key: "type",
  },
  {
    title: t("LIST.COLUMNS.ISSUED_TO"),
    dataIndex: "employee",
    key: "employee",
    render: (employee) => employee ? [employee.firstName, employee.lastName].join(' ') : ""
  },
  {
    title: t("LIST.COLUMNS.ISSUED_ON"),
    dataIndex: "issuedOn",
    key: "issuedOn",
    render: (text) => dateToString(text)
  },
  {
    title: t("LIST.COLUMNS.VALID_UNTIL"),
    dataIndex: "validUntil",
    key: "validUntil",
    render: (stringDate) => {
      let isValid = true;
      if (stringDate) {
        const validUntil = timestampToDate(stringDate);
        isValid = validUntil && validUntil.isValid() && today.isSameOrBefore(validUntil);
      }

      return (
          <div className="access--type">
            {stringDate &&
              (isValid
                ? <span className="icon icon-Check green"/>
                : <span className="icon icon-Close red"/>)
            }
            <span className={(isValid ? "" : "red") + (!stringDate ? 'empty' : '')}>
              {stringDate ? dateToString(stringDate) : t('LIST.INFINITE')}
            </span>
          </div>
      );
    },
  },
];

export default ({ t, certificates, take, setTake, setSkip, total, page, setPage}) => {
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
      data={certificates}
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
            history.push(
              `${PATHS.CERTIFICATES.SHOW.replace(":id", record.id)}`
            ),
        };
      }}
    />
  );
};
