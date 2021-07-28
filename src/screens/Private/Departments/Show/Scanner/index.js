import React, { useState, useRef, useEffect } from "react";
import { Modal } from 'antd';
import { Button } from "../../../../../shared/components";
import QrScanner from "qr-scanner";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { EmployeeQueries } from "shared/graphql/queries";
import { IdentityOwnerMutations } from "shared/graphql/mutations";
import { Spin } from "shared/components";
import { messages } from "utils/helpers/message";
import ErrorIcon from '../../../../../shared/assets/images/error.svg';

QrScanner.WORKER_PATH = '/qr-scanner-worker.min.js';

const { EMPLOYEE } = EmployeeQueries;
const { IDENTITY_OWNER } = IdentityOwnerMutations;

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
          {employee?.avatar
            ? <img src={employee.avatar} alt='avatar' />
            : <div className="empty-photo">{t("No photo")}</div>}
          </div>
          <p className='scanner__name'>{`${employee.firstName} ${employee.lastName}`}</p>
        </>}
      <div>
        <Button className="btn--outline scanner__button" onClick={onClick}>{t("SCAN.SUCCESS_BUTTON")}</Button>
      </div>
    </div>
  )
}

const Error = ({t, onClick, scanner}) => {

  useEffect(() => {
    scanner && scanner.stop();
  }, [scanner]);

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

  const [saveChanges, { loading: verifyLoading }] = useMutation(IDENTITY_OWNER);

  const [ getEmployees, { loading }] = useLazyQuery(EMPLOYEE, {
    onCompleted: async ({ employee }) => {

      if (!employee) return setSteps(STEPS.STEP_2);

      const res = await saveChanges({variables: {data: {id: employee.wallet}}});

      if (res.data && !res.data.verify) {
        return setSteps(STEPS.STEP_2);
      }

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
          {(loading || verifyLoading) &&
            <div className='scanner__spinner'>
              <Spin spinning={loading || verifyLoading}></Spin>
            </div>}
          {!loading && !verifyLoading && steps === STEPS.STEP_0 && <Reader onScan={onScan} setScanner={setScanner} stopScanner={stopScanner} steps={steps} />}
          {!loading && !verifyLoading && steps === STEPS.STEP_1 && <EmployeeInfo t={t} employee={employee} onClick={showSuccessContent} scanner={scanner}/>}
          {!loading && !verifyLoading && steps === STEPS.STEP_2 && <Error t={t} onClick={showErrorContent}  scanner={scanner}/>}
        </div>
      </div>
    </Modal>
  );
}

export default Scanner;