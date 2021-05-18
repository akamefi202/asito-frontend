import React, { memo } from "react";
import { Table } from "antd";
import PropTypes from "prop-types";
import { DEFAULT_PAGE_SIZE } from "utils/constants";

const AntTable = ({
  page,
  data,
  total,
  rowKey,
  columns,
  loading,
  pageSize,
  rowSelection,
  onPageChange,
  onShowSizeChange,
  expandedRowRender,
  onExpand,
  ...props
}) => (
  <Table
    {...props}
    expandedRowRender={expandedRowRender}
    rowKey={rowKey}
    onExpand={onExpand}
    columns={columns}
    dataSource={data}
    loading={loading}
    pagination={{
      total,
      pageSize,
      current: page,
      position: "bottom",
      onChange: onPageChange,
      onShowSizeChange: onShowSizeChange,
    }}
    rowSelection={rowSelection}
  />
);

AntTable.propTypes = {
  page: PropTypes.number,
  loading: PropTypes.bool,
  total: PropTypes.number,
  rowKey: PropTypes.string,
  pageSize: PropTypes.number,
  rowSelection: PropTypes.object,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onShowSizeChange: PropTypes.func,
};

AntTable.defaultProps = {
  page: 1,
  rowKey: "id",
  rowSelection: null,
  pageSize: DEFAULT_PAGE_SIZE,
  onPageChange: PropTypes.func.isRequired,
};

export default memo(AntTable);
