import React, {useState} from "react";
import {CloseOutlined} from "@ant-design/icons";
import {Card, Button} from "shared/components";
import {useQuery} from "@apollo/react-hooks";
import {DepartmentQueries} from "shared/graphql/queries";
import {messages} from "utils/helpers/message";
import {TableFormControl} from "../../../../../shared/components/TableFormControl/TableFormControl";
import cuid from "cuid";
import {EditableCell} from "./EditableCell";

const {DEPARTMENTS} = DepartmentQueries;

const getColumns = (t, removeDepartment) => [
  {
    title: t('FORM.DEPARTAMENT.COLUMNS.NAME'),
    dataIndex: ['department', 'id'],
    width: '90%',
    editable: true,
  },
  {
    title: '',
    dataIndex: 'action',
    width: '10%',
    className: 'cell-action',
    render: (_, department, index) => <CloseOutlined onClick={() => removeDepartment(department.id, index)}/>
  },
]

export default ({t, formik, lRoleDepartments, removedDepartments, setRemovedDepartments}) => {
  const [departments, setDepartments] = useState([]);

  const {loading} = useQuery(DEPARTMENTS, {
    variables: {skip: 0, take: 50},
    onCompleted: (loadData) => setDepartments(loadData?.departments?.data || []),
    onError: (error) => messages({data: error})
  });

  const addDepartment = () => {
    const values = formik.getFieldProps('departments')?.value || [];
    formik.setFieldValue('departments', [...values, {}]);
  }

  const removeDepartment = (id, index) => {
    const values = formik.getFieldProps('departments')?.value || [];
    const removedDep = formik.initialValues.departments.find((d) => d.id === id);

    if (removedDep?.id === values?.[index]?.id) {
      setRemovedDepartments([...removedDepartments, values[index].id].filter(Boolean));
    }

    formik.setFieldValue('departments', [...values.filter((d) => d.id !== id)]);
  }

  const columns = getColumns(t, removeDepartment)
    .map(col => (col.editable
      ? {...col, onCell: (record, index) => ({editable: col.editable, index, formik, departments})}
      : col));

  return (
    <Card cardStyle='card--form'>
      <h2 className="card--form--title">{t('FORM.MENU.DEPARTAMENT')}</h2>

      <TableFormControl rowKey={() => cuid()}
        components={{body: {cell: EditableCell}}}
        customStyleTable="form-table"
        columns={columns}
        dataSource={formik.values.departments}
        loading={lRoleDepartments || loading}
        pagination={false}/>

      <Button type='button' buttonStyle="btn--outline" icon={<span className="icon-Add-New btn--icon--right"/>}
        onClick={addDepartment}>
        {t('FORM.DEPARTAMENT.ADD_ROW')}
      </Button>
    </Card>
  );
};
