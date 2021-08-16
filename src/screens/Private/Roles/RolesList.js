import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Card, Header } from "shared/components";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { useLazyQuery } from "@apollo/react-hooks";
import { RoleQueries } from "shared/graphql/queries";
import { messages } from "utils/helpers/message";
import { USER_ROLES } from "shared/constants/userRoles";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { delay } from "utils/helpers/delay";
import { TableFormControl } from "../../../shared/components/TableFormControl/TableFormControl";
import {InputFormControl} from "../../../shared/components/InputformControl/InputFormControl";

const { ROLES } = RoleQueries;

const { TabPane } = Tabs;

const tabs = [
  { title: "ALL", key: "ALL", },
  { title: "ACTIVE", key: "ACTIVE", },
  { title: "INACTIVE", key: "INACTIVE", },
];

const columns = (t) => [
  {
    title: t("LIST.COLUMNS.NAME"),
    dataIndex: "name",
    key: "name",
    sorter: true
  },
  {
    title: t("LIST.COLUMNS.DEPARTAMENT"),
    dataIndex: "departments",
    key: "departments",
    render: (departments) => departments ? departments.length : 0
  },
  {
    title: t("LIST.COLUMNS.REQUIREMENTS"),
    dataIndex: "requirementsCount",
    key: "requirementsCount",
    render: (requirementsCount) => requirementsCount,
  },
  {
    title: t("LIST.COLUMNS.EMPLOYEES"),
    dataIndex: "numberOfEmployeesRequired",
    key: "numberOfEmployeesRequired",
    render: (number, record) => (
      <span>
        {`${record.employeeRoles && record.employeeRoles.length || 0}/${number}`}
      </span>
    ),
  },
  {
    title: t("LIST.COLUMNS.STATUS"),
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <span className={text === "ACTIVE" ? "green" : "yellow"}>
        {t(`STATUS_CODE.${text}`)}
      </span>
    ),
  },
];

export const RolesList = () => {
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.ROLES);
  const [data, setData] = useState([]);
  const [count, setCount] = useState({
    ALL: 0,
    ACTIVE: 0,
    INACTIVE: 0,
  });
  const [statusTab, setStatusTab] = useState({});
  const [scan, setScan] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(1);
  const [sortType, setSortType] = useState({name: 'updatedAt', type:'DESC'});

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variables = { scan, skip, take, where: { ...statusTab }, orderBy: [sortType] };

  useEffect(() => {
    filterData();
  }, []);

  const [filterData, { loading }] = useLazyQuery(ROLES, {
    variables,
    onCompleted: ({ roles }) => {
      if (!roles.data) return;
      setData(roles.data);
      setTotal(roles.count);
      if (!Object.keys(statusTab).length && !scan) {
        setCount({ ...count, ALL: roles.count, ACTIVE: roles.activeRolesCount, INACTIVE: roles.inactiveRolesCount });
      }
    },
    onError: (error) => messages({ data: error })
  });

  const create = () => history.push(PATHS.ROLES.CREATE);

  const setBreadcrumbsButtons = [
    {
      title: t("NEW"),
      disabled: false,
      action: create,
      icon: <span className="icon-Add-New btn--icon--right" />,
    },
  ];

  const setBreadcrumbsItem = [{ title: t("ROLES"), className: "heading--area--title" }];

  const changeTab = (key) => {
    setStatusTab(key !== "ALL" ? { status: key } : {});
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

  const onChangeTable = (pagination, filters, sorter) => {
    if (!sorter.order) return setSortType({ name: "updatedAt", type:  "DESC" });
    const sortBy = { name: "name", type: sorter.order === 'descend' ? "DESC" : "ASC" };
    setSortType(sortBy);
  }

  const onShowSizeChange = (current, size) => setTake(size);

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || (userRole === USER_ROLES.TEST.key));

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []} />
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
            onRow={row => ({onClick: () => history.push(PATHS.ROLES.SHOW.replace(':id', row.id))})}
            total={total}
            pageSize={take}
            page={page}
            onChange={onChangeTable}
            onPageChange={onPageChange}
            onShowSizeChange={onShowSizeChange}/>
        </Card>
      </div>
    </div>
  );
};
