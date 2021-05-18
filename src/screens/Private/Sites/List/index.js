import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Card, Header, Spin, Input } from "shared/components";
import { AiOutlinePlus } from "react-icons/ai";
import Table from "./Table";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { useLazyQuery } from "@apollo/react-hooks";
import { SiteQueries } from "shared/graphql/queries";
import {messages} from "utils/helpers/message";
import {USER_ROLES} from "shared/constants/userRoles";
import {useReactiveVar} from "@apollo/client";
import {UserStore} from "shared/store/UserStore";
import { delay } from "utils/helpers/delay";

const { SITES } = SiteQueries;

const { TabPane } = Tabs;

const tabs = [
  { title: "ALL", key: "ALL", },
  { title: "ACTIVE", key: "ACTIVE", },
  { title: "INACTIVE", key: "INACTIVE", },
];

export default () => {
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

  const user = useReactiveVar(UserStore);
  const userRole = user && user.issuer && user.issuer.kind ? user.issuer.kind : null;

  const variables = {scan, skip, take, where: {...statusTab}};

  useEffect(() => {
    filterData();
    activeData();
    inactiveData();
  }, []);

  const [filterData, {loading}] = useLazyQuery(SITES, {
    variables,
    onCompleted: ({ sites }) => {
      if (!sites.data) return;
      setData(sites.data);
      setTotal(sites.count);
      if (!Object.keys(statusTab).length && !scan) {
        setCount({...count, ALL: sites.count});
      }
    },
    onError: (error) => messages({data: error})
  });

  const [activeData, {loading: activeDataLoading}] = useLazyQuery(SITES, {
    variables: {where: {status: "ACTIVE"}},
    onCompleted: ({sites}) => setCount({...count, ACTIVE: sites.count}),
    onError: (error) => messages({data: error})
  });

  const [inactiveData, {loading: inactiveDataLoading}] = useLazyQuery(SITES, {
    variables: {where: {status: "INACTIVE"}},
    onCompleted: ({sites}) => setCount({...count, INACTIVE: sites.count}),
    onError: (error) => messages({data: error})
  });

  const createSite = () => history.push(PATHS.ROLES.CREATE);

  const setBreadcrumbsButtons = [
    {
      title: t("NEW_SITE"),
      disabled: false,
      action: createSite,
      icon: <AiOutlinePlus className="btn--icon--right" />,
    },
  ];

  const setBreadcrumbsItem = [{ title: t("SITES"), className: "heading--area--title" }];

  const changeTab = (key) => {
    setStatusTab(key !== "ALL" ? {status: key} : {});
    setPage(1);
    setSkip(0);
  };

  const onSearchChange = (value) => {
    delay(() => {
      setScan(value);
      setSkip(0);
      setPage(1);
    }, 500);
  };

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || ( userRole === USER_ROLES.TEST.key));

  return (
    <div className="wrapper--content">
      <Header items={setBreadcrumbsItem} buttons={isAccess() ? setBreadcrumbsButtons : []} />
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
                    <span className="tab--count--number">
                      {count[item.key]}
                    </span>
                  </div>
                }
                key={item.key}
              />
            ))}
          </Tabs>
          <Spin spinning={loading || activeDataLoading || inactiveDataLoading}>
            <div className="search--input">
              <Input
                onChange={onSearchChange}
                custom={"search--input--custom"}
                placeholder={t("LIST.SEARCH_PLACEHOLDER")}
              />
            </div>
            <Table t={t} sites={data} take={take} setTake={setTake} setSkip={setSkip} total={total} page={page} setPage={setPage}/>
          </Spin>
        </Card>
      </div>
    </div>
  );
};
