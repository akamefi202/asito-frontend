/* eslint-disable import/no-anonymous-default-export */
import React, { useRef } from "react";
import { useMutation } from "@apollo/react-hooks";
import { FileMutations } from "../../../../../shared/graphql/mutations";
import { Row, Col, Radio, Upload } from "antd";
import { Card, Input, DatePicker, Button } from "shared/components";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
import { bindInputProps } from "utils/helpers/input";
import { REQUIRED_FIELD_SYMBOL } from "utils/constants";

const { CREATE_FILE } = FileMutations;

export default ({ t, formik }) => {

  const fileStatus = useRef('');

  const onRemoveFile = () => formik.setFieldValue('avatar', '');

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

  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">
            {t("FORM.MENU.GENERAL_INFORMATION")}
          </h2>
        </Col>
      </Row>
      <Row gutter={[16, 8]}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.EMPLOYEE_NUMBER")} { REQUIRED_FIELD_SYMBOL }
            </label>
            <Input
              {...bindInputProps({ name: "number", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.EMPLOYEE_NUMBER_PLACEHOLDER")}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.FIRST_NAME")} { REQUIRED_FIELD_SYMBOL }
            </label>
            <Input
              {...bindInputProps({ name: "firstName", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.FIRST_NAME_PLACEHOLDER")}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.LAST_NAME")} { REQUIRED_FIELD_SYMBOL }
            </label>
            <Input
              {...bindInputProps({ name: "lastName", ...formik })}
              placeholder={t("FORM.GENERAL_INFORMATION.LAST_NAME_PLACEHOLDER")}
            />
          </div>
        </Col>

        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.DATE_OF_BIRTH")} { REQUIRED_FIELD_SYMBOL }
            </label>
            <DatePicker
              {...bindInputProps({ name: "dateOfBirth", ...formik })}
              placeholder={t(
                "FORM.GENERAL_INFORMATION.DATE_OF_BIRTH_PLACEHOLDER"
              )}
            />
          </div>
        </Col>
        <Col xs={24} sm={24} md={12} lg={12}>
          <div className="card--form--item">
            <label className="card--form--item--label">
              {t("FORM.GENERAL_INFORMATION.GENDER")}
            </label>
            <Radio.Group
              className="custom-radio custom-input"
              {...bindInputProps({ name: "gender", ...formik })}
            >
              <Row gutter={[16, 8]}>
                <Col span={8}>
                  <Radio className="input-wrapper" value={"male"}>
                    {t("FORM.GENERAL_INFORMATION.MALE")}
                  </Radio>
                </Col>
                <Col span={8}>
                  <Radio className="input-wrapper" value={"female"}>
                    {t("FORM.GENERAL_INFORMATION.FEMALE")}
                  </Radio>
                </Col>
                <Col span={8}>
                  <Radio className="input-wrapper" value={"neutral"}>
                    {t("FORM.GENERAL_INFORMATION.NEUTRAL")}
                  </Radio>
                </Col>
              </Row>
            </Radio.Group>
          </div>
        </Col>
        <Col xs={48} sm={48} md={24} lg={24}>
          <div className="card--form--item">
            {formik.values.avatar &&
              <>
                <label className="card--form--item--label">
                  {t("FORM.GENERAL_INFORMATION.PHOTO")}
                </label>
                <div className='card--form--avatar--wrapper'>
                  <img src={formik.values.avatar} alt="Photo" />
                </div>
              </>}
            <Row gutter={[16, 24]}>
              <Col>
                <Upload
                  action={'/'}
                  accept='image/jpeg, image/png, image/svg'
                  showUploadList={false}
                  onChange={({file}) => uploadFile(file)}
                  >
                    <Button buttonStyle={"btn--outline"}>
                      <CloudUploadOutlined className="btn--icon--right" />{" "}
                      {t("FORM.GENERAL_INFORMATION.UPLOAD_PHOTO")}
                    </Button>
                </Upload>
              </Col>
              <Col>
                <Button onClick={onRemoveFile} icon={<DeleteOutlined className="btn--icon--right" />} buttonStyle={"btn--outline"}>
                  {t("FORM.GENERAL_INFORMATION.DELETE_PHOTO")}
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
