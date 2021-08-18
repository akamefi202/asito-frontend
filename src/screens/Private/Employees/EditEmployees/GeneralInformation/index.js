import React, {useRef} from "react";
import {useMutation} from "@apollo/react-hooks";
import {FileMutations} from "../../../../../shared/graphql/mutations";
import {Row, Col, Upload} from "antd";
import {Card, Button} from "shared/components";
import {CloudUploadOutlined, DeleteOutlined} from "@ant-design/icons";
import {bindInputProps} from "utils/helpers/input";
import {REQUIRED_FIELD_SYMBOL} from "utils/constants";
import moment from "moment";
import {InputFormControl} from "../../../../../shared/components/InputformControl/InputFormControl";
import {DatePickerFormControl} from "../../../../../shared/components/DatePickerFormControl/DatePickerFormControl";
import {RadioGroup} from "../../../../../shared/components/RadioGroup/RadioGroup";

const {CREATE_FILE} = FileMutations;

export default ({t, formik}) => {
  const fileStatus = useRef('');

  const [getFile] = useMutation(CREATE_FILE);

  const uploadFile = async (file) => {
    if (fileStatus.current === file.status || file.status !== 'error') return;
    fileStatus.current = file.status;
    const fileObject = await readFile(file.originFileObj);
    getFile({variables: {data: fileObject}})
      .then(({data}) => {
        fileStatus.current = '';
        formik.setFieldValue('avatar', data.createFile);
      });
  }

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const reg = new RegExp(('^data:' + file.type + ';base64,'));
        const stream = reader.result.replace(reg, '');
        resolve({
          name: file.name,
          contentType: file.type,
          size: file.size,
          body: stream
        });
      };
      reader.onerror = (error) => reject(error);
    });
  }

  const onRemoveFile = () => formik.setFieldValue('avatar', '');

  const disabledDate = (current) => current && current > moment().subtract(18, 'year').endOf('day');

  return (
    <Card cardStyle="card--form">
      <h2 className="card--form--title">{t('FORM.MENU.GENERAL_INFORMATION')}</h2>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <InputFormControl id='number'
            label={t('FORM.GENERAL_INFORMATION.EMPLOYEE_NUMBER') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.EMPLOYEE_NUMBER_PLACEHOLDER')}
            {...bindInputProps({name: 'number', ...formik})}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={16} sm={16} md={9} lg={9}>
          <InputFormControl id='firstName'
            label={t('FORM.GENERAL_INFORMATION.FIRST_NAME') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.FIRST_NAME_PLACEHOLDER')}
            {...bindInputProps({name: 'firstName', ...formik})}/>
        </Col>

        <Col xs={16} sm={16} md={6} lg={6}>
          <InputFormControl id='middleName'
            label={t('FORM.GENERAL_INFORMATION.MIDDLE_NAME')}
            placeholder={t('FORM.GENERAL_INFORMATION.MIDDLE_NAME_PLACEHOLDER')}
            {...bindInputProps({name: 'middleName', ...formik})}/>
        </Col>

        <Col xs={16} sm={16} md={9} lg={9}>
          <InputFormControl id='lastName'
            label={t('FORM.GENERAL_INFORMATION.LAST_NAME') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.LAST_NAME_PLACEHOLDER')}
            {...bindInputProps({name: 'lastName', ...formik})}/>
        </Col>
      </Row>

      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={12} lg={12}>
          <DatePickerFormControl id='dateOfBirth'
            label={t('FORM.GENERAL_INFORMATION.DATE_OF_BIRTH') + ' ' + REQUIRED_FIELD_SYMBOL}
            placeholder={t('FORM.GENERAL_INFORMATION.DATE_OF_BIRTH_PLACEHOLDER')}
            {...bindInputProps({name: 'dateOfBirth', ...formik})}
            defaultPickerValue={moment().subtract(18, 'year').endOf('day')}
            disabledDate={disabledDate}/>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <RadioGroup id='gender'
            label={t('FORM.GENERAL_INFORMATION.GENDER')}
            {...bindInputProps({name: 'gender', ...formik})}
            items={[
              {id: 'male', value: t('FORM.GENERAL_INFORMATION.MALE')},
              {id: 'female', value: t('FORM.GENERAL_INFORMATION.FEMALE')},
              {id: 'neutral', value: t('FORM.GENERAL_INFORMATION.NEUTRAL')},
            ]}/>
        </Col>
      </Row>

      {formik.values.avatar &&
      <Row gutter={[16, 8]}>
        <Col xs={48} sm={48} md={24} lg={24}>
          <div className="card--form--item">
            <label className="card--form--item--label">{t("FORM.GENERAL_INFORMATION.PHOTO")}</label>
            <div className='card--form--avatar--wrapper'>
              <img src={formik.values.avatar} alt="Photo"/>
            </div>
          </div>
        </Col>
      </Row>}

      <Row gutter={[16, 8]}>
        <Col>
          <Upload
            action={'/'}
            accept='image/jpeg, image/png, image/svg'
            showUploadList={false}
            onChange={({file}) => uploadFile(file)}>
            <Button buttonStyle={"btn--outline"}>
              <CloudUploadOutlined className="btn--icon--right"/>{" "}
              {t("FORM.GENERAL_INFORMATION.UPLOAD_PHOTO")}
            </Button>
          </Upload>
        </Col>

        <Col>
          <Button buttonStyle={"btn--outline"} icon={<DeleteOutlined className="btn--icon--right"/>}
            onClick={onRemoveFile}>
            {t("FORM.GENERAL_INFORMATION.DELETE_PHOTO")}
          </Button>
        </Col>
      </Row>
    </Card>
  );
};
