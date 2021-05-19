import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { Card, Header, Spin, Input } from "shared/components";
import Table from "./Table";
import { NAME_SPACES } from "shared/locales/constants";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { PATHS } from "utils/constants";
import { useLazyQuery } from "@apollo/react-hooks";
import { CertificateQueries } from "shared/graphql/queries";
import moment from "moment";
import { messages } from "utils/helpers/message";
import { useReactiveVar } from "@apollo/client";
import { UserStore } from "shared/store/UserStore";
import { USER_ROLES } from "shared/constants/userRoles";
import { delay } from "utils/helpers/delay";

const { CERTIFICATES } = CertificateQueries;

const { TabPane } = Tabs;

const tabs = [
  { title: "ALL", key: "ALL", },
  { title: "VALID", key: "gt", },
  { title: "EXPIRED", key: "lt", },
];

const today = moment();

export default () => {
  const history = useHistory();
  const { t } = useTranslation(NAME_SPACES.CERTIFICATES);
  const [data, setData] = useState([]);
  const [scan, setScan] = useState("");
  const [skip, setSkip] = useState(0);
  const [total, setTotal] = useState(0);
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

  const variables = { scan, skip, take, ...statusTab };

  useEffect(() => {
    filterData();
    validData();
    expiredData();
  }, []);

  const [filterData, { loading }] = useLazyQuery(CERTIFICATES, {
    variables,
    onCompleted: ({ certificates }) => {
      if (!certificates.data) return;
      setTotal(certificates.count);
      setData(certificates.data);
      if (!Object.keys(statusTab).length && !scan) {
        setCount({ ...count, ALL: certificates.count });
      }
    },
    onError: (error) => messages({ data: error })
  });

  const [validData, { loading: validDataLoading }] = useLazyQuery(CERTIFICATES, {
    variables: { gt: { validUntil: today } },
    onCompleted: ({ certificates }) => setCount({ ...count, gt: certificates.count }),
    onError: (error) => messages({ data: error })
  });

  const [expiredData, { loading: expiredDataLoading }] = useLazyQuery(CERTIFICATES, {
    variables: { lt: { validUntil: today } },
    onCompleted: ({ certificates }) => setCount({ ...count, lt: certificates.count }),
    onError: (error) => messages({ data: error })
  });

  const createCertificate = () => {
    history.push(PATHS.CERTIFICATES.CREATE);
  };

  const setBreadcrumbsButtons = [
    {
      title: t("NEW_CERTIFICATE"),
      disabled: false,
      action: createCertificate,
      icon: <span className="icon-Add-New btn--icon--right" />,
    },
  ];

  const setBreadcrumbsItem = [
    { title: t("CERTIFICATES"), className: "heading--area--title" },
  ];

  const changeTab = (key) => {
    setStatusTab(key !== "ALL" ? { [key]: { validUntil: today } } : {});
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

  const isAccess = () => userRole && ((userRole === USER_ROLES.CLIENT.key) || (userRole === USER_ROLES.TEST.key));

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
                    <span className="tab--count--number">{count[item.key]}</span>
                  </div>
                }
                key={item.key}
              />
            )
            )}
          </Tabs>
          <Spin spinning={loading || validDataLoading || expiredDataLoading}>
            <div className="search--input">
              <Input
                onChange={onSearchChange}
                custom={"search--input--custom"}
                placeholder={t("LIST.SEARCH_PLACEHOLDER")}
              />
            </div>
            <Table t={t} certificates={data} take={take} setTake={setTake} setSkip={setSkip} total={total} page={page} setPage={setPage} />
          </Spin>
        </Card>
      </div>
    </div>
  );
};
