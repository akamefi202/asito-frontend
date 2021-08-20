import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import Card from "shared/components/Card";
import { TableFormControl } from "shared/components/TableFormControl/TableFormControl";
import { useQuery } from "@apollo/react-hooks";
import { messages } from "utils/helpers/message";
import { DepartmentQueries } from "shared/graphql/queries";

const { ROLE_DEPARTMENTS } = DepartmentQueries;

const columns = (t) => [
  {
    title: t('SHOW.DEPARTAMENT.COLUMNS.NAME'),
    dataIndex: ['department', 'name'],
    sorter: true,
    render: (name, record) => (
       <Link className="custom-link" to={PATHS.DEPARTMENTS.SHOW.replace(':id', record.id)}>{name}</Link>
    )
  },
  {
    title: t('SHOW.DEPARTAMENT.COLUMNS.TYPE'),
    dataIndex: ['department', 'type'],
  },
  {
    title: t('SHOW.DEPARTAMENT.COLUMNS.LOCATION'),
    dataIndex: ['department', 'location'],
  },
];

export default ({t, id}) => {
  const [departments, setDepartments] = useState([]);
  const [sortType, setSortType] = useState([{name: 'updatedAt', type: 'DESC'}]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const {loading} = useQuery(ROLE_DEPARTMENTS, {
    variables: {roleDepartmentsWhere: {role: {id}}, skip, take},
    onCompleted: ({roleDepartments}) => {
      setDepartments(roleDepartments.data)
      setTotal(roleDepartments.count)
    },
    onError: (error) => messages({data: error})
  });


  const onChange = (pagination, filters, sorter) => {
    if (pagination.current !== page) return;
    onPageChange(1);

    setSortType([sorter.order
       ? {name: sorter.field, type: sorter.order === 'descend' ? 'DESC' : 'ASC'}
       : {name: 'updatedAt', type: 'DESC'}]);
  }

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onShowSizeChange = (current, size) => setTake(size);

  return (
     <Card cardStyle="card--details">
       <h2 className="card--details--title">{t('SHOW.MENU.DEPARTAMENT')}</h2>

       <TableFormControl rowKey='id'
          columns={columns(t)}
          dataSource={departments}
          loading={loading}
          page={page}
          total={total}
          pageSize={take}
          pageSizeOptions={[5, 10, 20]}
          onChange={onChange}
          onShowSizeChange={onShowSizeChange}
          onPageChange={onPageChange}/>
     </Card>
  );
};
