import React from "react";
import { Table } from "shared/components";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { dateToString, timestampToDate } from "utils/helpers/moment";
import { CERTIFICATES_TYPE } from "shared/constants/certificatesType";
import moment from "moment";

const today = moment();

const columns = (t) => [
  {
    title: t("LIST.COLUMNS.CERTIFICATE_NUMBER"),
    dataIndex: "number",
    key: "number",
    sorter: (a, b) => a.number - b.number,
  },
  {
    title: t("LIST.COLUMNS.CERTIFICATE_TYPE"),
    dataIndex: ["requirement", "type"],
    key: "type",
    render: (type) => {
      const certificateType = CERTIFICATES_TYPE.find(item => item.key === type);
      return certificateType ? certificateType.value : "";
    },
  },
  {
    title: t("LIST.COLUMNS.ISSUED_TO"),
    dataIndex: "operator",
    key: "operator",
    render: (operator) => operator ? [operator.firstName, operator.lastName].join(' ') : operator
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
    render: (text) => {
      if (text) {
        const validUntil = timestampToDate(text);
        const isValid = validUntil && validUntil.isValid() && today.isSameOrBefore(validUntil);

        return (
          <div className="access--type">
            { isValid
                ? <CheckOutlined className="green" />
                : <CloseOutlined className="red" />
            }
            <span className={isValid ? "" : "red"}>
              {dateToString(text)}
            </span>
          </div>
        );
      }
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
