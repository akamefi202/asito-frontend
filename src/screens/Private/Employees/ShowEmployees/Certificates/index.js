import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "utils/constants";
import { Card } from "shared/components";
import { dateToString, timestampToDate } from "utils/helpers/moment";
import { TableFormControl } from "../../../../../shared/components/TableFormControl/TableFormControl";
import { useQuery } from "@apollo/react-hooks";
import { messages } from "../../../../../utils/helpers/message";
import { CertificateQueries } from "../../../../../shared/graphql/queries";
import moment from "moment";

const {CERTIFICATES} = CertificateQueries;

const columns = (t) => [
  {
    title: t('SHOW.CERTIFICATES.COLUMNS.CERTIFICATE_NUMBER'),
    dataIndex: 'number',
    render: (number, record) => (
       <Link className="custom-link" to={PATHS.CERTIFICATES.SHOW.replace(':id', record.id)}>{number}</Link>
    ),
  },
  {
    title: t('SHOW.CERTIFICATES.COLUMNS.CERTIFICATE_TYPE'),
    dataIndex: ['requirement', 'type'],
  },
  {
    title: t('SHOW.CERTIFICATES.COLUMNS.VALID_UNTIL'),
    dataIndex: 'validUntil',
    render: (stringDate) => {
      let isValid = true;
      if (stringDate) {
        const validUntil = timestampToDate(Date.parse(new Date(stringDate)));
        isValid = validUntil && validUntil.isValid() && moment().isSameOrBefore(validUntil);
      }

      return (
         <div className="access--type">
           {stringDate && <span className={`icon ${isValid ? 'icon-Check green' : 'icon-Close red'}`}/>}

           <span className={(isValid ? "" : "red") + (!stringDate ? 'empty' : '')}>
              {stringDate ? dateToString(stringDate) : t('SHOW.CERTIFICATES.INFINITE')}
          </span>
         </div>
      );
    },
  }
];

export default ({t, id}) => {
  const [certificates, setCertificates] = useState([]);
  const [sortType, setSortType] = useState([{name: 'updatedAt', type: 'DESC'}]);
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(5);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);


  const {loading} = useQuery(CERTIFICATES, {
    variables: {where: {employee: {id}}, skip, take},
    onCompleted: (loadData) => {
      setCertificates(loadData.certificates.data);
      setTotal(loadData.certificates.count || 0)
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
     <Card cardStyle='card--details'>
       <h2 className="card--details--title">{t('SHOW.MENU.CERTIFICATES')}</h2>

       <TableFormControl rowKey='id'
          columns={columns(t)}
          dataSource={certificates}
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

