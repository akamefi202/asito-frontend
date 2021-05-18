import React, { useState } from "react";
import { Tabs } from "antd";
import { Card, Header, Input, Spin } from "shared/components";
import Table from "./Table";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { useQuery } from "@apollo/react-hooks";
import { ClientQueries } from "shared/graphql/queries";
import { get } from "lodash";
import { messages } from "utils/helpers/message";
import { delay } from "utils/helpers/delay";

const { CLIENTS } = ClientQueries;

const { TabPane } = Tabs;

const tabs = [
  { title: "ALL", key: "0", }
];

export default () => {
  const { t } = useTranslation(NAME_SPACES.CLIENTS);
  // const history = useHistory();
  const [stateTab, setStateTab] = useState(tabs[0]?.title);
  const [scan, setScan] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
  const [take, setTake] = useState(10);
  const [page, setPage] = useState(1);

  const variables = {scan, skip, take};

  const { data, loading } = useQuery(CLIENTS, {
    variables,
    onCompleted: ({clients}) => setTotal(clients.count),
    onError: (error) => messages({data: error})
  });

  const clients = get(data, "clients.data", []);

  // const createClient = () => {
  //   history.push(PATHS.CLIENTS.CREATE);
  // };

  const setBreadcrumbsItem = [
    { title: t("CLIENSTS"), className: "heading--area--title" },
  ];

  const changeTab = (key) => {
    setStateTab(key);
    setSkip(0);
    setPage(1);
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
      <Header items={setBreadcrumbsItem}/>
      <div className="details--page">
        <Card>
          <Tabs defaultActiveKey={stateTab}  onChange={changeTab} className="tab--custom">
            {tabs.map((item) => (
              <TabPane
                tab={
                  <div className="tab--count">
                    <span className="tab--count--title">
                      {t(`LIST.TABS.${item.title}`)}
                    </span>
                    <span className="tab--count--number">{total}</span>
                  </div>
                }
                key={item.key}
              />
            ))}
          </Tabs>
          <Spin spinning={loading}>
            <div className="search--input">
              <Input
                onChange={onSearchChange}
                custom={"search--input--custom"}
                placeholder={t("LIST.SEARCH_PLACEHOLDER")}
              />
            </div>
            <Table t={t} clients={clients} take={take} setTake={setTake} setSkip={setSkip} total={total} page={page} setPage={setPage}/>
          </Spin>
        </Card>
      </div>
    </div>
  );
};
