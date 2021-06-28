import React from "react";
import { Modal } from 'antd';
import QRCode from "react-qr-code";

const QRCodeModal = ({ id, t, visible, handleCancel }) => {

  return (
    <Modal
      className="signUp--modal"
      centered={true}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="modal-body">
        <h1 className="title">{t("QR_CODE_MODAL")}</h1>
        <QRCode value={id} />
      </div>
    </Modal>
  );
}

export default QRCodeModal;