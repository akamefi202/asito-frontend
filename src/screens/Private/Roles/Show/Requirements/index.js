import React, { useState } from "react";
import { Card } from "shared/components";
import { dateToString } from "utils/helpers/moment";
import { useQuery } from "@apollo/react-hooks";
import { RoleRequirementQueries } from "../../../../../shared/graphql/queries";
import { messages } from "../../../../../utils/helpers/message";
import { TableFormControl } from "../../../../../shared/components/TableFormControl/TableFormControl";

const {ROLE_REQUIREMENTS} = RoleRequirementQueries;

const columns = (t) => [
  {
    title: t('SHOW.REQUIREMENTS.COLUMNS.CERTIFICATE_TYPE'),
    dataIndex: ['requirement', 'type'],
    width: '70%',
    sorter: true,
  },
  {
    title: t('SHOW.REQUIREMENTS.COLUMNS.VALID_UNTIL'),
    dataIndex: 'validAtLeastUntil',
    width: '30%',
    render: (validAtLeastUntil) => validAtLeastUntil ? dateToString(validAtLeastUntil) : t('SHOW.REQUIREMENTS.INFINITE'),
  },
];

export default ({t, id}) => {
  const [requirements, setRequirements] = useState([]);
  const [sortType, setSortType] = useState([{name: 'updatedAt', type: 'DESC'}]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  const {loading} = useQuery(ROLE_REQUIREMENTS, {
    variables: {roleRequirementsWhere: {role: {id}}, skip, take, orderBy: sortType},
    onCompleted: ({roleRequirements}) => {
      setRequirements(roleRequirements.data)
      setTotal(roleRequirements.count)
    },
    onError: (error) => messages({data: error})
  });

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onChange = (pagination, filters, sorter) => {
    onPageChange(1);

    setSortType([sorter.order
       ? {name: sorter.field.join('.'), type: sorter.order === 'descend' ? 'DESC' : 'ASC'}
       : {name: 'updatedAt', type: 'DESC'}]);
  }

  const onShowSizeChange = (current, size) => setTake(size);

  return (
     <Card cardStyle="card--details">
       <h2 className="card--details--title">{t('SHOW.MENU.REQUIREMENTS')}</h2>

       <TableFormControl rowKey='id'
          columns={columns(t)}
          dataSource={requirements}
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
