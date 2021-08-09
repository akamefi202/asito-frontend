import React, { useState, useEffect } from "react";
import { Modal } from 'antd';
import { useMutation } from "@apollo/react-hooks";
import { Table, Button, Spin } from "shared/components";
import { dateToString } from "utils/helpers/moment";
import { CREATE_UPDATE_ROLE } from "shared/graphql/mutations/role";
import { useLazyQuery } from "@apollo/react-hooks";
import { ProtocolQueries } from 'shared/graphql/queries';

const { PROTOCOLS } = ProtocolQueries;

const columns = (t) => [
  {
    title: t("SHOW.PROTOCOLS_MODAL.COLUMNS.FILE_NAME"),
    dataIndex: "name",
    key: "name",
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (name, record) => (<a href={record.url} className="custom-link">{name}</a>),
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

const ProtocolsModal = ({ t, visible, handleCancel, role}) => {
  const [take, setTake] = useState(20);
  const [page, setPage] = useState(1);
  const [protocols, setProtocols] = useState([
    {name: 'protocol_doc1.pdf', id: "1", type: 'PDF', updatedAt: '01-01-2020'},
    {name: 'protocol_doc1.pdf', id: "2", type: 'PDF', updatedAt: '01-01-2020'},
  ]);

  const [saveChanges, { loading }] = useMutation(CREATE_UPDATE_ROLE);

  const variables = { protocolsWhere: { role: { id: role?.id || '111' } } };

  const [getProtocols, { loading: getProtocolsLoading }] = useLazyQuery(PROTOCOLS, {
    variables,
    onCompleted: ({protocols}) => {
      setProtocols(protocols.data);
    }
  });

  useEffect(() => {
    getProtocols();
  }, []);

  const onPageChange = (page) => {
    setPage(page);
  };

  const onShowSizeChange = (current, size) => {
    setTake(size);
  }

  const onAccept = (id) => {
    const newData = {
      id,
      accepted: true
    };

    saveChanges({ variables: { data: newData } })
      .then(() => handleCancel({visible: false, activeRoleId: null}))
      .catch(() => console.log('something went wrong'));
  }

  return (
    <Modal
      width={'730px'}
      centered={true}
      height={'389px'}
      visible={visible}
      onCancel={() => handleCancel({visible: false, activeRoleId: null})}
      closable={false}
      footer={null}
    >
        <div className="modal-body card--details">
          {!loading && !getProtocolsLoading ?
            <>
              <h1 className="card--details--title">{t("SHOW.PROTOCOLS_MODAL.TITLE")} {role && role.name}</h1>
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
                  onClick={() => handleCancel({visible: false, activeRoleId: null})}
                  icon={<span className="btn--icon--right icon-Close" />}
                  buttonStyle={"btn--outline"}
                >{t('SHOW.PROTOCOLS_MODAL.CLOSE')}</Button>
                <Button
                  onClick={() => onAccept(role && role.id)}
                  icon={<span className="btn--icon--right icon-Check" />}
                  buttonStyle={"btn--primary"}
                >{t('SHOW.PROTOCOLS_MODAL.ACCEPT')}</Button>
              </div>
            </>
            :
            <div className='protocols-spinner'>
              <Spin spinning={loading || getProtocolsLoading}></Spin>
            </div>}
        </div>
    </Modal>
  );
}

export default ProtocolsModal;
