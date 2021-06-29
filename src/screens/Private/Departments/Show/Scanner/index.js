import React, { useState, useRef, useEffect } from "react";
import { Modal } from 'antd';
import { Button } from "../../../../../shared/components";
import QrScanner from "qr-scanner";
import { useLazyQuery } from "@apollo/react-hooks";
import { EmployeeQueries } from "shared/graphql/queries";
import { Spin } from "shared/components";
import { messages } from "utils/helpers/message";
import ErrorIcon from '../../../../../shared/assets/images/error.svg';

QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

const { EMPLOYEE } = EmployeeQueries;

const STEPS = {
  STEP_0: 0,
  STEP_1: 1,
  STEP_2: 2
}

const Reader = ({onScan, setScanner, stopScanner, steps}) => {
  const scannerRef = useRef();
  let qrScanner;

  const onScanHandler = (id) => {
    onScan(id);
    stopScanner();
  }

  useEffect(() => {
    if (!qrScanner) {
      qrScanner = new QrScanner(scannerRef.current, (result) => onScanHandler(result), (error) => console.log(error));
      qrScanner.start().then(() => setScanner(qrScanner)).catch(() => console.log('something went wrong'));
    };

    return () => {
      stopScanner();
    }

  }, [steps]);

  return (
    <div className="scanner__video-wrapper">
      <div className='scanner__scan-area'></div>
      <video className='scanner__video' ref={scannerRef} />
    </div>
  )
}

const EmployeeInfo = ({t, employee, onClick, scanner}) => {

  useEffect(() => {
    scanner && scanner.stop();
  }, [scanner]);

  return (
    <div>
      <h2 className='scanner__header'>{t("SCAN.SUCCESS")}</h2>
      {!employee && <p className='scanner__name'>{t("SCAN.USER_NOT_FOUND")}</p>}
      {employee &&
        <>
          <div className='scanner__image-wrapper'>
            <img src={employee.avatar} alt='avatar' />
          </div>
          <p className='scanner__name'>{`${employee.firstName} ${employee.lastName}`}</p>
        </>}
      <div>
        <Button className="btn--outline scanner__button" onClick={onClick}>{t("SCAN.SUCCESS_BUTTON")}</Button>
      </div>
    </div>
  )
}

const Error = ({t, onClick}) => {
  return (
    <div>
      <h2 className='scanner__header'>{t("SCAN.ERROR")}</h2>
      <div className='scanner__error-wrapper scanner__error-wrapper_error'>
        <img src={ErrorIcon} alt='Error icon' />
      </div>
      <p className='scanner__name'>{t("SCAN.ERROR_MESSAGE")}</p>
      <div>
        <Button className="btn--outline scanner__button" onClick={onClick}>{t("SCAN.ERROR_BUTTON")}</Button>
      </div>
    </div>
  )
}

const Scanner = ({ t, visible, handleCancel }) => {

  const [employee, setEmployee] = useState(null);
  const [steps, setSteps] = useState(STEPS.STEP_0);
  const [scanner, setScanner] = useState(null);

  useEffect(() => {
    if (scanner) scanner.stop();
  }, [steps]);

  const [ getEmployees, { loading }] = useLazyQuery(EMPLOYEE, {
    onCompleted: ({ employee }) => {
      employee && setEmployee(employee);
      setSteps(STEPS.STEP_1);
    },
    onError: (error) => {
      messages({ data: error });
      setSteps(STEPS.STEP_2);
    }
  });

  const onScan = (id) => {
    if (!id) return;
    getEmployees({variables: {
      where: {
        id
      }
    }});
    if (scanner) scanner.stop();
  };

  const showSuccessContent = () => {
    setSteps(STEPS.STEP_0);
  }

  const showErrorContent = () => {
    setSteps(STEPS.STEP_0);
  }

  const stopScanner = () => {
    if (scanner) {
      scanner.stop();
    }
  }

  const closePopup = () => {
    handleCancel();
    scanner && scanner.stop();
    setSteps(STEPS.STEP_0);
  }

  return (
    <Modal
      className="signUp--modal"
      centered={true}
      visible={visible}
      onCancel={closePopup}
      footer={null}
    >
      <div className="modal-body">
        {steps === STEPS.STEP_0 && <h1 className="title">{t("SCAN_EMPLOYEE")}</h1>}
        <div className='scanner'>
          {loading &&
            <div className='scanner__spinner'>
              <Spin spinning={loading}></Spin>
            </div>}
          {!loading && steps === STEPS.STEP_0 && <Reader onScan={onScan} setScanner={setScanner} stopScanner={stopScanner} steps={steps} />}
          {!loading && steps === STEPS.STEP_1 && <EmployeeInfo t={t} employee={employee} onClick={showSuccessContent} scanner={scanner}/>}
          {!loading && steps === STEPS.STEP_2 && <Error t={t} onClick={showErrorContent} />}
        </div>
      </div>
    </Modal>
  );
}

export default Scanner;