import React, { useState } from "react";
import Card from "shared/components/Card";
import { dateToString } from "utils/helpers/moment";
import { TableFormControl } from "shared/components/TableFormControl/TableFormControl";
import { useQuery } from "@apollo/react-hooks";
import { messages } from "utils/helpers/message";
import { ProtocolQueries } from "shared/graphql/queries";

const {PROTOCOLS} = ProtocolQueries;

const columns = (t) => [
  {
    title: t('SHOW.PROTOCOLS.COLUMNS.FILE_NAME'),
    dataIndex: 'name',
    sorter: true,
    width: '70%',
    render: (name, record) => (
       <a className="custom-link" href={record.url} target="_blank" rel='noreferrer'>{name}</a>),
  },
  {
    title: t('SHOW.PROTOCOLS.COLUMNS.FILE_TYPE'),
    dataIndex: 'type',
    width: '10%',
  },
  {
    title: t('SHOW.PROTOCOLS.COLUMNS.UPLOAD_DATE'),
    dataIndex: 'updatedAt',
    width: '20%',
    render: (updatedAt) => (<span>{dateToString(updatedAt, 'DD-MM-YYYY')}</span>),
  },
];

export default ({t, id}) => {
  const [protocols, setProtocols] = useState([]);
  const [sortType, setSortType] = useState([{name: 'updatedAt', type: 'DESC'}]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const {loading} = useQuery(PROTOCOLS, {
    variables: {protocolsWhere: {role: {id}}, skip, take},
    onCompleted: ({protocols}) => {
      setProtocols(protocols.data)
      setTotal(protocols.count)
    },
    onError: (error) => messages({data: error})
  });

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onChange = (pagination, filters, sorter) => {
    if (pagination.current !== page) return;
    onPageChange(1);

    setSortType([sorter.order
       ? {name: sorter.field, type: sorter.order === 'descend' ? 'DESC' : 'ASC'}
       : {name: 'updatedAt', type: 'DESC'}]);
  }

  const onShowSizeChange = (current, size) => setTake(size);

  return (
     <Card cardStyle="card--details">
       <h2 className="card--details--title">{t('SHOW.MENU.PROTOCOLS')}</h2>

       <TableFormControl rowKey='id'
          columns={columns(t)}
          dataSource={protocols}
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
