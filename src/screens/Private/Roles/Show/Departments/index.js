import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import Card from "shared/components/Card";
import { TableFormControl } from "../../../../../shared/components/TableFormControl/TableFormControl";
import { useQuery } from "@apollo/react-hooks";
import { messages } from "../../../../../utils/helpers/message";

const columns = (t) => [
  {
    title: t('SHOW.DEPARTAMENT.COLUMNS.NAME'),
    dataIndex: 'name',
    sorter: true,
    render: (name, record) => (
       <Link className="custom-link" to={PATHS.DEPARTMENTS.SHOW.replace(':id', record.id)}>{name}</Link>
    )
  },
  {
    title: t('SHOW.DEPARTAMENT.COLUMNS.TYPE'),
    dataIndex: 'type',
  },
  {
    title: t('SHOW.DEPARTAMENT.COLUMNS.LOCATION'),
    dataIndex: 'location',
  },
];

export default ({t, id, depart}) => {
  const [departments, setDepartments] = useState([]);
  const [sortType, setSortType] = useState([{name: 'updatedAt', type: 'DESC'}]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  // const {loading} = useQuery(DEPARTMENTS, {
  //   variables: {where: {id}, skip, take, orderBy: sortType},
  //   onCompleted: ({departments}) => {
  //     setDepartments(departments.data)
  //     setTotal(departments.count)
  //   },
  //   onError: (error) => messages({data: error})
  // });

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onChange = (pagination, filters, sorter) => {
    onPageChange(1);

    setSortType([sorter.order
       ? {name: sorter.field, type: sorter.order === 'descend' ? 'DESC' : 'ASC'}
       : {name: 'updatedAt', type: 'DESC'}]);
  }

  const onShowSizeChange = (current, size) => setTake(size);

  return (
     <Card cardStyle="card--details">
       <h2 className="card--details--title">{t('SHOW.MENU.DEPARTAMENT')}</h2>

       <TableFormControl rowKey='id'
          columns={columns(t)}
          dataSource={depart}
          loading={false}
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
