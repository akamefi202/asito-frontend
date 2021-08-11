import React, {useState, useEffect} from "react";
import {Tabs} from "antd";
import {Card, Header} from "shared/components";
import {NAME_SPACES} from "shared/locales/constants";
import {useTranslation} from "react-i18next";
import {useHistory} from "react-router-dom";
import {PATHS} from "utils/constants";
import {useLazyQuery} from "@apollo/react-hooks";
import {CertificateQueries} from "shared/graphql/queries";
import moment from "moment";
import {messages} from "utils/helpers/message";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import {USER_ROLES} from "shared/constants/userRoles";
import {delay} from "utils/helpers/delay";
import {dateToString, timestampToDate} from "../../../utils/helpers/moment";
import {TableFormControl} from "../../../shared/components/TableFormControl/TableFormControl";
import {InputFormControl} from "../../../shared/components/InputformControl/InputFormControl";

const {CERTIFICATES} = CertificateQueries;

const {TabPane} = Tabs;

const tabs = [
  {title: "ALL", key: "ALL",},
  {title: "VALID", key: "gt",},
  {title: "EXPIRED", key: "lt",},
];

const columns = (t) => [
  {
    title: t('LIST.COLUMNS.CERTIFICATE_NUMBER'),
    dataIndex: 'number',
  },
  {
    title: t('LIST.COLUMNS.CERTIFICATE_TYPE'),
    dataIndex: ['requirement', 'type'],
  },
  {
    title: t('LIST.COLUMNS.ISSUED_TO'),
    dataIndex: 'employee',
    render: (employee) => (employee?.firstName || '') + ' ' + (employee?.lastName || '')
  },
  {
    title: t('LIST.COLUMNS.ISSUED_ON'),
    dataIndex: 'issuedOn',
    render: (issuedOn) => dateToString(issuedOn)
  },
  {
    title: t('LIST.COLUMNS.VALID_UNTIL'),
    dataIndex: 'validUntil',
    render: (stringDate) => {
      let isValid = true;
      if (stringDate) {
        const validUntil = timestampToDate(stringDate);
        isValid = validUntil && validUntil.isValid() && today.isSameOrBefore(validUntil);
      }

      return (
        <div className="access--type">
          {stringDate && <span className={`icon ${isValid ? 'icon-Check green' : 'icon-Close red'}`}/>}

          <span className={(isValid ? '' : 'red') + (!stringDate ? 'empty' : '')}>
            {stringDate ? dateToString(stringDate) : t('LIST.INFINITE')}
          </span>
        </div>
      );
    },
  },
];

const today = moment();

export default () => {
  const history = useHistory();
  const {t} = useTranslation(NAME_SPACES.CERTIFICATES);
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [scan, setScan] = useState('');
  const [skip, setSkip] = useState(0);
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(1);

  const [count, setCount] = useState({
    ALL: 0,
    gt: 0,
    lt: 0,
  });
  const [statusTab, setStatusTab] = useState({});

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variables = {scan, skip, take, ...statusTab};

  useEffect(() => {
    filterData();
  }, []);

  const [filterData, {loading}] = useLazyQuery(CERTIFICATES, {
    variables,
    onCompleted: ({certificates}) => {
      if (!certificates.data) return;
      setTotal(certificates.count);
      setData(certificates.data);
      if (!Object.keys(statusTab).length && !scan) setCount({...count, ALL: certificates.allCertsCount, gt: certificates.validCertsCount + certificates.unlimitedCertsCount, lt: certificates.expiredCertsCount});
    },
    onError: (error) => messages({data: error})
  });

  const createCertificate = () => {
    history.push(PATHS.CERTIFICATES.CREATE);
  };

  const setBreadcrumbsButtons = [
    {
      title: t('NEW'),
      disabled: false,
      action: createCertificate,
      icon: <span className="icon-Add-New btn--icon--right"/>,
    },
  ];

  const setBreadcrumbsItem = [
    {title: t("CERTIFICATES"), className: "heading--area--title"},
  ];

  const changeTab = (key) => {
    setStatusTab(key !== "ALL" ? {[key]: {validUntil: today}} : {});
    setPage(1);
    setSkip(0);
  };

  const onSearchChange = (event) => {
    delay(() => {
      setScan(event.target.value);
      setSkip(0);
      setPage(1);
    }, 500);
  };

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onShowSizeChange = (current, size) => setTake(size);

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || (userRole === USER_ROLES.TEST.key));

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []}/>

      <div className="details--page">
        <Card>
          <Tabs className="tab--custom" defaultActiveKey={tabs[0]?.title} onChange={changeTab}>
            {tabs.map((item) =>
              <TabPane key={item.key}
                tab={<div className="tab--count">{t(`LIST.TABS.${item.title}`) + ' ' + count[item.key]}</div>}
              />
            )}
          </Tabs>

          <InputFormControl id='search'
            customStyleWrapper='search--input--custom'
            placeholder={t('LIST.SEARCH_PLACEHOLDER')}
            onChange={onSearchChange}/>

          <TableFormControl rowKey='id'
            className='table--custom'
            columns={columns(t)}
            dataSource={data}
            loading={loading}
            onRow={row => ({onClick: () => history.push(PATHS.CERTIFICATES.SHOW.replace(':id', row.id))})}
            total={total}
            pageSize={take}
            page={page}
            onPageChange={onPageChange}
            onShowSizeChange={onShowSizeChange}/>
        </Card>
      </div>
    </div>
  );
};
