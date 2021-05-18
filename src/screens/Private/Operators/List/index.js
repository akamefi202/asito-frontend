import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Tabs } from "antd";
import Table from "./Table";
import { AiOutlinePlus } from "react-icons/ai";
import { Card, Header, Spin, Input } from "shared/components";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { PATHS } from "utils/constants";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import { OperatorQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";
import { delay } from "utils/helpers/delay";
import {ASSESS_STATUSES} from "shared/constants/accessStatuses";

const { OPERATORS } = OperatorQueries;

const { TabPane } = Tabs;

const tabs = [
  { title: "ALL", key: "ALL", },
  // { title: "AUTHORIZED", key: ASSESS_STATUSES.AUTHORIZED, },
  // { title: "PENDING", key: ASSESS_STATUSES.PENDING, },
  // { title: "NO_AUTHORIZED", key: ASSESS_STATUSES.NO_AUTHORIZED, },
];

export default () => {
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.OPERATORS);
  const [stateTab, setStateTab] = useState({});
  const [scan, setScan] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState({
    ALL: 0,
    AUTHORIZED: 0,
    PENDING: 0,
    NO_AUTHORIZED: 0,
  });

  const variables = {scan, skip, take, where: {accesses: stateTab}};

  const { data, loading } = useQuery(OPERATORS, {
    variables,
    onCompleted: ({operators}) => setTotal(operators.count || 0),
    onError: (error) => messages({ data: error })
  });

  const [allData, {loading: allLoading}] = useLazyQuery(OPERATORS, {
    variables: {skip: 0, take: 0},
    onCompleted: ({operators}) => setCount({...count, ALL: operators.count}),
    onError: (error) => messages({ data: error })
  });

  const [authorizedData, {loading: authorizedLoading}] = useLazyQuery(OPERATORS, {
    variables: {skip: 0, take: 0, where: {accesses: {status: ASSESS_STATUSES.AUTHORIZED}}},
    onCompleted: ({operators}) => setCount({...count, AUTHORIZED: operators.count}),
    onError: (error) => messages({ data: error })
  });

  const [pendingData, {loading: pendingLoading}] = useLazyQuery(OPERATORS, {
    variables: {skip: 0, take: 0, where: {accesses: {status: ASSESS_STATUSES.PENDING}}},
    onCompleted: ({operators}) => setCount({...count, PENDING: operators.count}),
    onError: (error) => messages({ data: error })
  });

  const [noAuthorized, {loading: noAuthorizedLoading}] = useLazyQuery(OPERATORS, {
    variables: {skip: 0, take: 0, where: {accesses: {status: ASSESS_STATUSES.NO_AUTHORIZED}}},
    onCompleted: ({operators}) => setCount({...count, NO_AUTHORIZED: operators.count}),
    onError: (error) => messages({ data: error })
  });

  useEffect(() => {
    allData();
    // authorizedData();
    // pendingData();
    // noAuthorized();
  }, []);


  const operators = get(data, "operators.data", []);

  const createOperators = () => history.push(PATHS.OPERATORS.CREATE);

  const setBreadcrumbsButtons = [
    {
      title: t("NEW_OPERATOR"),
      disabled: false,
      action: createOperators,
      icon: <AiOutlinePlus className="btn--icon--right" />,
    },
  ];

  const setBreadcrumbsItem = [
    { title: t("OPERATORS"), className: "heading--area--title" },
  ];

  const changeTab = (key) => {
    // setStateTab(key !== "ALL" ? {status: key} : {});
    // setPage(1);
    // setSkip(0);
  };

  const onSearchChange = (value) => {
    delay(() => {
      setScan(value);
      setSkip(0);
      setPage(1);
    }, 500);
  };

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={setBreadcrumbsButtons} />

      <div className="details--page">
        <Card>
          <Tabs defaultActiveKey={tabs[0]?.title} onChange={changeTab} className="tab--custom">
            {tabs.map((item) => (
              <TabPane
                tab={
                  <div className="tab--count">
                    <span className="tab--count--title">
                      {t(`LIST.TABS.${item.title}`)}
                    </span>
                    <span className="tab--count--number">{count[item.title]}</span>
                  </div>
                }
                key={item.key}
              />
            ))}
          </Tabs>
          <Spin spinning={loading || authorizedLoading || pendingLoading || noAuthorizedLoading || allLoading}>
            <div className="search--input">
              <Input
                onChange={onSearchChange}
                custom={"search--input--custom"}
                placeholder={t("LIST.SEARCH_PLACEHOLDER")}
              />
            </div>
            <Table t={t} operators={operators} take={take} setTake={setTake} setSkip={setSkip} total={total} page={page} setPage={setPage}/>
          </Spin>
        </Card>
      </div>
    </div>
  );
};
