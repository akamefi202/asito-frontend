import React, {useRef} from "react";
import {Upload} from "antd";
import {CloseOutlined} from "@ant-design/icons";
import {Card, Button} from "shared/components";
import {useMutation} from "@apollo/react-hooks";
import {FileMutations} from "shared/graphql/mutations";
import {TableFormControl} from "../../../../../shared/components/TableFormControl/TableFormControl";
import {dateToString} from "../../../../../utils/helpers/moment";
import moment from "moment";
import cuid from "cuid";

const {CREATE_FILE} = FileMutations;

export default ({t, formik, certificateId, deletedFiles, setDeletedFiles}) => {
  const fileStatus = useRef('');

  const columns = [
    {
      title: t('FORM.ATTACHMENTS.COLUMNS.FILE_NAME'),
      dataIndex: 'name',
      render: (name, file) => <a target='_blank' href={file.url} download={name}>{name}</a>
    },
    {
      title: t('FORM.ATTACHMENTS.COLUMNS.FILE_TYPE'),
      dataIndex: 'type',
    },
    {
      title: t('FORM.ATTACHMENTS.COLUMNS.UPLOAD_DATE'),
      dataIndex: 'updatedAt',
      render: (date) => dateToString(date),
    },
    {
      title: '',
      dataIndex: 'id',
      render: (fileId) => <CloseOutlined onClick={() => onRemoveFile(fileId)}/>,
    }
  ];

  const onRemoveFile = (fileId) => {
    const attachments = formik.getFieldProps('attachments')?.value || [];

    const filteredFiles = attachments.filter(data => data.id !== fileId);

    setDeletedFiles([...deletedFiles, fileId]);
    formik.setFieldValue('attachments', filteredFiles);
  }

  const uploadFile = async (file) => {
    if (fileStatus.current === file.status || file.status !== 'error') return;
    fileStatus.current = file.status;

    const fileObject = await readFile(file.originFileObj);

    getFile({variables: {data: fileObject}})
      .then(({data}) => {
        const displayedFile = {
          id: cuid(),
          name: fileObject.name,
          type: fileObject.contentType.split('/').reverse()[0].toUpperCase(),
          certificate: {id: certificateId},
          url: data.createFile,
          updatedAt: moment(file.lastModified).format()
        }
        fileStatus.current = '';
        const values = formik.getFieldProps('attachments')?.value || [];
        formik.setFieldValue('attachments', [...values, displayedFile]);
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

  const [getFile] = useMutation(CREATE_FILE);

  return (
    <Card cardStyle='card--form'>
      <h2 className="card--form--title">{t('FORM.MENU.ATTACHMENTS')}</h2>

      <TableFormControl
        rowKey='id'
        columns={columns}
        size='small'
        dataSource={formik.values.attachments}
        pagination={false}/>

      <Upload accept={'application/pdf, image/png, image/jpeg, image/jpg'}
        action={'/'}
        showUploadList={false}
        onChange={({file}) => uploadFile(file)}>
        <Button buttonStyle={"btn--outline"}>
          <span className="icon-Upload btn--icon--right"/>
          {t("FORM.ATTACHMENTS.UPLOAD_FILE")}
        </Button>
      </Upload>
    </Card>
  );
};
