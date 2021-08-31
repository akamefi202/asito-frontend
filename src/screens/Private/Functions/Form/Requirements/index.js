import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { Card, Button } from "shared/components";
import cuid from "cuid";
import { TableFormControl } from "../../../../../shared/components/TableFormControl/TableFormControl";
import { EditableCell } from "./EditableCell";
import { useQuery } from "@apollo/react-hooks";
import { messages } from "../../../../../utils/helpers/message";
import { CertificateQueries } from "../../../../../shared/graphql/queries";

const {CERTIFICATE_TYPES} = CertificateQueries;

const getColumns = (t, removeRequirement) => [
  {
    title: t('FORM.REQUIREMENTS.COLUMNS.CERTIFICATE_TYPE'),
    dataIndex: 'requirement',
    width: '45%',
    editable: true,
  },
  {
    title: t('FORM.REQUIREMENTS.COLUMNS.VALID_MONTHS'),
    dataIndex: 'validForMonths',
    width: '25%',
    editable: true,
  },
  {
    title: t('FORM.REQUIREMENTS.COLUMNS.VALID_YEARS'),
    dataIndex: 'validForYears',
    width: '25%',
    editable: true,
  },
  {
    title: '',
    dataIndex: 'action',
    width: '5%',
    className: 'cell-action',
    render: (_, requirement, index) => <CloseOutlined onClick={() => removeRequirement(requirement.id, index)}/>
  },
]

export default ({t, id, lRoleRequirement, formik, removedRequirements, setRemovedRequirements}) => {
  const [requirements, setRequirements] = useState([]);

  const {loading} = useQuery(CERTIFICATE_TYPES, {
    variables: {skip: 0, take: 50},
    onCompleted: (loadData) => setRequirements(loadData?.requirements?.data || []),
    onError: (error) => messages({data: error})
  });

  const addRequirement = () => {
    const values = formik.getFieldProps('requirements')?.value || [];
    formik.setFieldValue('requirements', [...values, {id: cuid(), role: {id}}]);
  }

  const removeRequirement = (id, index) => {
    const values = formik.getFieldProps('requirements')?.value || [];
    const removedRequirement = formik.initialValues.requirements.find((d) => d.id === id);

    if (removedRequirement?.id === values?.[index]?.id) {
      setRemovedRequirements([...removedRequirements, values[index].id].filter(Boolean));
    }

    formik.setFieldValue('requirements', [...values.filter((r,) => r.id !== id)]);
  }

  const columns = getColumns(t, removeRequirement).map(col => ({
    ...col,
    onCell: (record, index) => ({editable: col.editable, colName: col.dataIndex, index, formik, requirements})
  }));

  return (
     <Card cardStyle='card--form'>
       <h2 className="card--form--title">{t('FORM.MENU.REQUIREMENTS')}</h2>

       <TableFormControl rowKey={() => cuid()}
          components={{body: {cell: EditableCell}}}
          customStyleTable="form-table"
          columns={columns}
          dataSource={formik.values.requirements}
          loading={lRoleRequirement || loading}
          pagination={false}/>

       <Button type='button' buttonStyle="btn--outline" icon={<span className="icon-Add-New btn--icon--right"/>}
          onClick={addRequirement}>
         {t('FORM.REQUIREMENTS.ADD_ROW')}
       </Button>
     </Card>
  );
};
