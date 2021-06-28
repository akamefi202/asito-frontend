import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Table from "./Table";
import { Card, Header, Spin, Input } from "shared/components";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { EmployeeQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { USER_ROLES } from "shared/constants/userRoles";
import { delay } from "utils/helpers/delay";

const { EMPLOYEES } = EmployeeQueries;

export default () => {
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.EMPLOYEES);
  const [scan, setScan] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(1);

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variables = { scan, skip, take };

  const { data, loading } = useQuery(EMPLOYEES, {
    variables,
    onCompleted: ({ employees }) => setTotal(employees.count || 0),
    onError: (error) => messages({ data: error })
  });

  const employees = get(data, "employees.data", []);

  const create = () => history.push(PATHS.EMPLOYEES.CREATE);

  const setBreadcrumbsButtons = [
    {
      title: t("NEW"),
      disabled: false,
      action: create,
      icon: <span className="icon-Add-New btn--icon--right" />,
    },
  ];

  const setBreadcrumbsItem = [
    { title: t("EMPLOYEES"), className: "heading--area--title" },
  ];

  const onSearchChange = (value) => {
    delay(() => {
      setScan(value);
      setSkip(0);
      setPage(1);
    }, 500);
  };

  const isAccess = () => userRole && ((userRole === USER_ROLES.PLANER.key) || (userRole === USER_ROLES.TEST.key));

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []} />

      <div className="details--page">
        <Card>
          <Spin spinning={loading}>
            <div className="search--input--no--tabs">
              <Input
                onChange={onSearchChange}
                custom={"search--input--custom"}
                placeholder={t("LIST.SEARCH_PLACEHOLDER")}
              />
            </div>
            <Table t={t} employees={employees} take={take} setTake={setTake} setSkip={setSkip} total={total} page={page} setPage={setPage} />
          </Spin>
        </Card>
      </div>
    </div>
  );
};