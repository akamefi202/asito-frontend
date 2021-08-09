import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {Card, Header} from "shared/components";
import {NAME_SPACES} from "shared/locales/constants";
import {useTranslation} from "react-i18next";
import {PATHS} from "utils/constants";
import {useQuery} from "@apollo/react-hooks";
import {EmployeeQueries} from "shared/graphql/queries";
import {get} from "lodash";
import {messages} from "utils/helpers/message";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import {USER_ROLES} from "shared/constants/userRoles";
import {delay} from "utils/helpers/delay";
import {TableFormControl} from "../../../shared/components/TableFormControl/TableFormControl";
import {Tooltip} from "antd";
import {InputFormControl} from "../../../shared/components/InputformControl/InputFormControl";

const {EMPLOYEES} = EmployeeQueries;

const columns = (t) => [
  {
    title: t('LIST.COLUMNS.NAME'),
    dataIndex: 'full_mame',
    render: (_, column) => (column?.firstName || '') + ' ' + (column?.lastName || '')
  },
  {
    title: t('LIST.COLUMNS.NUMBER'),
    dataIndex: 'number',
  },
  {
    title: t('LIST.COLUMNS.CERTIFICATES'),
    dataIndex: 'certificates',
    render: (certificates) => certificates?.length || 0
  },
  {
    title: t('LIST.COLUMNS.ROLE'),
    dataIndex: 'employeeRoles',
    key: 'employeeRoles',
    render: (employeeRoles) => employeeRoles &&
      (<div className="cell-wrap">
        <Tooltip className="custom-cell" title={employeeRoles.map(e => e?.role?.name || '').join(', ')}>
          {employeeRoles.map(e => e?.role?.name || '').join(', ')}
        </Tooltip>
      </div>),
  }
];

export const EmployeesList = () => {
  const history = useHistory();
  const {t} = useTranslation(NAME_SPACES.EMPLOYEES);
  const [scan, setScan] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(1);

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variables = {scan, skip, take};

  const {data, loading} = useQuery(EMPLOYEES, {
    variables,
    onCompleted: ({employees}) => setTotal(employees.count || 0),
    onError: (error) => messages({data: error})
  });

  const employees = get(data, "employees.data", []);

  const create = () => history.push(PATHS.EMPLOYEES.CREATE);

  const setBreadcrumbsButtons = [
    {
      title: t("NEW"),
      disabled: false,
      action: create,
      icon: <span className="icon-Add-New btn--icon--right"/>,
    },
  ];

  const setBreadcrumbsItem = [
    {title: t("EMPLOYEES"), className: "heading--area--title"},
  ];

  const onSearchChange = (value) => {
    delay(() => {
      setScan(value);
      setSkip(0);
      setPage(1);
    }, 500);
  };

  const onPageChange = (page) => {
    setPage(page);
    setSkip(take * (page - 1));
  };

  const onShowSizeChange = (current, size) => setTake(size);

  const isAccess = () => userRole && ((userRole === USER_ROLES.PLANER.key) || (userRole === USER_ROLES.TEST.key));

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []}/>

      <div className="details--page">
        <Card>
          <InputFormControl id='search'
            customStyleWrapper='search--input--custom'
            placeholder={t('LIST.SEARCH_PLACEHOLDER')}
            onChange={onSearchChange}/>

          <TableFormControl rowKey='id'
            className="table--custom--operators"
            columns={columns(t)}
            dataSource={employees}
            loading={loading}
            total={total}
            page={page}
            pageSize={take}
            onPageChange={onPageChange}
            onShowSizeChange={onShowSizeChange}
            onRow={record => ({onClick: () => history.push(PATHS.EMPLOYEES.SHOW.replace(':id', record.id))})}/>
        </Card>
      </div>
    </div>
  );
};
