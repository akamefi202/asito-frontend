import React from 'react';
import {Table} from 'antd';
import './style.scss'

export const TableFormControl =
  ({
     customStyleTable,
     dataSource,
     columns,
     page,
     total,
     rowKey,
     loading,
     pageSize,
     rowSelection,
     onPageChange,
     onShowSizeChange,
     expandedRowRender,
     onExpand,
     size = 'default',
     pagination = {
       total,
       pageSize,
       current: page,
       position: 'bottom',
       onChange: onPageChange,
       onShowSizeChange: onShowSizeChange,
     },
     ...props
   }) => {

    return (
      <Table
        className={`table ${customStyleTable}`}
        columns={columns}
        dataSource={dataSource}
        size={size}
        expandedRowRender={expandedRowRender}
        rowKey={rowKey}
        onExpand={onExpand}
        loading={loading}
        rowSelection={rowSelection}
        pagination={pagination}
        {...props}/>
    )
  }
