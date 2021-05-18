import React from "react";
import { Tabs } from "antd";
import All from "./All";
import Button from "../../../../shared/components/Button";
import { AiOutlinePlus } from "react-icons/ai";
import Card from "shared/components/Card";

const { TabPane } = Tabs;

const t = {
  tabs: {
    items: {
      ALL: "All",
      AUTHORIZED: "Authorized",
      PENDING_AUTHORIZATION: "Pending Authorization",
      NO_AUTHORIZATION: `No Authorization`,
    },
    keys: {
      ALL: "All",
      AUTHORIZED: "Authorized",
      PENDING_AUTHORIZATION: "Pending Authorization",
      NO_AUTHORIZATION: `No Authorization`,
    },
    titles: {
      ALL: "All",
      AUTHORIZED: "Authorized",
      PENDING_AUTHORIZATION: "Pending Authorization",
      NO_AUTHORIZATION: `No Authorization`,
    },
  },
};

export default () => (
  <div className="wrapper--content">
    <div className="heading--area">
      <h2 className="heading--area--title">Operators</h2>
      <Button onClick={() => {}}>
        <AiOutlinePlus /> New operator
      </Button>
    </div>
    <div className="details--page">
      <Card>
        <Tabs defaultActiveKey={t.tabs.keys.ALL} className="tab--custom">
          <TabPane
            tab={
              <div className="tab--count">
                <span className="tab--count--title">{t.tabs.items.ALL}</span>{" "}
                <span className="tab--count--number">100</span>
              </div>
            }
            key={t.tabs.keys.ALL}
          >
            <All />
          </TabPane>
          <TabPane
            tab={
              <div className="tab--count">
                <span className="tab--count--title">
                  {t.tabs.items.AUTHORIZED}
                </span>{" "}
                <span className="tab--count--number">100</span>
              </div>
            }
            key={t.tabs.keys.AUTHORIZED}
          >
            {t.tabs.titles.AUTHORIZED}
          </TabPane>
          <TabPane
            tab={
              <div className="tab--count">
                <span className="tab--count--title">
                  {t.tabs.items.PENDING_AUTHORIZATION}
                </span>{" "}
                <span className="tab--count--number">100</span>
              </div>
            }
            key={t.tabs.keys.PENDING_AUTHORIZATION}
          >
            {t.tabs.titles.PENDING_AUTHORIZATION}
          </TabPane>
          <TabPane
            tab={
              <div className="tab--count">
                <span className="tab--count--title">
                  {t.tabs.items.NO_AUTHORIZATION}
                </span>{" "}
                <span className="tab--count--number">100</span>
              </div>
            }
            key={t.tabs.keys.NO_AUTHORIZATION}
          >
            {t.tabs.titles.NO_AUTHORIZATION}
          </TabPane>
        </Tabs>
      </Card>
    </div>
  </div>
);
