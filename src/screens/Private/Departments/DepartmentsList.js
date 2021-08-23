import React, { useState } from "react";
import { Card, Header } from "shared/components";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { DepartmentQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";
import { USER_ROLES } from "shared/constants/userRoles";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { delay } from "utils/helpers/delay";
import {TableFormControl} from "../../../shared/components/TableFormControl/TableFormControl";
import {InputFormControl} from "../../../shared/components/InputformControl/InputFormControl";

const { DEPARTMENTS } = DepartmentQueries;

const columns = (t) => [
  {
    title: t("LIST.COLUMNS.NAME"),
    dataIndex: "name",
    key: "name",
    sorter: true
  },
  {
    title: t("LIST.COLUMNS.TYPE"),
    dataIndex: "type",
    key: "type",
  },
  {
    title: t("LIST.COLUMNS.LOCATION"),
    dataIndex: "location",
    key: "location",
  },
  {
    title: t("LIST.COLUMNS.ROLES"),
    dataIndex: "rolesCount",
    key: "rolesCount",
  },
];

export const DepartmentsList = () => {
  const { t } = useTranslation(NAME_SPACES.DEPARTMENTS);
  const history = useHistory();
  const [scan, setScan] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [sortType, setSortType] = useState({name: 'updatedAt', type:'DESC'});
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(1);

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variables = {scan, skip, take, orderBy: [sortType]};

  const { data, loading } = useQuery(DEPARTMENTS, {
    variables,
    onCompleted: ({departments}) => setTotal(departments.count),
    onError: (error) => messages({data: error})
  });

  const departments = get(data, "departments.data", []);

  const create = () => {
    history.push(PATHS.DEPARTMENTS.CREATE);
  };

  const setBreadcrumbsButtons = [
    {
      title: t("NEW"),
      disabled: false,
      action: create,
      icon: <span className="icon-Add-New btn--icon--right" />,
    },
  ];

  const setBreadcrumbsItem = [
    { title: t("DEPARTMENTS"), className: "heading--area--title" },
  ];

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

  const onShowSizeChange = (current, size) => {
    setTake(size);
  }

  const onChangeTable = (pagination, filters, sorter) => {
    if (pagination.current === page) onPageChange(1);
    if (!sorter.order) return setSortType({ name: "updatedAt", type:  "DESC" });
    const sortBy = { name: "name", type: sorter.order === 'descend' ? "DESC" : "ASC" };
    setSortType(sortBy);
  }

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || (userRole === USER_ROLES.TEST.key));

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []} />
      <div className="details--page">
        <Card>
          <InputFormControl id='search'
              customStyleWrapper='search--input--custom'
              placeholder={t('LIST.SEARCH_PLACEHOLDER')}
              onChange={onSearchChange}/>

          <TableFormControl rowKey='id'
            className='table--custom'
            columns={columns(t)}
            dataSource={departments}
            loading={loading}
            onRow={row => ({onClick: () => history.push(PATHS.DEPARTMENTS.SHOW.replace(':id', row.id))})}
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
