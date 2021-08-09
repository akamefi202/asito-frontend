import React from "react";
import {Link} from "react-router-dom";
import {PATHS} from "utils/constants";
import {Card} from "shared/components";
import {dateToString, timestampToDate} from "utils/helpers/moment";
import moment from "moment";
import {TableFormControl} from "../../../../../shared/components/TableFormControl/TableFormControl";

const today = moment();

const columns = (t) => [
  {
    title: t('SHOW.CERTIFICATES.COLUMNS.CERTIFICATE_NUMBER'),
    dataIndex: 'number',
    render: (number, record) => (
      <Link className="custom-link" to={PATHS.CERTIFICATES.SHOW.replace(':id', record.id)}>
        {number}
      </Link>
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
        const validUntil = timestampToDate(stringDate);
        isValid = validUntil && validUntil.isValid() && today.isSameOrBefore(validUntil);
      }

      return (
        <div className="access--type">
          {stringDate && <span className={`icon icon-Check ${isValid ? 'green' : 'red'}`}/>}

          <span className={(isValid ? "" : "red") + (!stringDate ? 'empty' : '')}>
              {stringDate ? dateToString(stringDate) : t('SHOW.CERTIFICATES.INFINITE')}
          </span>
        </div>
      );
    },
  }
];

export default ({t, certificates, loading, page, setPage, total, take, setSkip}) => {

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  }

  return (
    <Card cardStyle='card--details'>
      <h2 className="card--details--title">{t('SHOW.MENU.CERTIFICATES')}</h2>

      <TableFormControl rowKey='id'
        columns={columns(t)}
        dataSource={certificates}
        loading={loading}
        page={page}
        total={total}
        onPageChange={onPageChange}/>
    </Card>
  );
};

