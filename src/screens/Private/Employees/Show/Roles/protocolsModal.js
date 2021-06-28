import React, { useState } from "react";
import { Modal } from 'antd';
import { Table, Button } from "shared/components";
import { dateToString } from "utils/helpers/moment";

const columns = (t) => [
  {
    title: t("SHOW.PROTOCOLS_MODAL.COLUMNS.FILE_NAME"),
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (name) => (<span className="custom-link">{name}</span>),
  },
  {
    title: t("SHOW.PROTOCOLS_MODAL.COLUMNS.FILE_TYPE"),
    dataIndex: "type",
    key: "type",
  },
  {
    title: t("SHOW.PROTOCOLS_MODAL.COLUMNS.UPLOAD_DATE"),
    dataIndex: "updatedAt",
    key: "updatedAt",
    render: (updatedAt) => (<span>{dateToString(updatedAt, "DD-MM-YYYY")}</span>),
  },
];

const ProtocolsModal = ({ t, protocols, visible, handleCancel }) => {
  const [take, setTake] = useState(20);
  const [page, setPage] = useState(1);

  const onPageChange = (page) => {
    setPage(page);
  };

  const onShowSizeChange = (current, size) => {
    setTake(size);
  }

  return (
    <Modal
      width={'730px'}
      centered={true}
      visible={visible}
      onCancel={() => handleCancel(false)}
      closable={false}
      footer={null}
    >
      <div className="modal-body card--details">
        <h1 className="card--details--title">{t("SHOW.PROTOCOLS_MODAL.TITLE")}</h1>
        <Table
          scroll={{ x: true }}
          columns={columns(t)}
          className="custom--table"
          data={protocols}
          total={protocols.length}
          page={page}
          pageSize={take}
          onPageChange={onPageChange}
          onShowSizeChange={onShowSizeChange}
          rowKey={"id"}
          onRow={(record) => {
            return {
              onClick: () => { },
            };
          }}
        />
        <div className="heading--area--buttons heading--area--buttons--between">
          <Button
            onClick={() => handleCancel(false)}
            icon={<span className="btn--icon--right icon-Close" />}
            buttonStyle={"btn--outline"}
          >{t('SHOW.PROTOCOLS_MODAL.CLOSE')}</Button>
          <Button
            onClick={() => handleCancel(false)}
            icon={<span className="btn--icon--right icon-Check" />}
            buttonStyle={"btn--primary"}
          >{t('SHOW.PROTOCOLS_MODAL.ACCEPT')}</Button>
        </div>
      </div>
    </Modal>
  );
}

export default ProtocolsModal;
