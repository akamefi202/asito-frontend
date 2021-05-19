import React, { useEffect, useRef } from "react";
import { Col, Row, Form, Upload } from "antd";
import { CloseOutlined, CloudUploadOutlined } from "@ant-design/icons";
import { Card, Button } from "shared/components";
import { useMutation } from "@apollo/react-hooks";
import { FileMutations } from "shared/graphql/mutations";
import moment from "moment";
import cuid from "cuid";

const { CREATE_FILE } = FileMutations;

export default ({ t, formik, certificateId, deletedFiles, setDeletedFiles }) => {
  const [form] = Form.useForm();
  const fileStatus = useRef('');

  const attachments = formik.values.attachments;

  useEffect(() => {
    form.setFieldsValue({ attachments });
  }, [attachments])

  const onRemoveFile = (columns) => {
    const currentData = formik.getFieldProps('attachments').value;
    const filteredFiles = currentData.filter((data, index) => index !== columns.name);
    const deleteFiles = currentData.filter((data, index) => index === columns.name).map(data => data.id);
    setDeletedFiles([...deletedFiles, ...deleteFiles]);
    formik.setFieldValue('attachments', filteredFiles);
  }

  const uploadFile = async (file) => {
    //This is complete nonsense, but there is no other way to do it. Sorry

    if (fileStatus.current === file.status || file.status !== 'error') return;
    fileStatus.current = file.status;
    const fileObject = await readFile(file.originFileObj);
    getFile({ variables: { data: fileObject } })
      .then(({ data }) => {
        const displayedFile = {
          id: cuid(),
          name: fileObject.name,
          type: fileObject.contentType.split('/').reverse()[0].toUpperCase(),
          certificate: { id: certificateId },
          url: data.createFile,
          updatedAt: moment(file.lastModified).format()
        }
        fileStatus.current = '';
        const values = formik.getFieldProps('attachments').value;
        formik.setFieldValue('attachments', [...values, displayedFile]);
      });
  }

  const readFile = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const stream = reader.result.replace(/^data:application\/\w+;base64,/, '');
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

  const [getFile] = useMutation(CREATE_FILE);

  const getShowData = (index, field) => {
    if (!formik
      || !formik.values
      || !formik.values.attachments
      || !formik.values.attachments[index]
      || !formik.values.attachments[index][field]) return '';
    const data = formik.values.attachments[index][field];
    if (field === 'updatedAt') return moment(data).format('DD-MM-YYYY');
    return data ? data : '';
  }

  return (
    <Card cardStyle={"card--form"}>
      <Row>
        <Col xs={24}>
          <h2 className="card--form--title">{t("FORM.MENU.ATTACHMENTS")}</h2>
        </Col>
      </Row>

      <Row className="w-100-100">
        <Col xs={8} md={8}>
          <div className="card--form--head">
            <h4>{t("FORM.ATTACHMENTS.COLUMNS.FILE_NAME")}</h4>
          </div>
        </Col>
        <Col xs={6} md={6}>
          <div className="card--form--head">
            <h4>{t("FORM.ATTACHMENTS.COLUMNS.FILE_TYPE")}</h4>
          </div>
        </Col>
        <Col xs={6} md={8}>
          <div className="card--form--head">
            <h4>{t("FORM.ATTACHMENTS.COLUMNS.UPLOAD_DATE")}</h4>
          </div>
        </Col>
        <Col xs={4} md={2}>
          <div className="card--form--head">
            <h4>&nbsp;</h4>
          </div>
        </Col>
      </Row>
      <Row className="w-100-100">
        <Col xs={24} sm={24}>
          <Form
            form={form}
            name="dynamic_form_nest_item"
            autoComplete="off"
          >
            <Form.List name="attachments">
              {(fields, { add, remove }) => (
                <>
                  {fields.map((field) => (
                    <div key={field.key}>
                      <Row gutter={[16, 8]} align="middle" className="m-16">
                        <Col xs={8} md={8}>
                          <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, curValues) =>
                              prevValues.area !== curValues.area ||
                              prevValues.sights !== curValues.sights
                            }
                          >
                            {() => (
                              <Form.Item {...field}
                                name={[field.name, 'name']}
                                fieldKey={[field.fieldKey, 'name']}>
                                <div>{getShowData(field.name, 'name')}</div>
                              </Form.Item>
                            )}
                          </Form.Item>
                        </Col>
                        <Col xs={6} md={6}>
                          <Form.Item {...field}
                            name={[field.name, 'type']}
                            fieldKey={[field.fieldKey, 'type']}>
                            <div>{getShowData(field.name, 'type')}</div>
                          </Form.Item>
                        </Col>
                        <Col xs={6} md={8}>
                          <Form.Item {...field}
                            name={[field.name, 'updatedAt']}
                            fieldKey={[field.fieldKey, 'updatedAt']}>
                            <div>{getShowData(field.name, 'updatedAt')}</div>
                          </Form.Item>
                        </Col>
                        <Col xs={4} md={2}>
                          <div className="btn--icon">
                            <CloseOutlined onClick={() => {
                              remove(field.name)
                              onRemoveFile(field);
                            }} />
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}
                  <Upload accept={'application/pdf'}
                    action={'/'}
                    showUploadList={false}
                    onChange={({ file }) => uploadFile(file)}>
                    <Button buttonStyle={"btn--outline"}>
                      <span className="icon-Upload btn--icon--right" />
                      {t("FORM.ATTACHMENTS.UPLOAD_FILE")}
                    </Button>
                  </Upload>
                </>
              )}
            </Form.List>
          </Form>
        </Col>
      </Row>
    </Card>
  );
};
