import React from "react";
import Card from "shared/components/Card";
import {TableFormControl} from "../../../../../shared/components/TableFormControl/TableFormControl";
import {dateToString} from "utils/helpers/moment";

export default ({t, attachments}) => {

  const columns = [
    {
      title: t('SHOW.ATTACHMENTS.COLUMNS.FILE_NAME'),
      dataIndex: 'name',
      render: (name, file) => <a href={file.url} target='_blank' download={name}>{name}</a>
    },
    {
      title: t('SHOW.ATTACHMENTS.COLUMNS.FILE_TYPE'),
      dataIndex: 'type',
    },
    {
      title: t('SHOW.ATTACHMENTS.COLUMNS.UPLOAD_DATE'),
      dataIndex: 'updatedAt',
      render: updatedAt => dateToString(updatedAt)
    },
  ];

  return (
    <Card cardStyle={"card--details"}>
      <h2 className="card--details--title">{t("SHOW.MENU.ATTACHMENTS")}</h2>

      <TableFormControl
        rowKey='id'
        columns={columns}
        size='small'
        dataSource={attachments}
        pagination={false}/>
    </Card>
  );
};
