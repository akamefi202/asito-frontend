import React, { useRef } from "react";
import { Upload } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { Card, Button } from "shared/components";
import { useMutation } from "@apollo/react-hooks";
import { FileMutations } from "shared/graphql/mutations";
import {isCorrectFileSize} from "utils/helpers/fn";
import {messages} from "utils/helpers/message";
import moment from "moment";
import cuid from "cuid";
import { TableFormControl } from "../../../../../shared/components/TableFormControl/TableFormControl";
import { dateToString } from "../../../../../utils/helpers/moment";

const {CREATE_FILE} = FileMutations;

export default ({t, formik, lProtocols, removedProtocols, setRemovedProtocols}) => {
  const fileStatus = useRef('');

  const columns = [
    {
      title: t('FORM.PROTOCOLS.COLUMNS.FILE_NAME'),
      dataIndex: 'name',
      width: '60%',
      render: (name, file) => <a target='_blank' href={file.url} download={name} rel="noreferrer">{name}</a>
    },
    {
      title: t('FORM.PROTOCOLS.COLUMNS.FILE_TYPE'),
      dataIndex: 'type',
      width: '15%',
    },
    {
      title: t('FORM.PROTOCOLS.COLUMNS.UPLOAD_DATE'),
      dataIndex: 'updatedAt',
      width: '15%',
      render: (date) => dateToString(date),
    },
    {
      title: '',
      dataIndex: 'id',
      className: ['protocol', 'cell-action'],
      width: '10%',
      render: (_, protocol, index) => <CloseOutlined onClick={() => onRemoveFile(protocol.id, index)}/>,
    }
  ];

  const uploadFile = async (file) => {
    if (fileStatus.current === file.status || file.status !== 'error') return;
    fileStatus.current = file.status;

    const fileObject = await readFile(file.originFileObj);

    if (!isCorrectFileSize(fileObject.size)) {
      fileStatus.current = '';
      return messages({msg: "Het bestand is te groot"});
    }

    getFile({variables: {data: fileObject}})
       .then(({data}) => {
         const displayedFile = {
           id: cuid(),
           name: fileObject.name,
           type: fileObject.name.split('.').reverse()[0].toUpperCase(),
           url: data.createFile,
           updatedAt: moment(new Date()).format()
         }
         fileStatus.current = '';
         const values = formik.getFieldProps('protocols')?.value || [];
         formik.setFieldValue('protocols', [...values, displayedFile]);
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


  const onRemoveFile = (id, index) => {
    const values = formik.getFieldProps('protocols')?.value || [];

    if (formik.initialValues.protocols.find((p, i) => p.id === id)?.id === values?.[index]?.id) {
      setRemovedProtocols([...removedProtocols, values[index].id].filter(Boolean));
    }

    formik.setFieldValue('protocols', [...values.filter((p) => p.id !== id)]);
  }

  const [getFile] = useMutation(CREATE_FILE);

  return (
     <Card cardStyle='card--form'>
       <h2 className="card--form--title">{t('FORM.MENU.PROTOCOLS')}</h2>

       <TableFormControl
          rowKey='id'
          columns={columns}
          loading={lProtocols}
          dataSource={formik.values.protocols}
          pagination={false}/>

       <Upload
          action={'/'}
          showUploadList={false}
          onChange={({file}) => uploadFile(file)}>
         <Button buttonStyle="btn--outline">
           <span className="icon-Upload btn--icon--right"/>
           {t('FORM.PROTOCOLS.UPLOAD_FILE')}
         </Button>
       </Upload>
     </Card>
  );
};
