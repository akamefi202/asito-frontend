import React from "react";
import { Modal } from 'antd';
import { Button } from "shared/components";
import HandshakeIcon from "shared/assets/images/handshake_icon.svg";
import { BsBuilding } from "react-icons/bs";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";

const SignUpModal = ({ t, visible, handleCancel }) => {
  const history = useHistory();

  const handleOk = (role) => {
    history.push(PATHS.PUBLIC.AUTH.SIGN_UP.replace(":role", role));
  };

  return (
    <Modal
      className="signUp--modal"
      centered={true}
      visible={visible}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="modal-body">
        <img className="modal-body--img" src={HandshakeIcon} alt="HandshakeIcon" />
        <h1 className="title">{t("SIGNIN.SIGN_UP_MODAL.TITLE")}</h1>
        <p className="text">{t("SIGNIN.SIGN_UP_MODAL.TEXT")}</p>
        <div className="heading--area--buttons">
            <Button
              onClick={() => handleOk("organization")}
              buttonStyle="btn--outline"
              custom="heading--area--buttons--left"
            >
              <BsBuilding className="btn--icon--right" /> {t("SIGNIN.SIGN_UP_MODAL.ORGANIZATION")}
            </Button>
            <Button
              onClick={() => handleOk("academy")}
              buttonStyle="btn--outline"
              custom="heading--area--buttons--left"
            >
              <AiOutlineSafetyCertificate className="btn--icon--right" /> {t("SIGNIN.SIGN_UP_MODAL.ACADEMY")}
            </Button>
        </div>
      </div>
    </Modal>
  );
}

export default SignUpModal;