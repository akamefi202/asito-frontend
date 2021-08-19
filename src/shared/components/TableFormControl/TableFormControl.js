import React from 'react';
import {Table} from 'antd';
import './style.scss'

export const TableFormControl =
  ({
     customStyleTable = '',
     dataSource,
     columns,
     page,
     total,
     rowKey,
     loading,
     pageSize,
     pageSizeOptions,
     defaultPageSize,
     rowSelection,
     onPageChange,
     onShowSizeChange,
     expandedRowRender,
     onExpand,
     scroll,
     size = 'default',
     onChange,
     pagination = {
       total,
       pageSize,
       pageSizeOptions: pageSizeOptions,
       defaultPageSize: defaultPageSize,
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
        scroll={scroll}
        onChange={onChange}
        {...props}/>
    )
  }
